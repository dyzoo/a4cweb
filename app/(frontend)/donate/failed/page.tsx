// app/donation/failed/page.tsx
'use client'
import { XCircle } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

// Separated into its own component so Suspense can wrap it
function DonationFailedContent() {
  const searchParams = useSearchParams();
  const reference = searchParams.get('reference');

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="flex justify-center mb-6">
          <XCircle className="w-20 h-20 text-red-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Payment Failed</h1>
        <p className="text-gray-600 mb-6">
          We couldn&apos;t process your donation. Please try again or contact support.
        </p>
        {reference && (
          <p className="text-sm text-gray-500 mb-8">
            Reference: {reference}
          </p>
        )}
        <div className="space-y-3">
          <Link
            href="/donate"
            className="block w-full bg-orange-600 text-white py-3 px-4 rounded-lg hover:bg-orange-700 transition"
          >
            Try Again
          </Link>
          <Link
            href="/"
            className="block w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function DonationFailed() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading...</div>
      </div>
    }>
      <DonationFailedContent />
    </Suspense>
  );
}
