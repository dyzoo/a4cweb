"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { CheckCircle2, Heart, Home, Printer, ShieldCheck } from "lucide-react";

function DonationSuccessContent() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference");

  return (
    <div className="flex min-h-[75vh] items-center justify-center bg-cream px-4 py-16 dark:bg-primary-900">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-card dark:border-white/10 dark:bg-primary-800">
        <div className="bg-primary-900 px-8 py-8 text-center text-white">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
            <CheckCircle2 className="h-9 w-9" />
          </span>
          <h1 className="mt-5 font-display text-3xl font-bold">Thank you!</h1>
          <p className="mt-2 text-sm text-white/60">
            Your donation has been received successfully.
          </p>
        </div>

        <div className="px-8 py-7 text-center">
          <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
            Your generosity helps us keep children in school, provide meals and
            create brighter futures across Tanzania. A receipt has been sent to
            your email.
          </p>

          {reference && (
            <div className="mt-5 rounded-lg border border-primary/10 bg-cream/60 px-4 py-3 dark:border-white/10 dark:bg-primary-900">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                Payment reference
              </p>
              <p className="mt-0.5 break-all font-mono text-sm font-semibold text-primary dark:text-white">
                {reference}
              </p>
            </div>
          )}

          <div className="mt-6 space-y-3">
            <Link
              href="/"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-accent-600"
            >
              <Home className="h-4 w-4" />
              Return to home
            </Link>
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-primary/20 px-5 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white dark:border-white/20 dark:text-white dark:hover:bg-white dark:hover:text-primary"
            >
              <Printer className="h-4 w-4" />
              Print receipt
            </button>
          </div>

          <div className="mt-6 flex items-center justify-center gap-4 border-t border-primary/10 pt-5 text-[11px] text-gray-400 dark:border-white/10 dark:text-gray-500">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
              Secure payment
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Heart className="h-3.5 w-3.5 text-accent" />
              Every gift counts
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DonationSuccess() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[75vh] items-center justify-center bg-cream dark:bg-primary-900">
          <span className="h-8 w-8 animate-spin rounded-full border-2 border-accent/30 border-t-accent" />
        </div>
      }
    >
      <DonationSuccessContent />
    </Suspense>
  );
}
