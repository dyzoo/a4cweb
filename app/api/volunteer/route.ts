// app/api/volunteer/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { MongoClient, GridFSBucket } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';

const MONGODB_URI = process.env.MONGODB_URI!;
//const DATABASE_NAME = process.env.DATABASE_NAME!;
const COLLECTION_NAME = 'volunteer_applications';

let cachedClient: MongoClient | null = null;

async function connectToDatabase() {
  if (cachedClient) return cachedClient.db(); // no argument

  const client = new MongoClient(process.env.MONGODB_URI!);
  await client.connect();
  cachedClient = client;

  return client.db(); // no DATABASE_NAME
}


export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type') || '';
    if (!contentType.includes('multipart/form-data')) {
      return NextResponse.json(
        { error: 'Invalid content type. Expected multipart/form-data.' },
        { status: 415 }
      );
    }

    const data = await request.formData();
    const db = await connectToDatabase();
    const collection = db.collection(COLLECTION_NAME);

    /* =========================
       ✅ FILE UPLOAD TO GRIDFS
    ========================= */
    const cvFile = data.get('cv') as File | null;
    let fileId = null;

    if (cvFile) {
      const bucket = new GridFSBucket(db, {
        bucketName: 'cvUploads',
      });

      const bytes = await cvFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadStream = bucket.openUploadStream(
        `${Date.now()}-${uuidv4()}-${cvFile.name}`
      );

      uploadStream.end(buffer);

      fileId = uploadStream.id;
    }

    /* =========================
       ✅ FORM DATA
    ========================= */
    const formData = {
      firstName: data.get('firstName')?.toString(),
      lastName: data.get('lastName')?.toString(),
      phone: data.get('phone')?.toString(),
      countryCode: data.get('countryCode')?.toString(),
      email: data.get('email')?.toString(),
      birthYear: data.get('birthYear')?.toString(),
      birthMonth: data.get('birthMonth')?.toString(),
      birthDate: data.get('birthDate')?.toString(),
      location: data.get('location')?.toString(),
      cvFileId: fileId,
      createdAt: new Date(),
      status: 'pending',
    };

    /* Required validation */
    const requiredFields = [
      'firstName',
      'lastName',
      'phone',
      'email',
      'birthYear',
      'birthMonth',
      'birthDate',
      'location',
    ];

    for (const field of requiredFields) {
      if (!formData[field as keyof typeof formData]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    /* Email validation */
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email!)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    /* Duplicate check */
    const existingApplication = await collection.findOne({
      email: formData.email,
    });

    if (existingApplication) {
      return NextResponse.json(
        { error: 'An application with this email already exists' },
        { status: 409 }
      );
    }

    const age = calculateAge(
      formData.birthYear!,
      formData.birthMonth!,
      formData.birthDate!
    );

    const result = await collection.insertOne({
      ...formData,
      age,
    });

    return NextResponse.json(
      {
        success: true,
        applicationId: result.insertedId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('❌ Error submitting volunteer application:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function calculateAge(
  year: string,
  month: string,
  date: string
): number {
  const birthDate = new Date(
    parseInt(year),
    parseInt(month) - 1,
    parseInt(date)
  );

  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}
