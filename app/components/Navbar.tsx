"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { useState } from "react";
import { Button } from "./ui/button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname() ?? "";

  const isActive = (path: string) =>
    pathname === path
      ? "text-primary font-semibold border-b-2 border-primary"
      : "text-gray-700 hover:text-primary";

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/A4C_Logo.svg"
              alt="Aid 4 Children Tanzania Logo"
              width={48}
              height={48}
              priority
              className="mr-3"
            />
            <span className="text-xl font-bold text-primary">
              Aid 4 Children Tanzania
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/" className={`px-3 py-2 text-sm font-medium transition ${isActive("/")}`}>
              Home
            </Link>

            <Link href="/projects" className={`px-3 py-2 text-sm font-medium transition ${isActive("/projects")}`}>
              Projects
            </Link>

            <Link href="/about" className={`px-3 py-2 text-sm font-medium transition ${isActive("/about")}`}>
              About Us
            </Link>

            <Link href="/contact" className={`px-3 py-2 text-sm font-medium transition ${isActive("/contact")}`}>
              Contact Us
            </Link>

            <Link href="/donate">
              <Button size="sm" className="ml-4">
                Donate
              </Button>
            </Link>

            <Link href="/BecomeVolunteer">
              <Button variant="outline" size="sm">
                Become a Volunteer
              </Button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button
              type="button"
              aria-label="Toggle menu"
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-700 hover:text-primary focus:outline-none"
            >
              {!isOpen ? (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-50">

          <Link href="/" onClick={closeMenu} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100">
            Home
          </Link>

          <Link href="/projects" onClick={closeMenu} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100">
            Projects
          </Link>

          <Link href="/about" onClick={closeMenu} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100">
            About Us
          </Link>

          <Link href="/contact" onClick={closeMenu} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100">
            Contact Us
          </Link>

          <div className="pt-3 space-y-2">
            <Link href="/donate" onClick={closeMenu}>
              <Button className="w-full">Donate</Button>
            </Link>

            <Link href="/BecomeVolunteer" onClick={closeMenu}>
              <Button variant="outline" className="w-full">
                Become a Volunteer
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
}
