import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { PipelineView } from './components/PipelineView';
import { FollowUpAgendaView } from './components/FollowUpAgendaView';
import { OutreachTemplatesView } from './components/OutreachTemplatesView';
import { ProposalsView } from './components/ProposalsView';
import { ClientsInvoicesView } from './components/ClientsInvoicesView';
import { SettingsView } from './components/SettingsView';
import { PublicPageView } from './components/PublicPageView';
import { AgencyHomePage } from './components/AgencyHomePage';
import { LeadDetailModal } from './components/LeadDetailModal';
import { AddLeadModal } from './components/AddLeadModal';
import { LoginPage } from './components/LoginPage';
import {
  LayoutDashboard,
  Kanban,
  Users,
  FileText,
  Settings,
  Plus
} from 'lucide-react';

const MainContent = () => {
  const { activeTab } = useApp();

  return (
    <main className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 lg:p-8 h-full pb-20 md:pb-8">
      {activeTab === 'dashboard' && <DashboardView />}
      {activeTab === 'pipeline' && <PipelineView />}
      {activeTab === 'followups' && <FollowUpAgendaView />}
      {activeTab === 'outreach' && <OutreachTemplatesView />}
      {activeTab === 'proposals' && <ProposalsView />}
      {activeTab === 'clients' && <ClientsInvoicesView />}
      {activeTab === 'public_page' && <PublicPageView />}
      {activeTab === 'settings' && <SettingsView />}
    </main>
  );
};

// Bottom Mobile Navigation Bar for Smartphones
const BottomMobileNav = () => {
  const { activeTab, setActiveTab, setIsAddLeadOpen } = useApp();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'pipeline', label: 'Leads', icon: Kanban },
    { id: 'clients', label: 'Clients', icon: Users },
    { id: 'proposals', label: 'Proposals', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200 p-2 flex items-center justify-around md:hidden shadow-lg">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center py-1 px-2.5 rounded-xl transition-all ${
              isActive ? 'text-blue-600 font-bold scale-105' : 'text-slate-500 font-medium'
            }`}
          >
            <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
            <span className="text-[10px] mt-0.5">{item.label}</span>
          </button>
        );
      })}

      <button
        onClick={() => setIsAddLeadOpen(true)}
        className="p-2.5 rounded-full bg-blue-600 text-white shadow-md active:scale-90 transition-transform -mt-4 border-2 border-white"
        title="Add Lead"
      >
        <Plus className="w-5 h-5" />
      </button>
    </div>
  );
};

const AppContent = () => {
  const { isAuthenticated, appViewMode, setAppViewMode } = useApp();

  // If user is authenticated, render Admin CRM Workspace
  if (isAuthenticated) {
    return (
      <div className="h-screen max-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors overflow-hidden relative">
        <Navbar />
        <div className="flex-1 flex overflow-hidden h-[calc(100vh-4rem)]">
          {/* Desktop Sidebar (Hidden on mobile, mobile uses BottomMobileNav) */}
          <div className="hidden md:block">
            <Sidebar />
          </div>
          <MainContent />
        </div>
        <BottomMobileNav />
        <LeadDetailModal />
        <AddLeadModal />
      </div>
    );
  }

  // If in admin mode but not authenticated, render Admin Login Page
  if (appViewMode === 'admin') {
    return <LoginPage onNavigateHome={() => setAppViewMode('home')} />;
  }

  // Default: Agency Home Page (modeled after flow-genai.vercel.app)
  return <AgencyHomePage onNavigateAdmin={() => setAppViewMode('admin')} />;
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
