"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Mail, Menu, Moon, Phone, Sun, X } from "lucide-react";
import { useTheme } from "@/app/providers/ThemeProvider";
import { useContent } from "./ContentProvider";
import { Button } from "./ui/button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname() || "";
  const { darkMode, toggleDarkMode } = useTheme();
  const { site, nav } = useContent();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50">
      {/* Utility bar */}
      <div className="hidden md:block bg-primary text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-[11px] tracking-wide lg:px-8">
          <div className="flex items-center gap-6 text-white/75">
            <a
              href={`tel:${site.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-2 transition-colors hover:text-white"
            >
              <Phone className="h-3.5 w-3.5 text-accent-400" />
              {site.phone}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="flex items-center gap-2 transition-colors hover:text-white"
            >
              <Mail className="h-3.5 w-3.5 text-accent-400" />
              {site.email}
            </a>
          </div>
          <p className="text-white/70">{site.tagline}</p>
        </div>
      </div>

      {/* Main navigation */}
      <nav
        className={`border-b bg-white/95 backdrop-blur-md transition-shadow duration-300 dark:bg-primary-900/95 ${
          scrolled
            ? "border-transparent shadow-[0_10px_30px_-20px_rgba(11,37,69,0.45)]"
            : "border-gray-200/70 dark:border-white/10"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="group flex items-center gap-3">
            <span className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-primary-50 ring-1 ring-primary/10 transition-transform duration-300 group-hover:scale-105 dark:bg-white/10 dark:ring-white/10">
              <Image
                src={site.logo}
                alt={`${site.name} logo`}
                width={40}
                height={40}
                priority
                className="h-9 w-9 object-contain"
              />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="font-display text-lg font-bold text-primary dark:text-white sm:text-xl">
                {site.name}
              </span>
              <span className="hidden text-[10px] font-semibold uppercase tracking-[0.2em] text-accent-600 sm:block">
                Hope • Education • Dignity
              </span>
            </span>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {nav.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  isActive(link.href)
                    ? "text-primary dark:text-white"
                    : "text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-white"
                }`}
              >
                {link.label}
                <span
                  className={`absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-accent transition-transform duration-300 ${
                    isActive(link.href) ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={toggleDarkMode}
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              className="hidden h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition-all duration-300 hover:border-primary/30 hover:text-primary sm:flex dark:border-white/15 dark:text-gray-300 dark:hover:text-white"
            >
              {mounted && darkMode ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>

            <Link href={nav.donateLabel ? "/donate" : "/donate"} className="hidden sm:block">
              <Button variant="accent" size="sm" className="px-5">
                <Heart className="h-4 w-4" />
                {nav.donateLabel}
              </Button>
            </Link>

            <Link href="/become-volunteer" className="hidden xl:block">
              <Button variant="outline" size="sm">
                {nav.volunteerLabel}
              </Button>
            </Link>

            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-primary transition-colors hover:bg-primary-50 lg:hidden dark:border-white/15 dark:text-white dark:hover:bg-white/10"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.button
              key="backdrop"
              aria-label="Close menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 top-20 z-40 bg-primary-900/40 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              key="panel"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="fixed inset-x-0 top-20 z-50 max-h-[calc(100vh-5rem)] overflow-y-auto border-b border-gray-200 bg-white p-5 shadow-2xl lg:hidden dark:border-white/10 dark:bg-primary-900"
            >
              <div className="space-y-1">
                {nav.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                      isActive(link.href)
                        ? "bg-primary-50 text-primary dark:bg-white/10 dark:text-white"
                        : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-white/5"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="mt-4 grid gap-3 border-t border-gray-100 pt-4 dark:border-white/10">
                <Link href="/donate" onClick={() => setIsOpen(false)}>
                  <Button variant="accent" className="w-full">
                    <Heart className="h-4 w-4" /> {nav.donateLabel}
                  </Button>
                </Link>
                <Link href="/become-volunteer" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full">
                    {nav.volunteerLabel}
                  </Button>
                </Link>
                <button
                  onClick={toggleDarkMode}
                  className="mt-1 flex items-center justify-center gap-2 rounded-full border border-gray-200 py-2.5 text-sm text-gray-600 dark:border-white/15 dark:text-gray-300"
                >
                  {mounted && darkMode ? (
                    <>
                      <Sun className="h-4 w-4" /> Light mode
                    </>
                  ) : (
                    <>
                      <Moon className="h-4 w-4" /> Dark mode
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
