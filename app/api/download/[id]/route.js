import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function GET(request, context) {
  const { params } = context; // ✅ No await here

  const fileId = params.id;

  try {
    const filePath = path.join(process.cwd(), "public", `${fileId}.pdf`);

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    // Read the file
    const fileBuffer = fs.readFileSync(filePath);

    // Return file download
    return new NextResponse(fileBuffer, {
      status: 200,
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
