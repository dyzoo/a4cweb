import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../../lib/mongodb";
import Brochure from "@/models/Brochure";


export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json({ error: "Only PDF files are allowed" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Replace the existing brochure (only one brochure at a time)
    await Brochure.deleteMany({});

    const brochure = await Brochure.create({
      name: file.name,
      mimeType: file.type,
      size: file.size,
      data: buffer,
    });

    return NextResponse.json(
      { message: "Brochure uploaded successfully", id: brochure._id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}