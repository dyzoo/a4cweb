import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Brochure from "@/models/Brochure";
import { getAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const brochure = await Brochure.findOne()
    .select("name mimeType size uploadedAt")
    .sort({ uploadedAt: -1 })
    .lean();

  return NextResponse.json({ success: true, brochure: brochure || null });
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, message: "No file provided." },
        { status: 400 }
      );
    }
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      return NextResponse.json(
        { success: false, message: "Only PDF files are allowed." },
        { status: 400 }
      );
    }
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, message: "The brochure must be smaller than 10 MB." },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    await connectDB();
    await Brochure.deleteMany({});
    const brochure = await Brochure.create({
      name: file.name,
      mimeType: "application/pdf",
      size: file.size,
      data: buffer,
    });

    return NextResponse.json({
      success: true,
      brochure: {
        _id: brochure._id,
        name: brochure.name,
        size: brochure.size,
        uploadedAt: brochure.uploadedAt,
      },
    });
  } catch (error) {
    console.error("Unable to upload brochure:", error);
    return NextResponse.json(
      { success: false, message: "Unable to upload brochure." },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  await Brochure.deleteMany({});
  return NextResponse.json({ success: true });
}
