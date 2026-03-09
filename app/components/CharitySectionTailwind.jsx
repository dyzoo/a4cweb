// components/ChildStorySection.jsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import ScrollAnimatedWrapper from './ScrollAnimatedWrapper';
import Link from 'next/link';

const ChildStorySection = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const storyContent = {
    short: "Fatima, a brilliant 10-year-old from a marginalized community, dreams of becoming a surgeon. But without access to quality education, health insurance, or financial support, her path to university seems impossible...",
    full: `Fatima is a 10-year-old girl with an extraordinary gift for science. Despite walking 8 kilometers daily to attend a crowded community school with limited resources, she ranks top of her class. Her teachers describe her as "the most brilliant student in a decade."

But Fatima's family lives on less than $2 a day. Her mother is a single parent working as a street vendor. School fees, uniforms, books, and health emergencies are constant threats to Fatima's education.

One malaria episode nearly cost her a full term of school. Without health insurance, her education hangs in the balance of every illness. Her dream of becoming a surgeon of returning to serve her community seems like a distant fantasy.

This is why Somesha Mmoja tu exists. 

Through this program, we don't just provide one-time support. We create a complete ecosystem of opportunity:
• Full school fees coverage from primary through university
• Comprehensive health insurance to protect against medical emergencies
• Quality learning materials and a dedicated mentor
• Nutritional support to ensure she can focus on learning

With your partnership, Fatima's story can have a different ending one where she walks across a university stage in a white coat, ready to save lives.

"The doctor who saves my community could be me," Fatima says with a determined smile. "I just need someone to believe in me."`
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-orange-50">
      <ScrollAnimatedWrapper threshold={0.3}>
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Story Content */}
          <div className="space-y-8">
            {/* Header */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-900 rounded-full">
                <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
                <span className="text-white font-bold text-sm uppercase tracking-wider">
                  SOMESHA MMOJA TU — EDUCATE ONE CHILD
                </span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-extrabold text-blue-900 leading-tight">
                Meet <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-orange-600">Fatima</span>,
                <br />
                A Future Surgeon
              </h1>
              
              <p className="text-gray-700 text-lg font-medium max-w-2xl">
                One child's entire educational journey from primary school to university
                needs your partnership. Tuition. Health insurance. Hope.
              </p>
            </div>

            {/* Story Card */}
            <div className="bg-white rounded-3xl shadow-2xl shadow-blue-900/10 p-8 lg:p-10 border border-gray-100">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-900 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-2xl">F</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-xl">Fatima's Journey</h3>
                        <p className="text-gray-500 text-sm">10 years old • Future Surgeon</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
                        {isExpanded ? storyContent.full : storyContent.short}
                      </p>

                      {/* Partnership CTA AFTER EXPANSION */}
                      {isExpanded && (
                        <div className="mt-8 space-y-4">
                          {/* For Donors */}
                          <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-2xl p-6 text-white shadow-xl">
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-white font-bold text-lg">❤️</span>
                              </div>
                              <div>
                                <h4 className="text-xl font-bold mb-2">Sponsor Fatima's Education</h4>
                                <p className="text-blue-100 mb-4">
                                  A full sponsorship covers tuition, health insurance, learning materials, 
                                  and nutrition support from primary school through university graduation.
                                </p>
                                <Link href="/donate">
                                  <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl text-lg transition-all duration-300 shadow-lg cursor-pointer">
                                    Become a Sponsor
                                  </button>
                                </Link>
                              </div>
                            </div>
                          </div>

                          {/* For Institutions */}
                          <div className="bg-white border-2 border-blue-200 rounded-2xl p-6 shadow-xl">
                            <h4 className="text-xl font-bold text-blue-900 mb-4">Partner as an Institution</h4>
                            <div className="grid sm:grid-cols-3 gap-3">
                              <div className="bg-orange-50 p-4 rounded-xl text-center">
                                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                  <span className="text-orange-600 font-bold text-xl">🏥</span>
                                </div>
                                <h5 className="font-bold text-blue-900 text-sm">Health Insurance</h5>
                                <p className="text-xs text-gray-600 mt-1">Provide medical coverage</p>
                              </div>
                              <div className="bg-blue-50 p-4 rounded-xl text-center">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                  <span className="text-blue-600 font-bold text-xl">🎓</span>
                                </div>
                                <h5 className="font-bold text-blue-900 text-sm">Scholarships</h5>
                                <p className="text-xs text-gray-600 mt-1">Fund academic dreams</p>
                              </div>
                              <div className="bg-purple-50 p-4 rounded-xl text-center">
                                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                  <span className="text-purple-600 font-bold text-xl">🤝</span>
                                </div>
                                <h5 className="font-bold text-blue-900 text-sm">Corporate Support</h5>
                                <p className="text-xs text-gray-600 mt-1">Sponsor a child's future</p>
                              </div>
                            </div>
                            <div className="mt-4 text-center">
                              <Link href="/partner">
                                <button className="text-blue-900 font-semibold hover:text-orange-600 transition-colors cursor-pointer">
                                  Become a Partner →
                                </button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Quote Mark */}
                  <div className="text-blue-200 text-6xl font-black leading-none">"</div>
                </div>
                
                {/* Action Button */}
                <div className="pt-6 border-t border-gray-100">
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="group relative overflow-hidden bg-gradient-to-r from-blue-900 to-orange-600 text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 w-full lg:w-auto hover:shadow-xl hover:shadow-blue-200 transition-all duration-300 cursor-pointer"
                  >
                    <span className="relative z-10">{isExpanded ? 'Show Less' : 'Read Fatima\'s Full Story'}</span>
                    <svg 
                      className={`relative z-10 w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-orange-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Trust indicators */}
            <div className="flex flex-wrap items-center gap-6 text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-bold">✓</span>
                </div>
                <p className="text-sm font-medium">100% transparent funding</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold">📋</span>
                </div>
                <p className="text-sm font-medium">Quarterly progress reports</p>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="relative">
            <div className="relative h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/20">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/40 via-transparent to-orange-600/30 z-10"></div>
              
              <div className="relative w-full h-full">
                <Image
                  src="/AfricanGirl.jpg"
                  alt="Fatima - Future Surgeon"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>

              {/* Overlay Text */}
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/70 to-transparent z-20">
                <p className="text-white/90 text-sm mb-2">"I just need someone to believe in me."</p>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-1 bg-orange-500 rounded-full"></div>
                  <span className="text-white text-xs">— Fatima, 10 years old</span>
                </div>
              </div>
            </div>
            
            {/* Floating Stats Cards */}
            <div className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-4 z-30 border-l-4 border-orange-500">
              <p className="text-sm text-gray-500">Need per child</p>
              <p className="text-2xl font-bold text-blue-900">$5,000</p>
              <p className="text-xs text-gray-400">Through university</p>
            </div>
           
          </div>

        </div>
      </div>
      </ScrollAnimatedWrapper>
    </section>
  );
};

export default ChildStorySection;