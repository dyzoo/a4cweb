"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function RouteChangeLoader() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true); // start visible on first load
  const [firstLoadDone, setFirstLoadDone] = useState(false);

  // 🔵 FIRST PAGE LOAD / REFRESH
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setFirstLoadDone(true);
    }, 1400); // loader duration on refresh

    return () => clearTimeout(timer);
  }, []);

  // 🟣 ROUTE CHANGE LOADER
  useEffect(() => {
    if (!firstLoadDone) return; // skip first load already handled

    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, [pathname, firstLoadDone]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(255,255,255,0.95)",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            position: "relative",
            width: 120,
            height: 120,
            margin: "0 auto",
          }}
        >
          <Image
            src="/A4C logo2.png"
            alt="Logo"
            fill
            style={{ objectFit: "contain" }}
            priority
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              border: "4px solid #2563EB",
              borderTopColor: "transparent",
              animation: "spin 1s linear infinite",
            }}
          />
        </div>
        <div style={{ marginTop: 12, fontWeight: 600, color: "#374151" }}>
          Loading…
        </div>
      </div>

      <style jsx global>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
