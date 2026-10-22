"use client";

import { HandshakeIcon } from "lucide-react";
import { useContent } from "./ContentProvider";
import Reveal from "./Reveal";

export default function Partners() {
  const { partners } = useContent();

  return (
    <section className="border-t border-primary/5 bg-cream py-16 dark:border-white/10 dark:bg-primary-900 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="section-eyebrow">{partners.eyebrow}</span>
          <h2 className="heading-xl mt-4 text-2xl text-primary dark:text-white sm:text-3xl">
            {partners.title}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300 sm:text-base">
            {partners.subtitle}
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {partners.items.map((partner, index) => {
            const content = (
              <div className="flex h-24 items-center justify-center rounded-xl border border-primary/10 bg-white px-4 grayscale transition-all duration-400 group-hover:-translate-y-1 group-hover:border-accent/30 group-hover:grayscale-0 group-hover:shadow-soft dark:border-white/10 dark:bg-primary-800">
                <img
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  className="max-h-14 w-full object-contain"
                  loading="lazy"
                />
              </div>
            );

            return (
              <Reveal key={`${partner.name}-${index}`} delay={index * 60}>
                {partner.url ? (
                  <a
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={partner.name}
                    className="group block"
                  >
                    {content}
                  </a>
                ) : (
                  <div className="group" title={partner.name}>
                    {content}
                  </div>
                )}
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-10 flex items-center justify-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-gray-400 dark:text-gray-500">
          <HandshakeIcon className="h-4 w-4 text-accent-600" />
          Stronger together
        </Reveal>
      </div>
    </section>
  );
}
