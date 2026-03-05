// components/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/app/providers/ThemeProvider";
import { Sun, Moon, Menu, X } from "lucide-react";

import { Button } from "./ui/button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname() || "";
  
  // Use theme hook directly - it will always be available now
  const { darkMode, toggleDarkMode } = useTheme();

  // Handle hydration - wait for client mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const isActive = (path: string) =>
    pathname === path
      ? "text-primary dark:text-primary-400 font-semibold border-b-2 border-primary dark:border-primary-400"
      : "text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-400 transition-colors duration-200";

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Don't render theme-dependent elements until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <nav className="sticky top-0 z-50 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/A4C_Logo.svg"
                alt="Aid 4 Children Tanzania Logo"
                width={48}
                height={48}
                priority
              />
              <span className="text-xl font-bold text-primary">
                Aid 4 Children Tanzania
              </span>
            </Link>
            <div className="w-20 h-8"></div> {/* Placeholder for theme toggle */}
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm shadow-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group" onClick={closeMenu}>
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
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
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

          {/* Mobile Menu Controls - Only menu button */}
          <div className="md:hidden">
            <button
              type="button"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              onClick={toggleMenu}
              className={`
                p-2 rounded-md transition-all duration-200
                ${darkMode 
                  ? 'text-gray-300 hover:text-primary-400 hover:bg-neutral-800' 
                  : 'text-gray-700 hover:text-primary hover:bg-gray-100'
                }
                focus:outline-none focus:ring-2 focus:ring-primary/50
              `}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu with Overlay */}
      <>
        {/* Backdrop overlay when menu is open */}
        {isOpen && (
          <div 
            className="fixed inset-0 bg-black/50 dark:bg-black/70 z-40 md:hidden"
            onClick={closeMenu}
            aria-hidden="true"
          />
        )}
        
        {/* Mobile Menu */}
        <div 
          className={`
            fixed top-16 left-0 right-0 z-50 md:hidden
            transform transition-all duration-300 ease-in-out
            ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}
          `}
        >
          <div className="bg-white dark:bg-neutral-900 border-t border-gray-200 dark:border-neutral-800 shadow-xl max-h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="px-4 py-4 space-y-1">
              <Link 
                href="/" 
                onClick={closeMenu} 
                className={`
                  block px-4 py-3 rounded-lg text-base transition-all duration-200
                  ${pathname === "/" 
                    ? 'bg-primary/10 dark:bg-primary-400/10 text-primary dark:text-primary-400 font-semibold' 
                    : darkMode
                      ? 'text-gray-300 hover:bg-neutral-800 hover:text-primary-400'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-primary'
                  }
                `}
              >
                Home
              </Link>

              <Link 
                href="/projects" 
                onClick={closeMenu} 
                className={`
                  block px-4 py-3 rounded-lg text-base transition-all duration-200
                  ${pathname === "/projects" 
                    ? 'bg-primary/10 dark:bg-primary-400/10 text-primary dark:text-primary-400 font-semibold' 
                    : darkMode
                      ? 'text-gray-300 hover:bg-neutral-800 hover:text-primary-400'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-primary'
                  }
                `}
              >
                Projects
              </Link>

              <Link 
                href="/about" 
                onClick={closeMenu} 
                className={`
                  block px-4 py-3 rounded-lg text-base transition-all duration-200
                  ${pathname === "/about" 
                    ? 'bg-primary/10 dark:bg-primary-400/10 text-primary dark:text-primary-400 font-semibold' 
                    : darkMode
                      ? 'text-gray-300 hover:bg-neutral-800 hover:text-primary-400'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-primary'
                  }
                `}
              >
                About Us
              </Link>

              <Link 
                href="/contact" 
                onClick={closeMenu} 
                className={`
                  block px-4 py-3 rounded-lg text-base transition-all duration-200
                  ${pathname === "/contact" 
                    ? 'bg-primary/10 dark:bg-primary-400/10 text-primary dark:text-primary-400 font-semibold' 
                    : darkMode
                      ? 'text-gray-300 hover:bg-neutral-800 hover:text-primary-400'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-primary'
                  }
                `}
              >
                Contact Us
              </Link>

              <div className="pt-4 space-y-3 border-t border-gray-200 dark:border-neutral-800 mt-4">
                <Link href="/donate" onClick={closeMenu} className="block">
                  <Button 
                    className={`
                      w-full transition-all duration-300 hover:scale-[1.02]
                      ${darkMode 
                        ? 'bg-primary-600 hover:bg-primary-700 text-white' 
                        : 'bg-primary hover:bg-primary-600 text-white'
                      }
                    `}
                  >
                    Donate
                  </Button>
                </Link>

                <Link href="/become-volunteer" onClick={closeMenu} className="block">
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
        </div>
      </>
    </nav>
  );
}