import Link from 'next/link';
import { Button } from './ui/button';

export default function CausesSection() {
  const causes = [
    {
      id: 1,
      title: "Edumisha",
      description: "Providing school supplies and scholarships to underprivileged children.",
      image: "/Edumisha_img.jpg"
    },
    {
      id: 2,
      title: "FooDonation",
      description: "Building wells and water purification systems in drought-affected areas.",
      image: "/FooDonation.jpg"
    },
    {
      id: 3,
      title: "A4C Afya Programme",
      description: "Creating safe spaces and rehabilitation programs for the homeless.",
      image: "/A4CAfya.jpg",
      isStory: true, // Add a flag to identify this as a story
      storyPath: "/stories/a4c-afya-story" // Specific path for the story
    }
  ];

  return (
    <section className="min-h-screen w-full bg-blue-950 text-white flex items-center justify-center py-20">
      <div className="container max-w-6xl px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Projects & Touching Stories</h2>
          <p className="text-lg text-white/90 max-w-3xl mx-auto">
            Join us in supporting these critical initiatives that change lives every day.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {causes.map((cause) => {
            // Check if this is the A4C Afya story card
            const isStoryCard = cause.isStory;
            
            return (
              <div 
                key={cause.id} 
                className={`
                  rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow 
                  ${isStoryCard ? 'bg-gradient-to-br from-orange-50 to-orange-50 border-2 border-orange-200' : 'bg-white'}
                  text-black relative group
                `}
              >
                {/* Flickering story badge */}
                {isStoryCard && (
                  <div className="absolute top-4 right-4 z-10">
                    <div className="relative">
                      {/* Glow effect behind the badge */}
                      <div className="absolute -inset-1 bg-gradient-to-r from-orange-800 to-orange-600 rounded-full blur opacity-75 animate-pulse group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Main badge with flickering animation */}
                      <div className="relative bg-gradient-to-r from-orange-800 to-orange-600 text-white text-xs font-bold px-3 py-1 rounded-full animate-[flicker_2s_ease-in-out_infinite]">
                        Featured Story
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Image */}
                <div className="h-48 bg-gray-200 relative overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center hover:scale-105 transition-transform duration-300"
                    style={{ backgroundImage: `url(${cause.image})` }}
                  ></div>
                  {isStoryCard && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className={`text-xl font-semibold mb-2 ${isStoryCard ? 'text-purple-800' : ''}`}>
                    {cause.title}
                  </h3>
                  <p className="text-gray-700 mb-6">{cause.description}</p>

                  {/* Conditional button based on whether it's a story */}
                  {isStoryCard ? (
                    <div className="relative">
                      {/* Glowing background effect for the button */}
                      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-lg blur opacity-60 animate-[pulse_2s_ease-in-out_infinite] group-hover:opacity-80 transition-opacity duration-300"></div>
                      
                      <Button asChild variant="default" 
                        className="relative w-full  
                          bg-gradient-to-r from-purple-600 to-pink-600
                          border-2 border-transparent
                          hover:from-purple-700 hover:to-pink-700
                          transition-all
                          duration-300
                          hover:scale-[1.02]
                          cursor-pointer
                          text-white
                          font-bold
                          animate-[gentlePulse_2.5s_ease-in-out_infinite]
                          shadow-lg hover:shadow-xl"
                      >
                        <Link href={cause.storyPath || "/stories"}>
                          <span className="flex items-center justify-center gap-2">
                            Read Story
                            <svg 
                              className="w-4 h-4 animate-[bounce_1.5s_ease-in-out_infinite]" 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24" 
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                            </svg>
                          </span>
                        </Link>
                      </Button>
                    </div>
                  ) : (
                    <Button asChild variant="default" 
                      className="w-full  
                        border-white
                        hover:text-white
                        transition-all
                        duration-300
                        hover:bg-orange-600 
                        hover:border-orange-600
                        hover:scale-105
                        cursor-pointer"
                    >
                      <Link href={`/causes/${cause.id}`}>View Project</Link>
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
            <Link href="/projects">View All Projects</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}