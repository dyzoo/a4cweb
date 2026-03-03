// components/DonationPage.tsx
'use client'
import React, { useState } from 'react';
import { Heart, Users, BookOpen, Droplet, Smartphone, Landmark } from 'lucide-react';

// Define types
type DonorDetails = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  isAnonymous: boolean;
};

type Cause = {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
};

type DonationData = {
  amount: number;
  cause: string;
  donor: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  } | null;
  reference: string;
};

const DonationPage = () => {
  const [donationAmount, setDonationAmount] = useState<number | ''>('');
  const [customAmount, setCustomAmount] = useState<string>('');
  const [donorDetails, setDonorDetails] = useState<DonorDetails>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    isAnonymous: false
  });
  const [selectedCause, setSelectedCause] = useState<string>('general');
  const [loading, setLoading] = useState<boolean>(false);

  const presetAmounts: number[] = [5000, 10000, 20000, 50000, 100000];

  const causes: Cause[] = [
    { id: 'education', name: 'Education', icon: BookOpen, description: 'Support children\'s education' },
    { id: 'healthcare', name: 'Healthcare', icon: Droplet, description: 'Provide medical assistance' },
    { id: 'community', name: 'Community', icon: Users, description: 'Community development' },
    { id: 'general', name: 'General Fund', icon: Heart, description: 'Where most needed' }
  ];

  const handleAmountSelect = (amount: number): void => {
    setDonationAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmount = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setCustomAmount(value);
    setDonationAmount(value === '' ? '' : Number(value));
  };

  // Initialize PesaPal payment
  const initializePesaPalPayment = async (donationData: DonationData) => {
    try {
      const response = await fetch('/api/donation/initialize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(donationData),
      });
      
      return await response.json();
    } catch (error) {
      console.error('Error initializing payment:', error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    if (!donationAmount || donationAmount <= 0) {
      alert('Please enter a valid donation amount');
      return;
    }
    
    setLoading(true);

    try {
      const donationData: DonationData = {
        amount: donationAmount,
        cause: selectedCause,
       donor: {
  firstName: donorDetails.isAnonymous ? "Anonymous" : donorDetails.firstName,
  lastName: donorDetails.isAnonymous ? "Donor" : donorDetails.lastName,
  email: donorDetails.email,
  phone: donorDetails.phone
},
        reference: generateReference()
      };

      const response = await initializePesaPalPayment(donationData);
      
      if (response.success) {
        window.location.href = response.redirectUrl;
      } else {
        alert('Payment initialization failed. Please try again.');
      }
    } catch (error) {
      console.error('Donation error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const generateReference = (): string => {
    return 'DON-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Hero Section */}
      <div className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Make a Difference Today</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Your donation helps us provide education, healthcare, and hope to communities in need.
          </p>
        </div>
      </div>

      

      {/* Main Donation Form */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="md:flex">
              {/* Left Column - Causes */}
              <div className="md:w-1/3 bg-orange-50 p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Impact</h2>
                <div className="space-y-4">
                  {causes.map((cause) => {
                    const Icon = cause.icon;
                    return (
                      <button
                        key={cause.id}
                        onClick={() => setSelectedCause(cause.id)}
                        className={`w-full text-left p-4 rounded-xl transition-all ${
                          selectedCause === cause.id
                            ? 'bg-orange-600 text-white shadow-lg'
                            : 'bg-white hover:shadow-md'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <Icon className={`w-6 h-6 ${
                            selectedCause === cause.id ? 'text-white' : 'text-orange-600'
                          }`} />
                          <div>
                            <h3 className="font-semibold">{cause.name}</h3>
                            <p className={`text-sm ${
                              selectedCause === cause.id ? 'text-orange-100' : 'text-gray-600'
                            }`}>
                              {cause.description}
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Impact Stats */}
                <div className="mt-8 pt-8 border-t border-orange-200">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">500+</div>
                      <div className="text-sm text-gray-600">Children Educated</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">1000+</div>
                      <div className="text-sm text-gray-600">Lives Impacted</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Donation Form */}
              <div className="md:w-2/3 p-8">
                <form onSubmit={handleSubmit}>
                  {/* Amount Selection */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Select Amount (TZS)
                    </label>
                    <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-3">
                      {presetAmounts.map((amount) => (
                        <button
                          key={amount}
                          type="button"
                          onClick={() => handleAmountSelect(amount)}
                          className={`py-3 px-2 rounded-lg font-medium transition-all ${
                            donationAmount === amount
                              ? 'bg-orange-600 text-white shadow-lg'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          TZS {amount.toLocaleString()}
                        </button>
                      ))}
                    </div>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        TZS
                      </span>
                      <input
                        type="number"
                        placeholder="Custom amount"
                        value={customAmount}
                        onChange={handleCustomAmount}
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        min="1"
                      />
                    </div>
                  </div>

                  {/* Donor Details */}
                  <div className="space-y-4 mb-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <input
                          type="text"
                          placeholder="First Name"
                          value={donorDetails.firstName}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDonorDetails({...donorDetails, firstName: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          required={!donorDetails.isAnonymous}
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="Last Name"
                          value={donorDetails.lastName}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDonorDetails({...donorDetails, lastName: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          required={!donorDetails.isAnonymous}
                        />
                      </div>
                    </div>
                    
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={donorDetails.email}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDonorDetails({...donorDetails, email: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      required
                    />
                    
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={donorDetails.phone}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDonorDetails({...donorDetails, phone: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      required
                    />

                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={donorDetails.isAnonymous}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDonorDetails({...donorDetails, isAnonymous: e.target.checked})}
                        className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500"
                      />
                      <span className="text-gray-700">Donate anonymously</span>
                    </label>
                  </div>

                 
                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={!donationAmount || loading}
                    className={`w-full py-4 px-6 rounded-lg text-white font-bold text-lg transition-all ${
                      !donationAmount || loading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-orange-600 hover:bg-orange-700 shadow-lg hover:shadow-xl'
                    }`}
                  >
                    {loading ? 'Processing...' : `Donate ${donationAmount ? `TZS ${donationAmount.toLocaleString()}` : ''}`}
                  </button>

                
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationPage;