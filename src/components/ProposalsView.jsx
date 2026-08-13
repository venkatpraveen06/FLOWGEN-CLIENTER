import React, { useState } from 'react';
import {
  Plus,
  Printer,
  Trash2,
  Users
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ProposalsView = () => {
  const {
    userProfile,
    leads,
    proposals,
    addProposal,
    updateProposalStatus
  } = useApp();

  const curr = userProfile.currencySymbol || '₹';

  const [selectedProposalId, setSelectedProposalId] = useState(
    proposals[0]?.id || null
  );

  const [isCreating, setIsCreating] = useState(false);

  const [newProp, setNewProp] = useState({
    leadId: leads[0]?.id || '',
    title: 'Website Redesign & Custom AI Engine',
    validUntil: '2026-08-31',
    scopeItems: [
      {
        id: 'scope-1',
        title: 'Custom Website Design & Mobile Optimization',
        description: 'Complete 5-page responsive website design with speed optimization.',
        price: 25000
      },
      {
        id: 'scope-2',
        title: 'WhatsApp Automation & Booking Engine',
        description: 'Direct WhatsApp integration for immediate customer booking notifications.',
        price: 15000
      }
    ],
    notes: '50% deposit required on approval, remaining 50% upon deployment.'
  });

  const activeProposal = proposals.find((p) => p.id === selectedProposalId) || proposals[0];

  const handleAddItem = () => {
    setNewProp((prev) => ({
      ...prev,
      scopeItems: [
        ...prev.scopeItems,
        { id: `scope-${Date.now()}`, title: '', description: '', price: 5000 }
      ]
    }));
  };

  const handleRemoveItem = (id) => {
    setNewProp((prev) => ({
      ...prev,
      scopeItems: prev.scopeItems.filter((i) => i.id !== id)
    }));
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    const lead = leads.find((l) => l.id === newProp.leadId);
    const totalValue = newProp.scopeItems.reduce(
      (sum, item) => sum + (Number(item.price) || 0),
      0
    );

    const propId = addProposal({
      leadId: newProp.leadId,
      businessName: lead ? lead.businessName : 'Client Business',
      clientContact: lead ? lead.contactName : 'Contact Person',
      title: newProp.title,
      dealValue: totalValue,
      status: 'sent',
      validUntil: newProp.validUntil,
      scopeItems: newProp.scopeItems,
      notes: newProp.notes
    });

    setSelectedProposalId(propId);
    setIsCreating(false);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4 no-print">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Proposals & Quotes</h1>
          <p className="text-sm text-slate-600">
            Generate professional client proposals, set scope milestones, and track acceptance status.
          </p>
        </div>

        <button
          onClick={() => setIsCreating(true)}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md shadow-blue-600/20 flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Create Proposal</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass-panel p-4 rounded-2xl space-y-3 no-print">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">All Proposals</p>

          <div className="space-y-2">
            {proposals.map((prop) => (
              <button
                key={prop.id}
                onClick={() => {
                  setSelectedProposalId(prop.id);
                  setIsCreating(false);
                }}
                className={`w-full text-left p-3.5 rounded-xl transition-all border ${
                  selectedProposalId === prop.id
                    ? 'bg-blue-50 border-blue-300 text-slate-900 shadow-md font-bold'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm truncate">{prop.businessName}</span>
                  <span className="text-xs font-mono font-bold text-emerald-600">
                    {curr}{prop.dealValue?.toLocaleString()}
                  </span>
                </div>
                <p className="text-xs text-slate-500 truncate mt-0.5">{prop.title}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          {isCreating ? (
            <div className="glass-panel p-6 rounded-2xl space-y-6 border border-slate-200">
              <h2 className="text-xl font-bold text-slate-900">Build New Proposal</h2>

              <form onSubmit={handleCreateSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Target Lead / Client</label>
                  <select
                    value={newProp.leadId}
                    onChange={(e) => setNewProp({ ...newProp, leadId: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none"
                  >
                    {leads.map((l) => (
                      <option key={l.id} value={l.id}>
                        {l.businessName} ({l.contactName})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Proposal Title</label>
                    <input
                      type="text"
                      required
                      value={newProp.title}
                      onChange={(e) => setNewProp({ ...newProp, title: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Valid Until</label>
                    <input
                      type="date"
                      value={newProp.validUntil}
                      onChange={(e) => setNewProp({ ...newProp, validUntil: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Itemized Scope & Deliverables
                    </label>
                    <button
                      type="button"
                      onClick={handleAddItem}
                      className="text-xs font-semibold text-blue-700 hover:underline"
                    >
                      + Add Item
                    </button>
                  </div>

                  {newProp.scopeItems.map((item, idx) => (
                    <div
                      key={item.id}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <input
                          type="text"
                          placeholder="Deliverable Title"
                          value={item.title}
                          onChange={(e) => {
                            const updated = [...newProp.scopeItems];
                            updated[idx].title = e.target.value;
                            setNewProp({ ...newProp, scopeItems: updated });
                          }}
                          className="flex-1 bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-800"
                        />
                        <div className="flex items-center space-x-1">
                          <span className="text-slate-400 text-xs">{curr}</span>
                          <input
                            type="number"
                            placeholder="Price"
                            value={item.price}
                            onChange={(e) => {
                              const updated = [...newProp.scopeItems];
                              updated[idx].price = e.target.value;
                              setNewProp({ ...newProp, scopeItems: updated });
                            }}
                            className="w-24 bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs font-mono font-bold text-emerald-600"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-slate-400 hover:text-rose-500 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <textarea
                        rows={1}
                        placeholder="Detailed description of deliverable..."
                        value={item.description}
                        onChange={(e) => {
                          const updated = [...newProp.scopeItems];
                          updated[idx].description = e.target.value;
                          setNewProp({ ...newProp, scopeItems: updated });
                        }}
                        className="w-full bg-white border border-slate-300 rounded px-2.5 py-1 text-xs text-slate-800"
                      />
                    </div>
                  ))}
                </div>

                <div className="flex justify-end space-x-3 pt-4 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => setIsCreating(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/20"
                  >
                    Save & Generate Proposal
                  </button>
                </div>
              </form>
            </div>
          ) : activeProposal ? (
            <div className="glass-panel p-8 rounded-2xl space-y-6 print-container">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4 no-print">
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-slate-500">Status:</span>
                  <select
                    value={activeProposal.status}
                    onChange={(e) => updateProposalStatus(activeProposal.id, e.target.value)}
                    className="bg-white border border-slate-300 rounded-lg px-3 py-1 text-xs font-semibold text-slate-800 focus:outline-none"
                  >
                    <option value="sent">Sent</option>
                    <option value="accepted">Accepted</option>
                    <option value="declined">Declined</option>
                  </select>
                </div>

                <button
                  onClick={handlePrint}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center space-x-2"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print / Save PDF</span>
                </button>
              </div>

              <div className="flex flex-col sm:flex-row justify-between gap-6 border-b border-slate-200 pb-6">
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">PROJECT PROPOSAL</h2>
                  <p className="text-sm font-semibold text-blue-700 mt-1">{activeProposal.title}</p>
                  <p className="text-xs text-slate-500 mt-2">
                    Prepared for: <span className="text-slate-900 font-bold">{activeProposal.businessName}</span> ({activeProposal.clientContact})
                  </p>
                </div>

                <div className="text-right text-xs text-slate-500 space-y-1">
                  <p>
                    Proposal ID: <span className="font-mono text-slate-800 font-bold">{activeProposal.id}</span>
                  </p>
                  <p>
                    Date: <span className="text-slate-800">{new Date(activeProposal.createdAt || Date.now()).toLocaleDateString()}</span>
                  </p>
                  <p>
                    Valid Until: <span className="text-slate-800 font-semibold">{activeProposal.validUntil}</span>
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Scope of Work & Investment</h4>

                <div className="rounded-xl overflow-hidden border border-slate-200">
                  <table className="w-full text-left text-xs text-slate-700">
                    <thead className="bg-slate-100 text-slate-600 uppercase font-semibold text-[10px]">
                      <tr>
                        <th className="p-3">Deliverable / Milestone</th>
                        <th className="p-3 text-right">Investment</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {activeProposal.scopeItems?.map((item) => (
                        <tr key={item.id}>
                          <td className="p-3">
                            <p className="font-bold text-slate-900 text-sm">{item.title}</p>
                            <p className="text-slate-500 text-xs mt-0.5">{item.description}</p>
                          </td>
                          <td className="p-3 text-right font-mono font-bold text-emerald-600 text-sm">
                            {curr}{Number(item.price).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-slate-50 font-bold text-slate-900 border-t border-slate-200">
                      <tr>
                        <td className="p-3 text-right uppercase">Total Project Investment</td>
                        <td className="p-3 text-right font-mono text-emerald-600 text-base">
                          {curr}{activeProposal.dealValue?.toLocaleString()}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              {activeProposal.notes && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
                  <span className="font-bold text-blue-700 uppercase tracking-wider block">Payment & Terms</span>
                  <p>{activeProposal.notes}</p>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
