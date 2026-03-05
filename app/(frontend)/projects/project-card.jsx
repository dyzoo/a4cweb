// components/ProjectCard.jsx
'use client'
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Users, MapPin, ArrowRight, Image as ImageIcon } from 'lucide-react';
import { useState } from 'react';

export default function ProjectCard({ project }) {
  const projectSlug = project.slug || project.id?.toString();
  const [imgError, setImgError] = useState(false);
  
  // Provide a fallback image path
  const imageSrc = project?.image || '/EdTech.jpg'; // Use your existing image as fallback
  
  // Log for debugging
  console.log('Project image path:', imageSrc);
  
  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      {/* Image Container */}
      <div className="relative h-56 w-full overflow-hidden bg-gray-100">
        {!imgError ? (
          <Image
            src={imageSrc}
            alt={project?.title || 'Project image'}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            onError={() => {
              console.error('Failed to load image:', imageSrc);
              setImgError(true);
            }}
            unoptimized // Bypass Next.js image optimization for this case
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100">
            <ImageIcon className="w-12 h-12 text-gray-400 mb-2" />
            <span className="text-sm text-gray-500">Image not available</span>
          </div>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold z-10">
          {project?.category || 'Digital Education'}
        </div>
        
        {/* Status Badge */}
        <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold z-10">
          {project?.status || 'Active'}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2 line-clamp-2">
          {project?.title || 'EDUMISHA Project'}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-2">
          {project?.description || 'Empowering underprivileged children with digital skills.'}
        </p>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Users className="w-4 h-4 text-blue-600" />
            <span>{project?.beneficiaries || 150}+ Beneficiaries</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4 text-blue-600" />
            <span>{project?.duration || '30 Days'}</span>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
          <MapPin className="w-4 h-4 text-blue-600" />
          <span>{project?.location || 'Dar es Salaam, Tanzania'}</span>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Funding Progress</span>
            <span className="font-semibold text-blue-600">{project?.fundingProgress || 45}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${project?.fundingProgress || 45}%` }}
            />
          </div>
        </div>

        {/* Action Button */}
        <Link href={`/projects/${projectSlug}`} className="block">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group">
            View Project Details
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </Link>
      </div>
    </div>
  );
}