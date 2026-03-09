// app/(frontend)/projects/[slug]/page.jsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { notFound, useParams } from 'next/navigation';
import { 
  Calendar, 
  Users, 
  MapPin, 
  Target, 
  BookOpen,
  Clock,
  Heart,
  CheckCircle,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Gift,
  GraduationCap,
  Laptop,
  Sparkles,
  Award,
  TrendingUp,
  Globe,
  Camera,
  ChevronLeft,
  ChevronRight,
  DollarSign
} from 'lucide-react';

// Mock data - This will be replaced with API calls to your backend
const projectData = {
  'A4C-Edumisha-project': {
    id: 1,
    title: 'EDUMISHA Tech Empowerment Initiative',
    subtitle: 'Bridging the Digital Divide Through Education',
    category: 'Digital Education',
    status: 'Active',
    heroImage: '/EdTech.jpg',
    heroVideo: null,
    overview: 'The EDUMISHA Project equips 150 underprivileged children aged 12-17 with essential digital and emerging technology skills through a structured 30-day intensive program. Participants receive hands-on training in computer applications, graphic design, web development, and AI literacy, with each student receiving a laptop to keep upon successful completion.',
    fullDescription: 'The EDUMISHA Program, derived from "Education" and the Swahili term "Dumisha" (to sustain), is a flagship initiative of Aid 4 Children Tanzania. The program is designed to sustain and strengthen access to quality education for children facing economic and social barriers. With the rapid rise of global digital transformation, acquiring technology skills is no longer a luxury but a necessity. The lack of access to digital tools and education severely limits the potential of Tanzanian youth, contributing to unemployment and economic hardship.',
    beneficiaries: 150,
    ageRange: '12-17 years',
    duration: '30 Days',
    location: 'Dar es Salaam, Tanzania',
    budget: '$76,000',
    completionRate: 75,
    startDate: 'June 2024',
    endDate: 'December 2024',
    background: 'Many Tanzanian youth face financial barriers limiting access to technology education. Inspired by a founder who overcame similar challenges, EDUMISHA provides structured, hands-on exposure to digital skills, removing barriers to entry in the tech economy.',
    challenge: 'The digital divide in Tanzania prevents talented youth from accessing opportunities in graphic design, web development, and AI fields due to lack of foundational training and resources.',
    solution: 'EDUMISHA bridges this gap through intensive training, laptop provision, meals, transportation, and ongoing mentorship, creating a complete ecosystem for success.',
 
    carouselImages: [
      { id: 1, url: '/A4C_Graphics.jpg', caption: 'Students learning graphic design' },
      { id: 2, url: '/A4C_Coding.jpg', caption: 'Coding workshop in progress' },
      { id: 3, url: '/A4C_Handout.jpg', caption: 'Laptop distribution ceremony' },
      { id: 4, url: '/A4C_Graduu.jpg', caption: 'Graduation day celebration' }
    ],
    objectives: [
      'Provide digital skills training to 150 underprivileged youth',
      'Bridge the digital divide through laptop ownership',
      'Eliminate barriers with daily meals and transportation',
      'Enhance employability through mentorship',
      'Track long-term impact through alumni monitoring'
    ],
    curriculum: [
      {
        module: 'Module 1: Computer Basics',
        description: 'Fundamentals of computing, file management, and internet navigation',
        duration: '5 days',
        topics: ['Operating Systems', 'File Management', 'Internet Basics', 'Email Communication', 'Online Safety']
      },
      {
        module: 'Module 2: Office Applications',
        description: 'Practical skills in productivity software',
        duration: '7 days',
        topics: ['Word Processing', 'Spreadsheets', 'Presentations', 'Document Formatting', 'Data Entry']
      },
      {
        module: 'Module 3: Graphic Design',
        description: 'Introduction to design tools and principles',
        duration: '6 days',
        topics: ['Photoshop Basics', 'Canva for Beginners', 'Color Theory', 'Typography', 'Logo Design']
      },
      {
        module: 'Module 4: Web Development',
        description: 'Building blocks of the web',
        duration: '7 days',
        topics: ['HTML5', 'CSS3', 'Responsive Design', 'Introduction to JavaScript', 'Building a Personal Website']
      },
      {
        module: 'Module 5: AI Literacy',
        description: 'Understanding and using AI tools',
        duration: '5 days',
        topics: ['What is AI?', 'AI Tools Overview', 'ChatGPT Basics', 'AI Ethics', 'Future of AI']
      }
    ],
    supportServices: {
      meals: 'Daily nutritious meals during training to ensure focus and energy',
      transportation: 'Transportation support to remove barriers to attendance',
      mentorship: 'Career guidance and mentorship from industry professionals',
      healthcare: 'Basic health checks and first aid during the program',
      counseling: 'Emotional and social support throughout the journey'
    },
    impact: [
      '150 youth trained annually with practical tech skills',
      '100% laptop ownership for program graduates',
      '85% of graduates pursue further education or employment',
      'Active alumni network of 450+ members',
      'Community multiplier effect through peer training'
    ],
    faqs: [
      {
        question: 'Who is eligible for the program?',
        answer: 'Children and teenagers aged 12-17 from disadvantaged backgrounds with an interest in technology but limited access to resources.'
      },
      {
        question: 'How are participants selected?',
        answer: 'Through partnerships with schools, orphanages, and community centers, we identify youth who demonstrate enthusiasm and commitment.'
      },
      {
        question: 'What happens after graduation?',
        answer: 'Graduates join our alumni network with access to refresher workshops, internship referrals, and ongoing career guidance.'
      },
      {
        question: 'How is the program funded?',
        answer: 'Through partnerships with tech companies, NGOs, government agencies, and generous individual donors.'
      }
    ]
  }
};

