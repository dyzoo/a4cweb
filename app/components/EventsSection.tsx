"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  CalendarDays,
  Clock,
  MapPin,
  Maximize2,
  X,
  ChevronDown,
} from "lucide-react";
import { Button } from "./ui/button";
import { useContent } from "./ContentProvider";
import Reveal from "./Reveal";

export default function EventsSection() {
  const { events } = useContent();
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [imageExpandedId, setImageExpandedId] = useState<number | null>(null);

  const selectedEvent = events.items.find((_, index) => index === imageExpandedId);

  useEffect(() => {
    document.body.style.overflow = imageExpandedId !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [imageExpandedId]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setImageExpandedId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-primary-900/95 p-4 backdrop-blur-sm"
            onClick={() => setImageExpandedId(null)}
          >
            <button
              onClick={() => setImageExpandedId(null)}
              aria-label="Close image"
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </button>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[88vh] w-full max-w-5xl overflow-hidden rounded-xl"
            >
              <Image
                src={selectedEvent.image}
                alt={selectedEvent.title}
                width={1400}
                height={900}
                className="h-auto max-h-[88vh] w-full object-contain"
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="bg-cream py-20 dark:bg-primary-900 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-3xl text-center">
            <span className="section-eyebrow">{events.eyebrow}</span>
            <h2 className="heading-xl mt-5 text-3xl text-primary dark:text-white sm:text-4xl">
              {events.title}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-gray-600 dark:text-gray-300">
              {events.subtitle}
            </p>
          </Reveal>

          <div className="mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {events.items.map((event, index) => {
              const isExpanded = expandedId === index;
              return (
                <Reveal key={`${event.title}-${index}`} delay={index * 100}>
                  <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-primary/10 bg-white transition-all duration-500 hover:-translate-y-1.5 hover:shadow-card dark:border-white/10 dark:bg-primary-800">
                    <div
                      className="relative aspect-[16/10] cursor-zoom-in overflow-hidden"
                      onClick={() => setImageExpandedId(index)}
                    >
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary-900/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-primary opacity-0 backdrop-blur transition-all duration-300 group-hover:opacity-100">
                        <Maximize2 className="h-4 w-4" />
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold uppercase tracking-wider text-accent-600">
                        <span className="inline-flex items-center gap-1.5">
                          <CalendarDays className="h-3.5 w-3.5" />
                          {event.date}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                          <Clock className="h-3.5 w-3.5" />
                          {event.time}
                        </span>
                      </div>

                      <h3 className="mt-3 font-display text-xl font-bold text-primary dark:text-white">
                        {event.title}
                      </h3>
                      <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                        <MapPin className="h-3.5 w-3.5" />
                        {event.location}
                      </p>
                      <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                        {event.description}
                      </p>

                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden text-sm leading-relaxed text-gray-600 dark:text-gray-300"
                          >
                            <span className="mt-3 block rounded-lg border-l-2 border-accent bg-cream p-3 dark:bg-primary-900">
                              {event.details}
                            </span>
                          </motion.p>
                        )}
                      </AnimatePresence>

                      <div className="mt-auto pt-6">
                        <Button
                          variant={isExpanded ? "ghost" : "outline"}
                          className="w-full"
                          onClick={() => setExpandedId(isExpanded ? null : index)}
                        >
                          {isExpanded ? "Close details" : "Read more"}
                          <ChevronDown
                            className={`h-4 w-4 transition-transform duration-300 ${
                              isExpanded ? "rotate-180" : ""
                            }`}
                          />
                        </Button>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
