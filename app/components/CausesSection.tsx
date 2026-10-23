"use client";

<<<<<<< HEAD
import Link from "next/link";
import { ArrowUpRight, Award } from "lucide-react";
import { Button } from "./ui/button";
import { useContent } from "./ContentProvider";
import Icon from "./Icon";
import Reveal from "./Reveal";

export default function CausesSection() {
  const { causes } = useContent();
=======
import Link from 'next/link';
import { Button } from './ui/button';
import { useTheme } from "@/app/providers/ThemeProvider";
import ScrollAnimatedWrapper from './ScrollAnimatedWrapper';

interface Cause {
  id: number;
  title: string;
  description: string;
  image: string;
  isStory?: boolean;
  storyPath?: string;
  projectPath?: string;
}

export default function CausesSection() {
  const { darkMode } = useTheme();
  
  const causes: Cause[] = [
    {
      id: 1,
      title: "Edumisha",
      description: "Providing school supplies and scholarships to underprivileged children.",
      image: "/Edumisha_img.jpg",
      projectPath: "/projects/A4C-Edumisha-project"
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
>>>>>>> 2cbd8cefdb585adf0cd21d003b55ef1454f6e062

  // Helper to get the link for a cause
  const getProjectLink = (cause: Cause): string => {
    if (cause.isStory) return cause.storyPath || "/stories";
    return cause.projectPath || "/projects";
  };

  return (
<<<<<<< HEAD
    <section className="relative overflow-hidden bg-primary-900 py-20 text-white sm:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="section-eyebrow !text-accent-400">{causes.eyebrow}</span>
          <h2 className="heading-xl mt-5 text-3xl text-white sm:text-4xl">
            {causes.title}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/65">
            {causes.subtitle}
=======
    <section className={`
      min-h-screen w-full flex items-center justify-center py-20 transition-colors duration-300
      ${darkMode ? 'bg-gray-100' : 'bg-blue-950'}
    `}>
      
      <div className="container max-w-6xl px-4 mx-auto">
        <ScrollAnimatedWrapper>
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
            darkMode ? 'text-blue-900' : 'text-white'
          }`}>
            Projects & Touching Stories
          </h2>
          <p className={`text-lg max-w-3xl mx-auto transition-colors ${
            darkMode ? 'text-blue-900/80' : 'text-white/90'
          }`}>
            Join us in supporting these critical initiatives that change lives every day.
>>>>>>> 2cbd8cefdb585adf0cd21d003b55ef1454f6e062
          </p>
        </Reveal>

<<<<<<< HEAD
        <div className="mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {causes.items.map((cause, index) => (
            <Reveal key={`${cause.title}-${index}`} delay={index * 110}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] transition-all duration-500 hover:-translate-y-2 hover:border-accent/40 hover:bg-white/[0.07]">
                <div className="relative h-56 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${cause.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-900/90 via-primary-900/20 to-transparent" />
                  <span
                    className={`absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                      cause.featured
                        ? "bg-accent text-white"
                        : "bg-white/90 text-primary"
                    }`}
                  >
                    {cause.featured && <Award className="h-3 w-3" />}
                    {cause.badge}
                  </span>
                  <span className="absolute -bottom-6 right-5 flex h-12 w-12 items-center justify-center rounded-full bg-white text-primary shadow-lg transition-transform duration-500 group-hover:rotate-12">
                    <Icon name={cause.icon} className="h-5 w-5" />
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6 pt-8">
                  <h3 className="font-display text-xl font-bold text-white">
                    {cause.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-white/60">
                    {cause.description}
                  </p>
                  <Link
                    href={cause.href || "/projects"}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent-400 transition-colors hover:text-accent-400/80"
                  >
                    Learn more
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 text-center">
          <Link href={causes.viewAllHref || "/projects"}>
            <Button
              variant="light"
              className="border border-white/15 bg-transparent text-white hover:bg-white hover:text-primary"
            >
              {causes.viewAllLabel}
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </Link>
        </Reveal>
      </div>
=======
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
                      ? 'bg-gradient-to-br from-purple-100 to-pink-100 border-2 border-purple-500/50'
                      : 'bg-gradient-to-br from-orange-50 to-orange-50 border-2 border-orange-200'
                    : darkMode
                      ? 'bg-white'
                      : 'bg-white'
                  }
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
                          ? 'bg-gradient-to-r from-purple-400 to-pink-400' 
                          : 'bg-gradient-to-r from-orange-800 to-orange-600'
                        }
                      `}></div>
                      
                      {/* Main badge */}
                      <div className={`
                        relative text-white text-xs font-bold px-3 py-1 rounded-full 
                        animate-[flicker_2s_ease-in-out_infinite]
                        ${darkMode 
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600' 
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
                    ${darkMode ? 'bg-black/10' : 'bg-transparent'}
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
                      ? darkMode ? 'text-purple-700' : 'text-purple-800'
                      : darkMode ? 'text-blue-900' : 'text-gray-900'
                    }
                  `}>
                    {cause.title}
                  </h3>
                  
                  <p className={`
                    mb-6 transition-colors
                    ${darkMode ? 'text-blue-900/70' : 'text-gray-700'}
                  `}>
                    {cause.description}
                  </p>

                  {/* Conditional button */}
                  {isStoryCard ? (
                    <div className="relative">
                      {/* Glowing background */}
                      <div className={`
                        absolute -inset-1 rounded-lg blur opacity-60 animate-pulse
                        bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400
                      `}></div>
                      
                      <Link href={cause.storyPath || "/stories"}>
                        <Button
                          variant="default"
                          className={`
                            relative w-full font-bold transition-all duration-300 hover:scale-[1.02]
                            ${darkMode 
                              ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700' 
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
                    <Link href={getProjectLink(cause)}>
                      <Button
                        variant="default"
                        className={`
                          w-full transition-all duration-300 hover:scale-105 border-0
                          ${darkMode
                            ? 'bg-blue-900 hover:bg-blue-800 text-white'
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
        </ScrollAnimatedWrapper>
        </div>

          
>>>>>>> 2cbd8cefdb585adf0cd21d003b55ef1454f6e062
    </section>
  );
}
