"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import ScrollAnimatedWrapper from './ScrollAnimatedWrapper';

type EventType = {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
  details: string;
};

export default function EventsSection() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [imageExpandedId, setImageExpandedId] = useState<number | null>(null);

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

  // Expand image
  const handleImageClick = (
    id: number,
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    e.stopPropagation();
    setImageExpandedId(id);
    document.body.style.overflow = "hidden";
  };

  // Close image
  const closeExpandedImage = () => {
    setImageExpandedId(null);
    document.body.style.overflow = "auto";
  };

  // Modal click outside
  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.id === "image-modal-backdrop") closeExpandedImage();
  };

  // ESC key close (safe for Vercel)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && imageExpandedId !== null) {
        closeExpandedImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [imageExpandedId]);

  const selectedEvent = events.find((e) => e.id === imageExpandedId);

  return (
    <>
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
          >
            ✕
          </button>

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
                    >
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
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
          </div>
        </div>
      </section>
    </>
  );
}