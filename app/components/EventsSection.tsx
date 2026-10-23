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

<<<<<<< HEAD
  const selectedEvent = events.items.find((_, index) => index === imageExpandedId);
=======
  const events: EventType[] = [
    {
      id: 1,
      title: "A4C EDUMISHA",
      date: "15 October 2025",
      time: "12:00 PM",
      location: "Maji Matitu Primary School",
      description:
        "Join us for an evening of inspiration and giving at our signature fundraising event.",
      image: "/event11.jpeg",
      details:
        "This gala will feature keynote speakers, live performances, a fundraising auction, and a formal dinner. Dress code is black tie.",
    },
    {
      id: 2,
      title: "Nane Nane 2025",
      date: "08 August 2023",
      time: "9:00 AM - 3:00 PM",
      location: "Various Locations",
      description:
        "Help us collect non-perishable food items for families in need this holiday season.",
      image: "/nanenane.jpg",
      details:
        "Volunteers will be assigned to various collection points across the city.",
    },
    {
      id: 3,
      title: "Women's Day",
      date: "08 March 2026",
      time: "10:00 AM - 4:00 PM",
      location: "Convention Center",
      description:
        "Happy Women's Day.",
      image: "/womens_day.png",
      details:
        "Aid 4 children Tanzania wishes y'all a Happy Women's Day.",
    },
  ];
>>>>>>> 2cbd8cefdb585adf0cd21d003b55ef1454f6e062

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
<<<<<<< HEAD
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-primary-900/95 p-4 backdrop-blur-sm"
            onClick={() => setImageExpandedId(null)}
=======
      {/* IMAGE MODAL */}
      {selectedEvent && (
        <div
          id="image-modal-backdrop"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={handleModalClick}
        >
          <button
            onClick={closeExpandedImage}
            className="absolute top-6 right-6 text-white text-3xl hover:text-gray-300 transition-colors z-50"
>>>>>>> 2cbd8cefdb585adf0cd21d003b55ef1454f6e062
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

<<<<<<< HEAD
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
=======
          <div className="relative max-w-[95vw] max-h-[90vh]">
            <Image
              src={selectedEvent.image}
              alt={selectedEvent.title}
              width={1200}
              height={800}
              className="object-contain rounded-lg"
              priority
            />
          </div>
        </div>
      )}

      {/* EVENTS */}
      <section className="py-20 px-4 w-full flex justify-center bg-gradient-to-b from-gray-50 to-white">
        <div className="w-full max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              A4C Updates
            </h2>
            <p className="text-lg text-gray-600">
              Stories of progress, impact and change.
            </p>
          </div>
          
          <ScrollAnimatedWrapper threshold={0.3}>
            <div className="grid gap-8 md:grid-cols-3">
              {events.map((event) => {
                const isExpanded = expandedId === event.id;

                return (
                  <div
                    key={event.id}
                    className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 bg-white"
                  >
                    {/* IMAGE */}
                    <div
                      className="relative w-full aspect-square cursor-zoom-in overflow-hidden group"
                      onClick={(e) => handleImageClick(event.id, e)}
>>>>>>> 2cbd8cefdb585adf0cd21d003b55ef1454f6e062
                    >
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
<<<<<<< HEAD
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
=======
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width:768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2 text-gray-900">
                        {event.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                        <span>{event.date}</span>
                        <span>•</span>
                        <span>{event.time}</span>
                      </div>
                      <p className="text-sm text-gray-500 mb-3 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {event.location}
                      </p>
                      <p className="text-gray-600 mb-4 leading-relaxed">{event.description}</p>

                      {isExpanded && (
                        <div className="mb-4 p-4 bg-gray-50 rounded-lg text-sm text-gray-700 border-l-4 border-orange-500">
                          {event.details}
                        </div>
                      )}

                      <Button
                        variant="outline"
                        className="w-full cursor-pointer hover:bg-orange-600 hover:text-white border-2 border-orange-600 text-orange-600 font-semibold transition-all duration-300 hover:scale-[1.02]"
                        onClick={() =>
                          setExpandedId(isExpanded ? null : event.id)
                        }
                      >
                        {isExpanded ? "Close Details" : "Read More"}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollAnimatedWrapper>
          
          <div className="text-center mt-12">
            <Button
              variant="outline"
              className="border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white px-8 py-6 text-lg font-semibold transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              View All Events
            </Button>
>>>>>>> 2cbd8cefdb585adf0cd21d003b55ef1454f6e062
          </div>
        </div>
      </section>
    </>
  );
}