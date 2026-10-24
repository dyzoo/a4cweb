"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import {
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Mail,
  MapPin,
  Phone,
  RefreshCw,
  ShieldCheck,
  UploadCloud,
  User,
} from "lucide-react";
import { useContent } from "@/app/components/ContentProvider";
import { Button } from "@/app/components/ui/button";

const countryCodes = [
  { code: "+255", country: "Tanzania" },
  { code: "+254", country: "Kenya" },
  { code: "+256", country: "Uganda" },
  { code: "+250", country: "Rwanda" },
  { code: "+257", country: "Burundi" },
  { code: "+1", country: "USA / Canada" },
  { code: "+44", country: "United Kingdom" },
  { code: "+91", country: "India" },
  { code: "+27", country: "South Africa" },
  { code: "+234", country: "Nigeria" },
];

const months = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

const inputClass =
  "w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20 dark:border-white/15 dark:bg-primary-900 dark:text-white dark:placeholder:text-gray-500";

export default function VolunteerPage() {
  const { volunteer } = useContent();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    countryCode: "+255",
    email: "",
    birthYear: "",
    birthMonth: "",
    birthDate: "",
    location: "",
    cv: null as File | null,
  });
  const [captchaText, setCaptchaText] = useState("");
  const [userCaptcha, setUserCaptcha] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const generateCaptcha = () => {
    const characters = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setCaptchaText(result);
    setUserCaptcha("");
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 4 * 1024 * 1024) {
      toast.error("Your CV must be smaller than 4 MB.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }
    const allowed =
      file.type.includes("pdf") ||
      file.type.includes("document") ||
      /\.docx?$/i.test(file.name);
    if (!allowed) {
      toast.error("Please upload a PDF or Word document.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }
    setFormData((prev) => ({ ...prev, cv: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (userCaptcha !== captchaText) {
      toast.error("The verification code does not match. Please try again.");
      generateCaptcha();
      return;
    }
    if (!formData.cv) {
      toast.error("Please attach your CV before submitting.");
      return;
    }

    setIsSubmitting(true);
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && key !== "cv") data.append(key, value as string);
      });
      if (formData.cv) data.append("cv", formData.cv);

      const res = await fetch("/api/volunteer", { method: "POST", body: data });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Submission failed");

      setIsSubmitted(true);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 80 }, (_, i) => currentYear - 18 - i);
  const dates = Array.from({ length: 31 }, (_, i) => i + 1);

  if (isSubmitted) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-cream px-4 py-16 dark:bg-primary-900">
        <div className="w-full max-w-xl rounded-2xl border border-primary/10 bg-white p-10 text-center shadow-card dark:border-white/10 dark:bg-primary-800">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
            <CheckCircle2 className="h-8 w-8" />
          </span>
          <h1 className="heading-xl mt-6 text-3xl text-primary dark:text-white">
            Thank you, {formData.firstName || "friend"}!
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
            We have received your volunteer application. Our team will review it
            and contact you within 3â€“5 business days.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/">
              <Button variant="default">Return home</Button>
            </Link>
            <Link href="/projects">
              <Button variant="outline">Explore projects</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-cream dark:bg-primary-900">
      <Toaster position="top-center" />
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary-900 py-20 text-white sm:py-24">
        <div className="absolute -right-20 top-0 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <span className="section-eyebrow !text-accent-400">{volunteer.eyebrow}</span>
          <h1 className="heading-xl mx-auto mt-5 max-w-3xl text-4xl text-white sm:text-5xl">
            {volunteer.title}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
            {volunteer.description}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-primary/10 bg-white p-7 shadow-soft dark:border-white/10 dark:bg-primary-800 sm:p-10">
          <div className="mb-8 flex items-center gap-3 border-b border-primary/10 pb-6 dark:border-white/10">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent-600">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div>
              <h2 className="font-display text-xl font-bold text-primary dark:text-white">
                Volunteer application
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                All fields marked * are required Â· about 5 minutes
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="First name *" icon={<User className="h-4 w-4" />}>
                <input
                  id="firstName"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Enter your first name"
                  className={`${inputClass} pl-10`}
                />
              </Field>
              <Field label="Last name *" icon={<User className="h-4 w-4" />}>
                <input
                  id="lastName"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Enter your last name"
                  className={`${inputClass} pl-10`}
                />
              </Field>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Phone number *
                </label>
                <div className="flex gap-2">
                  <div className="relative w-32 shrink-0">
                    <select
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleInputChange}
                      className={`${inputClass} appearance-none pr-8`}
                    >
                      {countryCodes.map(({ code, country }) => (
                        <option key={code} value={code}>
                          {code} {country.split(" ")[0]}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  </div>
                  <div className="relative flex-1">
                    <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Phone number"
                      className={`${inputClass} pl-10`}
                    />
                  </div>
                </div>
              </div>

              <Field label="Email address *" icon={<Mail className="h-4 w-4" />}>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="you@example.com"
                  className={`${inputClass} pl-10`}
                />
              </Field>
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Date of birth *
              </label>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="relative">
                  <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <select
                    name="birthYear"
                    required
                    value={formData.birthYear}
                    onChange={handleInputChange}
                    className={`${inputClass} appearance-none pl-10`}
                  >
                    <option value="">Year</option>
                    {years.map((year) => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
                <select
                  name="birthMonth"
                  required
                  value={formData.birthMonth}
                  onChange={handleInputChange}
                  className={`${inputClass} appearance-none`}
                >
                  <option value="">Month</option>
                  {months.map((month, index) => (
                    <option key={month} value={index + 1}>{month}</option>
                  ))}
                </select>
                <select
                  name="birthDate"
                  required
                  value={formData.birthDate}
                  onChange={handleInputChange}
                  className={`${inputClass} appearance-none`}
                >
                  <option value="">Day</option>
                  {dates.map((date) => (
                    <option key={date} value={date}>{date}</option>
                  ))}
                </select>
              </div>
            </div>

            <Field label="Current location *" icon={<MapPin className="h-4 w-4" />}>
              <input
                id="location"
                name="location"
                required
                value={formData.location}
                onChange={handleInputChange}
                placeholder="City, Country"
                className={`${inputClass} pl-10`}
              />
            </Field>

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Upload CV (PDF or Word, max 5 MB) *
              </label>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="cursor-pointer rounded-xl border-2 border-dashed border-gray-200 bg-cream/50 p-8 text-center transition-colors hover:border-accent hover:bg-accent/5 dark:border-white/15 dark:bg-primary-900"
              >
                <UploadCloud className="mx-auto h-10 w-10 text-accent-600" />
                <p className="mt-3 text-sm font-medium text-gray-700 dark:text-gray-200">
                  {formData.cv ? formData.cv.name : "Click to upload your CV"}
                </p>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  PDF, DOC or DOCX Â· maximum 5 MB
                </p>
                <input
                  type="file"
                  id="cv"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                />
              </div>
              {formData.cv && (
                <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-emerald-600">
                  <CheckCircle2 className="h-4 w-4" />
                  {formData.cv.name} ({(formData.cv.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              )}
            </div>

            {/* CAPTCHA */}
            <div className="rounded-xl border border-primary/10 bg-cream/60 p-5 dark:border-white/10 dark:bg-primary-900">
              <label className="mb-3 block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Security verification *
              </label>
              <div className="flex items-center gap-3">
                <div className="flex-1 select-none rounded-lg border border-primary/15 bg-white py-3 text-center font-mono text-xl tracking-[0.35em] text-primary line-through decoration-accent/40 decoration-2 dark:border-white/15 dark:bg-primary-800 dark:text-white">
                  {captchaText}
                </div>
                <button
                  type="button"
                  onClick={generateCaptcha}
                  aria-label="Refresh verification code"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-primary/15 text-primary transition-colors hover:border-accent hover:text-accent dark:border-white/15 dark:text-white"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
              </div>
              <input
                type="text"
                value={userCaptcha}
                onChange={(e) => setUserCaptcha(e.target.value)}
                placeholder="Enter the code above"
                required
                className={`${inputClass} mt-3`}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-4 text-base font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Submittingâ€¦
                </>
              ) : (
                "Submit application"
              )}
            </button>

            <p className="text-center text-xs text-gray-500 dark:text-gray-400">
              By submitting this form you agree to our privacy policy and terms of service.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  icon,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
        {label}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </span>
        {children}
      </div>
    </div>
  );
}
