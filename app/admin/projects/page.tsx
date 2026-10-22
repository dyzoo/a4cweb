"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  ExternalLink,
  Loader2,
  Pencil,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";
import ImageUploadField from "@/app/components/admin/ImageUploadField";

type Project = {
  _id: string;
  title: string;
  slug: string;
  subtitle?: string;
  category?: string;
  status?: string;
  description?: string;
  overview?: string;
  longDescription?: string;
  background?: string;
  image?: string;
  imageUrl?: string;
  location?: string;
  duration?: string;
  beneficiaries?: number;
  ageRange?: string;
  fundingProgress?: number;
  objectives?: string[];
  curriculum?: string[];
  impact?: string[];
  supportServices?: {
    meals?: string;
    transportation?: string;
    mentorship?: string;
  };
  featured?: boolean;
  published?: boolean;
};

const emptyForm = {
  title: "",
  subtitle: "",
  slug: "",
  category: "Community",
  status: "Active",
  description: "",
  overview: "",
  background: "",
  image: "",
  location: "Tanzania",
  duration: "",
  beneficiaries: 0,
  ageRange: "",
  fundingProgress: 0,
  objectives: "",
  curriculum: "",
  impact: "",
  meals: "",
  transportation: "",
  mentorship: "",
  featured: false,
  published: true,
};

type FormState = typeof emptyForm;

const inputClass =
  "w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/10";

function Field({
  label,
  children,
  full,
}: {
  label: string;
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <div className={full ? "md:col-span-2" : undefined}>
      <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-slate-400">
        {label}
      </label>
      {children}
    </div>
  );
}

