import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb";
import AdminUser from "@/models/AdminUser";
import { getAdminSession } from "@/lib/auth";

const ROLES = ["super_admin", "admin", "editor"];

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const users = await AdminUser.find()
    .select("-passwordHash")
    .sort({ createdAt: -1 })
    .lean();

  return NextResponse.json({ success: true, users });
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }
  if (session.role !== "super_admin") {
    return NextResponse.json(
      { success: false, message: "Only super admins can create accounts." },
      { status: 403 }
    );
  }

  try {
    const { name, email, password, role } = await request.json();

    if (!name?.trim() || !email?.trim() || !password) {
      return NextResponse.json(
        { success: false, message: "Name, email and password are required." },
        { status: 400 }
      );
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid email address." },
        { status: 400 }
      );
    }
    if (String(password).length < 8) {
      return NextResponse.json(
        { success: false, message: "Password must be at least 8 characters." },
        { status: 400 }
      );
    }
    if (role && !ROLES.includes(role)) {
      return NextResponse.json(
        { success: false, message: "Invalid role." },
        { status: 400 }
      );
    }

    await connectDB();
    const existing = await AdminUser.findOne({
      email: String(email).toLowerCase().trim(),
    });
    if (existing) {
      return NextResponse.json(
        { success: false, message: "An account with this email already exists." },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(String(password), 10);
    const user = await AdminUser.create({
      name: String(name).trim(),
      email: String(email).toLowerCase().trim(),
      passwordHash,
      role: role || "admin",
      isActive: true,
    });

    return NextResponse.json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Unable to create admin user:", error);
    return NextResponse.json(
      { success: false, message: "Unable to create account." },
      { status: 500 }
    );
  }
}
