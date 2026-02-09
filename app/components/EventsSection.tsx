"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "./ui/button";

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
      title: "Annual Charity Gala",
      date: "15 October 2023",
      time: "6:00 PM",
      location: "Grand Ballroom, City Center",
      description:
        "Join us for an evening of inspiration and giving at our signature fundraising event.",
      image: "/event11.jpeg",
      details:
        "This gala will feature keynote speakers, live performances, a fundraising auction, and a formal dinner. Dress code is black tie.",
    },
    {
      id: 2,
      title: "Nane Nane 2025",
      date: "5 November 2023",
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
      title: "Education Summit",
      date: "20 December 2023",
      time: "10:00 AM - 4:00 PM",
      location: "Convention Center",
      description:
        "Experts discuss innovative solutions to educational inequality.",
      image: "/event11.jpeg",
      details:
        "Panels will include educators, policymakers, and NGO leaders.",
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
          onClick={handleModalClick}
        >
          <button
            onClick={closeExpandedImage}
            className="absolute top-6 right-6 text-white text-3xl"
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
      <section className="py-20 px-4 w-full flex justify-center">
        <div className="w-full max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">A4C Updates</h2>
            <p className="text-lg text-muted-foreground">
              Stories of progress, impact and change.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {events.map((event) => {
              const isExpanded = expandedId === event.id;

              return (
                <div
                  key={event.id}
                  className="rounded-lg overflow-hidden shadow bg-white"
                >
                  {/* IMAGE */}
                  <div
                    className="relative w-full aspect-square cursor-zoom-in"
                    onClick={(e) => handleImageClick(event.id, e)}
                  >
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover"
                      sizes="(max-width:768px) 100vw, 33vw"
                    />
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">
                      {event.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">
                      {event.date} • {event.time}
                    </p>
                    <p className="text-sm text-gray-500 mb-3">
                      {event.location}
                    </p>
                    <p className="text-gray-600 mb-4">{event.description}</p>

                    {isExpanded && (
                      <div className="mb-4 text-sm text-gray-700">
                        {event.details}
                      </div>
                    )}

                    <Button
                      variant="outline"
                      className="w-full"
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
        </div>
      </section>
    </>
  );
}
