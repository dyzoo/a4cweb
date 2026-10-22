"use client";

import { Quote, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useContent } from "./ContentProvider";
import Reveal from "./Reveal";

export default function Testimonials() {
  const { testimonials } = useContent();

  return (
    <section className="bg-white py-20 dark:bg-primary-900 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="section-eyebrow">{testimonials.eyebrow}</span>
          <h2 className="heading-xl mt-5 text-3xl text-primary dark:text-white sm:text-4xl">
            {testimonials.title}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-gray-600 dark:text-gray-300">
            {testimonials.subtitle}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.items.map((testimonial, index) => (
            <Reveal key={`${testimonial.name}-${index}`} delay={index * 110}>
              <figure className="group relative flex h-full flex-col rounded-2xl border border-primary/10 bg-cream/60 p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-accent/30 hover:bg-white hover:shadow-card dark:border-white/10 dark:bg-primary-800 dark:hover:bg-primary-800">
                <Quote className="h-8 w-8 text-accent/30 transition-colors duration-300 group-hover:text-accent/60" />
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                  “{testimonial.content}”
                </blockquote>
                <div className="mt-6 flex items-center gap-3 border-t border-primary/10 pt-5 dark:border-white/10">
                  <Avatar className="h-11 w-11 ring-2 ring-white dark:ring-primary-700">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback className="bg-primary text-sm font-semibold text-white">
                      {testimonial.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <figcaption className="text-sm font-semibold text-primary dark:text-white">
                      {testimonial.name}
                    </figcaption>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {testimonial.role}
                    </p>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-3 w-3 fill-accent text-accent"
                      />
                    ))}
                  </div>
                </div>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