function toForm(project: Project): FormState {
  return {
    ...emptyForm,
    title: project.title || "",
    subtitle: project.subtitle || "",
    slug: project.slug || "",
    category: project.category || "Community",
    status: project.status || "Active",
    description: project.description || "",
    overview: project.overview || project.longDescription || "",
    background: project.background || "",
    image: project.image || project.imageUrl || "",
    location: project.location || "Tanzania",
    duration: project.duration || "",
    beneficiaries: Number(project.beneficiaries) || 0,
    ageRange: project.ageRange || "",
    fundingProgress: Number(project.fundingProgress) || 0,
    objectives: (project.objectives || []).join("\n"),
    curriculum: (project.curriculum || []).join("\n"),
    impact: (project.impact || []).join("\n"),
    meals: project.supportServices?.meals || "",
    transportation: project.supportServices?.transportation || "",
    mentorship: project.supportServices?.mentorship || "",
    featured: Boolean(project.featured),
    published: project.published !== false,
  };
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    try {
      const response = await fetch("/api/admin/projects", {
        cache: "no-store",
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to load projects.");
      }
      setProjects(data.projects || []);
    } catch (error: any) {
      toast.error(error.message || "Unable to load projects.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return projects;
    return projects.filter((project) =>
      [project.title, project.slug, project.category, project.status]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(term))
    );
  }, [projects, search]);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (project: Project) => {
    setEditing(project);
    setForm(toForm(project));
    setModalOpen(true);
  };

  const update = (key: keyof FormState, value: string | number | boolean) => {
    setForm((previous) => ({ ...previous, [key]: value }));
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);

    const payload = {
      title: form.title,
      subtitle: form.subtitle,
      slug: form.slug || undefined,
      category: form.category,
      status: form.status,
      description: form.description,
      overview: form.overview,
      longDescription: form.overview,
      background: form.background,
      image: form.image,
      imageUrl: form.image,
      location: form.location,
      duration: form.duration,
      beneficiaries: Number(form.beneficiaries) || 0,
      ageRange: form.ageRange,
      fundingProgress: Number(form.fundingProgress) || 0,
      objectives: form.objectives
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
      curriculum: form.curriculum
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
      impact: form.impact
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
      supportServices: {
        meals: form.meals,
        transportation: form.transportation,
        mentorship: form.mentorship,
      },
      featured: form.featured,
      published: form.published,
    };

    try {
      const response = await fetch(
        editing ? `/api/admin/projects/${editing._id}` : "/api/admin/projects",
        {
          method: editing ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to save project.");
      }
      toast.success(editing ? "Project updated" : "Project created");
      setModalOpen(false);
      setEditing(null);
      setForm(emptyForm);
      await load();
    } catch (error: any) {
      toast.error(error.message || "Unable to save project.");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (project: Project) => {
    if (!window.confirm(`Delete "${project.title}"? This cannot be undone.`)) {
      return;
    }
    try {
      const response = await fetch(`/api/admin/projects/${project._id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to delete project.");
      }
      toast.success("Project deleted");
      setProjects((previous) =>
        previous.filter((item) => item._id !== project._id)
      );
    } catch (error: any) {
      toast.error(error.message || "Unable to delete project.");
    }
  };

  const togglePublished = async (project: Project) => {
    try {
      const response = await fetch(`/api/admin/projects/${project._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: project.published === false }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to update project.");
      }
      setProjects((previous) =>
        previous.map((item) =>
          item._id === project._id
            ? { ...item, published: project.published === false }
            : item
        )
      );
      toast.success(project.published === false ? "Project published" : "Project hidden");
    } catch (error: any) {
      toast.error(error.message || "Unable to update project.");
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="font-display text-xl font-bold text-primary">
            Projects
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Create projects and keep their progress up to date.
          </p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-xs font-bold text-white transition-colors hover:bg-accent-600"
        >
          <Plus className="h-4 w-4" />
          New project
        </button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white">
        <div className="flex flex-col justify-between gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search projects…"
              className="w-full rounded-lg border border-slate-200 py-2 pl-9 pr-3 text-sm outline-none focus:border-primary"
            />
          </div>
          <p className="text-xs text-slate-400">
            {filtered.length} of {projects.length} projects
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="h-6 w-6 animate-spin text-accent" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-sm font-medium text-slate-600">No projects found</p>
            <p className="mt-1 text-xs text-slate-400">
              {search ? "Try a different search term." : "Create your first project to get started."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-[10px] uppercase tracking-wider text-slate-400">
                  <th className="px-4 py-3 font-semibold">Project</th>
                  <th className="px-4 py-3 font-semibold">Category</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Visibility</th>
                  <th className="px-4 py-3 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((project) => (
                  <tr key={project._id} className="hover:bg-slate-50/70">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <span className="relative h-11 w-16 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                          {(project.image || project.imageUrl) && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={project.image || project.imageUrl}
                              alt=""
                              className="h-full w-full object-cover"
                            />
                          )}
                        </span>
                        <div className="min-w-0">
                          <p className="truncate font-semibold text-primary">
                            {project.title}
                          </p>
                          <p className="truncate text-xs text-slate-400">
                            /{project.slug}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-600">
                      {project.category}
                    </td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-semibold text-slate-600">
                        {project.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => togglePublished(project)}
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                          project.published === false
                            ? "bg-amber-50 text-amber-600"
                            : "bg-emerald-50 text-emerald-600"
                        }`}
                      >
                        {project.published === false ? "Hidden" : "Published"}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/projects/${project.slug}`}
                          target="_blank"
                          className="rounded p-1.5 text-slate-400 hover:bg-slate-100 hover:text-primary"
                          aria-label="View project"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => openEdit(project)}
                          className="rounded p-1.5 text-slate-400 hover:bg-slate-100 hover:text-primary"
                          aria-label="Edit project"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => remove(project)}
                          className="rounded p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-500"
                          aria-label="Delete project"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-slate-900/50 p-4 backdrop-blur-sm">
          <form
            onSubmit={submit}
            className="my-6 w-full max-w-3xl rounded-2xl bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
              <h3 className="font-display text-lg font-bold text-primary">
                {editing ? "Edit project" : "New project"}
              </h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="max-h-[70vh] space-y-5 overflow-y-auto px-6 py-5">
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Title *" full>
                  <input
                    required
                    value={form.title}
                    onChange={(event) => update("title", event.target.value)}
                    className={inputClass}
                    placeholder="e.g. EdTech for Every Child"
                  />
                </Field>
                <Field label="Subtitle" full>
                  <input
                    value={form.subtitle}
                    onChange={(event) => update("subtitle", event.target.value)}
                    className={inputClass}
                    placeholder="Short supporting line"
                  />
                </Field>
                <Field label="Slug (auto if empty)">
                  <input
                    value={form.slug}
                    onChange={(event) => update("slug", event.target.value)}
                    className={inputClass}
                    placeholder="edtech-for-every-child"
                  />
                </Field>
                <Field label="Category">
                  <input
                    value={form.category}
                    onChange={(event) => update("category", event.target.value)}
                    className={inputClass}
                    placeholder="Education"
                  />
                </Field>
                <Field label="Status">
                  <select
                    value={form.status}
                    onChange={(event) => update("status", event.target.value)}
                    className={inputClass}
                  >
                    {["Active", "Ongoing", "Planned", "Completed"].map((status) => (
                      <option key={status}>{status}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Location">
                  <input
                    value={form.location}
                    onChange={(event) => update("location", event.target.value)}
                    className={inputClass}
                  />
                </Field>
                <Field label="Duration">
                  <input
                    value={form.duration}
                    onChange={(event) => update("duration", event.target.value)}
                    className={inputClass}
                    placeholder="e.g. 12 months"
                  />
                </Field>
                <Field label="Beneficiaries">
                  <input
                    type="number"
                    min={0}
                    value={form.beneficiaries}
                    onChange={(event) =>
                      update("beneficiaries", Number(event.target.value))
                    }
                    className={inputClass}
                  />
                </Field>
                <Field label="Age range">
                  <input
                    value={form.ageRange}
                    onChange={(event) => update("ageRange", event.target.value)}
                    className={inputClass}
                    placeholder="e.g. 8–17 years"
                  />
                </Field>
                <Field label="Funding progress (%)">
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={form.fundingProgress}
                    onChange={(event) =>
                      update("fundingProgress", Number(event.target.value))
                    }
                    className={inputClass}
                  />
                </Field>
                <div className="md:col-span-2">
                  <ImageUploadField
                    value={form.image}
                    onChange={(value) => update("image", value)}
                    label="Cover image"
                  />
                </div>
                <Field label="Short description" full>
                  <textarea
                    rows={2}
                    value={form.description}
                    onChange={(event) => update("description", event.target.value)}
                    className={inputClass}
                    placeholder="Summary shown on project cards"
                  />
                </Field>
                <Field label="Overview" full>
                  <textarea
                    rows={5}
                    value={form.overview}
                    onChange={(event) => update("overview", event.target.value)}
                    className={inputClass}
                    placeholder="Full project overview shown on the detail page"
                  />
                </Field>
                <Field label="Background" full>
                  <textarea
                    rows={3}
                    value={form.background}
                    onChange={(event) => update("background", event.target.value)}
                    className={inputClass}
                  />
                </Field>
                <Field label="Objectives (one per line)" full>
                  <textarea
                    rows={4}
                    value={form.objectives}
                    onChange={(event) => update("objectives", event.target.value)}
                    className={inputClass}
                  />
                </Field>
                <Field label="Curriculum (one per line)" full>
                  <textarea
                    rows={4}
                    value={form.curriculum}
                    onChange={(event) => update("curriculum", event.target.value)}
                    className={inputClass}
                  />
                </Field>
                <Field label="Expected impact (one per line)" full>
                  <textarea
                    rows={3}
                    value={form.impact}
                    onChange={(event) => update("impact", event.target.value)}
                    className={inputClass}
                  />
                </Field>
                <Field label="Meals support">
                  <input
                    value={form.meals}
                    onChange={(event) => update("meals", event.target.value)}
                    className={inputClass}
                    placeholder="e.g. Daily nutritious meals"
                  />
                </Field>
                <Field label="Transportation">
                  <input
                    value={form.transportation}
                    onChange={(event) =>
                      update("transportation", event.target.value)
                    }
                    className={inputClass}
                  />
                </Field>
                <Field label="Mentorship">
                  <input
                    value={form.mentorship}
                    onChange={(event) => update("mentorship", event.target.value)}
                    className={inputClass}
                  />
                </Field>
              </div>

              <div className="flex flex-wrap gap-4">
                <label className="flex items-center gap-2 text-sm text-slate-600">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(event) => update("featured", event.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-accent"
                  />
                  Featured project
                </label>
                <label className="flex items-center gap-2 text-sm text-slate-600">
                  <input
                    type="checkbox"
                    checked={form.published}
                    onChange={(event) => update("published", event.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-accent"
                  />
                  Published on website
                </label>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-slate-100 px-6 py-4">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="rounded-full border border-slate-200 px-5 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-xs font-bold text-white hover:bg-accent-600 disabled:opacity-60"
              >
                {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                {saving ? "Saving…" : editing ? "Save changes" : "Create project"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
