import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { connectGridFS } from "@/lib/gridfs";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  let idOrFilename = resolvedParams.id;

  try {
    const bucket = await connectGridFS();

    let downloadStream;
    let actualFileName: string;

    if (ObjectId.isValid(idOrFilename)) {
      const files = await bucket.find({ _id: new ObjectId(idOrFilename) }).toArray();
      if (!files || files.length === 0) return new NextResponse("File not found", { status: 404 });
      actualFileName = files[0].filename;
      downloadStream = bucket.openDownloadStream(new ObjectId(idOrFilename));
    } else {
      // Add .pdf if not included (optional)
      if (!idOrFilename.includes(".")) idOrFilename += ".pdf";

      const files = await bucket
        .find({ filename: { $regex: `^${idOrFilename}$`, $options: "i" } })
        .toArray();

      if (!files || files.length === 0) return new NextResponse("File not found", { status: 404 });
      actualFileName = files[0].filename;
      downloadStream = bucket.openDownloadStreamByName(actualFileName);
    }

    const { readable, writable } = new TransformStream();
    const writer = writable.getWriter();

    downloadStream.on("data", (chunk: Buffer) => writer.write(chunk));
    downloadStream.on("error", (err: Error) => {
      console.error("Download error:", err);
      writer.close();
    });
    downloadStream.on("end", () => writer.close());

    return new NextResponse(readable, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${actualFileName}"`,
      },
    });
  } catch (error) {
    console.error("CV download error:", error);
    return new NextResponse("File not found", { status: 404 });
  }
}
