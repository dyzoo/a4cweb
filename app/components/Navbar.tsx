"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { Button } from "./ui/button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // FIXED: correct type for path
  const isActive = (path: string) =>
    pathname === path
      ? "text-primary font-semibold border-b-2 border-primary"
      : "text-gray-700 hover:text-primary";

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-md sticky top-10 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <img
                src="/A4C_Logo.svg"
                alt="Aid 4 Children Tanzania Logo"
                className="h-12 w-12 mr-3"
              />
              <span className="text-xl font-bold text-primary">
                Aid 4 Children Tanzania
              </span>
            </Link>
          </div>

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

            {/* FIXED BUTTONS (no asChild) */}
            <Link href="/donate">
              <Button variant="default" size="sm" className="ml-4">
                Donate
              </Button>
            </Link>

            <Link href="/BecomeVolunteer">
              <Button variant="outline" size="sm">
                Become a Volunteer
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary focus:outline-none"
            >
              {/* Menu icon */}
              <svg
                className={`h-6 w-6 ${isOpen ? "hidden" : "block"}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>

              {/* Close icon */}
              <svg
                className={`h-6 w-6 ${isOpen ? "block" : "hidden"}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50">
          
          <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100" onClick={toggleMenu}>
            Home
          </Link>

          <Link href="/projects" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100" onClick={toggleMenu}>
            Projects
          </Link>

          <Link href="/about" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100" onClick={toggleMenu}>
            About Us
          </Link>

          <Link href="/contact" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100" onClick={toggleMenu}>
            Contact Us
          </Link>

          <div className="pt-2 space-y-2">
            <Link href="/donate">
              <Button variant="default" className="w-full" onClick={toggleMenu}>
                Donate
              </Button>
            </Link>

            <Link href="/volunteer">
              <Button variant="outline" className="w-full" onClick={toggleMenu}>
                Become a Volunteer
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
}
