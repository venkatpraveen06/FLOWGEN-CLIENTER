import React, { useState } from 'react';
import {
  X,
  Building2,
  User,
  Mail,
  Phone,
  Instagram,
  Globe,
  Star,
  CheckSquare,
  Sparkles,
  Send,
  MessageCircle,
  FileText,
  Clock,
  Plus,
  Trash2,
  Award,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DEFAULT_PIPELINE_STAGES } from '../data/initialData';

export const LeadDetailModal = () => {
  const {
    userProfile,
    selectedLead,
    setSelectedLeadId,
    updateLead,
    deleteLead,
    updateLeadStage,
    addActivity,
    templates,
    setIsProposalModalOpen
  } = useApp();

  const curr = userProfile.currencySymbol || '₹';
  const [activeTab, setActiveTab] = useState('qualification');
  const [selectedTemplateId, setSelectedTemplateId] = useState(templates[0]?.id || '');
  const [copiedText, setCopiedText] = useState(false);

  const [activityType, setActivityType] = useState('note');
  const [activityText, setActivityText] = useState('');

  if (!selectedLead) return null;

  const selectedTemplate = templates.find((t) => t.id === selectedTemplateId);

  const generateOutreachBody = (tpl) => {
    if (!tpl) return '';
    let body = tpl.body;
    body = body.replace(/\{\{business_name\}\}/g, selectedLead.businessName || 'your business');
    body = body.replace(/\{\{contact_name\}\}/g, selectedLead.contactName || 'there');
    body = body.replace(/\{\{niche\}\}/g, selectedLead.niche || 'services');
    body = body.replace(/\{\{google_rating\}\}/g, selectedLead.audit?.googleRating || '4.8');
    body = body.replace(/\{\{pain_point\}\}/g, selectedLead.audit?.notes || 'mobile web conversions');
    return body;
  };

  const currentOutreachMessage = generateOutreachBody(selectedTemplate);

  const handleAddActivitySubmit = (e) => {
    e.preventDefault();
    if (!activityText.trim()) return;

    addActivity(selectedLead.id, {
      type: activityType,
      text: activityText
    });
    setActivityText('');
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(currentOutreachMessage);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden transition-colors">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 flex items-start justify-between bg-slate-50">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 font-bold text-xl shrink-0">
              {selectedLead.businessName.substring(0, 2).toUpperCase()}
            </div>

            <div>
              <div className="flex items-center space-x-3">
                <h2 className="text-xl font-bold text-slate-900">{selectedLead.businessName}</h2>
                <span
                  className={`px-3 py-0.5 rounded-full text-xs font-bold font-mono ${
                    selectedLead.score >= 80
                      ? 'bg-amber-500/20 text-amber-700 border border-amber-500/30'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {selectedLead.score} PTS
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1 flex items-center space-x-2">
                <span>{selectedLead.contactName || 'No Contact Specified'}</span>
                <span>•</span>
                <span className="text-blue-700 font-semibold">{selectedLead.niche}</span>
                <span>•</span>
                <span className="uppercase text-slate-400 font-mono">{selectedLead.source}</span>
                <span>•</span>
                <span className="text-blue-700 font-semibold">Added by: {selectedLead.addedBy || 'yvpms2006'}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                if (confirm(`Delete lead "${selectedLead.businessName}"?`)) {
                  deleteLead(selectedLead.id);
                }
              }}
              className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-slate-100 transition-colors"
              title="Delete Prospect"
            >
              <Trash2 className="w-5 h-5" />
            </button>

            <button
              onClick={() => setSelectedLeadId(null)}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Quick Stage & Deal Value Bar */}
        <div className="px-6 py-3 bg-slate-100/80 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center space-x-2">
            <span className="text-slate-600 font-semibold">Stage:</span>
            <select
              value={selectedLead.stage}
              onChange={(e) => updateLeadStage(selectedLead.id, e.target.value)}
              className="bg-white border border-slate-300 rounded-lg px-3 py-1.5 font-semibold text-slate-800 focus:outline-none"
            >
              {DEFAULT_PIPELINE_STAGES.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1.5 font-mono">
              <span className="text-slate-600">Deal Value:</span>
              <span className="text-emerald-600 font-bold text-sm">{curr}</span>
              <input
                type="number"
                value={selectedLead.dealValue || 0}
                onChange={(e) => updateLead(selectedLead.id, { dealValue: Number(e.target.value) })}
                className="w-24 bg-white border border-slate-300 rounded px-2 py-1 text-slate-900 text-xs font-bold font-mono focus:outline-none"
              />
            </div>

            <div className="flex items-center space-x-1">
              <button
                onClick={() =>
                  updateLead(selectedLead.id, {
                    pricingType: selectedLead.pricingType === 'retainer' ? 'one_off' : 'retainer'
                  })
                }
                className={`px-2.5 py-1 rounded-lg border text-xs font-semibold ${
                  selectedLead.pricingType === 'retainer'
                    ? 'bg-purple-500/20 text-purple-700 border-purple-500/30'
                    : 'bg-slate-100 text-slate-600 border-slate-300'
                }`}
              >
                {selectedLead.pricingType === 'retainer' ? 'Monthly Retainer' : 'One-Off Project'}
              </button>
            </div>
          </div>
        </div>

        {/* Modal Tabs */}
        <div className="flex border-b border-slate-200 px-6 bg-slate-50">
          <button
            onClick={() => setActiveTab('qualification')}
            className={`py-3 px-4 font-semibold text-xs border-b-2 transition-all flex items-center space-x-2 ${
              activeTab === 'qualification'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <CheckSquare className="w-4 h-4" />
            <span>Qualification & Audit</span>
          </button>

          <button
            onClick={() => setActiveTab('outreach')}
            className={`py-3 px-4 font-semibold text-xs border-b-2 transition-all flex items-center space-x-2 ${
              activeTab === 'outreach'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Send className="w-4 h-4" />
            <span>Outreach Hub</span>
          </button>

          <button
            onClick={() => setActiveTab('timeline')}
            className={`py-3 px-4 font-semibold text-xs border-b-2 transition-all flex items-center space-x-2 ${
              activeTab === 'timeline'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Interaction History</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 flex-1 overflow-y-auto space-y-6">
          {activeTab === 'qualification' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 space-y-2">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <h4 className="font-bold text-slate-900 text-sm">Recommended Outreach Angle</h4>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {selectedLead.qualification?.aiPitchHook ||
                    'Focus on audit gap findings and offer a 5-minute video walkthrough showcasing ROI.'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-card p-4 rounded-2xl space-y-4">
                  <h4 className="font-bold text-slate-900 text-sm flex items-center space-x-2">
                    <Award className="w-4 h-4 text-amber-500" />
                    <span>Prospect Qualification Criteria</span>
                  </h4>

                  <div className="space-y-3">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedLead.qualification?.budgetVerified || false}
                        onChange={(e) =>
                          updateLead(selectedLead.id, {
                            qualification: {
                              ...selectedLead.qualification,
                              budgetVerified: e.target.checked
                            }
                          })
                        }
                        className="w-4 h-4 rounded text-blue-600 bg-slate-100 border-slate-300"
                      />
                      <span className="text-xs text-slate-700">Budget Verified (&ge; {curr}25,000)</span>
                    </label>

                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedLead.qualification?.decisionMakerReached || false}
                        onChange={(e) =>
                          updateLead(selectedLead.id, {
                            qualification: {
                              ...selectedLead.qualification,
                              decisionMakerReached: e.target.checked
                            }
                          })
                        }
                        className="w-4 h-4 rounded text-blue-600 bg-slate-100 border-slate-300"
                      />
                      <span className="text-xs text-slate-700">Direct Decision Maker Reached</span>
                    </label>

                    <div className="space-y-1 pt-2">
                      <label className="text-xs text-slate-500 font-semibold">Urgency Level:</label>
                      <select
                        value={selectedLead.qualification?.urgencyLevel || 'medium'}
                        onChange={(e) =>
                          updateLead(selectedLead.id, {
                            qualification: {
                              ...selectedLead.qualification,
                              urgencyLevel: e.target.value
                            }
                          })
                        }
                        className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-800"
                      >
                        <option value="high">High (Needs solution this month)</option>
                        <option value="medium">Medium (Next 30 - 60 days)</option>
                        <option value="low">Low (Evaluating option)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="glass-card p-4 rounded-2xl space-y-4">
                  <h4 className="font-bold text-slate-900 text-sm flex items-center space-x-2">
                    <Globe className="w-4 h-4 text-blue-500" />
                    <span>Digital Audit Checklist</span>
                  </h4>

                  <div className="space-y-3">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedLead.audit?.hasWebsite || false}
                        onChange={(e) =>
                          updateLead(selectedLead.id, {
                            audit: { ...selectedLead.audit, hasWebsite: e.target.checked }
                          })
                        }
                        className="w-4 h-4 rounded text-blue-600 bg-slate-100 border-slate-300"
                      />
                      <span className="text-xs text-slate-700">Has Existing Website</span>
                    </label>

                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedLead.audit?.mobileResponsive || false}
                        onChange={(e) =>
                          updateLead(selectedLead.id, {
                            audit: { ...selectedLead.audit, mobileResponsive: e.target.checked }
                          })
                        }
                        className="w-4 h-4 rounded text-blue-600 bg-slate-100 border-slate-300"
                      />
                      <span className="text-xs text-slate-700">Mobile Responsive Layout</span>
                    </label>

                    <div className="space-y-1">
                      <label className="text-xs text-slate-500 font-semibold">Audit Notes & Gaps:</label>
                      <textarea
                        rows={2}
                        value={selectedLead.audit?.notes || ''}
                        onChange={(e) =>
                          updateLead(selectedLead.id, {
                            audit: { ...selectedLead.audit, notes: e.target.value }
                          })
                        }
                        placeholder="e.g. Broken order link, slow mobile load time..."
                        className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs text-slate-800 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'outreach' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {selectedLead.contactPhone && (
                  <a
                    href={`https://wa.me/${selectedLead.contactPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                      currentOutreachMessage
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 text-emerald-700 font-semibold text-xs flex items-center justify-between transition-all"
                  >
                    <div className="flex items-center space-x-2">
                      <MessageCircle className="w-5 h-5" />
                      <span>WhatsApp Direct</span>
                    </div>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}

                {selectedLead.contactEmail && (
                  <a
                    href={`mailto:${selectedLead.contactEmail}?subject=${encodeURIComponent(
                      selectedTemplate?.subject || 'Introduction'
                    )}&body=${encodeURIComponent(currentOutreachMessage)}`}
                    className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 text-blue-700 font-semibold text-xs flex items-center justify-between transition-all"
                  >
                    <div className="flex items-center space-x-2">
                      <Mail className="w-5 h-5" />
                      <span>Send Cold Email</span>
                    </div>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}

                {selectedLead.instagramHandle && (
                  <a
                    href={`https://instagram.com/${selectedLead.instagramHandle.replace('@', '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-4 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/20 hover:bg-fuchsia-500/20 text-fuchsia-700 font-semibold text-xs flex items-center justify-between transition-all"
                  >
                    <div className="flex items-center space-x-2">
                      <Instagram className="w-5 h-5" />
                      <span>Instagram DM</span>
                    </div>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>

              <div className="glass-card p-5 rounded-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Select Outreach Template
                  </label>
                  <button
                    onClick={handleCopyMessage}
                    className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center space-x-1.5 transition-all shadow"
                  >
                    {copiedText ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Pitch Text</span>
                      </>
                    )}
                  </button>
                </div>

                <select
                  value={selectedTemplateId}
                  onChange={(e) => setSelectedTemplateId(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl p-3 text-xs text-slate-800 font-medium focus:outline-none"
                >
                  {templates.map((tpl) => (
                    <option key={tpl.id} value={tpl.id}>
                      [{tpl.channel.toUpperCase()}] {tpl.name}
                    </option>
                  ))}
                </select>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="text-[11px] text-slate-500 font-mono">Subject: {selectedTemplate?.subject}</div>
                  <pre className="whitespace-pre-wrap font-sans text-xs text-slate-800 leading-relaxed">
                    {currentOutreachMessage}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'timeline' && (
            <div className="space-y-6">
              <form onSubmit={handleAddActivitySubmit} className="glass-card p-4 rounded-2xl space-y-3">
                <div className="flex items-center space-x-3">
                  <select
                    value={activityType}
                    onChange={(e) => setActivityType(e.target.value)}
                    className="bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-800 font-medium"
                  >
                    <option value="note">Note</option>
                    <option value="call">Phone Call</option>
                    <option value="email">Email Sent</option>
                    <option value="whatsapp">WhatsApp Chat</option>
                    <option value="meeting">Discovery Meeting</option>
                  </select>

                  <input
                    type="text"
                    placeholder="Log activity details or notes..."
                    value={activityText}
                    onChange={(e) => setActivityText(e.target.value)}
                    className="flex-1 bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-800 focus:outline-none"
                  />

                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow"
                  >
                    Log Activity
                  </button>
                </div>
              </form>

              <div className="space-y-3">
                {selectedLead.activities?.map((act) => (
                  <div
                    key={act.id}
                    className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start space-x-3 text-xs"
                  >
                    <div className="p-2 rounded-lg bg-blue-50 text-blue-600 shrink-0 mt-0.5">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 uppercase tracking-wider text-[10px]">
                          {act.type}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {new Date(act.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-slate-700 mt-1">{act.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
