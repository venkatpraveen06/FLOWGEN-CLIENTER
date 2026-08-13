import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  Mail,
  PhoneCall,
  ChevronRight,
  Filter,
  Check,
  RotateCcw
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const FollowUpAgendaView = () => {
  const { userProfile, leads, snoozeFollowUp, completeFollowUp, setSelectedLeadId } = useApp();
  const curr = userProfile.currencySymbol || '₹';
  const [agendaFilter, setAgendaFilter] = useState('all');

  const todayStr = new Date().toISOString().split('T')[0];

  const overdueLeads = leads.filter(
    (l) => l.followUpDate && l.followUpDate < todayStr && l.followUpStatus === 'pending'
  );

  const todayLeads = leads.filter(
    (l) => l.followUpDate === todayStr && l.followUpStatus === 'pending'
  );

  const upcomingLeads = leads.filter(
    (l) => l.followUpDate && l.followUpDate > todayStr && l.followUpStatus === 'pending'
  );

  const completedLeads = leads.filter((l) => l.followUpStatus === 'completed');

  let displayedLeads = [];
  if (agendaFilter === 'overdue') displayedLeads = overdueLeads;
  else if (agendaFilter === 'today') displayedLeads = todayLeads;
  else if (agendaFilter === 'upcoming') displayedLeads = upcomingLeads;
  else if (agendaFilter === 'completed') displayedLeads = completedLeads;
  else displayedLeads = [...overdueLeads, ...todayLeads, ...upcomingLeads];

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Smart Follow-Up Scheduler</h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Never lose a prospect due to forgotten follow-ups. Manage your daily touchpoint agenda.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
          <button
            onClick={() => setAgendaFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              agendaFilter === 'all' ? 'bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            All Pending ({overdueLeads.length + todayLeads.length + upcomingLeads.length})
          </button>
          <button
            onClick={() => setAgendaFilter('overdue')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              agendaFilter === 'overdue' ? 'bg-rose-600 text-white' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Overdue ({overdueLeads.length})
          </button>
          <button
            onClick={() => setAgendaFilter('today')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              agendaFilter === 'today' ? 'bg-amber-600 text-white' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Today ({todayLeads.length})
          </button>
          <button
            onClick={() => setAgendaFilter('upcoming')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              agendaFilter === 'upcoming' ? 'bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Upcoming ({upcomingLeads.length})
          </button>
        </div>
      </div>

      {/* Main Agenda List */}
      <div className="space-y-4">
        {displayedLeads.length === 0 ? (
          <div className="glass-panel p-12 rounded-2xl text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mx-auto" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">No Follow-Ups Pending in this view!</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Great job staying on top of your client communications.</p>
          </div>
        ) : (
          displayedLeads.map((lead) => {
            const isOverdue = lead.followUpDate < todayStr;
            const isToday = lead.followUpDate === todayStr;

            return (
              <div
                key={lead.id}
                className={`glass-panel p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all ${
                  isOverdue
                    ? 'border-rose-300 dark:border-rose-500/30 bg-rose-50/50 dark:bg-rose-950/10'
                    : isToday
                    ? 'border-amber-300 dark:border-amber-500/30 bg-amber-50/50 dark:bg-amber-950/10'
                    : 'border-slate-200 dark:border-slate-800'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 ${
                      isOverdue
                        ? 'bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/30'
                        : isToday
                        ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                        : 'bg-blue-500/20 text-blue-600 border border-blue-500/30'
                    }`}
                  >
                    <Clock className="w-5 h-5" />
                  </div>

                  <div>
                    <div className="flex items-center space-x-3">
                      <h3
                        onClick={() => setSelectedLeadId(lead.id)}
                        className="font-bold text-slate-900 text-base hover:text-blue-600 cursor-pointer"
                      >
                        {lead.businessName}
                      </h3>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          isOverdue
                            ? 'bg-rose-500/20 text-rose-700 dark:text-rose-300'
                            : isToday
                            ? 'bg-amber-500/20 text-amber-700 dark:text-amber-300'
                            : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        {isOverdue ? 'Overdue' : isToday ? 'Due Today' : `Due ${lead.followUpDate}`}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Contact: <span className="text-slate-800 dark:text-slate-200">{lead.contactName || 'N/A'}</span> • Value:{' '}
                      <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">{curr}{lead.dealValue?.toLocaleString()}</span>
                    </p>

                    <p className="text-xs text-slate-700 dark:text-slate-300 mt-2 bg-slate-50 dark:bg-slate-900/80 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800/80">
                      💬 <span className="italic">{lead.followUpNotes || 'Scheduled touchpoint check-in'}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center flex-wrap gap-2 md:shrink-0 pt-2 md:pt-0 border-t md:border-0 border-slate-200 dark:border-slate-800">
                  {lead.contactPhone && (
                    <a
                      href={`https://wa.me/${lead.contactPhone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-semibold flex items-center space-x-1.5"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>WhatsApp</span>
                    </a>
                  )}

                  {lead.contactEmail && (
                    <a
                      href={`mailto:${lead.contactEmail}`}
                      className="px-3 py-1.5 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-700 dark:text-blue-300 text-xs font-semibold flex items-center space-x-1.5"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Email</span>
                    </a>
                  )}

                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => snoozeFollowUp(lead.id, 1)}
                      className="px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold"
                      title="Snooze 1 day"
                    >
                      +1d
                    </button>
                    <button
                      onClick={() => snoozeFollowUp(lead.id, 3)}
                      className="px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold"
                      title="Snooze 3 days"
                    >
                      +3d
                    </button>
                  </div>

                  <button
                    onClick={() => completeFollowUp(lead.id)}
                    className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/30 flex items-center space-x-1.5"
                  >
                    <Check className="w-4 h-4" />
                    <span>Done</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
