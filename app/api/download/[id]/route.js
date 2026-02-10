import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function GET(request, { params }) {
  const fileId = params.id;

  try {
    const filePath = path.join(
      process.cwd(),
      "public",
      `${fileId}.pdf`
    );

    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: "File not found" },
        { status: 404 }
      );
    }

    const fileBuffer = fs.readFileSync(filePath);

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${fileId}.pdf"`,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
