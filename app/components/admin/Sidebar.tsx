"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  FileEdit,
  FolderKanban,
  Globe,
  Image as ImageIcon,
  LayoutDashboard,
  LogOut,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";
import type { AdminSession } from "@/lib/auth";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/admin" },
  { name: "Site Content", icon: FileEdit, path: "/admin/content" },
  { name: "Projects", icon: FolderKanban, path: "/admin/projects" },
  { name: "Volunteer Applications", icon: Users, path: "/admin/volunteers" },
  { name: "Media & Brochure", icon: ImageIcon, path: "/admin/media" },
  { name: "Admin Users", icon: ShieldCheck, path: "/admin/users" },
];

const roleLabels: Record<string, string> = {
  super_admin: "Super Administrator",
  admin: "Administrator",
  editor: "Editor",
};

export default function Sidebar({
  user,
  open,
  onClose,
}: {
  user: AdminSession | null;
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const signOut = async () => {
    await fetch("/api/auth/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <>
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-primary-900 text-white transition-transform duration-300 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-5">
          <Link href="/admin" className="flex items-center gap-3">
            <span className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white">
              <Image
                src="/A4C logo2.png"
                alt="A4C"
                fill
                sizes="40px"
                className="object-contain p-1"
              />
            </span>
            <span>
              <span className="block font-display text-base font-bold leading-tight">
                A4C Admin
              </span>
              <span className="block text-[10px] uppercase tracking-[0.2em] text-white/50">
                Control panel
              </span>
            </span>
          </Link>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-white/60 hover:bg-white/10 hover:text-white lg:hidden"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-5">
          <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
            Manage
          </p>
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.path === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.path);

              return (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-accent text-white shadow-lg shadow-accent/20"
                        : "text-white/70 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <Icon className="h-[18px] w-[18px]" />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          <p className="px-3 pb-2 pt-6 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
            Shortcuts
          </p>
          <ul className="space-y-1">
            <li>
              <Link
                href="/"
                target="_blank"
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              >
                <Globe className="h-[18px] w-[18px]" />
                View website
              </Link>
            </li>
            <li>
              <button
                onClick={signOut}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/70 transition-colors hover:bg-red-500/15 hover:text-red-300"
              >
                <LogOut className="h-[18px] w-[18px]" />
                Sign out
              </button>
            </li>
          </ul>
        </nav>

        <div className="border-t border-white/10 p-4">
          <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">
              {(user?.name || user?.email || "A").charAt(0).toUpperCase()}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">
                {user?.name || "Administrator"}
              </p>
              <p className="truncate text-[11px] text-white/50">
                {roleLabels[user?.role || "admin"] || "Administrator"}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
