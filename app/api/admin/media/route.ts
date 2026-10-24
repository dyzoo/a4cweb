import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import connectDB from "@/lib/mongodb";
import Media from "@/models/Media";
import { getAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const images = await Media.find()
      .select("name mimeType size uploadedAt")
      .sort({ uploadedAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      images: images.map((image) => ({
        _id: image._id.toString(),
        name: image.name,
        url: `/api/media/${image._id.toString()}`,
        size: image.size,
        uploadedAt: image.uploadedAt
          ? new Date(image.uploadedAt).toISOString()
          : null,
      })),
    });
  } catch (error) {
    console.error("Unable to list media:", error);
    return NextResponse.json(
      { success: false, message: "Unable to list media." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const name = searchParams.get("name");

    if (!id && !name) {
      return NextResponse.json(
        { success: false, message: "File id or name is required." },
        { status: 400 }
      );
    }

    await connectDB();

    const filter = id && ObjectId.isValid(id) ? { _id: id } : { name };
    const deleted = await Media.findOneAndDelete(filter);

    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Image not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Unable to delete media:", error);
    return NextResponse.json(
      { success: false, message: "Unable to delete file." },
      { status: 500 }
    );
  }
}
