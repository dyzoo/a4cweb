import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Media from "@/models/Media";
import { getAdminSession } from "@/lib/auth";

const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const EXTENSIONS: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

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
    if (!ALLOWED.includes(file.type)) {
      return NextResponse.json(
        { success: false, message: "Please upload a JPG, PNG, WEBP or GIF image." },
        { status: 400 }
      );
    }
    if (file.size > 4 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, message: "Images must be smaller than 4 MB." },
        { status: 400 }
      );
    }

    const extension = EXTENSIONS[file.type] || "jpg";
    const baseName = file.name.replace(/\.[^.]+$/, "");
    const name = `${Date.now()}-${baseName}.${extension}`;

    await connectDB();
    const media = await Media.create({
      name,
      mimeType: file.type,
      size: file.size,
      data: Buffer.from(await file.arrayBuffer()),
    });

    return NextResponse.json({
      success: true,
      url: `/api/media/${media._id.toString()}`,
    });
  } catch (error) {
    console.error("Unable to upload image:", error);
    return NextResponse.json(
      { success: false, message: "Unable to upload image." },
      { status: 500 }
    );
  }
}
