// app/volunteer/page.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  UserIcon, 
  PhoneIcon, 
  EnvelopeIcon, 
  CalendarIcon, 
  MapPinIcon, 
  DocumentArrowUpIcon,
  CheckCircleIcon 
} from '@heroicons/react/24/outline';

export default function VolunteerPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    countryCode: '+255',
    email: '',
    birthYear: '',
    birthMonth: '',
    birthDate: '',
    location: '',
    cv: null as File | null
  });
  
  const [captchaText, setCaptchaText] = useState('');
  const [userCaptcha, setUserCaptcha] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Generate CAPTCHA on component mount
  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setCaptchaText(result);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        return;
      }
      if (!file.type.includes('pdf') && !file.type.includes('document') && !file.name.toLowerCase().endsWith('.doc') && !file.name.toLowerCase().endsWith('.docx')) {
        alert('Please upload a PDF or Word document');
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        return;
      }
      setFormData(prev => ({ ...prev, cv: file }));
    }
  };

// Replace the current handleSubmit function in your volunteer page
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (userCaptcha !== captchaText) {
    alert('CAPTCHA verification failed.');
    generateCaptcha();
    return;
  }

  setIsSubmitting(true);

  try {
    const data = new FormData();

    data.append('firstName', formData.firstName);
    data.append('lastName', formData.lastName);
    data.append('phone', formData.phone);
    data.append('countryCode', formData.countryCode);
    data.append('email', formData.email);
    data.append('birthYear', formData.birthYear);
    data.append('birthMonth', formData.birthMonth);
    data.append('birthDate', formData.birthDate);
    data.append('location', formData.location);

    if (formData.cv) {
      data.append('cv', formData.cv);
    }

    const res = await fetch('/api/volunteer', {
      method: 'POST',
      body: data, // ✅ browser now sets multipart/form-data automatically
    });

    const result = await res.json();

    if (!res.ok) throw new Error(result.error || 'Submission failed');

    setIsSubmitted(true);
  } catch (err: any) {
    console.error(err);
    alert(err.message || 'Submission failed. Try again.');
  } finally {
    setIsSubmitting(false);
  }
};


// Optional: Helper function to convert file to base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

  const countryCodes = [
    { code: '+255', country: 'Tanzania' },
    { code: '+254', country: 'Kenya' },
    { code: '+256', country: 'Uganda' },
    { code: '+250', country: 'Rwanda' },
    { code: '+257', country: 'Burundi' },
    { code: '+1', country: 'USA/Canada' },
    { code: '+44', country: 'UK' },
    { code: '+91', country: 'India' },
    { code: '+27', country: 'South Africa' },
    { code: '+234', country: 'Nigeria' }
  ];

  const months = [
    { value: '1', name: 'January' },
    { value: '2', name: 'February' },
    { value: '3', name: 'March' },
    { value: '4', name: 'April' },
    { value: '5', name: 'May' },
    { value: '6', name: 'June' },
    { value: '7', name: 'July' },
    { value: '8', name: 'August' },
    { value: '9', name: 'September' },
    { value: '10', name: 'October' },
    { value: '11', name: 'November' },
    { value: '12', name: 'December' }
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 80 }, (_, i) => currentYear - 18 - i);
  const dates = Array.from({ length: 31 }, (_, i) => i + 1);

if (isSubmitted) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-6" />
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Hi {formData.firstName},
          </h1>

          <p className="text-lg text-gray-600 mb-6">
            Thank you for your interest in volunteering with us. 
            We have successfully received your application and our team will contact you within 3–5 business days.
          </p>

          <button
            onClick={() => window.location.href = '/'}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
}

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Become a Volunteer</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join our mission to create lasting change. Your time and skills can make a difference in children's lives across Tanzania.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">
                  First Name *
                </label>
                <div className="relative">
                  <UserIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter your first name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">
                  Last Name *
                </label>
                <div className="relative">
                  <UserIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number *
              </label>
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <PhoneIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <select
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white appearance-none"
                  >
                    {countryCodes.map(({ code, country }) => (
                      <option key={code} value={code}>
                        {code} ({country})
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="flex-2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Phone number"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address *
              </label>
              <div className="relative">
                <EnvelopeIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Date of Birth *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <CalendarIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 z-10" />
                  <select
                    name="birthYear"
                    required
                    value={formData.birthYear}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white relative z-0"
                  >
                    <option value="">Year</option>
                    {years.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>

                <select
                  name="birthMonth"
                  required
                  value={formData.birthMonth}
                  onChange={handleInputChange}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                >
                  <option value="">Month</option>
                  {months.map(month => (
                    <option key={month.value} value={month.value}>{month.name}</option>
                  ))}
                </select>

                <select
                  name="birthDate"
                  required
                  value={formData.birthDate}
                  onChange={handleInputChange}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                >
                  <option value="">Date</option>
                  {dates.map(date => (
                    <option key={date} value={date}>{date}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-2">
                Current Location *
              </label>
              <div className="relative">
                <MapPinIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  id="location"
                  name="location"
                  required
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="City, Country"
                />
              </div>
            </div>

            {/* CV Upload */}
            <div>
              <label htmlFor="cv" className="block text-sm font-semibold text-gray-700 mb-2">
                Upload CV (PDF, max 5MB) *
              </label>
              <div 
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <DocumentArrowUpIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 mb-2">
                  {formData.cv ? formData.cv.name : 'Click to upload your CV'}
                </p>
                <p className="text-sm text-gray-500">PDF, DOC, DOCX (Max 5MB)</p>
                <input
                  type="file"
                  id="cv"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  required
                />
              </div>
              {formData.cv && (
                <p className="text-sm text-green-600 mt-2 flex items-center">
                  <CheckCircleIcon className="h-4 w-4 mr-1" />
                  File selected: {formData.cv.name} ({(formData.cv.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              )}
            </div>

            {/* CAPTCHA */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <label htmlFor="captcha" className="block text-sm font-semibold text-gray-700 mb-4">
                Security Verification *
              </label>
              <div className="flex items-center gap-4">
                <div className="flex-1 bg-white p-4 rounded border-2 border-gray-300 font-mono text-2xl text-center tracking-widest select-none">
                  {captchaText}
                </div>
                <button
                  type="button"
                  onClick={generateCaptcha}
                  className="px-4 py-2 text-sm text-blue-600 hover:text-blue-800 font-semibold cursor-pointer"
                >
                  Refresh
                </button>
              </div>
              <input
                type="text"
                id="captcha"
                value={userCaptcha}
                onChange={(e) => setUserCaptcha(e.target.value)}
                className="w-full mt-4 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 "
                placeholder="Enter the code above"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-800 to-orange-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-0range-600 hover:to-blue-900 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition
  duration-300
  transform
  hover:-translate-y-1
  hover:scale-105 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Submitting...
                </>
              ) : (
                'Submit Application'
              )}
            </button>

            <p className="text-sm text-gray-500 text-center">
              By submitting this form, you agree to our privacy policy and terms of service.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}