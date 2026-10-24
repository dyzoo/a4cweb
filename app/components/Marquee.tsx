"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Megaphone, X } from "lucide-react";
import { useContent } from "./ContentProvider";

export default function ScrollingTicker() {
  const { announcement } = useContent();
  const [visible, setVisible] = useState(true);

  if (!announcement.enabled || !visible) return null;

  return (
    <div className="relative z-30 overflow-hidden border-b border-accent-700/30 bg-primary text-white">
      <div className="h-0.5 w-full bg-white/10">
        <div className="h-full w-1/3 animate-progress-bar bg-accent" />
      </div>
      <div className="mx-auto flex h-11 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <span className="hidden shrink-0 items-center gap-2 rounded-full bg-accent/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-accent-400 sm:flex">
          <Megaphone className="h-3.5 w-3.5" />
          {announcement.label}
        </span>

        <div className="relative flex-1 overflow-hidden">
          <div className="flex w-max animate-scroll-x whitespace-nowrap">
            <span className="flex items-center gap-6 pr-8 text-sm text-white/85">
              {announcement.text}
              {announcement.linkHref && (
                <Link
                  href={announcement.linkHref}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-accent-400 hover:text-accent-400/80"
                >
                  {announcement.linkLabel}
                  <ArrowRight className="h-3 w-3" />
                </Link>
              )}
            </span>
            <span
              aria-hidden
              className="flex items-center gap-6 pr-8 text-sm text-white/85"
            >
              {announcement.text}
              {announcement.linkHref && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-accent-400">
                  {announcement.linkLabel}
                  <ArrowRight className="h-3 w-3" />
                </span>
              )}
            </span>
          </div>
        </div>

        <button
          onClick={() => setVisible(false)}
          aria-label="Dismiss announcement"
          className="shrink-0 rounded-full p-1.5 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
