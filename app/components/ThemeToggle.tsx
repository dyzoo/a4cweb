// components/ThemeToggle.tsx
'use client'
import { useTheme } from '@/app/providers/ThemeProvider';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <button
      onClick={toggleDarkMode}
      className={`
        p-3 rounded-full shadow-lg transition-all duration-300
        ${darkMode 
          ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' 
          : 'bg-white text-gray-700 hover:bg-gray-100'
        }
      `}
    >
      {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
}