// app/(frontend)/projects/[slug]/page.jsx
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  Calendar, 
  Users, 
  MapPin, 
  Target, 
  BookOpen,
  Clock,
  Heart,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

const projectData = {
  'A4C-Edumisha-project': {
    id: 1,
    title: 'EDUMISHA Tech Empowerment Initiative',
    subtitle: 'Bridging the Digital Divide Through Education',
    category: 'Digital Education',
    status: 'Active',
    heroImage: '/EdTech.jpg',
    overview: 'The EDUMISHA Project equips 150 underprivileged children aged 12-17 with essential digital and emerging technology skills through a structured 30-day intensive program. Participants receive hands-on training in computer applications, graphic design, web development, and AI literacy, with each student receiving a laptop to keep upon successful completion.',
    beneficiaries: 150,
    ageRange: '12-17 years',
    duration: '30 Days',
    location: 'Dar es Salaam, Tanzania',
    background: 'Many Tanzanian youth face financial barriers limiting access to technology education. Inspired by a founder who overcame similar challenges, EDUMISHA provides structured, hands-on exposure to digital skills, removing barriers to entry in the tech economy.',
    objectives: [
      'Provide digital skills training to 150 underprivileged youth',
      'Bridge the digital divide through laptop ownership',
      'Eliminate barriers with daily meals and transportation',
      'Enhance employability through mentorship',
      'Track long-term impact through alumni monitoring'
    ],
    curriculum: [
      'Computer Basics & Office Applications',
      'Graphic Design (Photoshop, Illustrator, Canva)',
      'Introduction to Web Development',
      'AI Literacy & Emerging Technologies'
    ],
    supportServices: {
      meals: 'Daily meals during training',
      transportation: 'Transportation support',
      mentorship: 'Career guidance and mentorship'
    },
    impact: [
      '150 youth trained annually',
      'Laptop ownership for continued learning',
      'Alumni network for ongoing support',
      'Pathways to employment and entrepreneurship'
    ]
  }
};

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = projectData[slug];
  
  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[500px] w-full">
        <Image
          src={project.heroImage}
          alt={project.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 py-12">
          <div className="max-w-4xl">
            <div className="flex gap-3 mb-4">
              <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold">
                {project.category}
              </span>
              <span className="bg-green-500 text-white px-4 py-1.5 rounded-full text-sm font-semibold">
                {project.status}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {project.title}
            </h1>
            <p className="text-xl text-gray-200">
              {project.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="border-b bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-6 py-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              <span className="font-semibold">{project.beneficiaries} Beneficiaries</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <span className="font-semibold">{project.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              <span className="font-semibold">{project.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <section className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-blue-600" />
                Project Overview
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {project.overview}
              </p>
            </section>

            {/* Background */}
            <section className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Target className="w-6 h-6 text-blue-600" />
                Background
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {project.background}
              </p>
            </section>

            {/* Objectives */}
            <section className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Objectives</h2>
              <ul className="space-y-3">
                {project.objectives.map((objective, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{objective}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Curriculum */}
            <section className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Training Curriculum</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {project.curriculum.map((course, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-3 text-gray-700">
                    {course}
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Key Information */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold mb-4">Key Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Beneficiaries</span>
                  <span className="font-semibold">{project.beneficiaries}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Age Range</span>
                  <span className="font-semibold">{project.ageRange}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-semibold">{project.duration}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Location</span>
                  <span className="font-semibold">{project.location}</span>
                </div>
              </div>
            </div>

            {/* Support Services */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold mb-4">Support Services</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-gray-700">
                  <Heart className="w-4 h-4 text-red-500" />
                  {project.supportServices.meals}
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <MapPin className="w-4 h-4 text-blue-500" />
                  {project.supportServices.transportation}
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <Users className="w-4 h-4 text-green-500" />
                  {project.supportServices.mentorship}
                </li>
              </ul>
            </div>

            {/* Impact */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold mb-4">Expected Impact</h3>
              <ul className="space-y-2">
                {project.impact.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Link href="/donate" className="block">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all">
                  Donate to This Project
                </button>
              </Link>
              <Link href="/become-a-volunteer" className="block">
                <button className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-3 px-4 rounded-lg transition-all">
                  Become a Volunteer
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}