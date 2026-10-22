import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb";
import AdminUser from "@/models/AdminUser";
import { getAdminSession } from "@/lib/auth";

const ROLES = ["super_admin", "admin", "editor"];

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }
  if (session.role !== "super_admin") {
    return NextResponse.json(
      { success: false, message: "Only super admins can update accounts." },
      { status: 403 }
    );
  }

  try {
    const { id } = await params;
    const { name, role, isActive, password } = await request.json();

    await connectDB();
    const user = await AdminUser.findById(id);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Account not found." },
        { status: 404 }
      );
    }

    if (role && !ROLES.includes(role)) {
      return NextResponse.json(
        { success: false, message: "Invalid role." },
        { status: 400 }
      );
    }

    if (
      user._id.toString() === session.userId &&
      ((role && role !== "super_admin") || isActive === false)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "You cannot remove your own super admin access.",
        },
        { status: 400 }
      );
    }

    if (name) user.name = String(name).trim();
    if (role) user.role = role;
    if (typeof isActive === "boolean") user.isActive = isActive;
    if (password) {
      if (String(password).length < 8) {
        return NextResponse.json(
          { success: false, message: "Password must be at least 8 characters." },
          { status: 400 }
        );
      }
      user.passwordHash = await bcrypt.hash(String(password), 10);
    }

    await user.save();

    return NextResponse.json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
      },
    });
  } catch (error) {
    console.error("Unable to update admin user:", error);
    return NextResponse.json(
      { success: false, message: "Unable to update account." },
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
  if (session.role !== "super_admin") {
    return NextResponse.json(
      { success: false, message: "Only super admins can delete accounts." },
      { status: 403 }
    );
  }

  try {
    const { id } = await params;
    if (id === session.userId) {
      return NextResponse.json(
        { success: false, message: "You cannot delete your own account." },
        { status: 400 }
      );
    }

    await connectDB();
    const user = await AdminUser.findById(id);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Account not found." },
        { status: 404 }
      );
    }

    if (user.role === "super_admin") {
      const superAdmins = await AdminUser.countDocuments({
        role: "super_admin",
        isActive: true,
      });
      if (superAdmins <= 1) {
        return NextResponse.json(
          { success: false, message: "The last super admin cannot be deleted." },
          { status: 400 }
        );
      }
    }

    await user.deleteOne();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Unable to delete admin user:", error);
    return NextResponse.json(
      { success: false, message: "Unable to delete account." },
      { status: 500 }
    );
  }
}
