"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  HandHeart,
  HeartHandshake,
  Sparkles,
  Zap,
} from "lucide-react";
import { useContent } from "@/app/components/ContentProvider";
import Reveal from "@/app/components/Reveal";
import Icon from "@/app/components/Icon";
import { Button } from "@/app/components/ui/button";
import MeetTheFounders from "@/app/components/MeetTheFounders";

export default function AboutUs() {
  const { about } = useContent();
  const [activeStory, setActiveStory] = useState(0);
  const current = about.impact[activeStory] || about.impact[0];

  return (
    <div className="bg-white dark:bg-primary-900">
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-primary-900 py-24 text-white sm:py-28">
        <div
          aria-hidden
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${about.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900 via-primary-900/90 to-primary-900/50" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-3xl">
            <span className="section-eyebrow !text-accent-400">About A4C Tanzania</span>
            <h1 className="heading-xl mt-5 text-4xl text-white sm:text-5xl">
              {about.heroTitle}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
              {about.heroSubtitle}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/donate">
                <Button variant="accent">
                  <HandHeart className="h-4 w-4" /> Support our work
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="light"
                  className="border border-white/15 bg-transparent text-white hover:bg-white hover:text-primary"
                >
                  Talk to our team
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <Reveal>
              <span className="section-eyebrow">Our journey</span>
              <h2 className="heading-xl mt-5 text-3xl text-primary dark:text-white sm:text-4xl">
                {about.storyTitle}
              </h2>
              <div className="mt-6 space-y-4">
                {about.storyParagraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-sm leading-relaxed text-gray-600 dark:text-gray-300 sm:text-base"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>
            <Reveal delay={120} className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-card">
                <Image
                  src={about.image}
                  alt={about.storyTitle}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/40 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -left-4 flex items-center gap-3 rounded-xl bg-white p-4 shadow-card dark:bg-primary-800 sm:left-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent-600">
                  <Sparkles className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-display text-lg font-bold text-primary dark:text-white">
                    Since 2024
                  </p>
                  <p className="text-[11px] uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Turning compassion into action
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Mission & vision */}
      <section className="bg-cream py-20 dark:bg-primary-800 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            {about.missionVision.map((item, index) => (
              <Reveal key={item.title} delay={index * 120}>
                <article className="group h-full rounded-2xl border border-primary/10 bg-white p-8 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-card dark:border-white/10 dark:bg-primary-900">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary-50 text-primary transition-colors duration-300 group-hover:bg-accent group-hover:text-white dark:bg-white/10 dark:text-white">
                    <Icon name={item.icon} className="h-7 w-7" />
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-bold text-primary dark:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                    {item.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Impact initiatives */}
      <section className="bg-primary-900 py-20 text-white sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-3xl text-center">
            <span className="section-eyebrow !text-accent-400">Our impact</span>
            <h2 className="heading-xl mt-5 text-3xl text-white sm:text-4xl">
              {about.impactTitle}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/65">
              {about.impactSubtitle}
            </p>
          </Reveal>

          <Reveal className="mt-10 flex flex-wrap justify-center gap-2">
            {about.impact.map((story, index) => (
              <button
                key={story.title}
                onClick={() => setActiveStory(index)}
                className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                  activeStory === index
                    ? "bg-accent text-white shadow-lg"
                    : "border border-white/15 bg-white/5 text-white/70 hover:border-white/30 hover:text-white"
                }`}
              >
                {activeStory === index ? (
                  <Zap className="h-3.5 w-3.5" />
                ) : (
                  <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
                )}
                {story.title}
              </button>
            ))}
          </Reveal>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeStory}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]"
            >
              <div className="grid lg:grid-cols-2">
                <div className="relative min-h-[280px] lg:min-h-[420px]">
                  <Image
                    src={current.image}
                    alt={current.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 to-transparent lg:bg-gradient-to-r" />
                </div>
                <div className="p-8 sm:p-10">
                  <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">
                    {current.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-white/65 sm:text-base">
                    {current.description}
                  </p>
                  <ul className="mt-6 space-y-3">
                    {current.achievements.map((achievement) => (
                      <li
                        key={achievement}
                        className="flex items-start gap-3 text-sm text-white/75"
                      >
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent-400">
                          <Check className="h-3 w-3" />
                        </span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/projects"
                    className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-accent-400 hover:text-white"
                  >
                    Explore related projects
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <MeetTheFounders />

      {/* CTA */}
      <section className="py-20 sm:py-24">
        <Reveal className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent-600">
            <HeartHandshake className="h-7 w-7" />
          </span>
          <h2 className="heading-xl mt-6 text-3xl text-primary dark:text-white sm:text-4xl">
            {about.ctaTitle}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-gray-600 dark:text-gray-300">
            {about.ctaText}
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/donate">
              <Button variant="accent" size="lg">
                <HandHeart className="h-4 w-4" /> Donate today
              </Button>
            </Link>
            <Link href="/become-volunteer">
              <Button variant="outline" size="lg">
                Become a volunteer
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
