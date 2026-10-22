"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, Copy, Mail, UserRound } from "lucide-react";
import { useContent } from "./ContentProvider";
import Reveal from "./Reveal";

export default function MeetTheFounders() {
  const { founders } = useContent();
  const [copied, setCopied] = useState<string | null>(null);

  const copyEmail = async (email: string) => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(email);
      window.setTimeout(() => setCopied(null), 2500);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <section className="relative overflow-hidden bg-white py-20 dark:bg-primary-900 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="section-eyebrow">{founders.eyebrow}</span>
          <h2 className="heading-xl mt-5 text-3xl text-primary dark:text-white sm:text-4xl">
            {founders.title}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-gray-600 dark:text-gray-300">
            {founders.subtitle}
          </p>
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-4xl gap-8 sm:grid-cols-2">
          {founders.items.map((founder, index) => (
            <Reveal key={founder.name} delay={index * 120}>
              <article className="group relative h-full overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-soft transition-all duration-500 hover:-translate-y-2 hover:shadow-card dark:border-white/10 dark:bg-primary-800">
                <div className="relative aspect-[4/4.2] overflow-hidden">
                  <Image
                    src={founder.image}
                    alt={founder.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-900 via-primary-900/30 to-transparent" />
                  <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary backdrop-blur">
                    <UserRound className="h-3 w-3 text-accent-600" />
                    Leadership
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h3 className="font-display text-2xl font-bold text-white">
                      {founder.name}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-accent-400">
                      {founder.designation}
                    </p>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                    {founder.bio}
                  </p>
                  <div className="mt-5 flex items-center gap-2">
                    <a
                      href={`mailto:${founder.email}`}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-xs font-semibold text-white transition-all duration-300 hover:bg-primary-700"
                    >
                      <Mail className="h-3.5 w-3.5" />
                      Email
                    </a>
                    <button
                      onClick={() => copyEmail(founder.email)}
                      aria-label={`Copy ${founder.name}'s email`}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/15 text-primary transition-colors hover:border-accent hover:text-accent dark:border-white/15 dark:text-white"
                    >
                      {copied === founder.email ? (
                        <Check className="h-3.5 w-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
