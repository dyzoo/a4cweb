"use client";

import { Check } from "lucide-react";
import { useContent } from "./ContentProvider";
import Icon from "./Icon";
import Reveal from "./Reveal";

export default function MissionSection() {
  const { mission } = useContent();

  return (
    <section className="relative overflow-hidden bg-cream py-20 dark:bg-primary-900 sm:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-accent/5 blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="section-eyebrow">{mission.eyebrow}</span>
          <h2 className="heading-xl mt-5 text-3xl text-primary dark:text-white sm:text-4xl">
            {mission.title}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-gray-600 dark:text-gray-300">
            {mission.subtitle}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {mission.cards.map((card, index) => (
            <Reveal key={card.title} delay={index * 110}>
              <article className="group relative h-full overflow-hidden rounded-2xl border border-primary/10 bg-white p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-accent/30 hover:shadow-[0_24px_60px_-32px_rgba(11,37,69,0.45)] dark:border-white/10 dark:bg-primary-800">
                <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100" />
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary-50 text-primary transition-colors duration-500 group-hover:bg-accent group-hover:text-white dark:bg-white/10 dark:text-white">
                  <Icon name={card.icon} className="h-7 w-7" />
                </div>
                <h3 className="mt-6 font-display text-2xl font-bold text-primary dark:text-white">
                  {card.title}
                </h3>
                {card.description && (
                  <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                    {card.description}
                  </p>
                )}
                {card.items?.length > 0 && (
                  <ul className="mt-5 space-y-3">
                    {card.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300"
                      >
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent-600">
                          <Check className="h-3 w-3" />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
