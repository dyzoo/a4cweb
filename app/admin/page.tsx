"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Clock,
  FileEdit,
  FolderKanban,
  Plus,
  ShieldCheck,
  Users,
} from "lucide-react";

type Volunteer = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  status: string;
  createdAt: string | null;
};

type Project = {
  _id: string;
  title: string;
  category: string;
  status: string;
  createdAt: string;
};

type Stats = {
  projects: number;
  activeProjects: number;
  volunteers: number;
  pendingVolunteers: number;
  admins: number;
  contentUpdatedAt: string | null;
};

const statusStyles: Record<string, string> = {
  pending: "bg-amber-50 text-amber-600 border-amber-200",
  reviewing: "bg-blue-50 text-blue-600 border-blue-200",
  approved: "bg-emerald-50 text-emerald-600 border-emerald-200",
  rejected: "bg-red-50 text-red-600 border-red-200",
};

function formatDate(value: string | null) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        const response = await fetch("/api/admin/stats", { cache: "no-store" });
        const data = await response.json();
        if (!response.ok || !data.success) {
          throw new Error(data.message || "Unable to load dashboard.");
        }
        if (!active) return;
        setStats(data.stats);
        setVolunteers(data.recentVolunteers || []);
        setProjects(data.recentProjects || []);
      } catch (err: any) {
        if (active) setError(err.message || "Unable to load dashboard.");
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  const cards = [
    {
      label: "Total projects",
      value: stats?.projects ?? 0,
      hint: `${stats?.activeProjects ?? 0} active`,
      icon: FolderKanban,
      href: "/admin/projects",
      tone: "bg-primary-50 text-primary",
    },
    {
      label: "Volunteer applications",
      value: stats?.volunteers ?? 0,
      hint: `${stats?.pendingVolunteers ?? 0} pending review`,
      icon: Users,
      href: "/admin/volunteers",
      tone: "bg-accent/10 text-accent-600",
    },
    {
      label: "Admin accounts",
      value: stats?.admins ?? 0,
      hint: "Team members with access",
      icon: ShieldCheck,
      href: "/admin/users",
      tone: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Content updated",
      value: stats?.contentUpdatedAt ? formatDate(stats.contentUpdatedAt) : "Default",
      hint: "Last website content change",
      icon: FileEdit,
      href: "/admin/content",
      tone: "bg-blue-50 text-blue-600",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="font-display text-2xl font-bold text-primary">
            Overview
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            A quick look at your website activity and applications.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/admin/content"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 transition-colors hover:border-primary hover:text-primary"
          >
            <FileEdit className="h-4 w-4" />
            Edit content
          </Link>
          <Link
            href="/admin/projects"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-accent-600"
          >
            <Plus className="h-4 w-4" />
            New project
          </Link>
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className="group rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg hover:shadow-slate-200/60"
            >
              <div className="flex items-start justify-between">
                <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${card.tone}`}>
                  <Icon className="h-5 w-5" />
                </span>
                <ArrowRight className="h-4 w-4 text-slate-300 transition-all group-hover:translate-x-1 group-hover:text-primary" />
              </div>
              <p className="mt-5 font-display text-2xl font-bold text-primary">
                {loading ? (
                  <span className="inline-block h-7 w-16 animate-pulse rounded bg-slate-100" />
                ) : (
                  card.value
                )}
              </p>
              <p className="mt-1 text-sm font-medium text-slate-600">{card.label}</p>
              <p className="mt-0.5 text-xs text-slate-400">{card.hint}</p>
            </Link>
          );
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        {/* Recent applications */}
        <div className="rounded-2xl border border-slate-200 bg-white xl:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <div>
              <h3 className="text-sm font-bold text-primary">
                Recent volunteer applications
              </h3>
              <p className="text-xs text-slate-400">Latest submissions</p>
            </div>
            <Link
              href="/admin/volunteers"
              className="text-xs font-semibold text-accent-600 hover:text-accent"
            >
              View all
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-[10px] uppercase tracking-wider text-slate-400">
                  <th className="px-5 py-3 font-semibold">Applicant</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                  <th className="px-5 py-3 font-semibold">Applied</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  Array.from({ length: 3 }).map((_, index) => (
                    <tr key={index}>
                      <td className="px-5 py-4" colSpan={3}>
                        <div className="h-5 animate-pulse rounded bg-slate-100" />
                      </td>
                    </tr>
                  ))
                ) : volunteers.length === 0 ? (
                  <tr>
                    <td className="px-5 py-10 text-center text-sm text-slate-500" colSpan={3}>
                      No applications yet.
                    </td>
                  </tr>
                ) : (
                  volunteers.map((volunteer) => (
                    <tr key={volunteer._id} className="hover:bg-slate-50/70">
                      <td className="px-5 py-4">
                        <p className="font-semibold text-primary">
                          {volunteer.firstName} {volunteer.lastName}
                        </p>
                        <p className="text-xs text-slate-400">{volunteer.email}</p>
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                            statusStyles[volunteer.status] || statusStyles.pending
                          }`}
                        >
                          {volunteer.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-xs text-slate-500">
                        {formatDate(volunteer.createdAt)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-primary">Recent projects</h3>
              <Link
                href="/admin/projects"
                className="text-xs font-semibold text-accent-600 hover:text-accent"
              >
                Manage
              </Link>
            </div>
            <ul className="mt-4 space-y-3">
              {loading ? (
                Array.from({ length: 3 }).map((_, index) => (
                  <li key={index} className="h-12 animate-pulse rounded-lg bg-slate-100" />
                ))
              ) : projects.length === 0 ? (
                <li className="py-4 text-center text-sm text-slate-500">
                  No projects yet.
                </li>
              ) : (
                projects.slice(0, 4).map((project) => (
                  <li
                    key={project._id}
                    className="flex items-center gap-3 rounded-xl border border-slate-100 px-3 py-2.5"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary">
                      <FolderKanban className="h-4 w-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-semibold text-primary">
                        {project.title}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        {project.category} · {project.status}
                      </p>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>

          <div className="rounded-2xl bg-primary-900 p-5 text-white">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
              <Clock className="h-5 w-5 text-accent-400" />
            </span>
            <h3 className="mt-4 font-display text-lg font-bold">
              Keep the website fresh
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-white/60">
              Review pending volunteer applications and update project progress
              regularly to build trust with supporters.
            </p>
            <Link
              href="/admin/volunteers"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-accent-600"
            >
              Review applications
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
