// components/ThemeToggle.tsx
'use client'

import { useTheme } from '@/app/providers/ThemeProvider';
import { Sun, Moon } from 'lucide-react'; // Use lucide-react since you were using it before
import { useState, useEffect } from 'react';

// If you don't have ComputerDesktopIcon from lucide-react, use this alternative
// Or install: npm install @heroicons/react

export default function ThemeToggle() {
  const { darkMode, toggleDarkMode, resetToSystem } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-24 h-9"></div>; // Placeholder
  }

  return (
    <div className="flex items-center space-x-1 bg-white dark:bg-gray-800 rounded-full p-1 shadow-md">
      {/* Light mode button */}
      <button
        onClick={() => {
          if (darkMode) toggleDarkMode();
        }}
        className={`
          p-2 rounded-full transition-all duration-300
          hover:scale-110 active:scale-95
          ${!darkMode 
            ? 'bg-orange-100 text-orange-600' 
            : 'text-gray-500 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400'
          }
        `}
        aria-label="Light mode"
      >
        <Sun className="w-4 h-4" />
      </button>

      {/* System preference button - using text instead of icon temporarily */}
      <button
        onClick={resetToSystem}
        className={`
          px-2 py-1 rounded-full text-xs font-medium transition-all duration-300
          hover:scale-110 active:scale-95
          text-gray-500 dark:text-gray-400
          hover:text-blue-600 dark:hover:text-blue-400
        `}
        aria-label="Follow system theme"
      >
        Auto
      </button>

      {/* Dark mode button */}
      <button
        onClick={() => {
          if (!darkMode) toggleDarkMode();
        }}
        className={`
          p-2 rounded-full transition-all duration-300
          hover:scale-110 active:scale-95
          ${darkMode 
            ? 'bg-gray-700 text-yellow-400' 
            : 'text-gray-500 dark:text-gray-400 hover:text-yellow-600 dark:hover:text-yellow-400'
          }
        `}
        aria-label="Dark mode"
      >
        <Moon className="w-4 h-4" />
      </button>
    </div>
  );
}