// Accordion Component - First one open by default
const Accordion = ({ title, children, defaultOpen = false, index }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 bg-gray-50 dark:bg-gray-800/80 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        <span className="font-semibold text-gray-900 dark:text-white text-lg">{title}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-orange-600 dark:text-orange-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-orange-600 dark:text-orange-400" />
        )}
      </button>
      {isOpen && (
        <div className="p-5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300">
          {children}
        </div>
      )}
    </div>
  );
};

// Image Carousel Component
const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };
  
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };
  
  if (!images || images.length === 0) return null;
  
  return (
    <div className="relative h-64 md:h-80 rounded-xl overflow-hidden group shadow-lg">
      <Image
        src={images[currentIndex].url}
        alt={images[currentIndex].caption}
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      
      {/* Caption */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <p className="text-sm font-medium">{images[currentIndex].caption}</p>
        <p className="text-xs text-gray-300 mt-1">{currentIndex + 1} / {images.length}</p>
      </div>
      
      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
      
      {/* Dots */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex 
                ? 'w-6 bg-orange-500' 
                : 'w-2 bg-white/60 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// Mini Carousel for sidebar
const MiniCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };
  
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };
  
  if (!images || images.length === 0) return null;
  
  return (
    <div className="relative h-48 rounded-xl overflow-hidden group shadow-md">
      <Image
        src={images[currentIndex].url}
        alt={images[currentIndex].caption}
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      
      <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
        <p className="text-xs">{images[currentIndex].caption}</p>
      </div>
      
      <button
        onClick={prevSlide}
        className="absolute left-1 top-1/2 -translate-y-1/2 w-6 h-6 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-1 top-1/2 -translate-y-1/2 w-6 h-6 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
      
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-1">
        {images.map((_, index) => (
          <div
            key={index}
            className={`h-1 rounded-full transition-all ${
              index === currentIndex ? 'w-3 bg-orange-500' : 'w-1 bg-white/60'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// Stat Card Component
const StatCard = ({ icon: Icon, label, value, color = 'blue' }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-gray-700">
    <div className={`w-10 h-10 rounded-lg bg-${color}-100 dark:bg-${color}-900/30 flex items-center justify-center mb-3`}>
      <Icon className={`w-5 h-5 text-${color}-600 dark:text-${color}-400`} />
    </div>
    <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
    <p className="text-xl font-bold text-gray-900 dark:text-white">{value}</p>
  </div>
);

// Main Component
export default function ProjectPage() {
  const params = useParams();
  const slug = params.slug;
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setProject(projectData[slug]);
      } catch (error) {
        console.error('Error fetching project:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="w-16 h-16 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!project) {
    notFound();
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BookOpen },
    { id: 'curriculum', label: 'Curriculum', icon: GraduationCap },
    { id: 'impact', label: 'Impact', icon: TrendingUp },
    
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative h-[70vh] min-h-[600px] w-full">
        <Image
          src={project.heroImage}
          alt={project.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
        
        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 py-16">
          <div className="max-w-4xl">
            <div className="flex flex-wrap gap-3 mb-4">
              <span className="bg-orange-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg">
                {project.category}
              </span>
              <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg">
                {project.status}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              {project.title}
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl">
              {project.subtitle}
            </p>
            
            {/* Quick Action Buttons */}
            <div className="flex flex-wrap gap-4 mt-8">
              <Link href="/donate">
                <button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg flex items-center gap-2 cursor-pointer">
                  <Heart className="w-5 h-5" />
                  Support This Project
                </button>
              </Link>
              <Link href="/become-volunteer">
                <button className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-2 border-white px-8 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 cursor-pointer">
                  <Users className="w-5 h-5" />
                  Volunteer
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto hide-scrollbar">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium text-sm transition-colors border-b-2 ${
                    activeTab === tab.id
                      ? 'border-orange-600 text-orange-600 dark:text-orange-400'
                      : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Overview Section */}
              <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                  Project Overview
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  {project.overview}
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {project.fullDescription}
                </p>
              </section>

              {/* Challenge & Solution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border-l-4 border-red-500">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">The Challenge</h3>
                  <p className="text-gray-700 dark:text-gray-300">{project.challenge}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border-l-4 border-green-500">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Our Solution</h3>
                  <p className="text-gray-700 dark:text-gray-300">{project.solution}</p>
                </div>
              </div>

              {/* Objectives */}
              <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Target className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                  Key Objectives
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.objectives.map((objective, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300">{objective}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Accordions - First one open by default */}
              <Accordion title="Background & History" defaultOpen={true} index={0}>
                <p className="text-gray-700 dark:text-gray-300 mb-4">{project.background}</p>
                <p className="text-gray-700 dark:text-gray-300">
                  The founders of Aid 4 Children Tanzania, including a professional graphic designer who personally overcame similar challenges, understand the transformative power of technology. This experience inspired the creation of the EDUMISHA Project.
                </p>
              </Accordion>

              <Accordion title="Support Services" defaultOpen={false} index={1}>
                <div className="space-y-3">
                  {Object.entries(project.supportServices).map(([key, value]) => (
                    <div key={key} className="flex items-start gap-3">
                      <Heart className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-gray-900 dark:text-white capitalize">{key}: </span>
                        <span className="text-gray-700 dark:text-gray-300">{value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Accordion>

              <Accordion title="Frequently Asked Questions" defaultOpen={false} index={2}>
                <div className="space-y-4">
                  {project.faqs.map((faq, index) => (
                    <div key={index} className="border-b border-gray-200 dark:border-gray-700 last:border-0 pb-4 last:pb-0">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{faq.question}</h4>
                      <p className="text-gray-700 dark:text-gray-300">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </Accordion>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Mini Carousel - Replaces Success Stories & Partners */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Camera className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  Project Highlights
                </h3>
                <MiniCarousel images={project.carouselImages || project.gallery.slice(0, 4)} />
              </div>

              {/* Key Information Card - Moved to bottom */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Quick Facts</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                    <Users className="w-5 h-5 text-blue-600 dark:text-blue-400 mb-1" />
                    <p className="text-xs text-gray-600 dark:text-gray-400">Beneficiaries</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">{project.beneficiaries}</p>
                  </div>
                  <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg">
                    <Clock className="w-5 h-5 text-orange-600 dark:text-orange-400 mb-1" />
                    <p className="text-xs text-gray-600 dark:text-gray-400">Duration</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">{project.duration}</p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                    <MapPin className="w-5 h-5 text-green-600 dark:text-green-400 mb-1" />
                    <p className="text-xs text-gray-600 dark:text-gray-400">Location</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white truncate">{project.location}</p>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
                    <DollarSign className="w-5 h-5 text-purple-600 dark:text-purple-400 mb-1" />
                    <p className="text-xs text-gray-600 dark:text-gray-400">Budget</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">{project.budget}</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600 dark:text-gray-400">Completion Progress</span>
                    <span className="font-semibold text-orange-600 dark:text-orange-400">{project.completionRate}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-orange-600 rounded-full transition-all duration-500"
                      style={{ width: `${project.completionRate}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Link href="/donate" className="block">
                  <button className="w-full bg-blue-900 hover:bg-orange-700 text-white font-semibold py-3 px-4 rounded-lg transition-all transform hover:scale-105 shadow-md flex items-center justify-center gap-2 cursor-pointer">
                    <Heart className="w-5 h-5" />
                    Donate to This Project
                  </button>
                </Link>
                <Link href="/become-volunteer" className="block">
                  <button className="w-full border-2 border-orange-600 text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20 font-semibold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer">
                    <Users className="w-5 h-5" />
                    Become a Volunteer
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Curriculum Tab */}
        {activeTab === 'curriculum' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Training Curriculum</h2>
              {project.curriculum.map((module, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                  <div className="bg-orange-600 px-6 py-4">
                    <h3 className="text-lg font-bold text-white">{module.module}</h3>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-700 dark:text-gray-300 mb-4">{module.description}</p>
                    <p className="text-sm text-orange-600 dark:text-orange-400 font-semibold mb-3">Duration: {module.duration}</p>
                    <div className="space-y-2">
                      <p className="font-semibold text-gray-900 dark:text-white">Topics covered:</p>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {module.topics.map((topic, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sticky top-24">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Learning Outcomes</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Laptop className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">Master essential computer applications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Sparkles className="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">Create professional designs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Globe className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">Build responsive websites</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Award className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">Understand AI fundamentals</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Impact Tab */}
        {activeTab === 'impact' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Impact</h2>
              
              {/* Impact Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">150+</div>
                  <p className="text-gray-600 dark:text-gray-400">Youth Trained Annually</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center">
                  <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">100%</div>
                  <p className="text-gray-600 dark:text-gray-400">Laptop Ownership</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">85%</div>
                  <p className="text-gray-600 dark:text-gray-400">Employment/Education Rate</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">450+</div>
                  <p className="text-gray-600 dark:text-gray-400">Alumni Network</p>
                </div>
              </div>

              {/* Impact List */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Key Impact Areas</h3>
                <ul className="space-y-4">
                  {project.impact.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Long-term Vision */}
              <div className="bg-gradient-to-r from-blue-600 to-orange-600 rounded-2xl shadow-lg p-8 text-white">
                <h3 className="text-xl font-bold mb-4">Our Long-term Vision</h3>
                <p className="text-white/90 leading-relaxed">
                  To create a sustainable ecosystem where every graduate becomes a mentor, creating a ripple effect of digital empowerment across Tanzania. Through our alumni network, we aim to reach 1000+ youth by 2028.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Mini Carousel in Impact Tab */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sticky top-24">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Camera className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  Impact in Images
                </h3>
                <MiniCarousel images={project.carouselImages || project.gallery.slice(0, 4)} />
              </div>
            </div>
          </div>
        )}

        {/* Gallery Tab */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Project Gallery</h2>
            
            {/* Main Carousel */}
            <ImageCarousel images={project.gallery} />
            
            {/* Thumbnail Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {project.gallery.map((image, index) => (
                <div key={image.id} className="relative h-32 rounded-lg overflow-hidden cursor-pointer hover:opacity-75 transition-opacity shadow-md">
                  <Image
                    src={image.url}
                    alt={image.caption}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}