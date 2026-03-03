// app/donation/success/page.tsx
'use client'
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function DonationSuccess() {
  const searchParams = useSearchParams();
  const reference = searchParams.get('reference');

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="w-20 h-20 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Thank You!</h1>
        <p className="text-gray-600 mb-6">
          Your generous donation has been received. A receipt has been sent to your email.
        </p>
        {reference && (
          <p className="text-sm text-gray-500 mb-8">
            Reference: {reference}
          </p>
        )}
        <div className="space-y-3">
          <Link 
            href="/" 
            className="block w-full bg-orange-600 text-white py-3 px-4 rounded-lg hover:bg-orange-700 transition"
          >
            Return to Home
          </Link>
          <button 
            onClick={() => window.print()}
            className="block w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition"
          >
            Download Receipt
          </button>
        </div>
      </div>
    </div>
  );
}