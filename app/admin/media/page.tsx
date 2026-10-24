"use client";

import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import {
  Copy,
  Download,
  FileText,
  Image as ImageIcon,
  Loader2,
  Trash2,
  UploadCloud,
} from "lucide-react";

type Brochure = {
  _id?: string;
  name: string;
  size: number;
  uploadedAt?: string;
};

type MediaImage = {
  _id: string;
  name: string;
  url: string;
  size: number;
  uploadedAt: string;
};

function formatBytes(bytes: number) {
  if (!bytes) return "0 KB";
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function formatDate(value?: string) {
  if (!value) return "â€”";
  return new Date(value).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function AdminMediaPage() {
  const [brochure, setBrochure] = useState<Brochure | null>(null);
  const [images, setImages] = useState<MediaImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState("");
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    try {
      const [brochureResponse, mediaResponse] = await Promise.all([
        fetch("/api/admin/brochure", { cache: "no-store" }),
        fetch("/api/admin/media", { cache: "no-store" }),
      ]);
      const brochureData = await brochureResponse.json();
      const mediaData = await mediaResponse.json();

      if (brochureResponse.ok && brochureData.success) {
        setBrochure(brochureData.brochure);
      }
      if (mediaResponse.ok && mediaData.success) {
        setImages(mediaData.images || []);
      }
    } catch {
      toast.error("Unable to load media library.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const uploadBrochure = async (file: File) => {
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      toast.error("Please upload a PDF file.");
      return;
    }
    if (file.size > 4 * 1024 * 1024) {
      toast.error("The brochure must be smaller than 4 MB.");
      return;
    }

    setUploading(true);
    try {
      const data = new FormData();
      data.append("file", file);
      const response = await fetch("/api/admin/brochure", {
        method: "POST",
        body: data,
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || "Upload failed");
      }
      setBrochure(result.brochure);
      toast.success("Brochure updated");
    } catch (error: any) {
      toast.error(error.message || "Unable to upload brochure.");
    } finally {
      setUploading(false);
    }
  };

  const removeBrochure = async () => {
    if (!window.confirm("Remove the current brochure from the website?")) return;
    try {
      const response = await fetch("/api/admin/brochure", { method: "DELETE" });
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to remove brochure.");
      }
      setBrochure(null);
      toast.success("Brochure removed");
    } catch (error: any) {
      toast.error(error.message || "Unable to remove brochure.");
    }
  };

  const copyUrl = async (url: string) => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}${url}`);
      toast.success("Image URL copied");
    } catch {
      toast.error("Unable to copy link.");
    }
  };

  const removeImage = async (image: MediaImage) => {
    if (!window.confirm(`Delete ${image.name}? This cannot be undone.`)) return;
    setDeleting(image._id);
    try {
      const response = await fetch(
        `/api/admin/media?id=${encodeURIComponent(image._id)}`,
        { method: "DELETE" }
      );
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to delete image.");
      }
      setImages((previous) =>
        previous.filter((item) => item._id !== image._id)
      );
      toast.success("Image deleted");
    } catch (error: any) {
      toast.error(error.message || "Unable to delete image.");
    } finally {
      setDeleting("");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-xl font-bold text-primary">
          Media & brochure
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          Manage the downloadable brochure and images used across the website.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-500">
              <FileText className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-sm font-bold text-primary">
                Website brochure
              </h3>
              <p className="text-xs text-slate-400">
                Shown as the download button in the hero section.
              </p>
            </div>
          </div>

          {loading ? (
            <div className="mt-6 flex justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-accent" />
            </div>
          ) : brochure ? (
            <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-primary">
                    {brochure.name}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-400">
                    {formatBytes(brochure.size)} Â· uploaded{" "}
                    {formatDate(brochure.uploadedAt)}
                  </p>
                </div>
                <div className="flex shrink-0 gap-1">
                  <a
                    href="/api/download/brochure"
                    className="rounded-lg p-2 text-slate-400 hover:bg-white hover:text-primary"
                    aria-label="Download brochure"
                  >
                    <Download className="h-4 w-4" />
                  </a>
                  <button
                    type="button"
                    onClick={removeBrochure}
                    className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-500"
                    aria-label="Remove brochure"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <p className="mt-5 rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-center text-xs text-slate-400">
              No brochure uploaded yet.
            </p>
          )}

          <div
            onDragOver={(event) => {
              event.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(event) => {
              event.preventDefault();
              setDragging(false);
              const file = event.dataTransfer.files?.[0];
              if (file) uploadBrochure(file);
            }}
            onClick={() => inputRef.current?.click()}
            className={`mt-4 cursor-pointer rounded-xl border-2 border-dashed p-6 text-center transition-colors ${
              dragging
                ? "border-accent bg-accent/5"
                : "border-slate-200 hover:border-accent hover:bg-accent/5"
            }`}
          >
            {uploading ? (
              <Loader2 className="mx-auto h-7 w-7 animate-spin text-accent" />
            ) : (
              <UploadCloud className="mx-auto h-7 w-7 text-accent" />
            )}
            <p className="mt-2 text-sm font-medium text-slate-700">
              {uploading ? "Uploadingâ€¦" : "Upload a new brochure"}
            </p>
            <p className="mt-1 text-xs text-slate-400">
              PDF only Â· maximum 4 MB Â· replaces the current file
            </p>
            <input
              ref={inputRef}
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) uploadBrochure(file);
                event.target.value = "";
              }}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary">
              <ImageIcon className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-sm font-bold text-primary">Image library</h3>
              <p className="text-xs text-slate-400">
                {images.length} uploaded image{images.length === 1 ? "" : "s"}
              </p>
            </div>
          </div>

          {loading ? (
            <div className="mt-6 flex justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-accent" />
            </div>
          ) : images.length === 0 ? (
            <div className="mt-5 rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center">
              <p className="text-sm font-medium text-slate-600">
                No uploaded images yet
              </p>
              <p className="mt-1 text-xs text-slate-400">
                Upload images from Site Content or the project editor. They will
                appear here automatically.
              </p>
            </div>
          ) : (
            <div className="mt-5 grid max-h-[340px] grid-cols-2 gap-3 overflow-y-auto pr-1 sm:grid-cols-3">
              {images.map((image) => (
                <div
                  key={image._id}
                  className="group relative overflow-hidden rounded-lg border border-slate-200"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image.url}
                    alt={image.name}
                    className="h-24 w-full object-cover"
                  />
                  <div className="flex items-center justify-between gap-1 bg-white p-1.5">
                    <button
                      type="button"
                      onClick={() => copyUrl(image.url)}
                      className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-primary"
                      aria-label="Copy URL"
                    >
                      <Copy className="h-3.5 w-3.5" />
                    </button>
                    <span className="truncate text-[9px] text-slate-400">
                      {formatBytes(image.size)}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeImage(image)}
                      disabled={deleting === image._id}
                      className="rounded p-1 text-slate-400 hover:bg-red-50 hover:text-red-500 disabled:opacity-50"
                      aria-label="Delete image"
                    >
                      {deleting === image._id ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <Trash2 className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
