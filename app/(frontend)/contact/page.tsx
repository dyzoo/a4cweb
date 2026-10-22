"use client";

import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { useContent } from "@/app/components/ContentProvider";
import Reveal from "@/app/components/Reveal";
import Icon from "@/app/components/Icon";

export default function ContactPage() {
  const { contact } = useContent();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <div className="bg-white dark:bg-primary-900">
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary-900 py-20 text-white sm:py-24">
        <div
          aria-hidden
          className="absolute -right-24 top-0 h-80 w-80 rounded-full bg-accent/10 blur-3xl"
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl">
            <span className="section-eyebrow !text-accent-400">Contact us</span>
            <h1 className="heading-xl mt-5 text-4xl text-white sm:text-5xl">
              {contact.title}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/70">
              {contact.subtitle}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Information */}
            <div>
              <Reveal>
                <h2 className="font-display text-2xl font-bold text-primary dark:text-white sm:text-3xl">
                  {contact.infoTitle}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300 sm:text-base">
                  {contact.infoText}
                </p>
              </Reveal>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {contact.items.map((item, index) => (
                  <Reveal key={item.title} delay={index * 80}>
                    <div className="group h-full rounded-xl border border-primary/10 bg-cream/60 p-5 transition-all duration-400 hover:-translate-y-1 hover:border-accent/30 hover:bg-white hover:shadow-soft dark:border-white/10 dark:bg-primary-800">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white transition-colors duration-300 group-hover:bg-accent">
                        <Icon name={item.icon} className="h-5 w-5" />
                      </div>
                      <h3 className="mt-4 text-sm font-semibold text-primary dark:text-white">
                        {item.title}
                      </h3>
                      <div className="mt-2 space-y-1">
                        {item.details.map((detail) => (
                          <p
                            key={detail}
                            className="text-xs leading-relaxed text-gray-600 dark:text-gray-300"
                          >
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={150} className="mt-6">
                <div className="overflow-hidden rounded-xl border border-primary/10 dark:border-white/10">
                  <iframe
                    src={contact.mapEmbedUrl}
                    width="100%"
                    height="280"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Aid 4 Children Tanzania location"
                    className="grayscale-[20%]"
                  />
                </div>
              </Reveal>
            </div>

            {/* Form */}
            <Reveal delay={100}>
              <div className="rounded-2xl border border-primary/10 bg-white p-7 shadow-soft dark:border-white/10 dark:bg-primary-800 sm:p-9">
                <h2 className="font-display text-2xl font-bold text-primary dark:text-white">
                  {contact.formTitle}
                </h2>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Fill in the form and our team will respond within two business days.
                </p>

                {submitted && (
                  <div className="mt-5 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
                    {contact.successMessage}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400"
                      >
                        Full name *
                      </label>
                      <input
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20 dark:border-white/15 dark:bg-primary-900 dark:text-white dark:placeholder:text-gray-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400"
                      >
                        Email address *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20 dark:border-white/15 dark:bg-primary-900 dark:text-white dark:placeholder:text-gray-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400"
                    >
                      Subject *
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="How can we help?"
                      className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20 dark:border-white/15 dark:bg-primary-900 dark:text-white dark:placeholder:text-gray-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us what is on your mind"
                      className="w-full resize-none rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20 dark:border-white/15 dark:bg-primary-900 dark:text-white dark:placeholder:text-gray-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-600 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Send message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
