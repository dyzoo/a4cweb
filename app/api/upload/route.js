import { NextResponse } from "next/server";
import { connectGridFS } from "../../../lib/gridfs";

export async function POST(req) {
  const { bucket } = await connectGridFS();
  const data = await req.formData();
  const file = data.get("file");

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const uploadStream = bucket.openUploadStream(file.name);
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  uploadStream.end(buffer);

  return NextResponse.json({ message: "Uploaded!", id: uploadStream.id });
}
