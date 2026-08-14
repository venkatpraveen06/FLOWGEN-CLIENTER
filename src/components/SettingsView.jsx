import React, { useRef, useState } from 'react';
import {
  Settings,
  Database,
  Download,
  Upload,
  RefreshCw,
  Trash2,
  ShieldCheck,
  User,
  Building2,
  CheckCircle2,
  HardDrive,
  Globe
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SettingsView = () => {
  const {
    userProfile,
    updateProfile,
    leads,
    invoices,
    expenses,
    resetToDemoData,
    clearAllData,
    exportDataJSON,
    importDataJSON,
    lastCloudSync,
    isSyncingCloud,
    syncOnlineCloud
  } = useApp();

  const fileInputRef = useRef(null);
  const [importStatus, setImportStatus] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [profileForm, setProfileForm] = useState({
    userName: userProfile.userName || 'VENKAT PRAVEEN',
    agencyName: userProfile.agencyName || 'FlowGen',
    currencySymbol: userProfile.currencySymbol || '₹',
    email: userProfile.email || 'yvpms2006@flowgen.io',
    phone: userProfile.phone || '+91 9876543210'
  });

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    updateProfile(profileForm);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const success = importDataJSON(event.target.result);
        if (success) {
          setImportStatus('Data backup successfully restored!');
          setTimeout(() => setImportStatus(''), 3000);
        } else {
          setImportStatus('Error importing JSON data. Please check file format.');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Organization & Data Storage</h1>
        <p className="text-sm text-slate-600">
          Configure real agency details for <span className="font-bold text-blue-700">{userProfile.agencyName || 'FlowGen'}</span> and manage real-time persistent client storage.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile & Agency Form */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4 shadow-sm">
          <div className="flex items-center space-x-3 border-b border-slate-200 pb-3">
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600 font-bold text-sm">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Agency & Founder Profile</h3>
              <p className="text-xs text-slate-500">Personalize real-time client headers, invoices & quotes</p>
            </div>
          </div>

          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Founder Full Name</label>
              <input
                type="text"
                required
                value={profileForm.userName}
                onChange={(e) => setProfileForm({ ...profileForm, userName: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-blue-600 font-bold"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Agency Name</label>
                <input
                  type="text"
                  required
                  value={profileForm.agencyName}
                  onChange={(e) => setProfileForm({ ...profileForm, agencyName: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Currency Symbol</label>
                <select
                  value={profileForm.currencySymbol}
                  onChange={(e) => setProfileForm({ ...profileForm, currencySymbol: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none font-bold font-mono"
                >
                  <option value="₹">₹ Indian Rupees (INR)</option>
                  <option value="$">$ US Dollars (USD)</option>
                  <option value="€">€ Euros (EUR)</option>
                  <option value="£">£ British Pounds (GBP)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Business Email</label>
                <input
                  type="email"
                  value={profileForm.email}
                  onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Business Phone / WhatsApp</label>
                <input
                  type="text"
                  value={profileForm.phone}
                  onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              {savedSuccess && (
                <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Agency Settings Saved!
                </span>
              )}
              <button
                type="submit"
                className="ml-auto px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/20"
              >
                Save Agency Details
              </button>
            </div>
          </form>
        </div>

        {/* Real-Time Persistent Client Storage Verification Card */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4 shadow-sm">
            <div className="flex items-center space-x-3 border-b border-slate-200 pb-3">
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 font-bold text-sm">
                <HardDrive className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">Real-Time Persistent Storage</h3>
                <p className="text-xs text-slate-500">Every client record auto-saves instantly into browser storage</p>
              </div>
            </div>

            {/* Live Saved Client Counter */}
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-2">
              <div className="flex items-center justify-between text-emerald-700 font-bold text-xs">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Real-Time Online Cloud DB Connected & Synced</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">Last Sync: {lastCloudSync}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 pt-1 font-mono text-center">
                <div className="bg-white p-2 rounded-lg border border-emerald-200">
                  <p className="text-xs text-slate-500 font-sans">Cloud Leads</p>
                  <p className="text-lg font-bold text-slate-900">{leads.length}</p>
                </div>
                <div className="bg-white p-2 rounded-lg border border-emerald-200">
                  <p className="text-xs text-slate-500 font-sans">Cloud Invoices</p>
                  <p className="text-lg font-bold text-slate-900">{invoices.length}</p>
                </div>
                <div className="bg-white p-2 rounded-lg border border-emerald-200">
                  <p className="text-xs text-slate-500 font-sans">Cloud Expenses</p>
                  <p className="text-lg font-bold text-slate-900">{expenses.length}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <button
                onClick={syncOnlineCloud}
                className="w-full p-3 rounded-xl bg-emerald-50/90 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-between hover:bg-emerald-100 transition-colors shadow-2xs"
              >
                <div className="flex items-center space-x-2">
                  <Globe className="w-4 h-4 text-emerald-600 animate-pulse" />
                  <span>Sync Now to Online Cloud Database</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-700">{isSyncingCloud ? 'Syncing...' : 'Active 🟢'}</span>
              </button>
              <button
                onClick={exportDataJSON}
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold flex items-center justify-between hover:bg-slate-100 transition-colors"
              >
                <span>Export Real Agency Backup (.JSON File)</span>
                <Download className="w-4 h-4 text-blue-600" />
              </button>

              <div className="flex items-center gap-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept=".json"
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1 p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold flex items-center justify-between hover:bg-slate-100 transition-colors"
                >
                  <span>Import Data Backup</span>
                  <Upload className="w-4 h-4 text-indigo-600" />
                </button>
              </div>
              {importStatus && <p className="text-xs font-semibold text-indigo-600">{importStatus}</p>}

              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  onClick={() => {
                    if (confirm('Clear all client data and start a fresh empty pipeline?')) {
                      clearAllData();
                    }
                  }}
                  className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center justify-between hover:bg-rose-100 transition-colors"
                >
                  <span>Clear All Clients</span>
                  <Trash2 className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    if (confirm('Reset pipeline back to demo data?')) {
                      resetToDemoData();
                    }
                  }}
                  className="p-3 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold flex items-center justify-between hover:bg-slate-200 transition-colors"
                >
                  <span>Reset Demo Data</span>
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
