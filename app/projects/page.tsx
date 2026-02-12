// app/projects/page.tsx
'use client';

import { Counter } from '../components/counter';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { HeartIcon, EyeIcon, ArrowRightIcon, MapPinIcon } from '@heroicons/react/24/outline';




export default function ProjectsPage() {
  const projects = [
    {
      id: "1",
      title: 'A4C EDUMISHA PROJECT',
      description: 'Providing quality education to underprivileged children...',
      images: ['/Child_1.jpg', '/Child_2.jpg'],
      location: 'Dar es Salaam',
      impact: 'Reaching 500+ children yearly',
    },
    {
      id: "2",
      title: 'Healthcare Access Program',
      description: 'Ensuring children have access to basic healthcare services...',
      images: ['/proj1.jpg', '/proj2.jpg'],
      location: 'Arusha',
      impact: '500+ children vaccinated',
    },
    {
      id: "3",
      title: 'Clean Water Project',
      description: 'Building clean water wells and sanitation facilities...',
      images: ['/water1.jpg', '/water2.jpg'],
      location: 'Mwanza',
      impact: '3 wells built, 1000+ people served',
    },
  ];

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-900 to-orange-700 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Our Projects</h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Transforming lives through sustainable development projects in Tanzania
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold">{projects.length}+</div>
              <div className="text-blue-200">Active Projects</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">
                <Counter to={15000} duration={2500} />+
              </div>
              <div className="text-blue-200">Target Children to reach</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">
                <Counter to={50} duration={2500} />+
              </div>
              <div className="text-blue-200">Target Communities to Serve</div>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* -----------------------------------------------------
   PROJECT CARD + AUTO-SLIDING CAROUSEL
------------------------------------------------------ */
function ProjectCard({ project }: { project: any }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % project.images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [paused, project.images.length]);

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden group hover:-translate-y-2">
      
      {/* Image Carousel */}
      <div
        className="relative h-48 overflow-hidden cursor-pointer"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <img
          src={project.images[current]}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-6 bg-gradient-to-br from-blue-50 via-white to-orange-50">
        <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600">
          {project.title}
        </h3>

        <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>

        <div className="flex items-center text-sm text-gray-500 mb-3">
          <MapPinIcon className="h-4 w-4 mr-2" />
          {project.location}
        </div>

        <div className="bg-blue-100 rounded-lg p-3 mb-4">
          <div className="text-sm font-semibold text-blue-800 flex items-center">
            <HeartIcon className="h-4 w-4 mr-2" />
            Target: {project.impact}
          </div>
        </div>

        {/* View Button (Dynamic Route) */}
        <Link
          href={`/projects/${project.id.toString()}`}
          className="w-full block text-center bg-blue-900 text-white py-2 rounded-lg font-semibold hover:bg-blue-800 transition"
        >
          <EyeIcon className="h-4 w-4 inline-block mr-2" />
          View Project
        </Link>
      </div>
    </div>
  );
}
