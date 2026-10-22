import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verify } from "jsonwebtoken";
import { ADMIN_COOKIE, JWT_SECRET } from "@/lib/jwt";

interface JWTPayload {
  userId: string;
  role: "super_admin" | "admin" | "editor";
  email: string;
  name?: string;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(ADMIN_COOKIE)?.value;

  const isValid = () => {
    if (!token) return false;
    try {
      verify(token, JWT_SECRET);
      return true;
    } catch {
      return false;
    }
  };

  // APIs: return JSON instead of redirecting.
  if (pathname.startsWith("/api/admin")) {
    if (!isValid()) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Please sign in." },
        { status: 401 }
      );
    }
    return NextResponse.next();
  }

  // Already signed in → skip login page.
  if (pathname === "/admin/login") {
    if (isValid()) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin")) {
    if (!token) {
      const url = new URL("/admin/login", request.url);
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }

    try {
      verify(token, JWT_SECRET);
      return NextResponse.next();
    } catch {
      const response = NextResponse.redirect(
        new URL("/admin/login", request.url)
      );
      response.cookies.delete(ADMIN_COOKIE);
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
