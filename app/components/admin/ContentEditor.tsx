"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import {
  ChevronDown,
  ImagePlus,
  Loader2,
  Plus,
  RotateCcw,
  Save,
  Trash2,
} from "lucide-react";

const SECTION_LABELS: Record<string, string> = {
  site: "Site identity",
  nav: "Navigation",
  announcement: "Announcement bar",
  hero: "Hero section",
  mission: "Mission",
  story: "Our story",
  causes: "Causes",
  events: "Events",
  founders: "Founders",
  volunteer: "Volunteer",
  testimonials: "Testimonials",
  partners: "Partners",
  about: "About page",
  contact: "Contact page",
  donate: "Donate page",
  projectsPage: "Projects page",
  footer: "Footer",
  seo: "SEO",
};

const LONG_TEXT = /(description|bio|content|full|short|text|details|note|subtitle|overview|story|background)/i;
const IMAGE_FIELD = /(image|logo|avatar|photo|banner|thumbnail)/i;

function emptyLike(value: unknown): unknown {
  if (Array.isArray(value)) return [];
  if (typeof value === "string") return "";
  if (typeof value === "number") return 0;
  if (typeof value === "boolean") return false;
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, item]) => [
        key,
        emptyLike(item),
      ])
    );
  }
  return "";
}

function labelize(value: string) {
  return value
    .replace(/([A-Z])/g, " $1")
    .replace(/[_-]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .trim();
}

function setAtPath(
  source: Record<string, unknown>,
  path: (string | number)[],
  value: unknown
): Record<string, unknown> {
  if (path.length === 0) return value as Record<string, unknown>;
  const [head, ...rest] = path;
  const clone: Record<string, any> = Array.isArray(source)
    ? [...(source as any)]
    : { ...source };
  clone[head as any] = setAtPath(clone[head] || {}, rest, value);
  return clone;
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-slate-400">
      {children}
    </span>
  );
}

function ImageField({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const upload = async (file: File) => {
    setUploading(true);
    try {
      const data = new FormData();
      data.append("file", file);
      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: data,
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || "Upload failed");
      }
      onChange(result.url);
      toast.success("Image uploaded");
    } catch (error: any) {
      toast.error(error.message || "Unable to upload image");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex items-start gap-3">
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="" className="h-full w-full object-cover" />
        ) : (
          <span className="flex h-full w-full items-center justify-center text-slate-300">
            <ImagePlus className="h-5 w-5" />
          </span>
        )}
      </div>
      <div className="flex-1 space-y-2">
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="/image.jpg"
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-700 outline-none focus:border-primary"
        />
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-[11px] font-semibold text-slate-700 hover:bg-slate-200 disabled:opacity-60"
          >
            {uploading ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <ImagePlus className="h-3.5 w-3.5" />
            )}
            {uploading ? "Uploading…" : "Upload image"}
          </button>
          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="rounded-full px-3 py-1.5 text-[11px] font-semibold text-red-500 hover:bg-red-50"
            >
              Remove
            </button>
          )}
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) upload(file);
            event.target.value = "";
          }}
        />
      </div>
    </div>
  );
}

