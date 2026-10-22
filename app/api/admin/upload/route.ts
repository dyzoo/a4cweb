import { NextResponse } from "next/server";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
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
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, message: "Images must be smaller than 5 MB." },
        { status: 400 }
      );
    }

    const extension = EXTENSIONS[file.type] || "jpg";
    const filename = `${Date.now()}-${randomUUID().slice(0, 8)}.${extension}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });
    await writeFile(
      path.join(uploadDir, filename),
      Buffer.from(await file.arrayBuffer())
    );

    return NextResponse.json({
      success: true,
      url: `/uploads/${filename}`,
    });
  } catch (error) {
    console.error("Unable to upload image:", error);
    return NextResponse.json(
      { success: false, message: "Unable to upload image." },
      { status: 500 }
    );
  }
}
