import Link from 'next/link';
import { Button } from './ui/button';

export default function VolunteerSection() {
  return (
    <section className="py-20 bg-blue-950 text-white">
      <div className="container max-w-6xl px-4 mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          
          {/* Left: Text Content */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Become a Volunteer</h2>
            <p className="text-lg mb-6">
              Your time and skills can change lives. Join our team of dedicated volunteers making a difference in communities around the world.
            </p>
           <Link href="/BecomeVolunteer">
  <Button 
    variant="secondary" 
    size="lg"
    className="bg-gradient-to-r from-orange-600 to-orange-800 text-white font-bold hover:from-orange-700 hover:to-orange-900 transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border-0 cursor-pointer"
  >
    Join Our Team
  </Button>
</Link>

          </div>

          {/* Right: Info Cards */}
          <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            {[
              {
                title: "Local Opportunities",
                text: "Help in your community with food drives, tutoring, and more.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                ),
              },
              {
                title: "Global Missions",
                text: "Travel with us to provide aid in underserved regions.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
              {
                title: "Virtual Volunteering",
                text: "Contribute remotely with your professional skills.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
              },
              {
                title: "Corporate Programs",
                text: "Engage your workplace in team volunteering.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                ),
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-blue-500/30 hover:bg-blue-500/50 p-6 rounded-lg transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl border border-blue-400/30 hover:border-blue-300/50 group cursor-pointer"
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 p-2 bg-orange-500/20 rounded-lg group-hover:bg-orange-500/30 transition-colors duration-300">
                    <div className="text-orange-400 group-hover:text-orange-300 transition-colors duration-300">
                      {item.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-white transition-colors duration-300">{item.title}</h3>
                    <p className="text-sm text-white/90 group-hover:text-white transition-colors duration-300">{item.text}</p>
                  </div>
                </div>
                
                {/* Animated underline effect */}
                <div className="w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-500 mt-3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}