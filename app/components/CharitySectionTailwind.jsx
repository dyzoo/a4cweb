// components/CharitySectionSimple.jsx
'use client';

import React from 'react';
import Image from 'next/image';

const CharitySectionTailwind = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
        
        {/* Content */}
        <div className="lg:w-1/2">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight font-serif">
            Charity is the purest form of serving god
          </h1>
          
          <div className="space-y-4 text-gray-700 mb-8">
            <p className="text-lg leading-relaxed">
              Contrary to popular belief, Lorem Ipsum is not simply random text...
            </p>
            {/* Add other paragraphs */}
          </div>

          <div className="w-full h-px bg-gray-300 my-8"></div>

          <button className="flex items-center gap-3 bg-black text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-800 transition-all duration-300 hover:scale-105">
            Read More
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 0L6.59 1.41L12.17 7H0V9H12.17L6.59 14.59L8 16L16 8L8 0Z"/>
            </svg>
          </button>
        </div>

        {/* Image with diagonal shape - Fixed size */}
        <div className="lg:w-1/2 relative">
          <div className="relative h-[500px] lg:h-[550px] w-full overflow-hidden 
                        [clip-path:polygon(15%_0,100%_0,100%_100%,0_100%)]
                        bg-gradient-to-br from-gray-100 to-gray-200">
            
            <div className="absolute inset-4 md:ins-6 lg:inset-8 
                          [clip-path:polygon(15%_0,100%_0,100%_100%,0_100%)]
                          overflow-hidden">
              
              {/* Placeholder or Image */}
              <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-600 
                            flex items-center justify-center">
                <span className="text-white text-xl font-medium">
                  Your Image
                </span>
              </div>
              
              {
              <Image
                src="/kidz.jpg"
                alt="Charity"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CharitySectionTailwind;