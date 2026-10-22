"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, ExternalLink, LogOut, Menu, User } from "lucide-react";
import type { AdminSession } from "@/lib/auth";

const titles: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/content": "Site Content",
  "/admin/projects": "Projects",
  "/admin/volunteers": "Volunteer Applications",
  "/admin/media": "Media & Brochure",
  "/admin/users": "Admin Users",
};

const roleLabels: Record<string, string> = {
  super_admin: "Super Administrator",
  admin: "Administrator",
  editor: "Editor",
};

export default function Header({
  user,
  onMenu,
}: {
  user: AdminSession | null;
  onMenu: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const title =
    Object.entries(titles).find(([path]) =>
      path === "/admin" ? pathname === path : pathname.startsWith(path)
    )?.[1] || "Dashboard";

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const signOut = async () => {
    await fetch("/api/auth/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenu}
            className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50 lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div>
            <h1 className="font-display text-lg font-bold text-primary sm:text-xl">
              {title}
            </h1>
            <p className="hidden text-xs text-slate-500 sm:block">
              Manage your website content and applications
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/"
            target="_blank"
            className="hidden items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 transition-colors hover:border-primary hover:text-primary sm:flex"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            View site
          </Link>

          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setOpen((value) => !value)}
              className="flex items-center gap-2 rounded-full border border-slate-200 p-1 pr-2 transition-colors hover:bg-slate-50"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                {(user?.name || user?.email || "A").charAt(0).toUpperCase()}
              </span>
              <span className="hidden text-left md:block">
                <span className="block max-w-[140px] truncate text-xs font-semibold text-primary">
                  {user?.name || "Administrator"}
                </span>
                <span className="block text-[10px] text-slate-500">
                  {roleLabels[user?.role || "admin"]}
                </span>
              </span>
              <ChevronDown className="h-4 w-4 text-slate-400" />
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
                <div className="border-b border-slate-100 px-4 py-3">
                  <p className="truncate text-sm font-semibold text-primary">
                    {user?.name || "Administrator"}
                  </p>
                  <p className="truncate text-xs text-slate-500">{user?.email}</p>
                </div>
                <Link
                  href="/admin/users"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
                >
                  <User className="h-4 w-4" />
                  Account settings
                </Link>
                <Link
                  href="/"
                  target="_blank"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
                >
                  <ExternalLink className="h-4 w-4" />
                  Open website
                </Link>
                <button
                  onClick={signOut}
                  className="flex w-full items-center gap-2 border-t border-slate-100 px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
