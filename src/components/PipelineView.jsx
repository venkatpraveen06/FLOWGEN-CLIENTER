import React, { useState } from 'react';
import {
  Kanban,
  Table as TableIcon,
  Search,
  Filter,
  Plus,
  ArrowRight,
  Globe,
  Star,
  Building2,
  User,
  UserCheck,
  Briefcase,
  CheckCircle2,
  Clock,
  DollarSign
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DEFAULT_PIPELINE_STAGES, DEFAULT_LEAD_SOURCES } from '../data/initialData';

export const PipelineView = () => {
  const {
    userProfile,
    leads,
    updateLeadStage,
    setSelectedLeadId,
    setIsAddLeadOpen,
    searchQuery,
    setSearchQuery,
    selectedNicheFilter,
    setSelectedNicheFilter,
    selectedSourceFilter,
    setSelectedSourceFilter,
    pipelineViewMode,
    setPipelineViewMode
  } = useApp();

  const curr = userProfile.currencySymbol || '₹';
  const [draggedLeadId, setDraggedLeadId] = useState(null);

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      !searchQuery ||
      lead.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lead.contactName && lead.contactName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (lead.projectName && lead.projectName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (lead.addedBy && lead.addedBy.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (lead.niche && lead.niche.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesNiche =
      selectedNicheFilter === 'all' || lead.niche === selectedNicheFilter;

    const matchesSource =
      selectedSourceFilter === 'all' || lead.source === selectedSourceFilter;

    return matchesSearch && matchesNiche && matchesSource;
  });

  const handleDragStart = (e, leadId) => {
    setDraggedLeadId(leadId);
    e.dataTransfer.setData('text/plain', leadId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetStageId) => {
    e.preventDefault();
    const leadId = e.dataTransfer.getData('text/plain') || draggedLeadId;
    if (leadId) {
      updateLeadStage(leadId, targetStageId);
      setDraggedLeadId(null);
    }
  };

  const availableNiches = Array.from(new Set(leads.map((l) => l.niche).filter(Boolean)));

  return (
    <div className="space-y-6 pb-12 w-full max-w-full overflow-hidden">
      {/* Top Header & View Toggles */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Sales Pipeline</h1>
          <p className="text-sm text-slate-600">
            Track lead progression from New Lead &rarr; Qualified &rarr; Outreach &rarr; Meeting &rarr; Proposal &rarr; Negotiation &rarr; Won/Active Clients.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          {/* View Mode Toggle Buttons */}
          <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200">
            <button
              onClick={() => setPipelineViewMode('kanban')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                pipelineViewMode === 'kanban'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Kanban className="w-3.5 h-3.5" />
              <span>Kanban</span>
            </button>
            <button
              onClick={() => setPipelineViewMode('table')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                pipelineViewMode === 'table'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Table</span>
            </button>
          </div>

          <button
            onClick={() => setIsAddLeadOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md shadow-blue-600/20 transition-all flex items-center space-x-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>New Lead</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="glass-panel p-4 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search lead/client name, contact person, admin who added, or project details..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-100 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-600"
          />
        </div>

        <div className="flex items-center flex-wrap gap-2">
          {/* Niche Filter */}
          <div className="flex items-center space-x-1.5 text-xs text-slate-500">
            <Filter className="w-3.5 h-3.5" />
            <span>Niche:</span>
            <select
              value={selectedNicheFilter}
              onChange={(e) => setSelectedNicheFilter(e.target.value)}
              className="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none"
            >
              <option value="all">All Niches</option>
              {availableNiches.map((niche) => (
                <option key={niche} value={niche}>
                  {niche}
                </option>
              ))}
            </select>
          </div>

          {/* Source Filter */}
          <div className="flex items-center space-x-1.5 text-xs text-slate-500">
            <span>Source:</span>
            <select
              value={selectedSourceFilter}
              onChange={(e) => setSelectedSourceFilter(e.target.value)}
              className="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none"
            >
              <option value="all">All Sources</option>
              {DEFAULT_LEAD_SOURCES.map((src) => (
                <option key={src.id} value={src.id}>
                  {src.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Kanban Board View */}
      {pipelineViewMode === 'kanban' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-2.5 w-full pt-2">
          {DEFAULT_PIPELINE_STAGES.map((stage) => {
            const stageLeads = filteredLeads.filter((l) => l.stage === stage.id);
            const totalStageValue = stageLeads.reduce((sum, l) => sum + (l.dealValue || 0), 0);

            return (
              <div
                key={stage.id}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, stage.id)}
                className="min-w-0 w-full glass-panel rounded-2xl p-2.5 flex flex-col max-h-[760px] border border-slate-200 transition-all"
              >
                {/* Stage Header */}
                <div className="pb-2.5 border-b border-slate-200 mb-2 space-y-1">
                  <div className="flex items-center justify-between min-w-0">
                    <div className="flex items-center space-x-1.5 min-w-0 truncate">
                      <span className={`w-2 h-2 rounded-full shrink-0 ${stage.badgeColor}`} />
                      <h3 className="font-bold text-slate-800 text-xs truncate" title={stage.name}>
                        {stage.name}
                      </h3>
                    </div>
                    <span className="px-1.5 py-0.2 rounded-full bg-slate-200 text-slate-700 text-[10px] font-mono shrink-0">
                      {stageLeads.length}
                    </span>
                  </div>
                  <div className="text-[11px] font-mono font-bold text-emerald-600 truncate">
                    {curr}{totalStageValue.toLocaleString()}
                  </div>
                </div>

                {/* Lead Cards List */}
                <div className="flex-1 overflow-y-auto space-y-2 pr-0.5">
                  {stageLeads.length === 0 ? (
                    <div className="h-24 border border-dashed border-slate-300 rounded-xl flex items-center justify-center text-[11px] text-slate-400 text-center px-1">
                      Drag lead here
                    </div>
                  ) : (
                    stageLeads.map((lead) => (
                      <div
                        key={lead.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, lead.id)}
                        onClick={() => setSelectedLeadId(lead.id)}
                        className="glass-card p-2.5 rounded-xl space-y-2 cursor-grab active:cursor-grabbing hover:border-blue-500/40 transition-all shadow-sm group relative"
                      >
                        {/* Business Name & Score */}
                        <div className="space-y-0.5">
                          <div className="flex items-start justify-between gap-1">
                            <h4 className="font-bold text-slate-900 text-xs line-clamp-1 group-hover:text-blue-600 transition-colors">
                              {lead.businessName}
                            </h4>
                            <span
                              className={`px-1 py-0.2 rounded text-[9px] font-mono font-bold shrink-0 ${
                                lead.score >= 80
                                  ? 'bg-amber-500/20 text-amber-700 border border-amber-500/30'
                                  : 'bg-slate-200 text-slate-600'
                              }`}
                              title="Qualification Score"
                            >
                              {lead.score}
                            </span>
                          </div>

                          {/* Contact Person */}
                          {lead.contactName && (
                            <p className="text-[10px] font-medium text-slate-600 truncate">
                              👤 {lead.contactName}
                            </p>
                          )}

                          {/* Project Name */}
                          <p className="text-[10px] text-slate-500 truncate">
                            <span className="font-semibold text-slate-700">Project:</span>{' '}
                            {lead.projectName || 'Website Development'}
                          </p>

                          {/* Added By Admin attribution */}
                          <p className="text-[9px] font-semibold text-blue-700 truncate">
                            Added by: {lead.addedBy || 'yvpms2006'}
                          </p>
                        </div>

                        {/* Website Status & Rating */}
                        {lead.audit && (
                          <div className="flex items-center space-x-1 text-[10px] text-slate-500 truncate">
                            <span
                              className={`px-1 py-0.2 rounded text-[9px] truncate ${
                                !lead.audit.hasWebsite
                                  ? 'bg-rose-500/20 text-rose-700'
                                  : lead.audit.mobileResponsive
                                  ? 'bg-emerald-500/10 text-emerald-700'
                                  : 'bg-amber-500/10 text-amber-700'
                              }`}
                            >
                              {!lead.audit.hasWebsite
                                ? 'No Site'
                                : lead.audit.mobileResponsive
                                ? 'Mobile OK'
                                : 'Non-Resp'}
                            </span>
                            {lead.audit.googleRating && (
                              <span className="text-amber-500 text-[10px]">★{lead.audit.googleRating}</span>
                            )}
                          </div>
                        )}

                        <div className="pt-1.5 border-t border-slate-200 space-y-1">
                          <div className="flex items-center justify-between text-[11px] font-mono font-bold text-emerald-600">
                            <span>{curr}{lead.dealValue?.toLocaleString()}</span>
                            <span className="text-[9px] text-slate-400 font-sans font-normal">
                              {lead.pricingType === 'retainer' ? '/mo' : ''}
                            </span>
                          </div>

                          <select
                            value={lead.stage}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => updateLeadStage(lead.id, e.target.value)}
                            className="w-full bg-white text-[9px] border border-slate-200 rounded px-1 py-0.5 text-slate-700 focus:outline-none truncate"
                          >
                            {DEFAULT_PIPELINE_STAGES.map((s) => (
                              <option key={s.id} value={s.id}>
                                {s.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Data Table View */
        <div className="glass-panel rounded-2xl overflow-hidden border border-slate-200 w-full">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-100 text-slate-600 uppercase font-semibold text-[11px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="p-4">Lead / Client Name</th>
                  <th className="p-4">Contact Person</th>
                  <th className="p-4">Project Details</th>
                  <th className="p-4">Added By Admin</th>
                  <th className="p-4">Lead Status</th>
                  <th className="p-4">Score</th>
                  <th className="p-4">Project Value</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredLeads.map((lead) => {
                  const stageObj = DEFAULT_PIPELINE_STAGES.find((s) => s.id === lead.stage);
                  return (
                    <tr
                      key={lead.id}
                      onClick={() => setSelectedLeadId(lead.id)}
                      className="hover:bg-slate-100 cursor-pointer transition-colors"
                    >
                      <td className="p-4 font-bold text-slate-900 text-sm">{lead.businessName}</td>
                      <td className="p-4 text-slate-700 font-medium">{lead.contactName || 'N/A'}</td>
                      <td className="p-4 text-slate-700">{lead.projectName || 'Website Development'}</td>
                      <td className="p-4 font-semibold text-blue-700">{lead.addedBy || 'yvpms2006'}</td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${stageObj?.color}`}>
                          {stageObj?.name}
                        </span>
                      </td>
                      <td className="p-4 font-mono font-bold text-amber-600">
                        {lead.score} PTS
                      </td>
                      <td className="p-4 font-mono font-bold text-emerald-600">
                        {curr}{lead.dealValue?.toLocaleString()}
                        <span className="text-[10px] text-slate-400 font-normal ml-1">
                          ({lead.pricingType === 'retainer' ? 'monthly' : 'one-time'})
                        </span>
                      </td>
                      <td className="p-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => setSelectedLeadId(lead.id)}
                          className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white transition-all font-semibold"
                        >
                          Open Lead
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
