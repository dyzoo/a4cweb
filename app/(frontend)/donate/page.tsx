// app/(frontend)/donate/page.tsx
'use client'

import React, { useState } from 'react';
import { 
  Heart, Users, BookOpen, Droplet, Smartphone, Landmark,
  Shield, Lock, ArrowRight
} from 'lucide-react';

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
  };
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
          firstName: donorDetails.isAnonymous ? "Anonymous" : donorDetails.firstName || "Anonymous",
          lastName: donorDetails.isAnonymous ? "Donor" : donorDetails.lastName || "Donor",
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
    <div className="min-h-screen transition-colors duration-300 bg-gradient-to-b from-orange-50 to-white dark:from-gray-900 dark:to-gray-800">
      
      {/* Hero Section */}
      <div className="bg-blue-900 dark:bg-gray-800 text-white py-16 transition-colors duration-300">
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
          <div className="rounded-2xl shadow-xl overflow-hidden transition-colors duration-300 bg-white dark:bg-gray-800">
            <div className="md:flex">
              
              {/* Left Column - Causes */}
              <div className="md:w-1/3 p-8 transition-colors duration-300 bg-orange-50 dark:bg-gray-900">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
                  Your Impact
                </h2>
                
                <div className="space-y-4">
                  {causes.map((cause) => {
                    const Icon = cause.icon;
                    const isSelected = selectedCause === cause.id;
                    return (
                      <button
                        key={cause.id}
                        onClick={() => setSelectedCause(cause.id)}
                        className={`w-full text-left p-4 rounded-xl transition-all ${
                          isSelected
                            ? 'bg-orange-600 text-white shadow-lg'
                            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-md dark:hover:bg-gray-700'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <Icon className={`w-5 h-5 ${
                            isSelected ? 'text-white' : 'text-orange-600 dark:text-orange-400'
                          }`} />
                          <div>
                            <h3 className="font-semibold">{cause.name}</h3>
                            <p className={`text-xs ${
                              isSelected ? 'text-orange-100' : 'text-gray-600 dark:text-gray-400'
                            }`}>
                              {cause.description}
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right Column - Donation Form */}
              <div className="md:w-2/3 p-8">
                <form onSubmit={handleSubmit}>
                  
                  {/* Amount Selection */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">
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
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                          }`}
                        >
                          TZS {amount.toLocaleString()}
                        </button>
                      ))}
                    </div>
                    
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
                        TZS
                      </span>
                      <input
                        type="number"
                        placeholder="Custom amount"
                        value={customAmount}
                        onChange={handleCustomAmount}
                        className="w-full pl-12 pr-4 py-3 rounded-lg border transition-all focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400"
                        min="1"
                      />
                    </div>
                  </div>

                  {/* Donor Details */}
                  <div className="space-y-4 mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                      Your Information
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="First Name"
                        value={donorDetails.firstName}
                        onChange={(e) => setDonorDetails({...donorDetails, firstName: e.target.value})}
                        className={`w-full px-4 py-3 rounded-lg border transition-all focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 ${
                          donorDetails.isAnonymous ? 'opacity-50' : ''
                        }`}
                        required={!donorDetails.isAnonymous}
                        disabled={donorDetails.isAnonymous}
                      />
                      
                      <input
                        type="text"
                        placeholder="Last Name"
                        value={donorDetails.lastName}
                        onChange={(e) => setDonorDetails({...donorDetails, lastName: e.target.value})}
                        className={`w-full px-4 py-3 rounded-lg border transition-all focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 ${
                          donorDetails.isAnonymous ? 'opacity-50' : ''
                        }`}
                        required={!donorDetails.isAnonymous}
                        disabled={donorDetails.isAnonymous}
                      />
                    </div>
                    
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={donorDetails.email}
                      onChange={(e) => setDonorDetails({...donorDetails, email: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg border transition-all focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400"
                      required
                    />
                    
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={donorDetails.phone}
                      onChange={(e) => setDonorDetails({...donorDetails, phone: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg border transition-all focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400"
                      required
                    />

                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={donorDetails.isAnonymous}
                        onChange={(e) => setDonorDetails({...donorDetails, isAnonymous: e.target.checked})}
                        className="w-4 h-4 rounded focus:ring-orange-500 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-orange-600 dark:text-orange-400"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Donate anonymously
                      </span>
                    </label>
                  </div>

                  {/* Payment Methods Preview */}
                  <div className="mb-6 p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
                    <div className="flex items-center space-x-2 mb-3">
                      <Shield className="w-4 h-4 text-green-600 dark:text-green-400" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Secure Payment Options
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center space-x-2">
                        <Smartphone className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                        <span className="text-xs text-gray-600 dark:text-gray-300">
                          Mobile Money (M-Pesa, Airtel, Tigo)
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Landmark className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                        <span className="text-xs text-gray-600 dark:text-gray-300">
                          Bank Cards (Visa, Mastercard)
                        </span>
                      </div>
                    </div>

                    {/* Security Badges */}
                    <div className="flex items-center space-x-4 mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                      <div className="flex items-center space-x-1">
                        <Lock className="w-3 h-3 text-gray-500 dark:text-gray-400" />
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          SSL Secure
                        </span>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        PCI-DSS Compliant
                      </span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={!donationAmount || loading}
                    className={`w-full py-4 px-6 rounded-lg text-white font-bold text-lg transition-all ${
                      !donationAmount || loading
                        ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                        : 'bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 shadow-lg hover:shadow-xl'
                    }`}
                  >
                    {loading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Processing...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <span>Donate {donationAmount ? `TZS ${donationAmount.toLocaleString()}` : ''}</span>
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    )}
                  </button>

                  <p className="text-center text-xs mt-4 text-gray-500 dark:text-gray-400">
                    By donating, you agree to our Terms of Service and Privacy Policy
                  </p>
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