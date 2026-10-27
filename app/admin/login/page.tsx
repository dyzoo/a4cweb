"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail, ShieldCheck, Star } from "lucide-react";

const inputClass =
  "w-full rounded-lg border border-slate-200 bg-white py-3 pl-11 pr-11 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/10";

export default function AdminLoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.message || "Invalid email or password.");
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Unable to connect. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen bg-white lg:grid-cols-2">
      {/* Brand panel */}
      <div className="relative hidden overflow-hidden bg-primary-900 p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />

        <div className="relative flex items-center gap-4">
          <span className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-white">
            <Image
              src="/A4C logo2.png"
              alt="Aid 4 Children Tanzania"
              fill
              sizes="56px"
              className="object-contain p-1.5"
              priority
            />
          </span>
          <div>
            <p className="font-display text-xl font-bold">Aid 4 Children</p>
            <p className="text-xs uppercase tracking-[0.25em] text-white/50">
              Tanzania · Admin
            </p>
          </div>
        </div>

        <div className="relative max-w-md">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-accent-300">
            <Star className="h-3 w-3" />
            Content management
          </span>
          <h2 className="mt-5 font-display text-4xl font-bold leading-tight">
            Tell the story of every child&apos;s progress.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/60">
            Update the website, publish projects, review volunteer applications
            and manage your team — all from one secure dashboard.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-white/70">
            {[
              "Edit every section of the public website",
              "Publish and update community projects",
              "Review volunteer applications and CVs",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <ShieldCheck className="h-4 w-4 text-accent-400" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-xs text-white/35">
          © {new Date().getFullYear()} Aid 4 Children Tanzania. All rights reserved.
        </p>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center px-4 py-12 sm:px-8">
        <div className="w-full max-w-md">
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <span className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-primary-50">
              <Image
                src="/A4C logo2.png"
                alt="A4C"
                fill
                sizes="44px"
                className="object-contain p-1"
              />
            </span>
            <div>
              <p className="font-display text-lg font-bold text-primary">
                A4C Admin
              </p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">
                Aid 4 Children Tanzania
              </p>
            </div>
          </div>

          <h1 className="font-display text-3xl font-bold text-primary">
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Sign in to manage the A4C website and programmes.
          </p>

          {error && (
            <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-7 space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500"
              >
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={formData.email}
                  onChange={(event) =>
                    setFormData({ ...formData, email: event.target.value })
                  }
                  className={inputClass}
                  placeholder="you@aid4children.org"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={(event) =>
                    setFormData({ ...formData, password: event.target.value })
                  }
                  className={inputClass}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm text-slate-600">
              <input
                type="checkbox"
                checked={formData.rememberMe}
                onChange={(event) =>
                  setFormData({ ...formData, rememberMe: event.target.checked })
                }
                className="h-4 w-4 rounded border-slate-300 text-accent focus:ring-accent"
              />
              Keep me signed in for 30 days
            </label>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:bg-primary-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Signing in…
                </>
              ) : (
                "Sign in to dashboard"
              )}
            </button>
          </form>

          {process.env.NODE_ENV !== "production" && (
            <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-500">
              <p className="font-semibold text-slate-700">First-time setup</p>
              <p className="mt-1">
                Sign in with <span className="font-mono">admin@example.com</span>{" "}
                / <span className="font-mono">admin123</span>, then create your
                own account under Admin Users.
              </p>
            </div>
          )}

          <p className="mt-8 text-center text-xs text-slate-400">
            <Link href="/" className="hover:text-primary">
              ← Back to website
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
