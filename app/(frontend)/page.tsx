import HeroSection from '../components/HeroSection';
import MissionSection from '../components/MissionSection';
import CausesSection from '../components/CausesSection';
import Testimonials from '../components/Testimonials';
import EventsSection from '../components/EventsSection';
import VolunteerSection from '../components/VolunteerSection';
import Navbar from '@/app/components/Navbar';
import Partners from '../components/Partners';
import Footer from '../components/Footer';
import MeetTheFounders from '../components/MeetTheFounders';
import CharitySectionTailwind from '../components/CharitySectionTailwind';
 



export default function Home() {
  return (
    <main className="min-h-screen">
      
      <HeroSection />
      <MissionSection />
      <CharitySectionTailwind />

      <CausesSection />
      <EventsSection />
      <MeetTheFounders />
      <VolunteerSection />
      <Testimonials />
      <Partners />
      
      
      
      
    </main>
  );
}