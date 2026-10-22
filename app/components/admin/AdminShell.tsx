"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";
import type { AdminSession } from "@/lib/auth";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AdminShell({
  user,
  children,
}: {
  user: AdminSession | null;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isLogin = pathname === "/admin/login";

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  if (isLogin) {
    return (
      <>
        <Toaster position="top-center" />
        {children}
      </>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Toaster position="top-center" />
      <Sidebar
        user={user}
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      <div className="lg:pl-72">
        <Header user={user} onMenu={() => setMobileOpen(true)} />
        <main className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