function NodeEditor({
  name,
  value,
  path,
  onChange,
  depth = 0,
}: {
  name: string;
  value: unknown;
  path: (string | number)[];
  onChange: (path: (string | number)[], value: unknown) => void;
  depth?: number;
}) {
  const key = path.join(".") || name;

  if (typeof value === "string") {
    if (IMAGE_FIELD.test(name)) {
      return (
        <div>
          <FieldLabel>{labelize(name)}</FieldLabel>
          <ImageField
            value={value}
            onChange={(next) => onChange(path, next)}
          />
        </div>
      );
    }

    const isLong = LONG_TEXT.test(name) || value.length > 110 || value.includes("\n");
    return (
      <div>
        <FieldLabel>{labelize(name)}</FieldLabel>
        {isLong ? (
          <textarea
            key={key}
            value={value}
            rows={Math.min(8, Math.max(3, Math.ceil(value.length / 80) || 3))}
            onChange={(event) => onChange(path, event.target.value)}
            className="w-full resize-y rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/10"
          />
        ) : (
          <input
            key={key}
            value={value}
            onChange={(event) => onChange(path, event.target.value)}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/10"
          />
        )}
      </div>
    );
  }

  if (typeof value === "number") {
    return (
      <div>
        <FieldLabel>{labelize(name)}</FieldLabel>
        <input
          type="number"
          value={value}
          onChange={(event) => onChange(path, Number(event.target.value))}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none focus:border-primary"
        />
      </div>
    );
  }

  if (typeof value === "boolean") {
    return (
      <label className="flex items-center gap-3 rounded-lg border border-slate-200 px-3 py-2.5">
        <input
          type="checkbox"
          checked={value}
          onChange={(event) => onChange(path, event.target.checked)}
          className="h-4 w-4 rounded border-slate-300 text-accent focus:ring-accent"
        />
        <span className="text-sm font-medium text-slate-700">
          {labelize(name)}
        </span>
      </label>
    );
  }

  if (Array.isArray(value)) {
    const isPrimitive = value.every(
      (item) => typeof item === "string" || typeof item === "number"
    );

    return (
      <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
            {labelize(name)}{" "}
            <span className="ml-1 font-normal text-slate-400">
              ({value.length})
            </span>
          </p>
          <button
            type="button"
            onClick={() =>
              onChange(path, [...value, emptyLike(value[0] ?? (isPrimitive ? "" : {}))])
            }
            className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-primary shadow-sm ring-1 ring-slate-200 hover:bg-primary hover:text-white"
          >
            <Plus className="h-3 w-3" />
            Add
          </button>
        </div>

        <div className="mt-3 space-y-3">
          {value.length === 0 && (
            <p className="text-xs text-slate-400">No items yet.</p>
          )}
          {value.map((item, index) => (
            <div
              key={`${key}-${index}`}
              className="relative rounded-lg border border-slate-200 bg-white p-3"
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Item {index + 1}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    onChange(
                      path,
                      value.filter((_, itemIndex) => itemIndex !== index)
                    )
                  }
                  className="rounded p-1 text-slate-400 hover:bg-red-50 hover:text-red-500"
                  aria-label="Remove item"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
              {isPrimitive ? (
                <input
                  value={String(item)}
                  onChange={(event) => {
                    const next = [...value];
                    next[index] =
                      typeof item === "number"
                        ? Number(event.target.value)
                        : event.target.value;
                    onChange(path, next);
                  }}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none focus:border-primary"
                />
              ) : (
                <div className="space-y-3">
                  {Object.entries(item as Record<string, unknown>).map(
                    ([childKey, childValue]) => (
                      <NodeEditor
                        key={`${key}-${index}-${childKey}`}
                        name={childKey}
                        value={childValue}
                        path={[...path, index, childKey]}
                        onChange={onChange}
                        depth={depth + 1}
                      />
                    )
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (value && typeof value === "object") {
    return (
      <div
        className={
          depth === 0
            ? "space-y-4"
            : "rounded-xl border border-slate-200 bg-slate-50/60 p-4"
        }
      >
        {depth > 0 && (
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
            {labelize(name)}
          </p>
        )}
        <div className="grid gap-4 md:grid-cols-2">
          {Object.entries(value as Record<string, unknown>).map(
            ([childKey, childValue]) => (
              <div
                key={`${key}-${childKey}`}
                className={
                  typeof childValue === "object" &&
                  childValue !== null
                    ? "md:col-span-2"
                    : undefined
                }
              >
                <NodeEditor
                  name={childKey}
                  value={childValue}
                  path={[...path, childKey]}
                  onChange={onChange}
                  depth={depth + 1}
                />
              </div>
            )
          )}
        </div>
      </div>
    );
  }

  return null;
}

export default function ContentEditor() {
  const [content, setContent] = useState<Record<string, any> | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [activeSection, setActiveSection] = useState("site");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("/api/admin/content", {
          cache: "no-store",
        });
        const data = await response.json();
        if (!response.ok || !data.success) {
          throw new Error(data.message || "Unable to load content.");
        }
        setContent(data.content);
      } catch (error: any) {
        toast.error(error.message || "Unable to load content.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    const handler = (event: BeforeUnloadEvent) => {
      if (!dirty) return;
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [dirty]);

  const sections = useMemo(() => Object.keys(content || {}), [content]);

  const update = (path: (string | number)[], value: unknown) => {
    setContent((previous) => {
      if (!previous) return previous;
      return setAtPath(previous, path, value);
    });
    setDirty(true);
  };

  const save = async () => {
    if (!content) return;
    setSaving(true);
    try {
      const response = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to save content.");
      }
      setDirty(false);
      toast.success("Website content saved");
    } catch (error: any) {
      toast.error(error.message || "Unable to save content.");
    } finally {
      setSaving(false);
    }
  };

  const reset = async () => {
    if (
      !window.confirm(
        "Reset all website content to the built-in defaults? This cannot be undone."
      )
    ) {
      return;
    }
    setSaving(true);
    try {
      const response = await fetch("/api/admin/content", { method: "DELETE" });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to reset content.");
      }
      setContent(data.content);
      setDirty(false);
      toast.success("Content reset to defaults");
    } catch (error: any) {
      toast.error(error.message || "Unable to reset content.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center rounded-2xl border border-slate-200 bg-white py-24">
        <Loader2 className="h-6 w-6 animate-spin text-accent" />
      </div>
    );
  }

  if (!content) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-600">
        Content could not be loaded. Please refresh the page.
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-display text-xl font-bold text-primary">
              Website content
            </h2>
            {dirty && (
              <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-600">
                Unsaved changes
              </span>
            )}
          </div>
          <p className="mt-1 text-xs text-slate-500">
            Edit the text, images and lists shown across the public website.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={reset}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-600 transition-colors hover:border-red-300 hover:text-red-600 disabled:opacity-60"
          >
            <RotateCcw className="h-4 w-4" />
            Reset defaults
          </button>
          <button
            type="button"
            onClick={save}
            disabled={saving || !dirty}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-xs font-bold text-white transition-colors hover:bg-accent-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            {saving ? "Saving…" : "Save changes"}
          </button>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[220px_1fr]">
        <div className="h-fit rounded-2xl border border-slate-200 bg-white p-2 lg:sticky lg:top-24">
          <button
            type="button"
            onClick={() => setMobileNavOpen((value) => !value)}
            className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold text-primary lg:hidden"
          >
            {SECTION_LABELS[activeSection] || labelize(activeSection)}
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                mobileNavOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          <ul
            className={`space-y-0.5 ${mobileNavOpen ? "mt-1" : "hidden"} lg:block`}
          >
            {sections.map((section) => (
              <li key={section}>
                <button
                  type="button"
                  onClick={() => {
                    setActiveSection(section);
                    setMobileNavOpen(false);
                  }}
                  className={`w-full rounded-lg px-3 py-2 text-left text-xs font-medium transition-colors ${
                    activeSection === section
                      ? "bg-primary text-white"
                      : "text-slate-600 hover:bg-slate-50 hover:text-primary"
                  }`}
                >
                  {SECTION_LABELS[section] || labelize(section)}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
          <h3 className="mb-4 border-b border-slate-100 pb-3 font-display text-lg font-bold text-primary">
            {SECTION_LABELS[activeSection] || labelize(activeSection)}
          </h3>
          {content[activeSection] !== undefined && (
            <NodeEditor
              name={activeSection}
              value={content[activeSection]}
              path={[activeSection]}
              onChange={update}
            />
          )}
        </div>
      </div>

      {dirty && (
        <div className="sticky bottom-4 z-20 flex justify-end lg:hidden">
          <button
            type="button"
            onClick={save}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-xs font-bold text-white shadow-lg disabled:opacity-60"
          >
            <Save className="h-4 w-4" />
            {saving ? "Saving…" : "Save changes"}
          </button>
        </div>
      )}
    </div>
  );
}
