"use client";

import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
  Download,
  Eye,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Search,
  Trash2,
  X,
} from "lucide-react";

type Application = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  countryCode?: string;
  location: string;
  birthYear?: string;
  birthMonth?: string;
  birthDate?: string;
  age?: number;
  status?: string;
  cvFileId?: string | null;
  createdAt: string | null;
};

const STATUSES = ["pending", "reviewing", "approved", "rejected"];

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

export default function AdminVolunteersPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [selected, setSelected] = useState<Application | null>(null);

  const load = async () => {
    try {
      const response = await fetch("/api/admin/volunteers", {
        cache: "no-store",
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to load applications.");
      }
      setApplications(data.applications || []);
    } catch (error: any) {
      toast.error(error.message || "Unable to load applications.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return applications.filter((application) => {
      const matchesStatus = status === "all" || application.status === status;
      const matchesSearch =
        !term ||
        `${application.firstName} ${application.lastName} ${application.email} ${application.location}`
          .toLowerCase()
          .includes(term);
      return matchesStatus && matchesSearch;
    });
  }, [applications, search, status]);

  const counts = useMemo(() => {
    return STATUSES.reduce<Record<string, number>>((accumulator, item) => {
      accumulator[item] = applications.filter(
        (application) => (application.status || "pending") === item
      ).length;
      return accumulator;
    }, {});
  }, [applications]);

  const changeStatus = async (application: Application, nextStatus: string) => {
    try {
      const response = await fetch(
        `/api/admin/volunteers/${application._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: nextStatus }),
        }
      );
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to update status.");
      }
      setApplications((previous) =>
        previous.map((item) =>
          item._id === application._id ? { ...item, status: nextStatus } : item
        )
      );
      toast.success("Application status updated");
    } catch (error: any) {
      toast.error(error.message || "Unable to update status.");
    }
  };

  const remove = async (application: Application) => {
    if (
      !window.confirm(
        `Delete the application from ${application.firstName} ${application.lastName}? This cannot be undone.`
      )
    ) {
      return;
    }
    try {
      const response = await fetch(
        `/api/admin/volunteers/${application._id}`,
        { method: "DELETE" }
      );
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to delete application.");
      }
      setApplications((previous) =>
        previous.filter((item) => item._id !== application._id)
      );
      setSelected(null);
      toast.success("Application deleted");
    } catch (error: any) {
      toast.error(error.message || "Unable to delete application.");
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-display text-xl font-bold text-primary">
          Volunteer applications
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          Review applications, download CVs and update their status.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-4">
        {STATUSES.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setStatus(status === item ? "all" : item)}
            className={`rounded-xl border p-4 text-left transition-colors ${
              status === item
                ? "border-primary bg-primary text-white"
                : "border-slate-200 bg-white hover:border-slate-300"
            }`}
          >
            <p
              className={`text-[10px] font-semibold uppercase tracking-wider ${
                status === item ? "text-white/60" : "text-slate-400"
              }`}
            >
              {item}
            </p>
            <p className="mt-1 font-display text-2xl font-bold">
              {counts[item] ?? 0}
            </p>
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white">
        <div className="flex flex-col justify-between gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center">
          <div className="relative w-full sm:max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by name, email or location…"
              className="w-full rounded-lg border border-slate-200 py-2 pl-9 pr-3 text-sm outline-none focus:border-primary"
            />
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>{filtered.length} applications</span>
            {status !== "all" && (
              <button
                type="button"
                onClick={() => setStatus("all")}
                className="rounded-full bg-slate-100 px-2.5 py-1 font-semibold text-slate-600 hover:bg-slate-200"
              >
                Clear filter
              </button>
            )}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="h-6 w-6 animate-spin text-accent" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-sm font-medium text-slate-600">
              No applications found
            </p>
            <p className="mt-1 text-xs text-slate-400">
              New volunteer applications will appear here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-[10px] uppercase tracking-wider text-slate-400">
                  <th className="px-4 py-3 font-semibold">Applicant</th>
                  <th className="px-4 py-3 font-semibold">Contact</th>
                  <th className="px-4 py-3 font-semibold">Location</th>
                  <th className="px-4 py-3 font-semibold">Applied</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((application) => (
                  <tr key={application._id} className="hover:bg-slate-50/70">
                    <td className="px-4 py-3">
                      <p className="font-semibold text-primary">
                        {application.firstName} {application.lastName}
                      </p>
                      <p className="text-xs text-slate-400">
                        {application.age ? `${application.age} years old` : "—"}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-600">
                      <p>{application.email}</p>
                      <p className="text-slate-400">
                        {application.countryCode} {application.phone}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-600">
                      {application.location}
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-500">
                      {formatDate(application.createdAt)}
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={application.status || "pending"}
                        onChange={(event) =>
                          changeStatus(application, event.target.value)
                        }
                        className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider outline-none ${
                          statusStyles[application.status || "pending"] ||
                          statusStyles.pending
                        }`}
                      >
                        {STATUSES.map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => setSelected(application)}
                          className="rounded p-1.5 text-slate-400 hover:bg-slate-100 hover:text-primary"
                          aria-label="View application"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        {application.cvFileId && (
                          <a
                            href={`/api/admin/volunteers/${application._id}/cv`}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded p-1.5 text-slate-400 hover:bg-slate-100 hover:text-primary"
                            aria-label="Download CV"
                          >
                            <Download className="h-4 w-4" />
                          </a>
                        )}
                        <button
                          type="button"
                          onClick={() => remove(application)}
                          className="rounded p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-500"
                          aria-label="Delete application"
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

      {selected && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-100 px-6 py-4">
              <div>
                <h3 className="font-display text-lg font-bold text-primary">
                  {selected.firstName} {selected.lastName}
                </h3>
                <p className="text-xs text-slate-400">
                  Applied {formatDate(selected.createdAt)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4 px-6 py-5 text-sm">
              <div className="grid gap-3 sm:grid-cols-2">
                <InfoRow icon={<Mail className="h-4 w-4" />} label="Email">
                  {selected.email}
                </InfoRow>
                <InfoRow icon={<Phone className="h-4 w-4" />} label="Phone">
                  {selected.countryCode} {selected.phone}
                </InfoRow>
                <InfoRow icon={<MapPin className="h-4 w-4" />} label="Location">
                  {selected.location}
                </InfoRow>
                <InfoRow icon={<Eye className="h-4 w-4" />} label="Age">
                  {selected.age ? `${selected.age} years` : "—"}
                </InfoRow>
              </div>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Status
                </p>
                <select
                  value={selected.status || "pending"}
                  onChange={(event) => {
                    changeStatus(selected, event.target.value);
                    setSelected({ ...selected, status: event.target.value });
                  }}
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-primary"
                >
                  {STATUSES.map((item) => (
                    <option key={item} value={item}>
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-wrap gap-2 border-t border-slate-100 pt-4">
                {selected.cvFileId ? (
                  <a
                    href={`/api/admin/volunteers/${selected._id}/cv`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-white hover:bg-primary-800"
                  >
                    <Download className="h-4 w-4" />
                    View CV
                  </a>
                ) : (
                  <span className="text-xs text-slate-400">No CV attached.</span>
                )}
                <a
                  href={`mailto:${selected.email}`}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  <Mail className="h-4 w-4" />
                  Email applicant
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function InfoRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-2.5">
      <span className="mt-0.5 text-slate-400">{icon}</span>
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
          {label}
        </p>
        <p className="break-all text-sm text-slate-700">{children}</p>
      </div>
    </div>
  );
}
