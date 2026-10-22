import Link from "next/link";
import { ArrowLeft, FolderOpen } from "lucide-react";
import { Counter } from "../../components/counter";
import connectDB from "@/lib/mongodb";
import Project from "@/models/project";
import ProjectCard from "./project-card";
import { getSiteContent } from "@/lib/content";
import Reveal from "@/app/components/Reveal";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
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

          <div className="mt-10 grid max-w-2xl grid-cols-3 gap-4 border-t border-white/10 pt-8">
            <div>
              <p className="font-display text-3xl font-bold text-white">
                {projects.length}+
              </p>
              <p className="mt-1 text-[11px] uppercase tracking-wider text-white/50">
                Active projects
              </p>
            </div>
            <div>
              <p className="font-display text-3xl font-bold text-white">
                <Counter to={totalBeneficiaries || 150} duration={2200} />+
              </p>
              <p className="mt-1 text-[11px] uppercase tracking-wider text-white/50">
                Children reached
              </p>
            </div>
            <div>
              <p className="font-display text-3xl font-bold text-white">
                {locations.size || 1}+
              </p>
              <p className="mt-1 text-[11px] uppercase tracking-wider text-white/50">
                Communities
              </p>
            </div>
          </div>
        </div>
      </section>

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
          </div>
        </div>
      </section>
    </div>
  );
}
