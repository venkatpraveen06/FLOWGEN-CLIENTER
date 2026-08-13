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
    logout
  } = useApp();

  const newLeadsCount = leads.filter((l) => l.stage === 'new_lead').length;

  return (
    <header className="h-16 border-b border-slate-200 bg-white/90 backdrop-blur-md sticky top-0 z-30 px-4 md:px-6 flex items-center justify-between shadow-sm">
      {/* Exact Flowgen Logo */}
      <FlowGenLogo className="w-8 h-8" subtitle="SOLO CRM" />

      {/* Global Quick Search Bar */}
      <div className="flex-1 max-w-md mx-4 hidden md:block">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search leads, clients, contacts, or projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-100 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Quick Action Tools & Logout */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        {/* Pipeline Notification Indicator */}
        <button
          onClick={() => setActiveTab('pipeline')}
          className="relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
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
          className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors hidden sm:flex items-center space-x-1 text-xs font-semibold"
          title="Export JSON Backup"
        >
          <Download className="w-4 h-4 text-blue-600" />
          <span>Export</span>
        </button>

        {/* Primary Add Lead Button in Dark Blue */}
        <button
          onClick={() => setIsAddLeadOpen(true)}
          className="flex items-center space-x-2 px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-md shadow-blue-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" />
          <span>Add Lead</span>
        </button>

        {/* Admin Logout Button */}
        <button
          onClick={logout}
          className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
          title="Sign Out Admin"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};
