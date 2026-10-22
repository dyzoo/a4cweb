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

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();

    await connectDB();
    const project = await Project.findById(id);
    if (!project) {
      return NextResponse.json(
        { success: false, message: "Project not found." },
        { status: 404 }
      );
    }

    const updates: Record<string, unknown> = { ...body };
    if (body.title) updates.title = String(body.title).trim();
    if (body.slug || body.title) {
      const slug = makeSlug(body.slug || body.title);
      const duplicate = await Project.findOne({ slug, _id: { $ne: id } });
      if (duplicate) {
        return NextResponse.json(
          { success: false, message: "A project with this slug already exists." },
          { status: 409 }
        );
      }
      updates.slug = slug;
    }

    Object.assign(project, updates);
    project.updatedAt = new Date();
    await project.save();

    return NextResponse.json({ success: true, project });
  } catch (error) {
    console.error("Unable to update project:", error);
    return NextResponse.json(
      { success: false, message: "Unable to update project." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    await connectDB();
    const deleted = await Project.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Project not found." },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Unable to delete project:", error);
    return NextResponse.json(
      { success: false, message: "Unable to delete project." },
      { status: 500 }
    );
  }
}
