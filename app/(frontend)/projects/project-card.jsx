'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowUpRight,
  CalendarDays,
  Image as ImageIcon,
  MapPin,
  Users,
} from 'lucide-react';

export default function ProjectCard({ project }) {
  const projectSlug = project.slug || project._id?.toString();
  const [imgError, setImgError] = useState(false);

  const imageSrc =
    project?.image || project?.imageUrl || '/EdTech.jpg';
  const progress = Math.min(
    100,
    Math.max(0, Number(project?.fundingProgress) || 0)
  );

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-primary/10 bg-white transition-all duration-500 hover:-translate-y-2 hover:border-accent/30 hover:shadow-card dark:border-white/10 dark:bg-primary-800">
      <div className="relative h-56 overflow-hidden bg-primary-50">
        {!imgError ? (
          <Image
            src={imageSrc}
            alt={project?.title || 'Project image'}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            onError={() => setImgError(true)}
            unoptimized
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-primary-50 text-gray-400">
            <ImageIcon className="h-10 w-10" />
            <span className="text-xs">Image not available</span>
          </div>
        )}
<<<<<<< HEAD
        <div className="absolute inset-0 bg-gradient-to-t from-primary-900/70 via-primary-900/10 to-transparent" />

        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary backdrop-blur">
          {project?.category || 'Community'}
        </span>
        <span className="absolute right-4 top-4 rounded-full bg-emerald-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
=======
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4 bg-blue-900 text-white px-4 py-1 rounded-full text-sm font-semibold z-10">
          {project?.category || 'Digital Education'}
        </div>
        
        {/* Status Badge */}
        <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold z-10">
>>>>>>> 2cbd8cefdb585adf0cd21d003b55ef1454f6e062
          {project?.status || 'Active'}
        </span>

        <span className="absolute -bottom-5 right-5 flex h-11 w-11 items-center justify-center rounded-full bg-accent text-white shadow-lg transition-transform duration-500 group-hover:rotate-45">
          <ArrowUpRight className="h-5 w-5" />
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6 pt-8">
        <h3 className="line-clamp-2 font-display text-xl font-bold text-primary dark:text-white">
          {project?.title || 'Untitled project'}
        </h3>
        <p className="mt-3 line-clamp-2 flex-1 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
          {project?.description || 'Project details coming soon.'}
        </p>

        <div className="mt-5 grid grid-cols-2 gap-3 text-xs text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5 text-accent-600" />
            {project?.beneficiaries ? `${project.beneficiaries}+` : '—'} beneficiaries
          </span>
          <span className="flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5 text-accent-600" />
            {project?.duration || 'Ongoing'}
          </span>
          <span className="col-span-2 flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-accent-600" />
            {project?.location || 'Tanzania'}
          </span>
        </div>

<<<<<<< HEAD
        <div className="mt-5">
          <div className="mb-1.5 flex items-center justify-between text-xs">
            <span className="text-gray-500 dark:text-gray-400">Funding progress</span>
            <span className="font-semibold text-accent-600">{progress}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-accent to-accent-400 transition-all duration-700"
              style={{ width: `${progress}%` }}
=======
        {/* Location */}
        <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
          <MapPin className="w-4 h-4 text-blue-600" />
          <span>{project?.location || 'Dar es Salaam, Tanzania'}</span>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Funding Progress</span>
            <span className="font-semibold text-blue-900">{project?.fundingProgress || 5}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-900 h-2 rounded-full transition-all duration-500"
              style={{ width: `${project?.fundingProgress || 5}%` }}
>>>>>>> 2cbd8cefdb585adf0cd21d003b55ef1454f6e062
            />
          </div>
        </div>

<<<<<<< HEAD
        <Link
          href={`/projects/${projectSlug}`}
          className="mt-6 inline-flex items-center justify-between rounded-full border border-primary/15 px-5 py-2.5 text-sm font-semibold text-primary transition-all duration-300 hover:border-primary hover:bg-primary hover:text-white dark:border-white/15 dark:text-white dark:hover:bg-white dark:hover:text-primary"
        >
          View project
          <ArrowUpRight className="h-4 w-4" />
=======
        {/* Action Button */}
        <Link href={`/projects/${projectSlug}`} className="block">
          <button className="w-full bg-blue-900 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group">
            View Project Details
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
>>>>>>> 2cbd8cefdb585adf0cd21d003b55ef1454f6e062
        </Link>
      </div>
    </article>
  );
}
