import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Project from "@/models/project";
import { getAdminSession } from "@/lib/auth";

function makeSlug(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const projects = await Project.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json({ success: true, projects });
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    if (!body?.title?.trim()) {
      return NextResponse.json(
        { success: false, message: "Project title is required." },
        { status: 400 }
      );
    }

    await connectDB();
    const slug = makeSlug(body.slug || body.title);

    const existing = await Project.findOne({ slug });
    if (existing) {
      return NextResponse.json(
        { success: false, message: "A project with this slug already exists." },
        { status: 409 }
      );
    }

    const project = await Project.create({
      ...body,
      title: body.title.trim(),
      slug,
      published: body.published !== false,
    });

    return NextResponse.json({ success: true, project });
  } catch (error: any) {
    console.error("Unable to create project:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          error?.code === 11000
            ? "A project with this slug already exists."
            : "Unable to create project.",
      },
      { status: 500 }
    );
  }
}
