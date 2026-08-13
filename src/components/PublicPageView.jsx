import React, { useState } from 'react';
import {
  Globe,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Lock
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { FlowGenLogo } from './FlowGenLogo';

export const PublicPageView = () => {
  const { userProfile, addLead } = useApp();
  const curr = userProfile.currencySymbol || '₹';

  const [form, setForm] = useState({
    businessName: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    niche: 'Healthcare',
    dealValue: 35000,
    projectName: 'Website Redesign & Local SEO Engine',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.businessName || !form.contactName) return;

    addLead({
      businessName: form.businessName,
      contactName: form.contactName,
      contactEmail: form.contactEmail,
      contactPhone: form.contactPhone,
      niche: form.niche,
      source: 'website',
      stage: 'new_lead',
      dealValue: Number(form.dealValue) || 35000,
      pricingType: 'one_off',
      projectName: form.projectName,
      addedBy: 'Public Page Inbound Inquiry',
      qualification: {
        budgetVerified: true,
        urgencyLevel: 'high',
        aiPitchHook: `Inbound website quote request from ${form.contactName} for ${form.projectName}.`
      },
      audit: {
        hasWebsite: false,
        notes: form.notes || 'Inbound client quote request from public web page.'
      }
    });

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    setSubmitted(true);
  };

  return (
    <div className="space-y-8 pb-12 max-w-4xl mx-auto">
      {/* Public Page Share Header Banner */}
      <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center space-x-2">
          <Globe className="w-4 h-4 text-blue-600 shrink-0" />
          <span className="text-slate-700">
            Share this link with potential clients to collect project inquiries directly into your real-time CRM pipeline.
          </span>
        </div>
        <button
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            alert('Public Client Inquiry Page URL copied to clipboard!');
          }}
          className="px-3.5 py-1.5 rounded-xl bg-blue-600 text-white font-bold shrink-0 hover:bg-blue-700 transition-colors"
        >
          Copy Shareable URL
        </button>
      </div>

      {/* Public Client Landing Website */}
      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-slate-200 space-y-8 shadow-xl">
        {/* Brand Header */}
        <div className="text-center space-y-3 border-b border-slate-200 pb-8 flex flex-col items-center">
          <FlowGenLogo className="w-12 h-12" textClassName="font-extrabold text-2xl text-slate-900 tracking-tight" />

          <div>
            <p className="text-sm font-semibold text-blue-700 mt-1">
              {userProfile.agencyName || 'FlowGen'}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              High-Speed Web Platforms & Client Acquisition Systems by <span className="font-bold text-slate-800">{userProfile.userName || 'VENKAT PRAVEEN'}</span>
            </p>
          </div>
        </div>

        {/* Form or Confirmation */}
        {submitted ? (
          <div className="p-8 text-center space-y-4 bg-emerald-50 border border-emerald-200 rounded-2xl">
            <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto" />
            <h3 className="text-2xl font-bold text-slate-900">Project Quote Submitted!</h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
              Thank you <span className="font-bold">{form.contactName}</span>! Your inquiry for <span className="font-bold">{form.businessName}</span> has been received by <span className="font-bold">{userProfile.agencyName || 'FlowGen'}</span>. We will review your project details and respond within 24 hours.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs"
            >
              Submit Another Inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center space-x-2 text-xs font-bold text-slate-800">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Project Quote Request Form</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Business / Company Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Apex Dental Clinic"
                  value={form.businessName}
                  onChange={(e) => setForm({ ...form, businessName: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600 font-semibold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Contact Person Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Rajesh Kumar"
                  value={form.contactName}
                  onChange={(e) => setForm({ ...form, contactName: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600 font-semibold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="contact@business.com"
                  value={form.contactEmail}
                  onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Phone / WhatsApp Number *</label>
                <input
                  type="text"
                  required
                  placeholder="+91 98765 43210"
                  value={form.contactPhone}
                  onChange={(e) => setForm({ ...form, contactPhone: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Industry Niche</label>
                <select
                  value={form.niche}
                  onChange={(e) => setForm({ ...form, niche: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none"
                >
                  <option value="Healthcare">Healthcare & Dental</option>
                  <option value="Hospitality">Restaurant & Hospitality</option>
                  <option value="Legal Services">Legal & Corporate</option>
                  <option value="E-commerce">E-commerce & Retail</option>
                  <option value="SaaS">SaaS & Software</option>
                  <option value="Fitness">Fitness & Gym</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Project Type</label>
                <input
                  type="text"
                  value={form.projectName}
                  onChange={(e) => setForm({ ...form, projectName: e.target.value })}
                  placeholder="Website Redesign, AI Chatbot..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Estimated Budget ({curr})</label>
                <select
                  value={form.dealValue}
                  onChange={(e) => setForm({ ...form, dealValue: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs text-slate-800 font-mono font-bold focus:outline-none"
                >
                  <option value={25000}>{curr}25,000 Starter System</option>
                  <option value={35000}>{curr}35,000 Growth Web System</option>
                  <option value={50000}>{curr}50,000 Premium System</option>
                  <option value={100000}>{curr}1,00,000+ Enterprise Retainer</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Project Goals & Details</label>
              <textarea
                rows={3}
                placeholder="Tell us about your target launch date, current challenges, or specific website requirements..."
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-800 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-600/20 flex items-center justify-center space-x-2 transition-all hover:scale-[1.01]"
            >
              <span>Submit Inquiry to {userProfile.agencyName || 'FlowGen'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
