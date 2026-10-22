"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  KeyRound,
  Loader2,
  Plus,
  ShieldCheck,
  Trash2,
  UserPlus,
  X,
} from "lucide-react";

type AdminUser = {
  _id: string;
  name: string;
  email: string;
  role: "super_admin" | "admin" | "editor";
  isActive: boolean;
  lastLogin?: string | null;
  createdAt?: string;
};

const roleLabels: Record<string, string> = {
  super_admin: "Super Administrator",
  admin: "Administrator",
  editor: "Editor",
};

const roleStyles: Record<string, string> = {
  super_admin: "bg-primary text-white",
  admin: "bg-blue-50 text-blue-600",
  editor: "bg-slate-100 text-slate-600",
};

const inputClass =
  "w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-700 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/10";

function formatDate(value?: string | null) {
  if (!value) return "Never";
  return new Date(value).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [currentUserId, setCurrentUserId] = useState("");
  const [currentRole, setCurrentRole] = useState("");
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "editor",
  });

  const load = async () => {
    try {
      const [usersResponse, meResponse] = await Promise.all([
        fetch("/api/admin/users", { cache: "no-store" }),
        fetch("/api/admin/me", { cache: "no-store" }),
      ]);
      const usersData = await usersResponse.json();
      const meData = await meResponse.json();

      if (!usersResponse.ok || !usersData.success) {
        throw new Error(usersData.message || "Unable to load accounts.");
      }
      setUsers(usersData.users || []);
      if (meData.success) {
        setCurrentUserId(meData.user.userId);
        setCurrentRole(meData.user.role);
      }
    } catch (error: any) {
      toast.error(error.message || "Unable to load accounts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const isSuperAdmin = currentRole === "super_admin";

  const createUser = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    try {
      const response = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to create account.");
      }
      toast.success("Admin account created");
      setModalOpen(false);
      setForm({ name: "", email: "", password: "", role: "editor" });
      await load();
    } catch (error: any) {
      toast.error(error.message || "Unable to create account.");
    } finally {
      setSaving(false);
    }
  };

  const patchUser = async (
    user: AdminUser,
    updates: Record<string, unknown>,
    successMessage: string
  ) => {
    try {
      const response = await fetch(`/api/admin/users/${user._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to update account.");
      }
      setUsers((previous) =>
        previous.map((item) =>
          item._id === user._id ? { ...item, ...updates } : item
        )
      );
      toast.success(successMessage);
    } catch (error: any) {
      toast.error(error.message || "Unable to update account.");
    }
  };

  const resetPassword = async (user: AdminUser) => {
    const password = window.prompt(
      `Enter a new password for ${user.name} (at least 8 characters):`
    );
    if (!password) return;
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }
    await patchUser(user, { password }, "Password updated");
  };

  const removeUser = async (user: AdminUser) => {
    if (
      !window.confirm(
        `Delete the admin account for ${user.name}? They will lose access immediately.`
      )
    ) {
      return;
    }
    try {
      const response = await fetch(`/api/admin/users/${user._id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to delete account.");
      }
      setUsers((previous) => previous.filter((item) => item._id !== user._id));
      toast.success("Account deleted");
    } catch (error: any) {
      toast.error(error.message || "Unable to delete account.");
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="font-display text-xl font-bold text-primary">
            Admin users
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Control who can access the dashboard and what they can manage.
          </p>
        </div>
        {isSuperAdmin && (
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-xs font-bold text-white transition-colors hover:bg-accent-600"
          >
            <UserPlus className="h-4 w-4" />
            Create account
          </button>
        )}
      </div>

      {!isSuperAdmin && (
        <div className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-xs text-blue-700">
          Only super administrators can create or modify admin accounts. You can
          still review the team below.
        </div>
      )}

      <div className="rounded-2xl border border-slate-200 bg-white">
        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="h-6 w-6 animate-spin text-accent" />
          </div>
        ) : users.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-sm font-medium text-slate-600">No accounts yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-[10px] uppercase tracking-wider text-slate-400">
                  <th className="px-4 py-3 font-semibold">Account</th>
                  <th className="px-4 py-3 font-semibold">Role</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Last sign-in</th>
                  <th className="px-4 py-3 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map((user) => {
                  const isSelf = user._id === currentUserId;
                  return (
                    <tr key={user._id} className="hover:bg-slate-50/70">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-50 text-sm font-bold text-primary">
                            {user.name.charAt(0).toUpperCase()}
                          </span>
                          <div className="min-w-0">
                            <p className="truncate font-semibold text-primary">
                              {user.name}{" "}
                              {isSelf && (
                                <span className="text-[10px] font-normal text-slate-400">
                                  (you)
                                </span>
                              )}
                            </p>
                            <p className="truncate text-xs text-slate-400">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        {isSuperAdmin && !isSelf ? (
                          <select
                            value={user.role}
                            onChange={(event) =>
                              patchUser(
                                user,
                                { role: event.target.value },
                                "Role updated"
                              )
                            }
                            className={`rounded-full border-0 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider outline-none ${
                              roleStyles[user.role]
                            }`}
                          >
                            {Object.entries(roleLabels).map(([value, label]) => (
                              <option key={value} value={value}>
                                {label}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <span
                            className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${
                              roleStyles[user.role]
                            }`}
                          >
                            {roleLabels[user.role]}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          type="button"
                          disabled={!isSuperAdmin || isSelf}
                          onClick={() =>
                            patchUser(
                              user,
                              { isActive: !user.isActive },
                              user.isActive ? "Account disabled" : "Account enabled"
                            )
                          }
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                            user.isActive
                              ? "bg-emerald-50 text-emerald-600"
                              : "bg-slate-100 text-slate-500"
                          } disabled:cursor-default`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              user.isActive ? "bg-emerald-500" : "bg-slate-400"
                            }`}
                          />
                          {user.isActive ? "Active" : "Disabled"}
                        </button>
                      </td>
                      <td className="px-4 py-3 text-xs text-slate-500">
                        {formatDate(user.lastLogin)}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            type="button"
                            disabled={!isSuperAdmin}
                            onClick={() => resetPassword(user)}
                            className="rounded p-1.5 text-slate-400 hover:bg-slate-100 hover:text-primary disabled:opacity-30"
                            aria-label="Reset password"
                          >
                            <KeyRound className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            disabled={!isSuperAdmin || isSelf}
                            onClick={() => removeUser(user)}
                            className="rounded p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-500 disabled:opacity-30"
                            aria-label="Delete account"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <div>
            <h3 className="text-sm font-bold text-primary">Role permissions</h3>
            <ul className="mt-2 space-y-1 text-xs text-slate-500">
              <li>
                <strong className="text-slate-700">Super Administrator</strong> —
                full access, including creating and managing admin accounts.
              </li>
              <li>
                <strong className="text-slate-700">Administrator</strong> — can
                manage content, projects, volunteers and media.
              </li>
              <li>
                <strong className="text-slate-700">Editor</strong> — can update
                website content and projects.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
          <form
            onSubmit={createUser}
            className="w-full max-w-md rounded-2xl bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
              <div>
                <h3 className="font-display text-lg font-bold text-primary">
                  Create admin account
                </h3>
                <p className="text-xs text-slate-400">
                  New members can sign in immediately.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4 px-6 py-5">
              <div>
                <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Full name *
                </label>
                <input
                  required
                  value={form.name}
                  onChange={(event) =>
                    setForm({ ...form, name: event.target.value })
                  }
                  className={inputClass}
                  placeholder="Jane Doe"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Email address *
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(event) =>
                    setForm({ ...form, email: event.target.value })
                  }
                  className={inputClass}
                  placeholder="jane@aid4children.org"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Temporary password *
                </label>
                <input
                  type="text"
                  required
                  minLength={8}
                  value={form.password}
                  onChange={(event) =>
                    setForm({ ...form, password: event.target.value })
                  }
                  className={inputClass}
                  placeholder="At least 8 characters"
                />
                <p className="mt-1 text-[11px] text-slate-400">
                  Share this securely. The user can change it later.
                </p>
              </div>
              <div>
                <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Role
                </label>
                <select
                  value={form.role}
                  onChange={(event) =>
                    setForm({ ...form, role: event.target.value })
                  }
                  className={inputClass}
                >
                  <option value="editor">Editor</option>
                  <option value="admin">Administrator</option>
                  <option value="super_admin">Super Administrator</option>
                </select>
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
                {saving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Plus className="h-4 w-4" />
                )}
                {saving ? "Creating…" : "Create account"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
