// components/BecomeSponsorPage.tsx
'use client';

import { useState } from 'react';
import { Heart, Mail, Phone, User, DollarSign, Calendar, MessageSquare, Send } from 'lucide-react';

export default function BecomeSponsorPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    sponsorshipTier: 'monthly',
    amount: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Send data to your API endpoint (you'll need to create this)
      const response = await fetch('/api/sponsor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          sponsorshipTier: 'monthly',
          amount: '',
          message: '',
        });
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 py-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-900 rounded-full mb-6">
            <Heart className="w-5 h-5 text-orange-500" />
            <span className="text-white font-semibold text-sm uppercase tracking-wider">
              Become a Sponsor
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Partner with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-orange-600">
              Aid 4 Children Tanzania
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your sponsorship provides a child with education, healthcare, and hope for a brighter future.
            Join us in transforming lives.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left Column - Info & Benefits */}
          <div className="space-y-8">
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-blue-900 mb-6">Why Sponsor?</h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-orange-600 font-bold">✓</span>
                  </div>
                  <p className="text-gray-700"><span className="font-semibold">Direct Impact:</span> 100% of your contribution goes directly to the child's education and well-being.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-orange-600 font-bold">✓</span>
                  </div>
                  <p className="text-gray-700"><span className="font-semibold">Long-term Change:</span> You support a child from primary school through university.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-orange-600 font-bold">✓</span>
                  </div>
                  <p className="text-gray-700"><span className="font-semibold">Regular Updates:</span> Receive progress reports, photos, and letters from your sponsored child.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-orange-600 font-bold">✓</span>
                  </div>
                  <p className="text-gray-700"><span className="font-semibold">Tax Benefits:</span> All donations are tax-deductible (receipt provided).</p>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-blue-900 to-orange-600 rounded-3xl shadow-xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Sponsorship Tiers</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-white/20 pb-3">
                  <span className="font-semibold">Monthly Supporter</span>
                  <span className="text-2xl font-bold">$30</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/20 pb-3">
                  <span className="font-semibold">Annual Sponsor</span>
                  <span className="text-2xl font-bold">$360</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/20 pb-3">
                  <span className="font-semibold">Education Champion</span>
                  <span className="text-2xl font-bold">$500+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Legacy Sponsor (Full Education)</span>
                  <span className="text-2xl font-bold">$5,000</span>
                </div>
              </div>
              <p className="text-white/80 text-sm mt-4">
                *Any amount makes a difference. You can also choose a custom amount.
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <h3 className="text-xl font-bold text-blue-900 mb-4">Have Questions?</h3>
              <p className="text-gray-600 mb-4">
                Our team is here to help you with any inquiries about sponsorship.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-gray-700">
                  <Mail className="w-5 h-5 text-orange-600" />
                  <a href="mailto:info@aid4children.org" className="hover:text-blue-900 transition">
                    info@aid4children.org
                  </a>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <Phone className="w-5 h-5 text-orange-600" />
                  <a href="tel:+255766400009" className="hover:text-blue-900 transition">
                    +255 766 400 009
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Heart className="w-6 h-6 text-orange-600" />
              Sponsorship Form
            </h2>

            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700">
                Thank you for your interest! We've received your request and will contact you shortly.
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
                Something went wrong. Please try again or contact us directly.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              {/* Phone (optional) */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number (optional)
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                    placeholder="+255 766 400 009"
                  />
                </div>
              </div>

              {/* Sponsorship Tier */}
              <div>
                <label htmlFor="sponsorshipTier" className="block text-sm font-medium text-gray-700 mb-2">
                  Sponsorship Type *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select
                    id="sponsorshipTier"
                    name="sponsorshipTier"
                    required
                    value={formData.sponsorshipTier}
                    onChange={handleChange}
                    className="w-full pl-12 pr-10 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition appearance-none bg-white"
                  >
                    <option value="monthly">Monthly Supporter ($30/month)</option>
                    <option value="annual">Annual Sponsor ($360/year)</option>
                    <option value="champion">Education Champion ($500+)</option>
                    <option value="legacy">Legacy Sponsor ($5,000)</option>
                    <option value="custom">Custom Amount</option>
                  </select>
                </div>
              </div>

              {/* Amount (conditional) */}
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                  {formData.sponsorshipTier === 'custom' ? 'Custom Amount (USD) *' : 'Amount (USD) (optional)'}
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    id="amount"
                    name="amount"
                    min="1"
                    value={formData.amount}
                    onChange={handleChange}
                    required={formData.sponsorshipTier === 'custom'}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                    placeholder="e.g., 50"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message or Questions (optional)
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                    placeholder="Tell us about your interest or any questions..."
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-900 to-orange-600 text-white font-bold py-4 px-6 rounded-xl text-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>Processing...</>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Submit Sponsorship Request
                  </>
                )}
              </button>
            </form>

            <p className="text-xs text-gray-500 mt-6 text-center">
              By submitting this form, you agree to our privacy policy and consent to being contacted about your sponsorship.
              Your information will be sent to <strong>info@aid4children.org</strong>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}