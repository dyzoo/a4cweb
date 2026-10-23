import Link from "next/link";
import { ArrowLeft, FolderOpen } from "lucide-react";
import { Counter } from "../../components/counter";
import connectDB from "@/lib/mongodb";
import Project from "@/models/project";
<<<<<<< HEAD
=======
import {
  HeartIcon,
  EyeIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
>>>>>>> 2cbd8cefdb585adf0cd21d003b55ef1454f6e062
import ProjectCard from "./project-card";
import { getSiteContent } from "@/lib/content";
import Reveal from "@/app/components/Reveal";

export const dynamic = "force-dynamic";

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
<<<<<<< HEAD
  const content = await getSiteContent();
  let projects: any[] = [];

  try {
    await connectDB();
    projects = JSON.parse(
      JSON.stringify(
        await Project.find({ published: { $ne: false } })
          .sort({ featured: -1, createdAt: -1 })
          .lean()
      )
    );
  } catch (error) {
    console.error("Unable to load projects:", error);
  }

  const totalBeneficiaries = projects.reduce(
    (sum, project) => sum + (Number(project.beneficiaries) || 0),
    0
  );
  const locations = new Set(projects.map((p) => p.location).filter(Boolean));
=======
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
>>>>>>> 2cbd8cefdb585adf0cd21d003b55ef1454f6e062

  return (
    <div className="bg-cream dark:bg-primary-900">
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary-900 py-20 text-white sm:py-24">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "26px 26px",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-3xl">
            <span className="section-eyebrow !text-accent-400">
              {content.projectsPage.eyebrow}
            </span>
            <h1 className="heading-xl mt-5 text-4xl text-white sm:text-5xl">
              {content.projectsPage.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
              {content.projectsPage.subtitle}
            </p>
          </Reveal>

<<<<<<< HEAD
          <div className="mt-10 grid max-w-2xl grid-cols-3 gap-4 border-t border-white/10 pt-8">
            <div>
              <p className="font-display text-3xl font-bold text-white">
                {projects.length}+
              </p>
              <p className="mt-1 text-[11px] uppercase tracking-wider text-white/50">
                Active projects
              </p>
=======
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
>>>>>>> 2cbd8cefdb585adf0cd21d003b55ef1454f6e062
            </div>
            <div>
<<<<<<< HEAD
              <p className="font-display text-3xl font-bold text-white">
                <Counter to={totalBeneficiaries || 150} duration={2200} />+
              </p>
              <p className="mt-1 text-[11px] uppercase tracking-wider text-white/50">
                Children reached
              </p>
=======
              <div className="text-3xl font-bold">
                <Counter to={15000} duration={2500} />+
              </div>
              <div className="text-blue-200">Target Children to Reach</div>
>>>>>>> 2cbd8cefdb585adf0cd21d003b55ef1454f6e062
            </div>
            <div>
<<<<<<< HEAD
              <p className="font-display text-3xl font-bold text-white">
                {locations.size || 1}+
              </p>
              <p className="mt-1 text-[11px] uppercase tracking-wider text-white/50">
                Communities
              </p>
=======
              <div className="text-3xl font-bold">
                <Counter to={50} duration={2500} />+
              </div>
              <div className="text-blue-200">Target Communities to Serve</div>
>>>>>>> 2cbd8cefdb585adf0cd21d003b55ef1454f6e062
            </div>
          </div>
        </div>
      </section>

<<<<<<< HEAD
      {/* Grid */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {projects.length === 0 ? (
            <div className="mx-auto max-w-md rounded-2xl border border-primary/10 bg-white p-10 text-center dark:border-white/10 dark:bg-primary-800">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary-50 text-primary dark:bg-white/10 dark:text-white">
                <FolderOpen className="h-6 w-6" />
              </span>
              <h2 className="mt-5 font-display text-xl font-bold text-primary dark:text-white">
                Projects coming soon
              </h2>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Our team is preparing the next round of community programmes.
                Please check back soon.
              </p>
              <Link
                href="/donate"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-600"
              >
                Support our work
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project: any) => (
                <Reveal key={project._id.toString()}>
                  <ProjectCard project={project} />
                </Reveal>
              ))}
            </div>
          )}

          <div className="mt-12 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-accent-600 dark:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Link>
=======
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
>>>>>>> 2cbd8cefdb585adf0cd21d003b55ef1454f6e062
          </div>
        </div>
      </section>
    </div>
  );
}