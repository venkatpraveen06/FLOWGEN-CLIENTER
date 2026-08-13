import React, { useState } from 'react';
import {
  X,
  Plus,
  Building2,
  UserCheck,
  FileSpreadsheet
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DEFAULT_LEAD_SOURCES } from '../data/initialData';

export const AddLeadModal = () => {
  const { userProfile, currentAdmin, isAddLeadOpen, setIsAddLeadOpen, addLead } = useApp();
  const curr = userProfile.currencySymbol || '₹';
  const [activeTab, setActiveTab] = useState('single');

  const [formData, setFormData] = useState({
    businessName: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    projectName: 'Website Development & AI Automation',
    instagramHandle: '',
    website: '',
    source: 'google_maps',
    niche: 'Healthcare',
    dealValue: 35000,
    pricingType: 'one_off',
    addedBy: currentAdmin?.name || currentAdmin?.username || 'VENKAT PRAVEEN',
    followUpDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    followUpNotes: 'Send initial outreach introduction.',
    auditNotes: ''
  });

  const [batchRawText, setBatchRawText] = useState('');

  if (!isAddLeadOpen) return null;

  const handleSingleSubmit = (e) => {
    e.preventDefault();
    if (!formData.businessName.trim()) return;

    addLead({
      ...formData,
      dealValue: Number(formData.dealValue) || 0
    });

    setFormData({
      businessName: '',
      contactName: '',
      contactEmail: '',
      contactPhone: '',
      projectName: 'Website Development & AI Automation',
      instagramHandle: '',
      website: '',
      source: 'google_maps',
      niche: 'Healthcare',
      dealValue: 35000,
      pricingType: 'one_off',
      addedBy: currentAdmin?.name || currentAdmin?.username || 'VENKAT PRAVEEN',
      followUpDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
      followUpNotes: 'Send initial outreach introduction.',
      auditNotes: ''
    });

    setIsAddLeadOpen(false);
  };

  const handleBatchParseSubmit = (e) => {
    e.preventDefault();
    if (!batchRawText.trim()) return;

    const lines = batchRawText.split('\n');

    lines.forEach((line) => {
      if (!line.trim()) return;
      const parts = line.split(/[,;\t]/).map((p) => p.trim());
      if (parts[0]) {
        addLead({
          businessName: parts[0],
          contactName: parts[1] || '',
          contactEmail: parts[2] || '',
          contactPhone: parts[3] || '',
          projectName: parts[4] || 'Website Development',
          niche: parts[5] || formData.niche,
          source: formData.source,
          dealValue: 25000,
          pricingType: 'one_off',
          addedBy: currentAdmin?.name || currentAdmin?.username || 'VENKAT PRAVEEN',
          followUpDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
          followUpNotes: 'Batch imported lead — review qualification details.'
        });
      }
    });

    setBatchRawText('');
    setIsAddLeadOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden transition-colors">
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
              <Plus className="w-5 h-5 text-blue-600" />
              <span>Capture Prospect / Client</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Add client details manually or batch-import raw listings.
            </p>
          </div>

          <button
            onClick={() => setIsAddLeadOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Capture Mode Tabs */}
        <div className="flex border-b border-slate-200 px-6 bg-slate-50">
          <button
            onClick={() => setActiveTab('single')}
            className={`py-3 px-4 font-semibold text-xs border-b-2 transition-all flex items-center space-x-2 ${
              activeTab === 'single'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Single Client Form</span>
          </button>

          <button
            onClick={() => setActiveTab('batch')}
            className={`py-3 px-4 font-semibold text-xs border-b-2 transition-all flex items-center space-x-2 ${
              activeTab === 'batch'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Batch Text Parser</span>
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'single' ? (
            <form onSubmit={handleSingleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Client / Business Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apex Fitness Studio"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-blue-600 font-semibold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Contact Person Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Rahul Sharma"
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-blue-600 font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Project Details / Scope</label>
                  <input
                    type="text"
                    placeholder="e.g. Website Overhaul + AI Booking System"
                    value={formData.projectName}
                    onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 flex items-center justify-between">
                    <span>Acquired / Added By Admin</span>
                    <UserCheck className="w-3.5 h-3.5 text-blue-600" />
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.addedBy}
                    onChange={(e) => setFormData({ ...formData, addedBy: e.target.value })}
                    className="w-full bg-blue-50 border border-blue-200 rounded-xl px-3 py-2 text-xs text-blue-800 font-bold focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Email Address</label>
                  <input
                    type="email"
                    placeholder="contact@business.com"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Phone / WhatsApp</label>
                  <input
                    type="text"
                    placeholder="+919876543210"
                    value={formData.contactPhone}
                    onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Niche Category</label>
                  <input
                    type="text"
                    placeholder="Healthcare, Restaurant..."
                    value={formData.niche}
                    onChange={(e) => setFormData({ ...formData, niche: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Lead Source</label>
                  <select
                    value={formData.source}
                    onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none"
                  >
                    {DEFAULT_LEAD_SOURCES.map((src) => (
                      <option key={src.id} value={src.id}>
                        {src.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Project Value ({curr})</label>
                  <input
                    type="number"
                    value={formData.dealValue}
                    onChange={(e) => setFormData({ ...formData, dealValue: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 font-mono font-bold focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsAddLeadOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/20"
                >
                  Add Client to Pipeline
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleBatchParseSubmit} className="space-y-4">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
                Paste raw listings copied from Google Maps, WhatsApp groups, or spreadsheets (one business per line). Format:{' '}
                <code className="text-blue-700 bg-slate-100 px-1 py-0.5 rounded font-mono">
                  Business Name, Contact Name, Email, Phone, Project Details, Niche
                </code>
              </div>

              <textarea
                rows={6}
                value={batchRawText}
                onChange={(e) => setBatchRawText(e.target.value)}
                placeholder={`Aura Smiles Dental Studio, Dr. Elena Rostova, elena@aurasmilesdental.com, +919876543210, Website Redesign, Healthcare\nVeloce Pizza, Marco Bellini, marco@velocepizza.io, +919876543211, Online Food Ordering, Hospitality`}
                className="w-full bg-white border border-slate-300 rounded-xl p-3 text-xs text-slate-800 font-mono focus:outline-none"
              />

              <div className="flex justify-end space-x-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsAddLeadOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/20"
                >
                  Parse & Import Clients
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
