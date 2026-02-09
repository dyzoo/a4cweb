'use client';

import { useState } from 'react';

export default function StickyMarquee() {
  const [isVisible, setIsVisible] = useState(true);

  const announcement =
    "Urgent: School supplies needed for upcoming academic year - Your support can make a difference!";

  if (!isVisible) return null;

  return (
    <div className="fixed top-16 left-0 w-full z-40 bg-gradient-to-r from-orange-700 to-orange-600">

      {/* Progress bar */}
      <div className="h-1 w-full bg-gray-200">
        <div className="h-full bg-blue-700 animate-progress"></div>
      </div>

      {/* Main row — locked height */}
      <div className="flex items-center justify-between px-3 h-10 overflow-hidden">
        
        {/* Live indicator */}
        <div className="flex items-center">
          <div className="w-2 h-2 bg-white rounded-full animate-ping mr-2"></div>
          <span className="text-white text-xs font-bold uppercase tracking-wider">UPDATES</span>
        </div>

        {/* Scrolling text */}
        <div className="flex-1 overflow-hidden mx-3">
          <div className="animate-scroll whitespace-nowrap text-white text-sm font-medium flex">
            <span className="px-4">{announcement}</span>
            <span className="px-4">{announcement}</span>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={() => setIsVisible(false)}
          className="text-white p-1 hover:bg-white/20 rounded-full transition"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes progress {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }

        .animate-scroll {
          animation: scroll 35s linear infinite;
        }

        .animate-progress {
          animation: progress 35s linear infinite;
        }
      `}</style>
    </div>
  );
}
