import React from 'react';
import {
  LayoutDashboard,
  Kanban,
  Users,
  Briefcase,
  DollarSign,
  CreditCard,
  Globe,
  MessageSquare,
  CalendarCheck,
  CheckSquare,
  FileText,
  UserCheck,
  Settings,
  Bell,
  LogOut
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { FlowGenLogo } from './FlowGenLogo';

export const Sidebar = () => {
  const { activeTab, setActiveTab, leads, proposals, invoices, userProfile, currentAdmin, logout } = useApp();

  const wonLeadsCount = leads.filter((l) => l.stage === 'won').length;
  const currentAdminName = currentAdmin?.name || userProfile.userName || 'VENKAT PRAVEEN';
  const currentAdminAvatar = currentAdmin?.avatar || (currentAdmin?.username === 'yvpms2006' ? '/yvpms2006.jpg' : null);

  const navGroups = [
    {
      title: null,
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null }
      ]
    },
    {
      title: 'PIPELINE',
      items: [
        { id: 'pipeline', label: 'Leads', icon: Kanban, badge: leads.length },
        { id: 'clients', label: 'Clients', icon: Users, badge: wonLeadsCount },
        { id: 'projects', label: 'Projects', icon: Briefcase, badge: null }
      ]
    },
    {
      title: 'REVENUE',
      items: [
        { id: 'retainers', label: 'Retainers', icon: DollarSign, badge: null },
        { id: 'payments', label: 'Payments', icon: CreditCard, badge: invoices.length },
        { id: 'public_page', label: 'Public Page', icon: Globe, badge: 'New' }
      ]
    },
    {
      title: 'WORKSPACE',
      items: [
        { id: 'outreach', label: 'Messages', icon: MessageSquare, badge: null },
        { id: 'followups', label: 'Meetings', icon: CalendarCheck, badge: null },
        { id: 'tasks', label: 'Tasks', icon: CheckSquare, badge: null },
        { id: 'proposals', label: 'Documents', icon: FileText, badge: proposals.length }
      ]
    },
    {
      title: 'ORGANIZATION',
      items: [
        { id: 'team', label: 'Team', icon: UserCheck, badge: null },
        { id: 'settings', label: 'Billing & Settings', icon: Settings, badge: null }
      ]
    }
  ];

  return (
    <aside className="w-64 h-[calc(100vh-5.5rem)] floating-air-sidebar hidden md:flex flex-col justify-between shrink-0 p-4 m-3 sticky top-20 select-none">
      <div className="space-y-4">
        {/* Brand Header */}
        <div className="flex items-center justify-between px-2 pt-1 pb-3 border-b border-slate-100/80">
          <FlowGenLogo className="w-7 h-7" subtitle="SOLO CRM" />

          <button
            onClick={() => setActiveTab('pipeline')}
            className="relative p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100/80 transition-all"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
          </button>
        </div>

        {/* Grouped Navigation (Spacious Layout, No Scroll) */}
        <div className="space-y-3 overflow-hidden flex-1 py-1">
          {navGroups.map((group, gIdx) => (
            <div key={gIdx} className="space-y-1">
              {group.title && (
                <p className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mt-2 mb-1">
                  {group.title}
                </p>
              )}
              {group.items.map((item) => {
                const Icon = item.icon;
                let tabId = item.id;
                if (item.id === 'payments' || item.id === 'retainers') tabId = 'clients';
                if (item.id === 'tasks' || item.id === 'followups') tabId = 'pipeline';
                if (item.id === 'team') tabId = 'settings';

                const isActive = activeTab === tabId || activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(tabId)}
                    className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl font-semibold text-xs sidebar-btn-slide group ${
                      isActive
                        ? 'bg-blue-50/90 text-blue-700 font-extrabold shadow-xs border border-blue-200/60 translate-x-1.5'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 hover:translate-x-1.5'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <Icon className={`w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-blue-600'}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge !== null && item.badge !== undefined && (
                      <span
                        className="px-1.5 py-0.2 text-[9px] font-bold rounded-full bg-slate-100 text-slate-600 border border-slate-200/80 transition-transform group-hover:scale-105"
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Floating Profile Card with Founder Image */}
      <div className="pt-2 border-t border-slate-200/80 space-y-2">
        <div className="p-2.5 rounded-2xl bg-slate-50/90 flex items-center justify-between border border-slate-200/90 shadow-sm">
          <div className="flex items-center space-x-3 min-w-0">
            {currentAdminAvatar ? (
              <img
                src={currentAdminAvatar}
                alt={currentAdminName}
                className="w-9 h-9 rounded-xl object-cover border-2 border-blue-600 shrink-0 shadow-sm"
              />
            ) : (
              <div className="w-9 h-9 rounded-xl bg-blue-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                {currentAdminName ? currentAdminName.substring(0, 1) : 'Y'}
              </div>
            )}
            <div className="min-w-0">
              <p className="font-bold text-xs text-slate-900 truncate">
                {userProfile.agencyName || 'FlowGen'}
              </p>
              <p className="text-[10px] text-slate-400 uppercase font-mono truncate">
                {currentAdmin?.username || 'yvpms2006'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-1">
            <button
              onClick={() => setActiveTab('settings')}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60"
              title="Settings & Profile"
            >
              <Settings className="w-4 h-4" />
            </button>
            <button
              onClick={logout}
              className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
