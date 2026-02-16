"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  HeartIcon,
  EyeIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

export default function ProjectCard({ project }: { project: any }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const images =
    project.images && project.images.length > 0
      ? project.images
      : [project.imageUrl];

  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [paused, images.length]);

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden group hover:-translate-y-2">
      
      {/* Image Carousel */}
      <div
        className="relative h-48 overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <img
          src={images[current]}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-6 bg-gradient-to-br from-blue-50 via-white to-orange-50">
        <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600">
          {project.title}
        </h3>

        <p className="text-gray-600 mb-4 line-clamp-2">
          {project.description}
        </p>

        {project.location && (
          <div className="flex items-center text-sm text-gray-500 mb-3">
            <MapPinIcon className="h-4 w-4 mr-2" />
            {project.location}
          </div>
        )}

        {project.impact && (
          <div className="bg-blue-100 rounded-lg p-3 mb-4">
            <div className="text-sm font-semibold text-blue-800 flex items-center">
              <HeartIcon className="h-4 w-4 mr-2" />
              Target: {project.impact}
            </div>
          </div>
        )}

        {/* View Button */}
        <Link
          href={`/projects/${project.slug}`}
          className="w-full block text-center bg-blue-900 text-white py-2 rounded-lg font-semibold hover:bg-blue-800 transition"
        >
          <EyeIcon className="h-4 w-4 inline-block mr-2" />
          View Project
        </Link>
      </div>
    </div>
  );
}
