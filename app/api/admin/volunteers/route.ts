import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/lib/mongodb";
import { getAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

async function getCollection() {
  await connectDB();
  const db = mongoose.connection.db;
  if (!db) throw new Error("Database connection is not ready");
  return db.collection("volunteer_applications");
}

export async function GET(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const search = searchParams.get("q")?.trim();

    const filter: Record<string, unknown> = {};
    if (status && status !== "all") filter.status = status;
    if (search) {
      filter.$or = [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    const collection = await getCollection();
    const applications = await collection
      .find(filter)
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({
      success: true,
      applications: applications.map((application) => ({
        ...application,
        _id: application._id.toString(),
        cvFileId: application.cvFileId ? application.cvFileId.toString() : null,
        createdAt: application.createdAt
          ? new Date(application.createdAt).toISOString()
          : null,
      })),
    });
  } catch (error) {
    console.error("Unable to load volunteer applications:", error);
    return NextResponse.json(
      { success: false, message: "Unable to load applications." },
      { status: 500 }
    );
  }
}
