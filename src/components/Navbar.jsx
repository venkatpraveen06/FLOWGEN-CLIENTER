import React from 'react';
import {
  Plus,
  Bell,
  Search,
  Download,
  LogOut
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { FlowGenLogo } from './FlowGenLogo';

export const Navbar = () => {
  const {
    leads,
    searchQuery,
    setSearchQuery,
    setIsAddLeadOpen,
    exportDataJSON,
    setActiveTab,
    logout,
    cloudStatus,
    lastCloudSync,
    isSyncingCloud,
    syncOnlineCloud
  } = useApp();

  const newLeadsCount = leads.filter((l) => l.stage === 'new_lead').length;

  return (
    <header className="h-16 floating-air-navbar sticky top-3 z-30 mx-4 my-2 px-5 flex items-center justify-between shadow-md">
      {/* Exact Flowgen Logo */}
      <FlowGenLogo className="w-8 h-8" subtitle="SOLO CRM" />

      {/* Global Quick Search Bar */}
      <div className="flex-1 max-w-md mx-6 hidden md:block">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search leads, clients, contacts, or projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-100/80 border border-slate-200/90 rounded-full text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition-all font-semibold"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Quick Action Tools & Logout */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        {/* Online Cloud Sync Status Badge */}
        <button
          onClick={syncOnlineCloud}
          className="hidden lg:flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-[10px] font-extrabold shadow-2xs hover:bg-emerald-100 transition-all"
          title={`Click to force sync. Last synced at ${lastCloudSync}`}
        >
          <span className={`w-2 h-2 rounded-full ${isSyncingCloud ? 'bg-amber-500 animate-ping' : 'bg-emerald-500 animate-pulse'}`} />
          <span>{isSyncingCloud ? 'Syncing Cloud...' : 'Online Cloud Active'}</span>
        </button>
        {/* Pipeline Notification Indicator */}
        <button
          onClick={() => setActiveTab('pipeline')}
          className="relative p-2 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 transition-colors"
          title="Pipeline Notifications"
        >
          <Bell className="w-5 h-5 text-slate-600" />
          {newLeadsCount > 0 && (
            <span className="absolute top-1 right-1 w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
              {newLeadsCount}
            </span>
          )}
        </button>

        {/* Quick Export Data */}
        <button
          onClick={exportDataJSON}
          className="p-2 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 transition-colors hidden sm:flex items-center space-x-1.5 text-xs font-bold"
          title="Export JSON Backup"
        >
          <Download className="w-4 h-4 text-blue-600" />
          <span>Export</span>
        </button>

        {/* Primary Add Lead Button in Dark Blue */}
        <button
          onClick={() => setIsAddLeadOpen(true)}
          className="flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/25 transition-all hover:scale-105 active:scale-95 btn-animated"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Add Lead</span>
        </button>

        {/* Admin Logout Button */}
        <button
          onClick={logout}
          className="p-2 rounded-full text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
          title="Sign Out Admin"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};
