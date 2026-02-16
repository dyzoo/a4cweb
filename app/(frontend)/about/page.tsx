'use client'
import React, { useState } from 'react';
import Image from 'next/image';

const AboutUs = () => {
  const [activeStory, setActiveStory] = useState(0);

  const missionVision = [
    {
      title: "Our Mission",
      description:
        "To empower underprivileged children in Tanzania through quality education, healthcare, and community development programs that create sustainable change.",
      icon: (
        <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      title: "Our Vision",
      description:
        "A Tanzania where every child has access to education, healthcare, and opportunities to reach their full potential regardless of their background.",
      icon: (
        <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  const impactStories = [
    {
      id: 1,
      title: "Educational Empowerment",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
        </svg>
      ),
      description: "Transforming learning environments into vibrant spaces where children discover the joy of education through interactive programs and modern teaching methods.",
      image: "/EDUMISHA Maji matitu.jpg",
      color: "from-orange-600 to-orange-800",
      achievements: ["Modern classroom facilities established", "Interactive learning programs implemented", "Educational resources distributed"]
    },
    {
      id: 2,
      title: "Literacy Development",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      description: "Establishing comprehensive reading programs and library resources that foster literacy and inspire a lifelong passion for learning among young students.",
      image: "/IDDY_SAMPLE.jpg",
      color: "from-orange-600 to-orange-800",
      achievements: ["Reading clubs established", "Library resources provided", "Literacy programs launched"]
    },
    {
      id: 3,
      title: "Health & Wellness",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      description: "Implementing comprehensive healthcare initiatives and nutritional support programs to ensure children's physical well-being supports their educational journey.",
      image: "/IDDY_SAMPLE.jpg",
      color: "from-orange-600 to-orange-800",
      achievements: ["Regular health assessments conducted", "Nutritional support programs", "Hygiene education implemented"]
    },
    {
      id: 4,
      title: "Community Engagement",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      description: "Building sustainable community partnerships that empower local villages to actively participate in and champion their children's educational development.",
      image: "/IDDY_SAMPLE.jpg",
      color: "from-orange-600 to-orange-800",
      achievements: ["Parent education workshops conducted", "Community centers established", "Local partnership networks developed"]
    }
  ];

  const founders = [
    {
      id: 1,
      name: 'Idrissa Abdallah',
      designation: 'Founder & Director',
      image: '/IDDY_SAMPLE.jpg',
      alt: 'Idrissa Abdallah',
    },
    {
      id: 2,
      name: 'Gideon Felix',
      designation: 'Founder & Assistant Director',
      image: '/GIDDYA4C.jpg',
      alt: 'Gideon Felix',
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-r from-blue-900 to-orange-600">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-black"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16 md:py-24">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">About Our Organization</h1>
            <p className="text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto">
              Committed to transforming lives through education and community development
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div className="mb-12 lg:mb-0">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 mb-6">
                Aid 4 Children Tanzania was founded in 2024 by two friends who shared a simple yet powerful belief that every child deserves the chance to learn, grow, and dream, no matter where they are born.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                The idea took shape during a visit to a remote village, where they met Asha, a young girl who walked several miles barefoot each day just to borrow old books from a nearby school. Despite the challenges, her determination to learn never faded.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                That encounter changed everything. Inspired by Asha&apos;s courage and resilience, they decided to turn compassion into action and Aid 4 Children Tanzania was born.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Since then, the organization has worked to reach more children like Asha by creating opportunities for education, access to essential resources, and a foundation for a brighter future.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Every project, every book, and every smile shared is guided by that same belief:
                When we give a child a chance, we give a community hope.
              </p>
            </div>
           <div className="relative h-96 rounded-xl p-[6px] overflow-hidden bg-gradient-to-r from-blue-600 via-blue-900 to-blue-900 animate-pulse-fast">
  <div className="relative w-full h-full rounded-lg overflow-hidden">
    <Image
      src="/EDUMISHA Maji matitu.jpg"
      alt="Children learning in classroom"
      layout="fill"
      objectFit="cover"
      className="rounded-lg"
    />
  </div>
</div>
          </div>
        </div>
      </section>

      {/* Mission and Vision Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {missionVision.map((item, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-6">{item.icon}</div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stories Section - Replaced Our Impact */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-900 to-blue-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Our Impact Initiatives</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Exploring our comprehensive programs that create lasting change in communities
            </p>
          </div>

          {/* Story Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {impactStories.map((story, index) => (
              <button 
                key={story.id}
                onClick={() => setActiveStory(index)}
                className={`px-6 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-3 cursor-pointer ${
                  activeStory === index
                    ? `bg-gradient-to-r ${story.color} text-white shadow-2xl transform scale-105`
                    : 'bg-white/10 text-blue-100 hover:bg-white/20 hover:transform hover:scale-105'
                }`}
              >
                <div className={`${activeStory === index ? 'text-white' : 'text-orange-400'}`}>
                  {story.icon}
                </div>
                <span>{story.title}</span>
              </button>
            ))}
          </div>

          {/* Active Story Display */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:shadow-3xl">
            <div className="lg:grid lg:grid-cols-2 lg:gap-0">
              <div className="relative h-80 lg:h-full">
                <Image
                  src={impactStories[activeStory].image}
                  alt={impactStories[activeStory].title}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent lg:hidden" />
                <div className="absolute bottom-6 left-6 lg:hidden">
                  <div className="flex items-center space-x-3 text-white">
                    <div className="p-2 bg-orange-600 rounded-lg">
                      {impactStories[activeStory].icon}
                    </div>
                    <h3 className="text-2xl font-bold">{impactStories[activeStory].title}</h3>
                  </div>
                </div>
              </div>
              
              <div className="p-8 lg:p-12">
                <div className="hidden lg:flex items-center space-x-4 mb-6">
                  <div className="p-3 bg-gradient-to-r from-orange-600 to-orange-800 rounded-xl text-white">
                    {impactStories[activeStory].icon}
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900">{impactStories[activeStory].title}</h3>
                </div>
                
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  {impactStories[activeStory].description}
                </p>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900 text-lg border-l-4 border-orange-600 pl-3">Key Achievements:</h4>
                  {impactStories[activeStory].achievements.map((achievement, idx) => (
                    <div key={idx} className="flex items-center space-x-4 group">
                      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-orange-600 to-orange-800 transform group-hover:scale-150 transition-transform duration-300"></div>
                      <span className="text-gray-600 group-hover:text-gray-900 transition-colors duration-300">{achievement}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex items-center space-x-3 text-sm text-gray-500">
                    <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span>Each initiative represents our commitment to sustainable community development</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Story Progress Dots */}
          <div className="flex justify-center space-x-3 mt-8">
            {impactStories.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveStory(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeStory === index
                    ? 'bg-orange-500 scale-125 shadow-lg'
                    : 'bg-white/40 hover:bg-white/60 hover:scale-110'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Founders Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Meet the Founders</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The visionary leadership behind our organization's success
            </p>
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 lg:gap-12">
            {founders.map((founder) => (
              <div
                key={founder.id}
                className="w-full md:w-[400px] group relative bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3"
              >
                <div className="relative h-80 overflow-hidden cursor-pointer">
                  <Image
                    src={founder.image}
                    alt={founder.alt}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  <div className="absolute top-4 right-4">
                    <div className="bg-gradient-to-r from-orange-600 to-orange-800 text-white px-3 py-1 rounded-full text-sm font-semibold transform group-hover:scale-110 transition-transform duration-300">
                      Founder
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform transition-transform duration-300 group-hover:translate-y-0">
                  <h3 className="text-2xl font-bold mb-1">{founder.name}</h3>
                  <p className="text-blue-100 font-medium">{founder.designation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Join Our Mission</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Whether you want to volunteer, donate, or partner with us, there are numerous ways to get involved and create meaningful impact in children's lives.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-4 bg-orange-600 to-orange-750 text-white font-semibold rounded-lg hover:from-orange-700 hover:to-orange-900 transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer">
              Support Our Cause
            </button>
            <button className="px-8 py-4 bg-gradient-to-r from-blue-700 to-blue-900 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-900 transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl border-0 cursor-pointer">
              Contact Our Team
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;