"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Download,
  Heart,
  PlayCircle,
  ShieldCheck,
  Star,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useTheme } from "@/app/providers/ThemeProvider";
import { useContent } from "./ContentProvider";
import { Button } from "./ui/button";

export default function HeroSection() {
  const { darkMode } = useTheme();
  const { hero } = useContent();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [downloading, setDownloading] = useState(false);

  const slides = hero.slides?.length ? hero.slides : [{ image: "/bg1.jpg", alt: "" }];
  const words = hero.typedWords?.length ? hero.typedWords : ["Aid", "Hope", "Future"];

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6500);
    return () => window.clearInterval(interval);
  }, [slides.length]);

  useEffect(() => {
    if (words.length < 2) return;
    const interval = window.setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2600);
    return () => window.clearInterval(interval);
  }, [words.length]);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const res = await fetch("/api/download/brochure");
      if (!res.ok) {
        toast.error("Brochure is not available yet.");
        return;
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "A4C-Brochure.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      toast.success("Your download has started.");
    } catch (err) {
      console.error(err);
      toast.error("We could not download the brochure. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <section className="relative isolate min-h-[92vh] overflow-hidden bg-primary-900 text-white">
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            marginTop: "90px",
            zIndex: 999999,
            backgroundColor: darkMode ? "#0b2545" : "#ffffff",
            color: darkMode ? "#ffffff" : "#0b2545",
          },
        }}
      />

      {/* Background carousel */}
      <div className="absolute inset-0 -z-10">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slides[currentSlide]?.image})` }}
            aria-label={slides[currentSlide]?.alt}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900 via-primary-900/90 to-primary-900/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-900 via-transparent to-primary-900/40" />
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-40 pt-20 sm:px-6 sm:pt-24 lg:px-8 lg:pb-44 lg:pt-28">
        <div className="grid items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-4 py-2 backdrop-blur-sm"
            >
              <Star className="h-3.5 w-3.5 text-accent-400" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/80">
                {hero.eyebrow}
              </span>
              <span className="hidden h-1 w-1 rounded-full bg-white/30 sm:block" />
              <AnimatePresence mode="wait">
                <motion.span
                  key={words[wordIndex]}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.35 }}
                  className="hidden font-display text-sm italic text-accent-400 sm:block"
                >
                  {words[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08 }}
              className="heading-xl mt-6 max-w-3xl text-4xl text-white sm:text-5xl lg:text-[3.6rem]"
            >
              {hero.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.16 }}
              className="mt-6 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg"
            >
              {hero.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.24 }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <Link href={hero.primaryCta.href}>
                <Button variant="accent" size="lg" className="group">
                  <Heart className="h-4 w-4" />
                  {hero.primaryCta.label}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href={hero.secondaryCta.href}>
                <Button
                  variant="light"
                  size="lg"
                  className="group border border-white/10 bg-white/5 text-white backdrop-blur-sm hover:bg-white hover:text-primary"
                >
                  <PlayCircle className="h-4 w-4" />
                  {hero.secondaryCta.label}
                </Button>
              </Link>
              <button
                onClick={handleDownload}
                disabled={downloading}
                className="inline-flex items-center gap-2 px-3 py-3 text-sm font-medium text-white/70 transition-colors hover:text-white disabled:opacity-60"
              >
                <Download className="h-4 w-4" />
                {downloading ? "Preparing…" : hero.brochureLabel}
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-white/60"
            >
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-accent-400" />
                Transparent, community-led programmes
              </span>
              <span className="hidden h-4 w-px bg-white/20 sm:block" />
              <span>Registered non-profit in Tanzania</span>
            </motion.div>
          </div>

          {/* Floating impact card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="hidden lg:col-span-5 lg:block"
          >
            <div className="relative ml-auto max-w-sm">
              <div className="absolute -inset-4 rounded-3xl bg-accent/10 blur-2xl" />
              <div className="glass relative rounded-2xl p-7">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-accent-400">
                  Our promise
                </p>
                <p className="mt-4 font-display text-2xl leading-snug text-white">
                  “When we give a child a chance, we give a community hope.”
                </p>
                <p className="mt-4 text-sm text-white/55">
                  Every programme is designed with local leaders and measured by
                  the change it creates for children and families.
                </p>
                <div className="mt-6 grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
                  {hero.stats.slice(0, 2).map((stat) => (
                    <div key={stat.label}>
                      <p className="font-display text-2xl font-bold text-white">
                        {stat.value}
                      </p>
                      <p className="text-[11px] uppercase tracking-wider text-white/50">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="absolute inset-x-0 bottom-0 z-10 border-t border-white/10 bg-primary-900/70 backdrop-blur-md">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-white/10 px-4 sm:px-6 md:grid-cols-4 lg:px-8">
          {hero.stats.map((stat, index) => (
            <motion.div
              key={`${stat.label}-${index}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.08 }}
              className="px-4 py-6 text-center md:py-7"
            >
              <p className="font-display text-2xl font-bold text-white sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50 sm:text-xs">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Slide controls */}
      <div className="absolute bottom-28 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 lg:bottom-32">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              currentSlide === index ? "w-8 bg-accent" : "w-2.5 bg-white/35 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
