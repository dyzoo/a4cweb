// components/Navbar.tsx
"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/app/providers/ThemeProvider";
import { Sun, Moon } from "lucide-react";

import { Button } from "./ui/button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useTheme();
  const pathname = usePathname() || "";

  const isActive = (path: string) =>
    pathname === path
      ? "text-primary font-semibold border-b-2 border-primary"
      : "text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors duration-200";

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm shadow-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/A4C_Logo.svg"
                alt="Aid 4 Children Tanzania Logo"
                width={48}
                height={48}
                priority
                className="transition-all duration-300"
              />
            </div>
            <span className="text-xl font-bold text-primary dark:text-primary-400 transition-colors duration-300">
              Aid 4 Children Tanzania
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/" className={`px-3 py-2 text-sm transition-all duration-200 ${isActive("/")}`}>
              Home
            </Link>

            <Link href="/projects" className={`px-3 py-2 text-sm transition-all duration-200 ${isActive("/projects")}`}>
              Projects
            </Link>

            <Link href="/about" className={`px-3 py-2 text-sm transition-all duration-200 ${isActive("/about")}`}>
              About Us
            </Link>

            <Link href="/contact" className={`px-3 py-2 text-sm transition-all duration-200 ${isActive("/contact")}`}>
              Contact Us
            </Link>

            <Link href="/donate" className={`px-3 py-2 text-sm transition-all duration-200 ${isActive("/donate")}`}>
              Donate
            </Link>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleDarkMode}
              className={`
                p-2 rounded-full transition-all duration-300
                hover:scale-110 active:scale-95
                focus:outline-none focus:ring-2 focus:ring-primary/50
                ${darkMode 
                  ? 'bg-neutral-800 text-yellow-400 hover:bg-neutral-700 border border-neutral-700' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                }
              `}
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>

            <Link href="/become-volunteer">
              <Button 
                variant="outline" 
                size="sm" 
                className={`
                  cursor-pointer transition-all duration-300 hover:scale-105
                  ${darkMode 
                    ? 'border-primary-400 text-primary-400 hover:bg-primary-400/10' 
                    : 'border-primary text-primary hover:bg-primary/10'
                  }
                `}
              >
                Become a Volunteer
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Controls */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`
                p-2 rounded-full transition-all duration-300
                hover:scale-110 active:scale-95
                ${darkMode 
                  ? 'bg-neutral-800 text-yellow-400' 
                  : 'bg-gray-100 text-gray-700'
                }
              `}
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              aria-label="Toggle menu"
              onClick={toggleMenu}
              className={`
                p-2 rounded-md transition-all duration-200
                ${darkMode 
                  ? 'text-gray-300 hover:text-primary hover:bg-neutral-800' 
                  : 'text-gray-700 hover:text-primary hover:bg-gray-100'
                }
                focus:outline-none focus:ring-2 focus:ring-primary/50
              `}
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

      {/* Mobile Menu with Animation */}
      <div 
        className={`
          md:hidden overflow-hidden transition-all duration-300 ease-in-out
          ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-50 dark:bg-neutral-800 border-t border-gray-200 dark:border-neutral-700">
          <Link 
            href="/" 
            onClick={closeMenu} 
            className={`
              block px-3 py-2 rounded-md text-base transition-all duration-200
              ${pathname === "/" 
                ? 'bg-primary/10 text-primary font-semibold' 
                : darkMode
                  ? 'text-gray-300 hover:bg-neutral-700'
                  : 'text-gray-700 hover:bg-gray-200'
              }
            `}
          >
            Home
          </Link>

          <Link 
            href="/projects" 
            onClick={closeMenu} 
            className={`
              block px-3 py-2 rounded-md text-base transition-all duration-200
              ${pathname === "/projects" 
                ? 'bg-primary/10 text-primary font-semibold' 
                : darkMode
                  ? 'text-gray-300 hover:bg-neutral-700'
                  : 'text-gray-700 hover:bg-gray-200'
              }
            `}
          >
            Projects
          </Link>

          <Link 
            href="/about" 
            onClick={closeMenu} 
            className={`
              block px-3 py-2 rounded-md text-base transition-all duration-200
              ${pathname === "/about" 
                ? 'bg-primary/10 text-primary font-semibold' 
                : darkMode
                  ? 'text-gray-300 hover:bg-neutral-700'
                  : 'text-gray-700 hover:bg-gray-200'
              }
            `}
          >
            About Us
          </Link>

          <Link 
            href="/contact" 
            onClick={closeMenu} 
            className={`
              block px-3 py-2 rounded-md text-base transition-all duration-200
              ${pathname === "/contact" 
                ? 'bg-primary/10 text-primary font-semibold' 
                : darkMode
                  ? 'text-gray-300 hover:bg-neutral-700'
                  : 'text-gray-700 hover:bg-gray-200'
              }
            `}
          >
            Contact Us
          </Link>

          <div className="pt-3 space-y-2">
            <Link href="/donate" onClick={closeMenu}>
              <Button 
                className={`
                  w-full transition-all duration-300 hover:scale-[1.02]
                  ${darkMode ? 'bg-primary-600 hover:bg-primary-700' : ''}
                `}
              >
                Donate
              </Button>
            </Link>

            <Link href="/become-volunteer" onClick={closeMenu}>
              <Button 
                variant="outline" 
                className={`
                  w-full cursor-pointer transition-all duration-300 hover:scale-[1.02]
                  ${darkMode 
                    ? 'border-primary-400 text-primary-400 hover:bg-primary-400/10' 
                    : 'border-primary text-primary hover:bg-primary/10'
                  }
                `}
              >
                Become a Volunteer
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}