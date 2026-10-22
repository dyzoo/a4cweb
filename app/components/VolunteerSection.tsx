"use client";

import Link from "next/link";
import { ArrowRight, HeartHandshake } from "lucide-react";
import { Button } from "./ui/button";
import { useContent } from "./ContentProvider";
import Icon from "./Icon";
import Reveal from "./Reveal";

export default function VolunteerSection() {
  const { volunteer } = useContent();

  return (
    <section className="relative overflow-hidden bg-primary py-20 text-white sm:py-24">
      <div
        aria-hidden
        className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-accent/10 to-transparent"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <span className="section-eyebrow !text-accent-400">{volunteer.eyebrow}</span>
            <h2 className="heading-xl mt-5 text-3xl text-white sm:text-4xl">
              {volunteer.title}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70">
              {volunteer.description}
            </p>
            <Link href={volunteer.ctaHref || "/become-volunteer"} className="mt-8 inline-block">
              <Button variant="accent" size="lg" className="group">
                <HeartHandshake className="h-4 w-4" />
                {volunteer.ctaLabel}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {volunteer.items.map((item, index) => (
              <Reveal key={item.title} delay={index * 90}>
                <div className="group h-full rounded-xl border border-white/10 bg-white/[0.04] p-5 transition-all duration-400 hover:-translate-y-1 hover:border-accent/40 hover:bg-white/[0.08]">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/15 text-accent-400 transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                    <Icon name={item.icon} className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">
                    {item.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
