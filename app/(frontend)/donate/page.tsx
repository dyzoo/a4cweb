"use client";

import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  ArrowRight,
  Heart,
  Landmark,
  Lock,
  ShieldCheck,
  Smartphone,
  Star,
  Users,
} from "lucide-react";
import Icon from "@/app/components/Icon";
import { useContent } from "@/app/components/ContentProvider";

type DonorDetails = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  isAnonymous: boolean;
};

type DonationData = {
  amount: number;
  cause: string;
  donor: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  reference: string;
};

export default function DonationPage() {
  const { donate } = useContent();
  const [donationAmount, setDonationAmount] = useState<number | "">("");
  const [customAmount, setCustomAmount] = useState("");
  const [donorDetails, setDonorDetails] = useState<DonorDetails>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    isAnonymous: false,
  });
  const [selectedCause, setSelectedCause] = useState("general");
  const [loading, setLoading] = useState(false);

  const handleAmountSelect = (amount: number) => {
    setDonationAmount(amount);
    setCustomAmount("");
  };

  const handleCustomAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomAmount(value);
    setDonationAmount(value === "" ? "" : Number(value));
  };

  const generateReference = () =>
    "DON-" + Date.now() + "-" + Math.random().toString(36).slice(2, 11);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!donationAmount || donationAmount <= 0) {
      toast.error("Please choose or enter a valid donation amount.");
      return;
    }

    setLoading(true);
    try {
      const donationData: DonationData = {
        amount: donationAmount,
        cause: selectedCause,
        donor: {
          firstName: donorDetails.isAnonymous
            ? "Anonymous"
            : donorDetails.firstName || "Anonymous",
          lastName: donorDetails.isAnonymous
            ? "Donor"
            : donorDetails.lastName || "Donor",
          email: donorDetails.email,
          phone: donorDetails.phone,
        },
        reference: generateReference(),
      };

      const response = await fetch("/api/donation/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(donationData),
      });

      const data = await response.json();
      if (data.success && data.redirectUrl) {
        window.location.href = data.redirectUrl;
      } else {
        toast.error("Payment could not be initialised. Please try again.");
      }
    } catch (error) {
      console.error("Donation error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-cream dark:bg-primary-900">
      <Toaster position="top-center" />
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary-900 py-20 text-white sm:py-24">
        <div
          aria-hidden
          className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-accent/10 blur-3xl"
        />
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <span className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
            <Star className="h-3.5 w-3.5 text-accent-400" /> Secure giving
          </span>
          <h1 className="heading-xl mx-auto mt-5 max-w-3xl text-4xl text-white sm:text-5xl">
            {donate.title}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
            {donate.subtitle}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-card dark:border-white/10 dark:bg-primary-800">
          <div className="grid lg:grid-cols-[0.9fr_1.4fr]">
            {/* Cause selection */}
            <div className="border-b border-primary/10 bg-primary p-7 text-white lg:border-b-0 lg:border-r dark:border-white/10 sm:p-9">
              <h2 className="font-display text-2xl font-bold">Your impact</h2>
              <p className="mt-2 text-sm text-white/60">
                Choose where you would like your gift to go.
              </p>

              <div className="mt-6 space-y-3">
                {donate.causes.map((cause) => {
                  const isSelected = selectedCause === cause.id;
                  return (
                    <button
                      key={cause.id}
                      type="button"
                      onClick={() => setSelectedCause(cause.id)}
                      className={`flex w-full items-center gap-3 rounded-xl p-4 text-left transition-all duration-300 ${
                        isSelected
                          ? "bg-accent text-white shadow-lg"
                          : "border border-white/10 bg-white/5 text-white/75 hover:border-white/25 hover:bg-white/10"
                      }`}
                    >
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                          isSelected ? "bg-white/15" : "bg-white/10 text-accent-400"
                        }`}
                      >
                        <Icon name={cause.icon} className="h-4 w-4" />
                      </span>
                      <span>
                        <span className="block text-sm font-semibold">{cause.name}</span>
                        <span
                          className={`block text-xs ${
                            isSelected ? "text-white/80" : "text-white/50"
                          }`}
                        >
                          {cause.description}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 rounded-xl border border-white/10 bg-white/5 p-4 text-xs text-white/60">
                <p className="flex items-center gap-2 font-semibold text-white/80">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  Secure and transparent
                </p>
                <p className="mt-2 leading-relaxed">
                  Payments are processed securely. Every contribution is directed to
                  the cause you select.
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="p-7 sm:p-9">
              <form onSubmit={handleSubmit}>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Select amount (TZS)
                </label>
                <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-5">
                  {donate.presetAmounts.map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => handleAmountSelect(amount)}
                      className={`rounded-lg border px-2 py-3 text-sm font-semibold transition-all duration-300 ${
                        donationAmount === amount
                          ? "border-accent bg-accent text-white shadow-md"
                          : "border-gray-200 bg-white text-gray-700 hover:border-accent/40 hover:text-accent-600 dark:border-white/15 dark:bg-primary-900 dark:text-gray-200"
                      }`}
                    >
                      {amount.toLocaleString()}
                    </button>
                  ))}
                </div>

                <div className="relative mt-3">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-400">
                    TZS
                  </span>
                  <input
                    type="number"
                    placeholder="Enter a custom amount"
                    value={customAmount}
                    onChange={handleCustomAmount}
                    min="1"
                    className="w-full rounded-lg border border-gray-200 bg-white py-3 pl-14 pr-4 text-sm text-gray-900 outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20 dark:border-white/15 dark:bg-primary-900 dark:text-white dark:placeholder:text-gray-500"
                  />
                </div>

                <div className="mt-7">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Your information
                  </h3>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <input
                      type="text"
                      placeholder="First name"
                      value={donorDetails.firstName}
                      onChange={(e) =>
                        setDonorDetails({ ...donorDetails, firstName: e.target.value })
                      }
                      disabled={donorDetails.isAnonymous}
                      required={!donorDetails.isAnonymous}
                      className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20 disabled:opacity-50 dark:border-white/15 dark:bg-primary-900 dark:text-white"
                    />
                    <input
                      type="text"
                      placeholder="Last name"
                      value={donorDetails.lastName}
                      onChange={(e) =>
                        setDonorDetails({ ...donorDetails, lastName: e.target.value })
                      }
                      disabled={donorDetails.isAnonymous}
                      required={!donorDetails.isAnonymous}
                      className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20 disabled:opacity-50 dark:border-white/15 dark:bg-primary-900 dark:text-white"
                    />
                  </div>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <input
                      type="email"
                      placeholder="Email address"
                      value={donorDetails.email}
                      onChange={(e) =>
                        setDonorDetails({ ...donorDetails, email: e.target.value })
                      }
                      required
                      className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20 dark:border-white/15 dark:bg-primary-900 dark:text-white"
                    />
                    <input
                      type="tel"
                      placeholder="Phone number"
                      value={donorDetails.phone}
                      onChange={(e) =>
                        setDonorDetails({ ...donorDetails, phone: e.target.value })
                      }
                      required
                      className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20 dark:border-white/15 dark:bg-primary-900 dark:text-white"
                    />
                  </div>

                  <label className="mt-4 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <input
                      type="checkbox"
                      checked={donorDetails.isAnonymous}
                      onChange={(e) =>
                        setDonorDetails({
                          ...donorDetails,
                          isAnonymous: e.target.checked,
                        })
                      }
                      className="h-4 w-4 rounded border-gray-300 text-accent focus:ring-accent"
                    />
                    Give anonymously
                  </label>
                </div>

                <div className="mt-6 rounded-xl border border-primary/10 bg-cream/70 p-4 dark:border-white/10 dark:bg-primary-900">
                  <p className="flex items-center gap-2 text-xs font-semibold text-gray-700 dark:text-gray-200">
                    <ShieldCheck className="h-4 w-4 text-emerald-600" />
                    Secure payment options
                  </p>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    <span className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300">
                      <Smartphone className="h-4 w-4 text-accent-600" />
                      Mobile money (M-Pesa, Airtel, Tigo)
                    </span>
                    <span className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300">
                      <Landmark className="h-4 w-4 text-accent-600" />
                      Bank cards (Visa, Mastercard)
                    </span>
                  </div>
                  <div className="mt-3 flex items-center gap-4 border-t border-primary/10 pt-3 text-[11px] text-gray-500 dark:border-white/10 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <Lock className="h-3 w-3" /> SSL secure
                    </span>
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="h-3 w-3" /> PCI-DSS compliant
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!donationAmount || loading}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-4 text-base font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                      Processing…
                    </>
                  ) : (
                    <>
                      <Heart className="h-5 w-5" />
                      Donate{" "}
                      {donationAmount
                        ? `TZS ${Number(donationAmount).toLocaleString()}`
                        : "now"}
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </button>

                <p className="mt-4 text-center text-[11px] text-gray-500 dark:text-gray-400">
                  By donating you agree to our Terms of Service and Privacy Policy.
                </p>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            { icon: Users, title: "Community-led", text: "Programmes designed with local leaders." },
            { icon: ShieldCheck, title: "Transparent", text: "Clear reporting on how funds are used." },
            { icon: Heart, title: "Child-focused", text: "Every shilling prioritises children." },
          ].map(({ icon: Ico, title, text }) => (
            <div
              key={title}
              className="flex items-start gap-3 rounded-xl border border-primary/10 bg-white p-5 dark:border-white/10 dark:bg-primary-800"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent-600">
                <Ico className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold text-primary dark:text-white">{title}</p>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
