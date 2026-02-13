import { NextRequest } from "next/server";
import { MongoClient, GridFSBucket, ObjectId } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI!;
const DATABASE_NAME = process.env.DATABASE_NAME!;

let cachedClient: MongoClient | null = null;

async function connect() {
  if (cachedClient) return cachedClient;

  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  cachedClient = client;

  return client;
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> } // ✅ Next.js 15 requires Promise
) {
  try {
    const resolvedParams = await params;
    const fileId = resolvedParams.id;

    if (!ObjectId.isValid(fileId)) {
      return new Response("Invalid file ID", { status: 400 });
    }

    const client = await connect();
    const db = client.db(DATABASE_NAME);

    const bucket = new GridFSBucket(db, {
      bucketName: "cvUploads",
    });

    const downloadStream = bucket.openDownloadStream(
      new ObjectId(fileId)
    );

    return new Response(downloadStream as any, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="cv.pdf"`,
      },
    });
  } catch (error) {
    console.error("CV download error:", error);
    return new Response("File not found", { status: 404 });
  }
}
