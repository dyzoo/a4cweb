// components/ChildStorySection.jsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const ChildStorySection = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const storyContent = {
    short: "Aarav, a bright 8-year-old from a remote village, dreams of becoming a doctor. But without access to proper education and books, his future hangs in the balance...",
    full: `Aarav, a bright 8-year-old from a remote village, dreams of becoming a doctor. Every day, he walks 5 kilometers to a makeshift school with torn textbooks and broken chalkboards.

His father works as a daily wage laborer, earning barely enough to feed the family of five. Aarav's medical dream seemed impossible until our education program reached his village.

Today, Aarav has proper textbooks, a digital learning tablet, and access to online classes. His teacher says, "He's the most curious student I've ever taught." In just one year, Aarav's grades have improved by 75%, and he now teaches younger children after school.

"When I grow up," Aarav says, "I'll build a hospital right here in my village so no one has to walk for days to see a doctor."`
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Story Content */}
          <div className="space-y-8">
            {/* Header */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                <span className="text-blue-700 font-semibold text-sm uppercase tracking-wider">
                  Real Story
                </span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
                Meet <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Aarav</span>,
                <br />
                The Future Doctor
              </h1>
              
              <p className="text-gray-600 text-lg font-medium">
                One child's journey from impossible dreams to unstoppable determination
              </p>
            </div>

            {/* Story Card */}
            <div className="bg-white rounded-3xl shadow-2xl shadow-blue-100/50 p-8 lg:p-10 border border-gray-100">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                        <span className="text-white font-bold text-xl">A</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-xl">Aarav's Story</h3>
                        <p className="text-gray-500 text-sm">8 years old • Future Doctor</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
                        {isExpanded ? storyContent.full : storyContent.short}
                      </p>

                      {/* DONATION CTA AFTER EXPANSION */}
                      {isExpanded && (
                        <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
                          <h3 className="text-2xl font-extrabold mb-3">
                            💙 Touched by Aarav's story?
                          </h3>
                          <p className="text-blue-100 mb-6 text-lg">
                            Your support can help more children like Aarav access education,
                            hope, and a brighter future.
                          </p>

                          <button className="bg-white text-blue-700 font-bold px-8 py-4 rounded-xl text-lg hover:bg-blue-50 transition-all duration-300 shadow-lg">
                            Donate Now
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Quote Mark */}
                  <div className="text-blue-200 text-5xl font-black leading-none">"</div>
                </div>
                
                {/* Action Button */}
                <div className="pt-6 border-t border-gray-100">
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 w-full lg:w-auto hover:shadow-xl hover:shadow-blue-200 transition-all duration-300"
                  >
                    <span>{isExpanded ? 'Show Less' : 'Read Full Story'}</span>
                    <svg 
                      className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Small trust note */}
            <div className="flex items-center gap-3 text-gray-600">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold">✓</span>
              </div>
              <p className="text-sm font-medium">
                100% of donations go directly to supporting children's education
              </p>
            </div>
          </div>

          {/* Image Section */}
          <div className="relative">
            <div className="relative h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl shadow-blue-100">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-400 via-purple-500 to-pink-400 opacity-20"></div>
              
              <div className="relative w-full h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                  <Image
                    src="/kidstory.jpg"
                    alt="Aarav - Future Doctor"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
              </div>
            </div>
            
            {/* Decorations */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-3xl opacity-20 -z-10"></div>
            <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-gradient-to-br from-blue-300 to-cyan-400 rounded-3xl opacity-15 -z-10"></div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ChildStorySection;
