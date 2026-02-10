'use client'
import React, { useState } from 'react';
import Image from 'next/image';

const MeetTheFounders = () => {
  const founders = [
    {
      id: 1,
      name: 'Idrissa Abdallah',
      designation: 'Founder & Director',
      image: '/IDDY_SAMPLE.jpg',
      alt: 'Idrissa Abdallah',
      email: 'idrissa@example.com',
    },
    {
      id: 2,
      name: 'Gideon Felix',
      designation: 'Founder & Associate Director',
      image: '/GIDDYA4C.jpg',
      alt: 'Gideon Felix',
      email: 'gideonfelixy@gmail.com',
    },
  ];

  const [popup, setPopup] = useState({ show: false, message: "" });

  // Handles clicking the email icon
  const handleEmailClick = (email: string, e:React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault(); // Prevent normal click

    const mailtoLink = `mailto:${email}`;

    // Try opening the mail client
    const opened = window.open(mailtoLink);

    // If browser blocks OR Windows has no default email app
    if (!opened) {
      navigator.clipboard.writeText(email);

      setPopup({
        show: true,
        message:
          "No email client found on your system. The email has been copied to your clipboard.",
      });

      // Hide popup after 4 seconds
      setTimeout(() => {
        setPopup({ show: false, message: "" });
      }, 4000);
    }
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">

        {/* Popup Notification */}
        {popup.show && (
          <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-3 rounded-xl shadow-lg z-[9999]">
            {popup.message}
          </div>
        )}

        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Meet the Founders
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The visionary duo behind our success
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-8 lg:gap-12">
          {founders.map((founder) => (
            <div
              key={founder.id}
              className="w-full md:w-[400px] group relative bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Image Layer */}
              <div className="relative h-80 overflow-hidden z-0">
                <Image
                  src={founder.image}
                  alt={founder.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              </div>

              {/* Text Layer */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-20">
                <h3 className="text-2xl font-bold">{founder.name}</h3>
                <p className="text-gray-200">{founder.designation}</p>
              </div>

              {/* Email Hover Icon with Fallback Copy */}
              <a
                href={`mailto:${founder.email}`}
                onClick={(e) => handleEmailClick(founder.email, e)}
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 cursor-pointer"
              >
                <div className="bg-black/50 rounded-full p-3 backdrop-blur-sm hover:bg-black/60 transition">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 12H8m8 0l-4 4m4-4l-4-4m-4 4h.01M12 20a8 8 0 100-16 8 8 0 000 16z"
                    />
                  </svg>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeetTheFounders;
