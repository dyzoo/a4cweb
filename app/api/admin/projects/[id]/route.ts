import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Project from "@/models/project.js";
import { getAdminSession } from "@/lib/auth";

function makeSlug(value: string) {
  if (!value) return "";
  return String(value)
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

    const updates: Record<string, unknown> = {};
    const bodyData = body && typeof body === "object" ? body : {};

    const allowedFields = [
      "title",
      "subtitle",
      "slug",
      "category",
      "status",
      "description",
      "longDescription",
      "overview",
      "background",
      "image",
      "imageUrl",
      "location",
      "duration",
      "beneficiaries",
      "ageRange",
      "fundingProgress",
      "objectives",
      "curriculum",
      "impact",
      "supportServices",
      "featured",
      "published",
      "technologies",
      "githubUrl",
      "liveUrl",
    ];

    for (const field of allowedFields) {
      if (field in bodyData) {
        updates[field] = (bodyData as any)[field];
      }
    }

    if (updates.title) updates.title = String(updates.title).trim();
    if (updates.slug || updates.title) {
      const slugSource = updates.slug || updates.title;
      const slug = makeSlug(String(slugSource));
      if (slug) {
        const duplicate = await Project.findOne({ slug, _id: { $ne: id } });
        if (duplicate) {
          return NextResponse.json(
            { success: false, message: "A project with this slug already exists." },
            { status: 409 }
          );
        }
        updates.slug = slug;
      }
    }

    try {
      Object.assign(project, updates);
    } catch (e) {
      // ignore
    }
    try {
      project.updatedAt = new Date();
    } catch (e) {
      // ignore
    }
    try {
      await project.save({ validateBeforeSave: false });
    } catch (e: any) {
      // try updateOne as fallback
      await Project.updateOne({ _id: id }, { $set: { ...updates, updatedAt: new Date() } });
      const refreshed = await Project.findById(id);
      return NextResponse.json({ success: true, project: refreshed });
    }

    return NextResponse.json({ success: true, project });
  } catch (error: any) {
    console.error("Unable to update project:", error);
    return NextResponse.json(
      { success: false, message: error?.message || "Unable to update project." },
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
