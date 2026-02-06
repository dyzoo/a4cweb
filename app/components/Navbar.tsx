"use client";
import { usePathname } from "next/navigation";


import Link from "next/link";
import { useState } from "react";
import { Button } from "./ui/button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();

const isActive = (path:'') =>
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
          {/* Logo with text */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              {/* SVG Logo - Recommended size: 40x40px or 48x48px */}
              <img 
                src="/A4C_Logo.svg" 
                alt="Aid 4 Children Tanzania Logo"
                className="h-30 w-30 mr-3" // Adjust size here (h-10 = 40px, h-12 = 48px)
              />
              <span className="text-xl font-bold text-primary">
                Aid 4 Children Tanzania
              </span>
            </Link>
          </div>

          {/* Rest of your navbar code remains the same */}
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

  <Button asChild variant="default" size="sm" className="ml-4">
    <Link href="/donate">Donate</Link>
  </Button>

  <Button asChild variant="outline" size="sm">
    <Link href="/BecomeVolunteer">Become a Volunteer</Link>
  </Button>
</div>


          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary focus:outline-none"
            >
              <svg
                className={`h-6 w-6 ${isOpen ? "hidden" : "block"}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`h-6 w-6 ${isOpen ? "block" : "hidden"}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (unchanged) */}
      <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50">
          <Link
            href="/"
            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100"
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link
            href="/projects"
            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100"
            onClick={toggleMenu}
          >
            Projects
          </Link>
          <Link
            href="/about"
            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100"
            onClick={toggleMenu}
          >
            About Us
          </Link>
          <Link
            href="/contact"
            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100"
            onClick={toggleMenu}
          >
            Contact Us
          </Link>
          <div className="pt-2 space-y-2">
            <Button asChild variant="default" className="w-full">
              <Link href="/donate" onClick={toggleMenu}>
                Donate
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/volunteer" onClick={toggleMenu}>
                Become a Volunteer
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}