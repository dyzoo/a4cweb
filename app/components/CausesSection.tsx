// components/CausesSection.tsx
'use client'

import Link from 'next/link';
import { Button } from './ui/button';
import { useTheme } from "@/app/providers/ThemeProvider";

export default function CausesSection() {
  const { darkMode } = useTheme();
  
  const causes = [
    {
      id: 1,
      title: "Edumisha",
      description: "Providing school supplies and scholarships to underprivileged children.",
      image: "/Edumisha_img.jpg"
    },
    {
      id: 2,
      title: "FooDonation",
      description: "Building wells and water purification systems in drought-affected areas.",
      image: "/FooDonation.jpg"
    },
    {
      id: 3,
      title: "A4C Afya Programme",
      description: "Creating safe spaces and rehabilitation programs for the homeless.",
      image: "/A4CAfya.jpg",
      isStory: true,
      storyPath: "/stories/a4c-afya-story"
    }
  ];

  return (
    <section className={`
      min-h-screen w-full flex items-center justify-center py-20 transition-colors duration-300
      ${darkMode ? 'bg-gray-900' : 'bg-blue-950'}
    `}>
      <div className="container max-w-6xl px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Projects & Touching Stories
          </h2>
          <p className={`
            text-lg max-w-3xl mx-auto transition-colors
            ${darkMode ? 'text-gray-300' : 'text-white/90'}
          `}>
            Join us in supporting these critical initiatives that change lives every day.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {causes.map((cause) => {
            const isStoryCard = cause.isStory;
            
            return (
              <div 
                key={cause.id} 
                className={`
                  rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1
                  ${isStoryCard 
                    ? darkMode
                      ? 'bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-2 border-purple-500/50'
                      : 'bg-gradient-to-br from-orange-50 to-orange-50 border-2 border-orange-200'
                    : darkMode
                      ? 'bg-gray-800'
                      : 'bg-white'
                  }
                  ${darkMode ? 'text-gray-100' : 'text-black'}
                  relative group
                `}
              >
                {/* Flickering story badge */}
                {isStoryCard && (
                  <div className="absolute top-4 right-4 z-10">
                    <div className="relative">
                      {/* Glow effect */}
                      <div className={`
                        absolute -inset-1 rounded-full blur opacity-75 animate-pulse 
                        ${darkMode 
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600' 
                          : 'bg-gradient-to-r from-orange-800 to-orange-600'
                        }
                      `}></div>
                      
                      {/* Main badge */}
                      <div className={`
                        relative text-white text-xs font-bold px-3 py-1 rounded-full 
                        animate-[flicker_2s_ease-in-out_infinite]
                        ${darkMode 
                          ? 'bg-gradient-to-r from-purple-700 to-pink-700' 
                          : 'bg-gradient-to-r from-orange-800 to-orange-600'
                        }
                      `}>
                        Featured Story
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Image with overlay */}
                <div className="h-48 relative overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center hover:scale-105 transition-transform duration-500"
                    style={{ backgroundImage: `url(${cause.image})` }}
                  ></div>
                  
                  {/* Dark overlay for better text contrast */}
                  <div className={`
                    absolute inset-0 transition-opacity duration-300
                    ${darkMode ? 'bg-black/30' : 'bg-transparent'}
                  `}></div>
                  
                  {isStoryCard && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className={`
                    text-xl font-semibold mb-2 transition-colors
                    ${isStoryCard 
                      ? darkMode ? 'text-purple-300' : 'text-purple-800'
                      : darkMode ? 'text-white' : ''
                    }
                  `}>
                    {cause.title}
                  </h3>
                  
                  <p className={`
                    mb-6 transition-colors
                    ${darkMode ? 'text-gray-300' : 'text-gray-700'}
                  `}>
                    {cause.description}
                  </p>

                  {/* Conditional button */}
                  {isStoryCard ? (
                    <div className="relative">
                      {/* Glowing background */}
                      <div className={`
                        absolute -inset-1 rounded-lg blur opacity-60 animate-pulse
                        bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600
                      `}></div>
                      
                      <Link href={cause.storyPath || "/stories"}>
                        <Button
                          variant="default"
                          className={`
                            relative w-full font-bold transition-all duration-300 hover:scale-[1.02]
                            ${darkMode 
                              ? 'bg-gradient-to-r from-purple-700 to-pink-700 hover:from-purple-800 hover:to-pink-800' 
                              : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                            }
                            text-white shadow-lg hover:shadow-xl border-0
                          `}
                        >
                          <span className="flex items-center justify-center gap-2">
                            Read Story
                            <svg 
                              className="w-4 h-4 animate-bounce" 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                            </svg>
                          </span>
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <Link href={`/causes/${cause.id}`}>
                      <Button
                        variant="default"
                        className={`
                          w-full transition-all duration-300 hover:scale-105 border-0
                          ${darkMode
                            ? 'bg-orange-700 hover:bg-orange-800 text-white'
                            : 'bg-orange-600 hover:bg-orange-700 text-white'
                          }
                        `}
                      >
                        View Project
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Link href="/projects">
            <Button
              variant="outline"
              className={`
                transition-all duration-300 cursor-pointer
                ${darkMode
                  ? 'border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white hover:border-gray-500'
                  : 'border-white text-white hover:bg-white hover:text-blue-600'
                }
              `}
            >
              View All Projects
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}