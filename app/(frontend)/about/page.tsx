<<<<<<< HEAD
"use client";
=======
'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import ScrollAnimatedWrapper from '@/app/components/ScrollAnimatedWrapper';
>>>>>>> 2cbd8cefdb585adf0cd21d003b55ef1454f6e062

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
<<<<<<< HEAD
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
=======
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <ScrollAnimatedWrapper>
        <div className="max-w-7xl mx-auto">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div className="mb-12 lg:mb-0">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 mb-6">
                Aid 4 Children Tanzania was founded in 2024 by two friends who shared a simple yet powerful belief that every child deserves the chance to learn, grow, and dream, no matter where they are born.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                The idea took shape during a visit to a remote village, where they met Asha, a young girl who walked several miles barefoot each day just to borrow old books from a nearby school. Despite the challenges, her determination to learn never faded.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                That encounter changed everything. Inspired by Asha&apos;s courage and resilience, they decided to turn compassion into action and Aid 4 Children Tanzania was born.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Since then, the organization has worked to reach more children like Asha by creating opportunities for education, access to essential resources, and a foundation for a brighter future.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Every project, every book, and every smile shared is guided by that same belief:
                When we give a child a chance, we give a community hope.
              </p>
>>>>>>> 2cbd8cefdb585adf0cd21d003b55ef1454f6e062
            </div>
          </Reveal>
        </div>
         </ScrollAnimatedWrapper>
      </section>

<<<<<<< HEAD
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
=======
      {/* Mission and Vision Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
         <ScrollAnimatedWrapper>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {missionVision.map((item, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-6">{item.icon}</div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
>>>>>>> 2cbd8cefdb585adf0cd21d003b55ef1454f6e062
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
         </ScrollAnimatedWrapper>
      </section>

<<<<<<< HEAD
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
=======
      {/* Impact Stories Section - Replaced Our Impact */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-900 to-blue-950">
         <ScrollAnimatedWrapper>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Our Impact Initiatives</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Exploring our comprehensive programs that create lasting change in communities
>>>>>>> 2cbd8cefdb585adf0cd21d003b55ef1454f6e062
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

<<<<<<< HEAD
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
=======
          {/* Active Story Display */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:shadow-3xl">
            <div className="lg:grid lg:grid-cols-2 lg:gap-0">
              <div className="relative h-80 lg:h-full">
                <Image
                  src={impactStories[activeStory].image}
                  alt={impactStories[activeStory].title}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent lg:hidden" />
                <div className="absolute bottom-6 left-6 lg:hidden">
                  <div className="flex items-center space-x-3 text-white">
                    <div className="p-2 bg-orange-600 rounded-lg">
                      {impactStories[activeStory].icon}
                    </div>
                    <h3 className="text-2xl font-bold">{impactStories[activeStory].title}</h3>
                  </div>
                </div>
              </div>
              
              <div className="p-8 lg:p-12">
                <div className="hidden lg:flex items-center space-x-4 mb-6">
                  <div className="p-3 bg-gradient-to-r from-orange-600 to-orange-800 rounded-xl text-white">
                    {impactStories[activeStory].icon}
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900">{impactStories[activeStory].title}</h3>
                </div>
                
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  {impactStories[activeStory].description}
                </p>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900 text-lg border-l-4 border-orange-600 pl-3">Key Achievements:</h4>
                  {impactStories[activeStory].achievements.map((achievement, idx) => (
                    <div key={idx} className="flex items-center space-x-4 group">
                      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-orange-600 to-orange-800 transform group-hover:scale-150 transition-transform duration-300"></div>
                      <span className="text-gray-600 group-hover:text-gray-900 transition-colors duration-300">{achievement}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex items-center space-x-3 text-sm text-gray-500">
                    <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span>Each initiative represents our commitment to sustainable community development</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Story Progress Dots */}
          <div className="flex justify-center space-x-3 mt-8">
            {impactStories.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveStory(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeStory === index
                    ? 'bg-orange-500 scale-125 shadow-lg'
                    : 'bg-white/40 hover:bg-white/60 hover:scale-110'
                }`}
              />
            ))}
          </div>
        </div>
         </ScrollAnimatedWrapper>
      </section>

      {/* Meet the Founders Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
         <ScrollAnimatedWrapper>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Meet the Founders</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The visionary leadership behind our organization's success
            </p>
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 lg:gap-12">
            {founders.map((founder) => (
              <div
                key={founder.id}
                className="w-full md:w-[400px] group relative bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3"
              >
                <div className="relative h-80 overflow-hidden cursor-pointer">
>>>>>>> 2cbd8cefdb585adf0cd21d003b55ef1454f6e062
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
          </ScrollAnimatedWrapper>
      </section>

<<<<<<< HEAD
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
=======
      {/* Call to Action Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
         <ScrollAnimatedWrapper>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Join Our Mission</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Whether you want to volunteer, donate, or partner with us, there are numerous ways to get involved and create meaningful impact in children's lives.
>>>>>>> 2cbd8cefdb585adf0cd21d003b55ef1454f6e062
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
<<<<<<< HEAD
        </Reveal>
=======
        </div>
        </ScrollAnimatedWrapper>
>>>>>>> 2cbd8cefdb585adf0cd21d003b55ef1454f6e062
      </section>
    </div>
  );
}
