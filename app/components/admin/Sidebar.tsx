"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Home,
  Megaphone,
  FolderKanban,
  RefreshCw,
  Users,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/admin" },
  { name: "Real Story", icon: FileText, path: "/admin/real-story" },
  { name: "Home Projects", icon: Home, path: "/admin/home-projects" },
  { name: "A4C Updates", icon: Megaphone, path: "/admin/a4c-updates" },
  { name: "All Projects", icon: FolderKanban, path: "/admin/all-projects" },
  { name: "Projects Update", icon: RefreshCw, path: "/admin/projects-update" },
  { name: "Volunteers Requests", icon: Users, path: "/admin/volunteers" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-gray-900 text-white flex flex-col z-50">
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
        <p className="text-sm text-gray-400 mt-1">Management Dashboard</p>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;
            
            return (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-gray-800"
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.name}</span>
                  {item.name === "Volunteers Requests" && (
                    <span className="ml-auto bg-red-500 text-xs px-2 py-1 rounded-full">
                      3
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}