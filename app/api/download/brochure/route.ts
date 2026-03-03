import { NextResponse } from "next/server";
import connectDB from "../../../../lib/mongodb";
import Brochure from "@/models/Brochure";

export async function GET() {
  try {
    await connectDB();

    // Fetch the latest uploaded brochure
    const brochure = await Brochure.findOne().sort({ uploadedAt: -1 });

    if (!brochure) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    return new NextResponse(brochure.data.buffer.slice(
      brochure.data.byteOffset,
      brochure.data.byteOffset + brochure.data.byteLength
    ) as ArrayBuffer, {
      status: 200,
      headers: {
        "Content-Type": brochure.mimeType,
        "Content-Disposition": `attachment; filename="${brochure.name}"`,
        "Content-Length": brochure.size.toString(),
      },
    });
  } catch (error) {
    console.error("Download error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
