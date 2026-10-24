"use client";

import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { ImagePlus, Loader2 } from "lucide-react";

export default function ImageUploadField({
  value,
  onChange,
  label = "Image",
}: {
  value: string;
  onChange: (value: string) => void;
  label?: string;
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
    <div>
      <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-slate-400">
        {label}
      </label>
      <div className="flex items-start gap-3">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" className="h-full w-full object-cover" />
          ) : (
            <span className="flex h-full w-full items-center justify-center text-slate-300">
              <ImagePlus className="h-6 w-6" />
            </span>
          )}
        </div>
        <div className="flex-1 space-y-2">
          <input
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder="/api/media/..."
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-primary"
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
              {uploading ? "Uploading…" : "Upload"}
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
    </div>
  );
}
