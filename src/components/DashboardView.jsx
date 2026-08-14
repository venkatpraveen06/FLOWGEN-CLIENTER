import React from 'react';
import {
  TrendingUp,
  Users,
  Briefcase,
  DollarSign,
  Kanban,
  UserCheck,
  Plus,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Award,
  Globe,
  Clock
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const DashboardView = () => {
  const {
    leads,
    proposals,
    invoices,
    expenses,
    userProfile,
    currentAdmin,
    setActiveTab,
    setIsAddLeadOpen
  } = useApp();

  const curr = userProfile.currencySymbol || '₹';
  const currentAdminName = currentAdmin?.name || userProfile.userName || 'VENKAT PRAVEEN';
  const currentAdminAvatar = currentAdmin?.avatar || (currentAdmin?.username === 'yvpms2006' ? '/yvpms2006.jpg' : null);

  // Filter leads attributed to currently logged-in admin
  const leadsByCurrentAdmin = leads.filter(
    (l) => !l.addedBy || l.addedBy.toLowerCase().includes(currentAdminName.toLowerCase()) || l.addedBy.toLowerCase().includes('yvpms') || l.addedBy.toLowerCase().includes('venkat')
  );

  const wonByCurrentAdmin = leadsByCurrentAdmin.filter((l) => l.stage === 'won');

  // Total Revenue Calculation
  const totalRevenue = leads
    .filter((l) => l.stage === 'won')
    .reduce((acc, l) => acc + (Number(l.dealValue) || 0), 0);

  const pipelineValue = leads
    .filter((l) => l.stage !== 'lost')
    .reduce((acc, l) => acc + (Number(l.dealValue) || 0), 0);

  const totalExpenses = expenses.reduce((acc, e) => acc + (Number(e.amount) || 0), 0);
  const netProfit = totalRevenue - totalExpenses;

  const wonLeadsCount = leads.filter((l) => l.stage === 'won').length;
  const newProspectsCount = leads.filter((l) => l.stage === 'new_lead').length;

  return (
    <div className="space-y-6 pb-12">
      {/* Top Welcome Banner with Glossy Floating Air Card */}
      <div className="floating-air-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 relative overflow-hidden">
        <div className="space-y-1 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50/90 border border-blue-200/80 text-blue-700 text-[11px] font-extrabold mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SOLO CRM WORKSPACE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            <span>Welcome back, {currentAdminName}</span>
          </h1>
          <p className="text-xs text-slate-500 flex items-center gap-2">
            <span>Client Acquisition & Agency Dashboard for <span className="font-extrabold text-blue-700">{userProfile.agencyName || 'FlowGen'}</span></span>
          </p>
        </div>

        <div className="flex items-center space-x-3 relative z-10">
          <button
            onClick={() => setIsAddLeadOpen(true)}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-lg shadow-blue-600/25 transition-all hover:scale-105 active:scale-95 btn-animated"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>New Lead</span>
          </button>
          <button
            onClick={() => setActiveTab('pipeline')}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200/80 text-slate-800 font-extrabold text-xs transition-all hover:scale-105 active:scale-95"
          >
            <Kanban className="w-4 h-4 text-blue-600" />
            <span>Open Pipeline</span>
          </button>
        </div>
      </div>

      {/* Admin Performance Badge Card (Floating Air Card) */}
      <div className="floating-air-card p-5 border-l-4 border-l-blue-600 flex items-center justify-between gap-4">
        <div className="flex items-center space-x-4 min-w-0">
          {currentAdminAvatar ? (
            <img
              src={currentAdminAvatar}
              alt={currentAdminName}
              className="w-12 h-12 rounded-2xl object-cover border-2 border-blue-600 shrink-0 shadow-md"
            />
          ) : (
            <div className="w-12 h-12 rounded-2xl bg-blue-900 text-white font-bold text-base flex items-center justify-center shrink-0 shadow-md">
              {currentAdminName.substring(0, 1)}
            </div>
          )}
          <div className="min-w-0">
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 rounded-full bg-blue-100/80 text-blue-700 text-[10px] font-extrabold font-mono">ADMIN ACCOUNT</span>
              <span className="text-xs text-slate-400 font-mono">({currentAdmin?.username || 'yvpms2006'})</span>
            </div>
            <h3 className="text-base font-extrabold text-slate-900 truncate">
              {currentAdminName} — <span className="text-blue-700">{currentAdmin?.role || 'Founder & Managing Director'}</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              You have acquired <span className="font-extrabold text-slate-800">{leadsByCurrentAdmin.length} prospects</span> ({wonByCurrentAdmin.length} won active clients) for {userProfile.agencyName || 'FlowGen'}.
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('pipeline')}
          className="hidden lg:flex items-center space-x-1.5 text-xs font-extrabold text-blue-600 hover:text-blue-800 transition-colors shrink-0"
        >
          <span>View Prospects</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Key Metric Cards (Glossy Floating Air Grid) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Metric 1: Total Revenue */}
        <div className="floating-air-card p-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">REVENUE (WON)</span>
            <div className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-600 font-bold">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-900 tracking-tight font-mono">
              {curr}{totalRevenue.toLocaleString()}
            </div>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1 font-semibold">
              <span className="text-emerald-600 font-bold">{wonLeadsCount} closed deals</span>
            </p>
          </div>
        </div>

        {/* Metric 2: Active Pipeline Value */}
        <div className="floating-air-card p-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">PIPELINE VALUE</span>
            <div className="p-2.5 rounded-2xl bg-blue-50 text-blue-600 font-bold">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-900 tracking-tight font-mono">
              {curr}{pipelineValue.toLocaleString()}
            </div>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1 font-semibold">
              <span>{leads.length} total active opportunities</span>
            </p>
          </div>
        </div>

        {/* Metric 3: Active Clients */}
        <div className="floating-air-card p-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">ACTIVE CLIENTS</span>
            <div className="p-2.5 rounded-2xl bg-indigo-50 text-indigo-600 font-bold">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-900 tracking-tight font-mono">
              {wonLeadsCount}
            </div>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1 font-semibold">
              <span>Retainer & project clients</span>
            </p>
          </div>
        </div>

        {/* Metric 4: Net Profit */}
        <div className="floating-air-card p-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">NET PROFIT</span>
            <div className="p-2.5 rounded-2xl bg-amber-50 text-amber-600 font-bold">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-900 tracking-tight font-mono">
              {curr}{netProfit.toLocaleString()}
            </div>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1 font-semibold">
              <span>After agency expenses</span>
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid: Pipeline Summary & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pipeline Summary Card */}
        <div className="lg:col-span-2 floating-air-card p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100/80 pb-4">
            <div>
              <h2 className="text-lg font-extrabold text-slate-900">Sales Pipeline Overview</h2>
              <p className="text-xs text-slate-500">Live lead progress across conversion stages</p>
            </div>
            <button
              onClick={() => setActiveTab('pipeline')}
              className="text-xs font-extrabold text-blue-600 hover:text-blue-800 flex items-center space-x-1"
            >
              <span>Manage Pipeline</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50/90 border border-slate-200/80 text-center space-y-1">
              <p className="text-[10px] font-extrabold uppercase text-slate-400">NEW PROSPECTS</p>
              <p className="text-2xl font-black text-slate-900 font-mono">{newProspectsCount}</p>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/80 text-center space-y-1">
              <p className="text-[10px] font-extrabold uppercase text-blue-700">IN AUDIT / PITCH</p>
              <p className="text-2xl font-black text-blue-700 font-mono">
                {leads.filter((l) => l.stage === 'audit_scheduled' || l.stage === 'pitch_delivered').length}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200/80 text-center space-y-1">
              <p className="text-[10px] font-extrabold uppercase text-indigo-700">NEGOTIATION</p>
              <p className="text-2xl font-black text-indigo-700 font-mono">
                {leads.filter((l) => l.stage === 'negotiation').length}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 text-center space-y-1">
              <p className="text-[10px] font-extrabold uppercase text-emerald-700">WON CLIENTS</p>
              <p className="text-2xl font-black text-emerald-700 font-mono">{wonLeadsCount}</p>
            </div>
          </div>
        </div>

        {/* Quick Action Shortcuts Card */}
        <div className="floating-air-card p-6 space-y-5">
          <div className="border-b border-slate-100/80 pb-4">
            <h2 className="text-lg font-extrabold text-slate-900">Admin Actions</h2>
            <p className="text-xs text-slate-500">Quick CRM workflow shortcuts</p>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => setIsAddLeadOpen(true)}
              className="w-full p-3.5 rounded-2xl bg-blue-50/90 hover:bg-blue-100/80 border border-blue-200/80 text-blue-700 font-bold text-xs flex items-center justify-between transition-all hover:scale-[1.01]"
            >
              <div className="flex items-center space-x-3">
                <Plus className="w-4 h-4 text-blue-600 stroke-[3]" />
                <span>Add Prospect / Lead</span>
              </div>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveTab('pipeline')}
              className="w-full p-3.5 rounded-2xl bg-slate-50/90 hover:bg-slate-100/80 border border-slate-200/80 text-slate-800 font-bold text-xs flex items-center justify-between transition-all hover:scale-[1.01]"
            >
              <div className="flex items-center space-x-3">
                <Kanban className="w-4 h-4 text-slate-600" />
                <span>View Kanban Board</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => setActiveTab('clients')}
              className="w-full p-3.5 rounded-2xl bg-slate-50/90 hover:bg-slate-100/80 border border-slate-200/80 text-slate-800 font-bold text-xs flex items-center justify-between transition-all hover:scale-[1.01]"
            >
              <div className="flex items-center space-x-3">
                <Users className="w-4 h-4 text-slate-600" />
                <span>Manage Client Database</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className="w-full p-3.5 rounded-2xl bg-slate-50/90 hover:bg-slate-100/80 border border-slate-200/80 text-slate-800 font-bold text-xs flex items-center justify-between transition-all hover:scale-[1.01]"
            >
              <div className="flex items-center space-x-3">
                <Globe className="w-4 h-4 text-slate-600" />
                <span>Organization & Storage Settings</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
