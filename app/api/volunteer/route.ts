// app/api/volunteer/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';


/* =========================
   ✅ ENV VARIABLES
========================= */
const MONGODB_URI = process.env.MONGODB_URI!;
const DATABASE_NAME = process.env.DATABASE_NAME!;
const COLLECTION_NAME = 'volunteer_applications';

/* =========================
   ✅ FILE STORAGE PATH
========================= */
const UPLOAD_DIR = path.join(process.cwd(), 'public/uploads/cv');

if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

/* =========================
   ✅ SINGLETON DB CONNECTION
========================= */
let cachedClient: MongoClient | null = null;

async function connectToDatabase() {
  if (cachedClient) return cachedClient.db(DATABASE_NAME);

  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  cachedClient = client;

  console.log('✅ MongoDB connected successfully');
  return client.db(DATABASE_NAME);
}

/* =========================
   ✅ POST — SAVE VOLUNTEER + FILE
========================= */
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

    /* ✅ EXTRACT FILE */
    const cvFile = data.get('cv') as File | null;
    let cvPath: string | null = null;

    if (cvFile) {
      const bytes = await cvFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const safeFileName = `${Date.now()}-${uuidv4()}-${cvFile.name.replace(/\s+/g, '_')}`;
      const filePath = path.join(UPLOAD_DIR, safeFileName);

      await fs.promises.writeFile(filePath, buffer);

      cvPath = `/uploads/cv/${safeFileName}`;
    }

    /* ✅ FORM DATA */
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
      cvPath,
      createdAt: new Date(),
      status: 'pending',
    };

    /* ✅ REQUIRED FIELD VALIDATION */
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

    /* ✅ EMAIL VALIDATION */
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email!)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const db = await connectToDatabase();
    const collection = db.collection(COLLECTION_NAME);

    /* ✅ DUPLICATE EMAIL CHECK */
    const existingApplication = await collection.findOne({
      email: formData.email,
    });

    if (existingApplication) {
      return NextResponse.json(
        { error: 'An application with this email already exists' },
        { status: 409 }
      );
    }

    /* ✅ AGE */
    const age = calculateAge(
      formData.birthYear!,
      formData.birthMonth!,
      formData.birthDate!
    );

    /* ✅ INSERT */
    const result = await collection.insertOne({
      ...formData,
      age,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Application submitted successfully',
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

/* =========================
   ✅ GET — ADMIN FETCH
========================= */
export async function GET() {
  try {
    const db = await connectToDatabase();
    const collection = db.collection(COLLECTION_NAME);

    const applications = await collection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ applications });
  } catch (error) {
    console.error('❌ Error fetching applications:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/* =========================
   ✅ AGE HELPER
========================= */
function calculateAge(year: string, month: string, date: string): number {
  const birthDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(date));
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}
