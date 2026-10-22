import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import SiteContent from "@/models/SiteContent";
import { defaultContent } from "@/lib/defaultContent";
import { getSiteContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export async function GET() {
  const content = await getSiteContent();
  return NextResponse.json({ success: true, content });
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json(
        { success: false, message: "Invalid content payload." },
        { status: 400 }
      );
    }

    await connectDB();
    await SiteContent.findOneAndUpdate(
      { key: "site" },
      { $set: { data: body, updatedAt: new Date() } },
      { upsert: true, new: true }
    );

    return NextResponse.json({ success: true, content: body });
  } catch (error) {
    console.error("Unable to save content:", error);
    return NextResponse.json(
      { success: false, message: "Unable to save content." },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    await connectDB();
    await SiteContent.deleteOne({ key: "site" });
    return NextResponse.json({ success: true, content: defaultContent });
  } catch (error) {
    console.error("Unable to reset content:", error);
    return NextResponse.json(
      { success: false, message: "Unable to reset content." },
      { status: 500 }
    );
  }
}
