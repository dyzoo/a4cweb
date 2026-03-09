import Link from "next/link";
import { Counter } from "../../components/counter";
import connectDB from "@/lib/mongodb";
import Project from "@/models/project";
import {
  HeartIcon,
  EyeIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import ProjectCard from "./project-card";

interface ProjectType {
  _id: string;
  title: string;
  description: string;
  category: string;
  status: string;
  image: string;
  location: string;
  beneficiaries: number;
  duration: string;
  slug: string;
}

export default async function ProjectsPage() {
  let projects: ProjectType[] = [];
  let dbError: string | null = null;

  try {
    // Attempt to connect to database
    await connectDB();

    // Fetch projects if connection successful
    const data = await Project.find().lean();

    projects = JSON.parse(JSON.stringify(data));
  } catch (error) {
    console.error("Database connection error:", error);

    if (error instanceof Error) {
      dbError = error.message;
    } else {
      dbError = "Unknown database error";
    }

    // Fallback mock data
    projects = [
      {
        _id: "1",
        title: "EDUMISHA Tech Empowerment Initiative",
        description:
          "Equipping 150 underprivileged children with digital skills through a 30-day intensive program.",
        category: "Digital Education",
        status: "Active",
        image: "/EdTech.jpg",
        location: "Dar es Salaam, Tanzania",
        beneficiaries: 150,
        duration: "30 Days",
        slug: "A4C-Edumisha-project",
      },
      {
        _id: "2",
        title: "Sample Project 2",
        description: "Another impactful project description goes here.",
        category: "Healthcare",
        status: "Active",
        image: "/placeholder.jpg",
        location: "Arusha, Tanzania",
        beneficiaries: 200,
        duration: "60 Days",
        slug: "sample-project-2",
      },
    ];
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-900 to-orange-700 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-20"></div>

        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Our Projects</h1>

          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Transforming lives through sustainable development projects in
            Tanzania
          </p>

          {/* Error Banner */}
          {dbError && (
            <div className="mt-4 mx-auto max-w-2xl bg-yellow-500/20 backdrop-blur-sm border border-yellow-400 text-white px-4 py-2 rounded-lg text-sm">
              ⚠️ Using demo data. Database connection failed. Please check your
              network.
            </div>
          )}

          <div className="mt-8 flex flex-wrap justify-center gap-6">
            <div>
              <div className="text-3xl font-bold">{projects.length}+</div>
              <div className="text-blue-200">Active Projects</div>
            </div>

            <div>
              <div className="text-3xl font-bold">
                <Counter to={15000} duration={2500} />+
              </div>
              <div className="text-blue-200">Target Children to Reach</div>
            </div>

            <div>
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
        {projects.length === 0 ? (
          <p className="text-center text-gray-500">No projects found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
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