import React, { useState } from 'react';
import {
  Plus,
  ArrowRight,
  TrendingUp,
  CreditCard,
  DollarSign,
  Briefcase,
  Users,
  CheckCircle2,
  Clock,
  Sparkles,
  RefreshCw,
  Zap,
  MessageCircle,
  FileCheck,
  Award,
  UserCheck,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const DashboardView = () => {
  const {
    userProfile,
    currentAdmin,
    leads,
    invoices,
    expenses,
    setSelectedLeadId,
    setActiveTab,
    setIsAddLeadOpen
  } = useApp();

  const [selectedMonth, setSelectedMonth] = useState('August 2026');

  const curr = userProfile.currencySymbol || '₹';

  const wonLeads = leads.filter((l) => l.stage === 'won');
  const activeClientsCount = wonLeads.length;

  const totalProjectedRevenue = leads
    .filter((l) => l.stage !== 'lost')
    .reduce((sum, l) => sum + (l.dealValue || 0), 0);

  const receivedPayments = invoices
    .filter((i) => i.status === 'paid')
    .reduce((sum, i) => sum + (i.amount || 0), 0);

  const totalExpenses = expenses.reduce((sum, e) => sum + (e.amount || 0), 0);
  const moneyInAccount = receivedPayments - totalExpenses;

  const newProjectsCount = leads.filter((l) => l.stage === 'new_lead').length;
  const ongoingProjectsCount = leads.filter(
    (l) => l.stage === 'outreach_sent' || l.stage === 'meeting_scheduled' || l.stage === 'proposal_sent' || l.stage === 'negotiation'
  ).length;
  const completedProjectsCount = wonLeads.length;
  const totalProjectsCount = leads.length;

  const retainerLeads = wonLeads.filter((l) => l.pricingType === 'retainer');
  const mrrTotal = retainerLeads.reduce((sum, l) => sum + (l.dealValue || 0), 0);

  // Admin Breakdown (Clients added by current admin)
  const currentAdminName = currentAdmin?.name || userProfile.userName || 'VENKAT PRAVEEN';
  const currentAdminUsername = currentAdmin?.username || 'yvpms2006';
  const currentAdminAvatar = currentAdmin?.avatar || (currentAdminUsername === 'yvpms2006' ? '/yvpms2006.jpg' : null);

  const leadsByCurrentAdmin = leads.filter((l) => l.addedBy === currentAdminName || l.addedBy === currentAdminUsername);
  const wonByCurrentAdmin = wonLeads.filter((l) => l.addedBy === currentAdminName || l.addedBy === currentAdminUsername);

  const todayFormatted = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Top Welcome Header & Dark Blue Admin Session Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
            <span>Welcome back, {currentAdminName}</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-2">
            <span>Client Acquisition & Agency Dashboard for <span className="font-bold text-blue-700">{userProfile.agencyName || 'FlowGen'}</span></span>
          </p>
        </div>

        {/* Active Logged In Admin Badge with Portrait */}
        <div className="p-2.5 rounded-2xl bg-blue-50 border border-blue-200 flex items-center space-x-3 shrink-0 shadow-sm">
          {currentAdminAvatar ? (
            <img
              src={currentAdminAvatar}
              alt={currentAdminName}
              className="w-10 h-10 rounded-xl object-cover border-2 border-blue-600 shadow"
            />
          ) : (
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-bold text-sm flex items-center justify-center shrink-0 shadow">
              {currentAdminName.substring(0, 1)}
            </div>
          )}
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="text-xs font-bold text-slate-900">{currentAdminName}</span>
              <span className="px-1.5 py-0.2 text-[9px] font-mono font-bold bg-blue-100 text-blue-800 rounded">
                @{currentAdminUsername}
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-semibold">{currentAdmin?.role || 'Administrator'}</p>
          </div>
        </div>
      </div>

      {/* Admin Performance Summary Banner */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          {currentAdminAvatar ? (
            <img
              src={currentAdminAvatar}
              alt={currentAdminName}
              className="w-12 h-12 rounded-2xl object-cover border-2 border-blue-600 shadow-md shrink-0"
            />
          ) : (
            <div className="p-3 rounded-xl bg-blue-50 text-blue-600">
              <UserCheck className="w-5 h-5" />
            </div>
          )}
          <div>
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <span>Logged in as Admin:</span>
              <span className="text-blue-700 font-extrabold">{currentAdminName}</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              You have acquired <span className="font-bold text-slate-800">{leadsByCurrentAdmin.length} total prospects</span> ({wonByCurrentAdmin.length} won active clients) for {userProfile.agencyName || 'FlowGen'}.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsAddLeadOpen(true)}
          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/20 shrink-0 flex items-center space-x-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add Client Under {currentAdminUsername}</span>
        </button>
      </div>

      {/* 4 Primary Financial KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Revenue */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-200 space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
            <span>Revenue (Projected)</span>
            <DollarSign className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-3xl font-extrabold text-slate-900 font-mono tracking-tight">
            {curr}{totalProjectedRevenue.toLocaleString()}
          </p>
          <p className="text-xs text-slate-500 font-medium">
            Active pipeline deal value
          </p>
        </div>

        {/* Received */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-200 space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
            <span>Received</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-3xl font-extrabold text-slate-900 font-mono tracking-tight">
            {curr}{receivedPayments.toLocaleString()}
          </p>
          <p className="text-xs text-slate-500 font-medium">
            Invoices collected in bank
          </p>
        </div>

        {/* Expenses */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-200 space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
            <span>Expenses</span>
            <TrendingUp className="w-4 h-4 text-rose-500" />
          </div>
          <p className="text-3xl font-extrabold text-slate-900 font-mono tracking-tight">
            {curr}{totalExpenses.toLocaleString()}
          </p>
          <p className="text-xs text-slate-500 font-medium">
            Tools & operational costs
          </p>
        </div>

        {/* Money in account */}
        <div className="glass-panel p-5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 space-y-2">
          <div className="flex items-center justify-between text-emerald-700 text-xs font-bold uppercase tracking-wider">
            <span>Money in Account</span>
            <Award className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-3xl font-extrabold text-emerald-700 font-mono tracking-tight">
            {curr}{moneyInAccount.toLocaleString()}
          </p>
          <p className="text-xs text-emerald-700 font-semibold">
            Net cash balance
          </p>
        </div>
      </div>

      {/* Sales Pipeline Summary & Retainers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Pipeline Widget */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border border-slate-200 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Sales Pipeline Status</h3>
              <p className="text-xs text-slate-500">Live lead progression across acquisition stages</p>
            </div>

            <button
              onClick={() => setActiveTab('pipeline')}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center space-x-1"
            >
              <span>View Full Board</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <p className="text-[11px] text-slate-500 font-bold uppercase">New Prospects</p>
              <p className="text-2xl font-extrabold text-slate-900 font-mono mt-1">{newProjectsCount}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <p className="text-[11px] text-slate-500 font-bold uppercase">In Negotiation</p>
              <p className="text-2xl font-extrabold text-amber-600 font-mono mt-1">{ongoingProjectsCount}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <p className="text-[11px] text-slate-500 font-bold uppercase">Won Clients</p>
              <p className="text-2xl font-extrabold text-emerald-600 font-mono mt-1">{completedProjectsCount}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <p className="text-[11px] text-slate-500 font-bold uppercase">Total Deals</p>
              <p className="text-2xl font-extrabold text-slate-900 font-mono mt-1">{totalProjectsCount}</p>
            </div>
          </div>
        </div>

        {/* Retainers & Breakdown */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-200 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h3 className="font-bold text-slate-900 text-base">Active Retainers</h3>
            <span className="text-xs font-mono font-bold text-indigo-600">{curr}{mrrTotal.toLocaleString()}/mo</span>
          </div>

          <div className="space-y-3">
            {retainerLeads.length === 0 ? (
              <p className="text-xs text-slate-500 py-4 text-center">
                No active monthly retainers yet. Close recurring deals in your sales pipeline to track MRR here.
              </p>
            ) : (
              retainerLeads.map((client) => (
                <div
                  key={client.id}
                  onClick={() => setSelectedLeadId(client.id)}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between cursor-pointer hover:border-blue-500/40 transition-colors"
                >
                  <div>
                    <p className="font-bold text-xs text-slate-900">{client.businessName}</p>
                    <p className="text-[10px] text-slate-500">Added by: {client.addedBy}</p>
                  </div>
                  <span className="font-mono font-bold text-xs text-emerald-600">{curr}{client.dealValue?.toLocaleString()}/mo</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
