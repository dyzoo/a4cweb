"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function RouteChangeLoader() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const [firstLoadDone, setFirstLoadDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setFirstLoadDone(true);
    }, 900);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!firstLoadDone) return;
    setVisible(true);
    const timer = setTimeout(() => setVisible(false), 650);
    return () => clearTimeout(timer);
  }, [pathname, firstLoadDone]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/95 backdrop-blur-sm dark:bg-primary-900/95">
      <div className="text-center">
        <div className="relative mx-auto h-24 w-24">
          <Image
            src="/A4C logo2.png"
            alt="Aid 4 Children Tanzania"
            fill
            style={{ objectFit: "contain" }}
            priority
          />
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-accent/30 border-t-accent" />
        </div>
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.25em] text-primary dark:text-white">
          Loading
        </p>
      </div>
    </div>
  );
}
