import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/lib/mongodb";
import Project from "@/models/project";
import AdminUser from "@/models/AdminUser";
import SiteContent from "@/models/SiteContent";
import { getAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const db = mongoose.connection.db;
    if (!db) throw new Error("Database connection is not ready");

    const volunteers = db.collection("volunteer_applications");

    const [
      projectCount,
      activeProjects,
      volunteerCount,
      pendingVolunteers,
      adminCount,
      recentVolunteers,
      recentProjects,
      contentDoc,
    ] = await Promise.all([
      Project.countDocuments(),
      Project.countDocuments({ status: "Active" }),
      volunteers.countDocuments(),
      volunteers.countDocuments({ status: "pending" }),
      AdminUser.countDocuments(),
      volunteers.find({}).sort({ createdAt: -1 }).limit(5).toArray(),
      Project.find().sort({ createdAt: -1 }).limit(5).lean(),
      SiteContent.findOne({ key: "site" }).lean(),
    ]);

    return NextResponse.json({
      success: true,
      stats: {
        projects: projectCount,
        activeProjects,
        volunteers: volunteerCount,
        pendingVolunteers,
        admins: adminCount,
        contentUpdatedAt: contentDoc?.updatedAt || null,
      },
      recentVolunteers: recentVolunteers.map((application) => ({
        _id: application._id.toString(),
        firstName: application.firstName,
        lastName: application.lastName,
        email: application.email,
        status: application.status || "pending",
        createdAt: application.createdAt
          ? new Date(application.createdAt).toISOString()
          : null,
      })),
      recentProjects: JSON.parse(JSON.stringify(recentProjects)),
    });
  } catch (error) {
    console.error("Unable to load dashboard stats:", error);
    return NextResponse.json(
      { success: false, message: "Unable to load dashboard data." },
      { status: 500 }
    );
  }
}
