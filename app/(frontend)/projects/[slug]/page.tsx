import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock,
  Heart,
  MapPin,
  Target,
  Users,
} from "lucide-react";
import connectDB from "@/lib/mongodb";
import Project from "@/models/project";

export const dynamic = "force-dynamic";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let project: any = null;
  try {
    await connectDB();
    project = await Project.findOne({ slug }).lean();
  } catch (error) {
    console.error("Unable to load project:", error);
  }

  if (!project) {
    notFound();
  }

  const image = project.image || project.imageUrl || "/EdTech.jpg";
  const overview =
    project.overview || project.longDescription || project.description || "";
  const objectives = Array.isArray(project.objectives) ? project.objectives : [];
  const curriculum = Array.isArray(project.curriculum) ? project.curriculum : [];
  const impact = Array.isArray(project.impact) ? project.impact : [];
  const support = project.supportServices || {};
  const progress = Math.min(100, Math.max(0, Number(project.fundingProgress) || 0));

  return (
    <div className="bg-cream dark:bg-primary-900">
      {/* Hero */}
      <section className="relative isolate min-h-[58vh] overflow-hidden bg-primary-900 text-white">
        <Image
          src={image}
          alt={project.title}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-900 via-primary-900/75 to-primary-900/30" />
        <div className="relative mx-auto flex min-h-[58vh] max-w-7xl flex-col justify-end px-4 pb-14 pt-24 sm:px-6 lg:px-8">
          <Link
            href="/projects"
            className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-semibold text-white/80 backdrop-blur transition-colors hover:bg-white/10 hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All projects
          </Link>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-accent px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
              {project.category || "Community"}
            </span>
            <span className="rounded-full bg-emerald-500/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
              {project.status || "Active"}
            </span>
          </div>
          <h1 className="heading-xl mt-4 max-w-3xl text-4xl text-white sm:text-5xl">
            {project.title}
          </h1>
          {project.subtitle && (
            <p className="mt-4 max-w-2xl text-lg text-white/70">{project.subtitle}</p>
          )}
        </div>
      </section>

      {/* Quick stats */}
      <div className="border-b border-primary/10 bg-white dark:border-white/10 dark:bg-primary-800">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-8 gap-y-3 px-4 py-4 text-xs font-semibold text-gray-600 dark:text-gray-300 sm:px-6 lg:px-8">
          <span className="flex items-center gap-2">
            <Users className="h-4 w-4 text-accent-600" />
            {project.beneficiaries || "—"} beneficiaries
          </span>
          <span className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-accent-600" />
            {project.duration || "Ongoing"}
          </span>
          <span className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-accent-600" />
            {project.location || "Tanzania"}
          </span>
          {project.ageRange && (
            <span className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-accent-600" />
              Ages {project.ageRange}
            </span>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main */}
          <div className="space-y-6 lg:col-span-2">
            {overview && (
              <section className="rounded-2xl border border-primary/10 bg-white p-7 shadow-soft dark:border-white/10 dark:bg-primary-800">
                <h2 className="flex items-center gap-2 font-display text-2xl font-bold text-primary dark:text-white">
                  <BookOpen className="h-5 w-5 text-accent-600" />
                  Project overview
                </h2>
                <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-gray-600 dark:text-gray-300 sm:text-base">
                  {overview}
                </p>
              </section>
            )}

            {project.background && (
              <section className="rounded-2xl border border-primary/10 bg-white p-7 shadow-soft dark:border-white/10 dark:bg-primary-800">
                <h2 className="flex items-center gap-2 font-display text-2xl font-bold text-primary dark:text-white">
                  <Target className="h-5 w-5 text-accent-600" />
                  Background
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300 sm:text-base">
                  {project.background}
                </p>
              </section>
            )}

            {objectives.length > 0 && (
              <section className="rounded-2xl border border-primary/10 bg-white p-7 shadow-soft dark:border-white/10 dark:bg-primary-800">
                <h2 className="font-display text-2xl font-bold text-primary dark:text-white">
                  Objectives
                </h2>
                <ul className="mt-4 space-y-3">
                  {objectives.map((objective: string) => (
                    <li
                      key={objective}
                      className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                      {objective}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {curriculum.length > 0 && (
              <section className="rounded-2xl border border-primary/10 bg-white p-7 shadow-soft dark:border-white/10 dark:bg-primary-800">
                <h2 className="font-display text-2xl font-bold text-primary dark:text-white">
                  Training curriculum
                </h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {curriculum.map((course: string) => (
                    <div
                      key={course}
                      className="rounded-lg border border-primary/10 bg-cream/60 px-4 py-3 text-sm text-gray-700 dark:border-white/10 dark:bg-primary-900 dark:text-gray-300"
                    >
                      {course}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="rounded-2xl border border-primary/10 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-primary-800">
              <h3 className="font-display text-lg font-bold text-primary dark:text-white">
                Key information
              </h3>
              <dl className="mt-4 space-y-3 text-sm">
                {[
                  ["Beneficiaries", project.beneficiaries || "—"],
                  ["Age range", project.ageRange || "—"],
                  ["Duration", project.duration || "Ongoing"],
                  ["Location", project.location || "Tanzania"],
                  ["Status", project.status || "Active"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between border-b border-primary/5 pb-2 last:border-0 last:pb-0 dark:border-white/5"
                  >
                    <dt className="text-gray-500 dark:text-gray-400">{label}</dt>
                    <dd className="font-semibold text-primary dark:text-white">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-5">
                <div className="mb-1.5 flex items-center justify-between text-xs">
                  <span className="text-gray-500 dark:text-gray-400">
                    Funding progress
                  </span>
                  <span className="font-semibold text-accent-600">{progress}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-accent to-accent-400"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>

            {(support.meals || support.transportation || support.mentorship) && (
              <div className="rounded-2xl border border-primary/10 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-primary-800">
                <h3 className="font-display text-lg font-bold text-primary dark:text-white">
                  Support services
                </h3>
                <ul className="mt-4 space-y-3 text-sm text-gray-600 dark:text-gray-300">
                  {support.meals && (
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      {support.meals}
                    </li>
                  )}
                  {support.transportation && (
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      {support.transportation}
                    </li>
                  )}
                  {support.mentorship && (
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      {support.mentorship}
                    </li>
                  )}
                </ul>
              </div>
            )}

            {impact.length > 0 && (
              <div className="rounded-2xl border border-primary/10 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-primary-800">
                <h3 className="font-display text-lg font-bold text-primary dark:text-white">
                  Expected impact
                </h3>
                <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  {impact.map((item: string) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="space-y-3">
              <Link
                href="/donate"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-600"
              >
                <Heart className="h-4 w-4" />
                Donate to this project
              </Link>
              <Link
                href="/become-volunteer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-primary/20 px-5 py-3 text-sm font-semibold text-primary transition-all duration-300 hover:bg-primary hover:text-white dark:border-white/20 dark:text-white dark:hover:bg-white dark:hover:text-primary"
              >
                Become a volunteer
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
