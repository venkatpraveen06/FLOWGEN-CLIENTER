import React from 'react';
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

const MainContent = () => {
  const { activeTab } = useApp();

  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 h-full">
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

const AppContent = () => {
  const { isAuthenticated, appViewMode, setAppViewMode } = useApp();

  // If user is authenticated, render Admin CRM Workspace
  if (isAuthenticated) {
    return (
      <div className="h-screen max-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors overflow-hidden">
        <Navbar />
        <div className="flex-1 flex overflow-hidden h-[calc(100vh-4rem)]">
          <Sidebar />
          <MainContent />
        </div>
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
