
import Link from "next/link";
import { Counter } from "../../components/counter";
import connectDB from "@/lib/mongodb";
import Project from "@/models/project";


import {
  HeartIcon,
  EyeIcon,
  MapPinIcon,
} 
from "@heroicons/react/24/outline";
import ProjectCard from "./project-card";

export default async function ProjectsPage() {
  await connectDB();

  const projects = JSON.parse(
  JSON.stringify(await Project.find().lean())
);


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-900 to-orange-700 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-20"></div>

        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Our Projects
          </h1>

          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Transforming lives through sustainable development projects in Tanzania
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-6">
            <div>
              <div className="text-3xl font-bold">
                {projects.length}+
              </div>
              <div className="text-blue-200">
                Active Projects
              </div>
            </div>

            <div>
              <div className="text-3xl font-bold">
                <Counter to={15000} duration={2500} />+
              </div>
              <div className="text-blue-200">
                Target Children to Reach
              </div>
            </div>

            <div>
              <div className="text-3xl font-bold">
                <Counter to={50} duration={2500} />+
              </div>
              <div className="text-blue-200">
                Target Communities to Serve
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {projects.length === 0 ? (
          <p className="text-center text-gray-500">
            No projects found.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project: any) => (
              <ProjectCard
                key={project._id.toString()}
                project={project}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
