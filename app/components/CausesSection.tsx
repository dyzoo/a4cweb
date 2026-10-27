"use client";

import Link from "next/link";
import { ArrowUpRight, Award } from "lucide-react";
import { Button } from "./ui/button";
import { useContent } from "./ContentProvider";
import Icon from "./Icon";
import Reveal from "./Reveal";

export default function CausesSection() {
  const { causes } = useContent();

  return (
    <section className="relative overflow-hidden bg-primary-900 py-20 text-white sm:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="section-eyebrow !text-accent-400">{causes.eyebrow}</span>
          <h2 className="heading-xl mt-5 text-3xl text-white sm:text-4xl">
            {causes.title}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/65">
            {causes.subtitle}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {causes.items.map((cause, index) => (
            <Reveal key={`${cause.title}-${index}`} delay={index * 110}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] transition-all duration-500 hover:-translate-y-2 hover:border-accent/40 hover:bg-white/[0.07]">
                <div className="relative h-56 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${cause.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-900/90 via-primary-900/20 to-transparent" />
                  <span
                    className={`absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                      cause.featured
                        ? "bg-accent text-white"
                        : "bg-white/90 text-primary"
                    }`}
                  >
                    {cause.badge}
                  </span>
                  <span className="absolute bottom-4 left-4 flex h-12 w-12 items-center justify-center rounded-full bg-white text-primary shadow-lg transition-transform duration-500 group-hover:scale-105">
                    <Icon name={cause.icon} className="h-5 w-5" />
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-xl font-bold text-white">
                    {cause.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-white/60">
                    {cause.description}
                  </p>
                  <Link
                    href={cause.href || "/projects"}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent-400 transition-colors hover:text-accent-400/80"
                  >
                    Learn more
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 text-center">
          <Link href={causes.viewAllHref || "/projects"}>
            <Button
              variant="light"
              className="border border-white/15 bg-transparent text-white hover:bg-white hover:text-primary"
            >
              {causes.viewAllLabel}
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
