import React, { useState } from 'react';
import {
  Send,
  Plus,
  Edit3,
  Trash2,
  Copy,
  Check,
  Sparkles,
  MessageCircle,
  Mail,
  Instagram,
  FileText
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const OutreachTemplatesView = () => {
  const { templates, addTemplate, updateTemplate, deleteTemplate, leads } = useApp();
  const [selectedTemplateId, setSelectedTemplateId] = useState(templates[0]?.id || '');
  const [testLeadId, setTestLeadId] = useState(leads[0]?.id || '');
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);

  const activeTemplate = templates.find((t) => t.id === selectedTemplateId) || templates[0];
  const testLead = leads.find((l) => l.id === testLeadId) || leads[0];

  const [editForm, setEditForm] = useState({
    name: '',
    channel: 'email',
    category: 'Cold Outreach',
    subject: '',
    body: ''
  });

  const handleStartNew = () => {
    setEditForm({
      name: 'New Custom Template',
      channel: 'email',
      category: 'Cold Outreach',
      subject: 'Quick question for {{business_name}}',
      body: `Hi {{contact_name}},\n\nI noticed {{business_name}}...`
    });
    setIsEditing(true);
  };

  const handleSaveTemplate = (e) => {
    e.preventDefault();
    if (activeTemplate && !editForm.id) {
      addTemplate(editForm);
    } else {
      updateTemplate(activeTemplate.id, editForm);
    }
    setIsEditing(false);
  };

  const hydratedBody = activeTemplate
    ? activeTemplate.body
        .replace(/\{\{business_name\}\}/g, testLead?.businessName || 'Apex Dental Studio')
        .replace(/\{\{contact_name\}\}/g, testLead?.contactName || 'Dr. Marcus Vance')
        .replace(/\{\{niche\}\}/g, testLead?.niche || 'Healthcare')
        .replace(/\{\{google_rating\}\}/g, testLead?.audit?.googleRating || '4.9')
        .replace(/\{\{pain_point\}\}/g, testLead?.audit?.notes || 'mobile appointment booking drops')
    : '';

  const handleCopyHydrated = () => {
    navigator.clipboard.writeText(hydratedBody);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Outreach & Script Library</h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            High-converting templates for WhatsApp direct pitches, cold emails, and social DMs.
          </p>
        </div>

        <button
          onClick={handleStartNew}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>New Script Template</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass-panel p-4 rounded-2xl space-y-3">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Available Templates</p>

          <div className="space-y-2">
            {templates.map((tpl) => (
              <button
                key={tpl.id}
                onClick={() => {
                  setSelectedTemplateId(tpl.id);
                  setIsEditing(false);
                }}
                className={`w-full text-left p-3.5 rounded-xl transition-all border ${
                  selectedTemplateId === tpl.id
                    ? 'bg-indigo-600/10 dark:bg-indigo-600/20 border-indigo-500/40 text-slate-900 dark:text-white shadow-md'
                    : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm truncate">{tpl.name}</span>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-indigo-700 dark:text-indigo-300">
                    {tpl.channel}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">{tpl.subject || tpl.category}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          {activeTemplate && (
            <div className="glass-panel p-6 rounded-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{activeTemplate.name}</h3>
                  <span className="text-xs text-slate-500 dark:text-slate-400 capitalize">
                    Channel: <span className="text-indigo-600 dark:text-indigo-400 font-semibold">{activeTemplate.channel}</span> • Category: {activeTemplate.category}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      setEditForm(activeTemplate);
                      setIsEditing(true);
                    }}
                    className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center space-x-1"
                  >
                    <Edit3 className="w-4 h-4" />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => deleteTemplate(activeTemplate.id)}
                    className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-rose-500/20 text-slate-500 dark:text-slate-400 hover:text-rose-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    <span>Preview Hydrated with Lead Data:</span>
                  </span>

                  <select
                    value={testLeadId}
                    onChange={(e) => setTestLeadId(e.target.value)}
                    className="bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
                  >
                    {leads.map((l) => (
                      <option key={l.id} value={l.id}>
                        {l.businessName} ({l.contactName || 'N/A'})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="p-4 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 space-y-3">
                  {activeTemplate.subject && (
                    <div className="text-xs font-mono text-indigo-600 dark:text-indigo-300 border-b border-slate-200 dark:border-slate-800/80 pb-2">
                      Subject: {activeTemplate.subject.replace(/\{\{business_name\}\}/g, testLead?.businessName || 'Business')}
                    </div>
                  )}

                  <pre className="whitespace-pre-wrap font-sans text-xs text-slate-800 dark:text-slate-200 leading-relaxed">
                    {hydratedBody}
                  </pre>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleCopyHydrated}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center space-x-2 shadow-md shadow-indigo-600/30"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? 'Copied Message!' : 'Copy Hydrated Message'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
