"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';

export default function EventsSection() {
  const [expandedId, setExpandedId] = useState(null);
  const [imageExpandedId, setImageExpandedId] = useState(null);

  const events = [
    {
      id: 1,
      title: "Annual Charity Gala",
      date: "15 October 2023",
      time: "6:00 PM",
      location: "Grand Ballroom, City Center",
      description: "Join us for an evening of inspiration and giving at our signature fundraising event.",
      image: "/event11.jpeg",
      details: "This gala will feature keynote speakers, live performances, a fundraising auction, and a formal dinner. Dress code is black tie."
    },
    {
      id: 2,
      title: "Community Food Drive",
      date: "5 November 2023",
      time: "9:00 AM - 3:00 PM",
      location: "Various Locations",
      description: "Help us collect non-perishable food items for families in need this holiday season.",
      image: "/nanenane.jpg",
      details: "Volunteers will be assigned to various collection points across the city. You can also donate directly at any designated drop‑off location."
    },
    {
      id: 3,
      title: "Education Summit",
      date: "20 December 2023",
      time: "10:00 AM - 4:00 PM",
      location: "Convention Center",
      description: "Experts discuss innovative solutions to educational inequality in our communities.",
      image: "/event11.jpeg",
      details: "Panels will include educators, policymakers, and NGO leaders. Lunch and materials will be provided for registered attendees."
    }
  ];

  // Handle image click to expand
  const handleImageClick = (id, e) => {
    e.stopPropagation(); // Prevent event bubbling
    setImageExpandedId(id);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  // Close expanded image
  const closeExpandedImage = () => {
    setImageExpandedId(null);
    document.body.style.overflow = 'auto';
  };

  // Close if clicking outside image
  const handleModalClick = (e) => {
    if (e.target.id === 'image-modal-backdrop') {
      closeExpandedImage();
    }
  };

  // Handle Escape key press
  if (typeof window !== 'undefined') {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && imageExpandedId) {
        closeExpandedImage();
      }
    });
  }

  return (
    <>
      {/* Expanded Image Modal - Clean & Large */}
      {imageExpandedId && (
        <div
          id="image-modal-backdrop"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
          onClick={handleModalClick}
        >
          {/* Close Button - Top Right */}
          <button
            onClick={closeExpandedImage}
            className="absolute top-6 right-6 z-50 bg-white/20 hover:bg-white/30 text-white rounded-full p-3 transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-white/20"
            aria-label="Close expanded image"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Image Only - Maximized Display */}
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="relative max-w-[95vw] max-h-[90vh] w-auto h-auto">
              <Image
                src={events.find(e => e.id === imageExpandedId)?.image || ''}
                alt={events.find(e => e.id === imageExpandedId)?.title || ''}
                width={1200}
                height={800}
                className="object-contain rounded-lg shadow-2xl animate-scaleIn"
                priority
                sizes="100vw"
                style={{
                  width: 'auto',
                  height: 'auto',
                  maxWidth: '95vw',
                  maxHeight: '90vh'
                }}
              />
            </div>
          </div>

          {/* Zoom Controls (Optional) */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3 opacity-0 hover:opacity-100 transition-opacity duration-300">
            <button
              className="bg-white/20 hover:bg-white/30 text-white rounded-full p-2 backdrop-blur-sm border border-white/20"
              aria-label="Zoom instructions"
              title="Use mouse wheel or pinch to zoom"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <section className="py-20 px-4 w-full flex justify-center">
        <div className="w-full max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">A4C Updates</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Stories of progress, impact, and change.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center mb-12">
            {events.map((event) => {
              const isExpanded = expandedId === event.id;

              return (
                <div
                  key={event.id}
                  className={`rounded-lg overflow-hidden shadow-md transition-all w-full max-w-sm bg-white ${
                    isExpanded ? 'scale-105 shadow-xl' : 'hover:shadow-lg'
                  }`}
                >
                  {/* Square Image Container with Click Handler */}
                  <div 
                    className="relative w-full aspect-square overflow-hidden cursor-zoom-in group"
                    onClick={(e) => handleImageClick(event.id, e)}
                  >
                    <Image
                      src={event.image}
                      alt={event.title}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-500 group-hover:scale-110"
                      priority={event.id <= 3} // Prioritize first 3 images
                    />
                    
                    {/* Overlay with Zoom Icon */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 right-4 bg-white rounded-full p-2 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <svg
                          className="w-5 h-5 text-gray-800"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                      </div>
                    </div>
                    
                    {/* Click Hint Text */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white font-medium bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Click to enlarge
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{event.title}</h3>

                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {event.date} • {event.time}
                    </div>

                    <div className="flex items-center text-sm text-muted-foreground mb-4">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {event.location}
                    </div>

                    <p className="text-muted-foreground mb-4">{event.description}</p>

                    {/* Expandable Content */}
                    {isExpanded && (
                      <div className="text-sm text-gray-700 mb-4 animate-fadeIn">
                        <p className="mb-4">{event.details}</p>

                        <Button
                          variant="secondary"
                          className="w-full cursor-pointer"
                          onClick={() => setExpandedId(null)}
                        >
                          Close Details
                        </Button>
                      </div>
                    )}

                    {!isExpanded && (
                      <Button
                        variant="outline"
                        className="w-full border-blue-950 text-blue-950 hover:bg-blue-900 hover:text-white transition-all duration-300 cursor-pointer"
                        onClick={() => setExpandedId(event.id)}
                      >
                        Read More
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Add CSS for animations */}
      <style jsx global>{`
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out forwards;
        }
        
        .cursor-zoom-in {
          cursor: zoom-in;
        }
        
        /* Prevent image drag in modal */
        .relative img {
          user-select: none;
          -webkit-user-drag: none;
        }
      `}</style>
    </>
  );
}