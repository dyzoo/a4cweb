import { NextResponse } from "next/server";
import { sign } from "jsonwebtoken";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb";
import AdminUser from "@/models/AdminUser";
import { ADMIN_COOKIE, JWT_SECRET } from "@/lib/jwt";

const MAX_LOGIN_ATTEMPTS = 5;
const RATE_LIMIT_WINDOW = 15 * 60 * 1000;
const rateLimit = new Map<string, { attempts: number; lastAttempt: number }>();

async function ensureDefaultAdmin() {
  const count = await AdminUser.countDocuments();
  if (count > 0) return;

  const passwordHash = await bcrypt.hash("admin123", 10);
  await AdminUser.create({
    name: "Administrator",
    email: "admin@example.com",
    passwordHash,
    role: "super_admin",
    isActive: true,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, rememberMe } = body as {
      email?: string;
      password?: string;
      rememberMe?: boolean;
    };

    const ip = request.headers.get("x-forwarded-for") || "unknown";
    const now = Date.now();
    const rateData = rateLimit.get(ip) || { attempts: 0, lastAttempt: now };

    if (now - rateData.lastAttempt > RATE_LIMIT_WINDOW) {
      rateData.attempts = 0;
    }
    if (rateData.attempts >= MAX_LOGIN_ATTEMPTS) {
      return NextResponse.json(
        { success: false, message: "Too many login attempts. Please try again later." },
        { status: 429 }
      );
    }

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required." },
        { status: 400 }
      );
    }

    await connectDB();
    await ensureDefaultAdmin();

    const user = await AdminUser.findOne({
      email: String(email).toLowerCase().trim(),
      isActive: true,
    });

    if (!user) {
      rateData.attempts += 1;
      rateData.lastAttempt = now;
      rateLimit.set(ip, rateData);
      return NextResponse.json(
        { success: false, message: "Invalid email or password." },
        { status: 401 }
      );
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      rateData.attempts += 1;
      rateData.lastAttempt = now;
      rateLimit.set(ip, rateData);
      return NextResponse.json(
        { success: false, message: "Invalid email or password." },
        { status: 401 }
      );
    }

    rateLimit.delete(ip);
    user.lastLogin = new Date();
    await user.save();

    const session = {
      userId: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
    };

    const token = sign(session, JWT_SECRET, {
      expiresIn: rememberMe ? "30d" : "24h",
    });

    const store = await cookies();
    store.set(ADMIN_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60,
    });

    return NextResponse.json({ success: true, user: session });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, message: "An internal server error occurred." },
      { status: 500 }
    );
  }
}
