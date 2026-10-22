import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";
import { ADMIN_COOKIE, JWT_SECRET } from "./jwt";

export type AdminSession = {
  userId: string;
  email: string;
  name: string;
  role: "super_admin" | "admin" | "editor";
};

/**
 * Returns the decoded admin session from the httpOnly cookie, or null.
 * Safe to call from server components and route handlers.
 */
export async function getAdminSession(): Promise<AdminSession | null> {
  try {
    const store = await cookies();
    const token = store.get(ADMIN_COOKIE)?.value;
    if (!token) return null;
    const payload = verify(token, JWT_SECRET) as AdminSession;
    if (!payload?.userId) return null;
    return payload;
  } catch {
    return null;
  }
}

export async function isAdmin(): Promise<boolean> {
  return (await getAdminSession()) !== null;
}
