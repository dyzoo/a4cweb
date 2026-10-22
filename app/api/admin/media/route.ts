import { NextResponse } from "next/server";
import { readdir, stat, unlink } from "fs/promises";
import path from "path";
import { getAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

const IMAGE_TYPES = /\.(jpe?g|png|webp|gif)$/i;

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    let files: string[] = [];
    try {
      files = await readdir(uploadDir);
    } catch {
      files = [];
    }

    const images = await Promise.all(
      files
        .filter((file) => IMAGE_TYPES.test(file))
        .map(async (file) => {
          const info = await stat(path.join(uploadDir, file));
          return {
            name: file,
            url: `/uploads/${file}`,
            size: info.size,
            uploadedAt: info.mtime.toISOString(),
          };
        })
    );

    images.sort((a, b) => b.uploadedAt.localeCompare(a.uploadedAt));

    return NextResponse.json({ success: true, images });
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
    const name = searchParams.get("name");
    if (!name) {
      return NextResponse.json(
        { success: false, message: "File name is required." },
        { status: 400 }
      );
    }

    const safeName = path.basename(name);
    const filePath = path.join(process.cwd(), "public", "uploads", safeName);
    await unlink(filePath);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Unable to delete media:", error);
    return NextResponse.json(
      { success: false, message: "Unable to delete file." },
      { status: 500 }
    );
  }
}
