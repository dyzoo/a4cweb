import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import connectDB from "@/lib/mongodb";
import { getAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const { id } = await params;
    await connectDB();
    const db = mongoose.connection.db;
    if (!db) return new Response("Database unavailable", { status: 500 });

    const application = await db
      .collection("volunteer_applications")
      .findOne({ _id: new ObjectId(id) });

    if (!application?.cvFileId) {
      return new Response("No CV attached to this application", { status: 404 });
    }

    const bucket = new mongoose.mongo.GridFSBucket(db, { bucketName: "cvUploads" });
    const fileId = new ObjectId(application.cvFileId);
    const files = await bucket.find({ _id: fileId }).toArray();
    if (!files.length) return new Response("CV file not found", { status: 404 });

    const chunks: Buffer[] = [];
    const stream = bucket.openDownloadStream(fileId);
    for await (const chunk of stream) {
      chunks.push(Buffer.from(chunk));
    }
    const buffer = Buffer.concat(chunks);
    const filename = files[0].filename || "cv.pdf";
    const contentType =
      (files[0] as { contentType?: string }).contentType ||
      (files[0].metadata?.contentType as string | undefined) ||
      "application/octet-stream";

    return new Response(buffer, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `inline; filename="${filename.replace(/"/g, "")}"`,
        "Content-Length": String(buffer.length),
      },
    });
  } catch (error) {
    console.error("Unable to download CV:", error);
    return new Response("Unable to download CV", { status: 500 });
  }
}
