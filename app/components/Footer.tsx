"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUp,
  ArrowUpRight,
  Facebook,
  Heart,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  Twitter,
} from "lucide-react";
import { useContent } from "./ContentProvider";

const socials = [
  { label: "Facebook", href: "https://facebook.com", Icon: Facebook },
  { label: "Twitter", href: "https://twitter.com", Icon: Twitter },
  {
    label: "Instagram",
    href: "https://instagram.com/aidforchildrentza",
    Icon: Instagram,
  },
  { label: "LinkedIn", href: "https://linkedin.com", Icon: Linkedin },
];

export default function Footer() {
  const { site, footer } = useContent();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setName("");
    setEmail("");
    window.setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <footer className="relative overflow-hidden bg-primary-900 text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-primary-400/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link href="/" className="group inline-flex items-center gap-3">
              <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15">
                <Image
                  src="/A4C logo2.png"
                  alt={`${site.name} logo`}
                  width={44}
                  height={44}
                  className="h-12 w-12 object-contain"
                />
              </span>
              <span className="font-display text-xl font-bold">{site.name}</span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/65">
              {footer.about}
            </p>

            <div className="mt-6 space-y-3 text-sm text-white/70">
              <p className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent-400" />
                {site.address}
              </p>
              <a
                href={`tel:${site.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-3 transition-colors hover:text-white"
              >
                <Phone className="h-4 w-4 text-accent-400" />
                {site.phone}
              </a>
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-3 transition-colors hover:text-white"
              >
                <Mail className="h-4 w-4 text-accent-400" />
                {site.email}
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">
              {footer.quickLinksTitle}
            </h3>
            <ul className="mt-5 space-y-3">
              {footer.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1.5 text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">
              {footer.newsletterTitle}
            </h3>
            <p className="mt-5 text-sm leading-relaxed text-white/65">
              {footer.newsletterText}
            </p>
            <form onSubmit={handleSubscribe} className="mt-5 space-y-3">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
                className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-accent focus:outline-none"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-accent focus:outline-none"
              />
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-accent-600 hover:-translate-y-0.5"
              >
                <Send className="h-4 w-4" />
                Subscribe
              </button>
              {subscribed && (
                <p className="animate-fade-in text-xs font-medium text-emerald-300">
                  Thank you for subscribing — welcome to the A4C family.
                </p>
              )}
            </form>
          </div>

          {/* Social */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">
              {footer.connectTitle}
            </h3>
            <div className="mt-5 flex gap-3">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:bg-accent hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>

            <Link
              href="/become-volunteer"
              className="mt-6 flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80 transition-colors hover:border-accent/50 hover:text-white"
            >
              <Heart className="h-4 w-4 text-accent-400" />
              Join our volunteer network
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. {footer.rights}
          </p>
          <div className="flex items-center gap-5">
            <Link href="/contact" className="transition-colors hover:text-white">
              Contact
            </Link>
            <Link href="/about" className="transition-colors hover:text-white">
              About
            </Link>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Back to top"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 transition-all hover:-translate-y-0.5 hover:border-accent hover:text-white"
            >
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
