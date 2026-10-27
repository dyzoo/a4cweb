// components/CharitySectionTailwind.jsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart, Quote, ShieldCheck } from 'lucide-react';
import { useContent } from './ContentProvider';
import Reveal from './Reveal';

export default function ChildStorySection() {
  const { story } = useContent();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="relative overflow-hidden bg-white py-20 dark:bg-primary-900 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
          {/* Story content */}
          <Reveal className="space-y-8">
            <div>
              <span className="section-eyebrow">{story.eyebrow}</span>
              <h2 className="heading-xl mt-5 text-3xl text-primary dark:text-white sm:text-4xl lg:text-[2.7rem]">
                {story.title}{' '}
                <span className="relative whitespace-nowrap text-accent">
                  {story.highlight}
                  <svg
                    aria-hidden
                    viewBox="0 0 200 12"
                    className="absolute -bottom-2 left-0 h-2.5 w-full text-accent/30"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M2 9C50 3 150 3 198 9"
                      stroke="currentColor"
                      strokeWidth="3"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-gray-600 dark:text-gray-300">
                {story.subtitle}
              </p>
            </div>

            <div className="rounded-2xl border border-primary/10 bg-cream/70 p-7 shadow-soft dark:border-white/10 dark:bg-primary-800 sm:p-9">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white">
                    <Heart className="h-5 w-5 text-accent-400" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-primary dark:text-white">
                      {story.childName}
                    </h3>
                    <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      {story.childMeta}
                    </p>
                  </div>
                </div>
                <Quote className="h-10 w-10 shrink-0 text-accent/20" />
              </div>

              <div className="mt-6 space-y-4">
                <AnimatePresence initial={false} mode="wait">
                  <motion.p
                    key={isExpanded ? 'full' : 'short'}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="whitespace-pre-line text-sm leading-relaxed text-gray-600 dark:text-gray-300 sm:text-base"
                  >
                    {isExpanded ? story.full : story.short}
                  </motion.p>
                </AnimatePresence>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 rounded-xl bg-primary p-6 text-white">
                        <h3 className="flex items-center gap-2 font-display text-lg font-bold">
                          <Heart className="h-4 w-4 text-accent-400" />
                          {story.ctaTitle}
                        </h3>
                        <p className="mt-2 text-sm text-white/70">{story.ctaText}</p>
                        <Link href="/donate" className="mt-4 inline-block">
                          <span className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-600">
                            <Heart className="h-4 w-4" />
                            {story.ctaLabel}
                          </span>
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="mt-6 border-t border-primary/10 pt-6 dark:border-white/10">
                <button
                  onClick={() => setIsExpanded((prev) => !prev)}
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-700 sm:w-auto"
                >
                  {isExpanded ? story.readLess : story.readMore}
                  <svg
                    className={`h-4 w-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                <ShieldCheck className="h-4 w-4" />
              </span>
              <p className="font-medium">{story.trustNote}</p>
            </div>
          </Reveal>

          {/* Image */}
          <Reveal delay={120} className="relative">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl shadow-card">
              <Image
                src={story.image}
                alt={story.childName}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-primary">
                  <span className="h-1.5 w-1.5 animate-soft-pulse rounded-full bg-accent" />
                  {story.badge}
                </span>
                <p className="mt-3 max-w-xs font-display text-xl text-white">
                  {story.subtitle}
                </p>
              </div>
            </div>
            <div
              aria-hidden
              className="absolute -bottom-5 -left-5 -z-10 h-40 w-40 rounded-2xl border-2 border-accent/30"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
