import React, { useState } from 'react';
import {
  Users,
  CreditCard,
  Plus,
  CheckCircle2,
  Clock,
  DollarSign,
  TrendingUp,
  Award,
  Calendar,
  Building2,
  UserCheck,
  User,
  Briefcase,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';

export const ClientsInvoicesView = () => {
  const { userProfile, currentAdmin, leads, invoices, addInvoice, updateInvoiceStatus } = useApp();
  const curr = userProfile.currencySymbol || '₹';
  const [activeSubTab, setActiveSubTab] = useState('closed_clients');
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);

  // Closed / Won Clients
  const closedClients = leads.filter((l) => l.stage === 'won');

  // Revenue & Pipeline Metrics Calculation
  const totalClosedClients = closedClients.length;

  const totalOneTimeRevenue = closedClients
    .filter((l) => l.pricingType !== 'retainer')
    .reduce((sum, l) => sum + (l.dealValue || 0), 0);

  const totalMRR = closedClients
    .filter((l) => l.pricingType === 'retainer')
    .reduce((sum, l) => sum + (l.dealValue || 0), 0);

  const totalPotentialPipeline = leads
    .filter((l) => l.stage !== 'lost')
    .reduce((sum, l) => sum + (l.dealValue || 0), 0);

  const revenueCollected = invoices
    .filter((i) => i.status === 'paid')
    .reduce((sum, i) => sum + (i.amount || 0), 0);

  const pendingPayment = invoices
    .filter((i) => i.status === 'pending')
    .reduce((sum, i) => sum + (i.amount || 0), 0);

  const [newInv, setNewInv] = useState({
    leadId: closedClients[0]?.id || '',
    invoiceNumber: `INV-2026-00${invoices.length + 1}`,
    amount: 25000,
    dueDate: new Date(Date.now() + 86400000 * 14).toISOString().split('T')[0],
    description: 'Milestone 1 — Project Deposit'
  });

  const handleMarkPaid = (invId) => {
    updateInvoiceStatus(invId, 'paid');

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleCreateInvoice = (e) => {
    e.preventDefault();
    const client = leads.find((l) => l.id === newInv.leadId);

    addInvoice({
      leadId: newInv.leadId,
      clientName: client ? client.businessName : 'Client',
      contactPerson: client ? client.contactName : 'Contact',
      invoiceNumber: newInv.invoiceNumber,
      amount: Number(newInv.amount),
      status: 'pending',
      dueDate: newInv.dueDate,
      description: newInv.description,
      items: [{ description: newInv.description, amount: Number(newInv.amount) }]
    });

    setIsInvoiceModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header & Sub-Tab Switches */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Revenue & Closed Clients Hub</h1>
          <p className="text-sm text-slate-600">
            Track closed revenue, monthly recurring retainers, payment status, and admin acquisition records.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200">
            <button
              onClick={() => setActiveSubTab('closed_clients')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeSubTab === 'closed_clients' ? 'bg-blue-600 text-white shadow' : 'text-slate-600'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Closed Clients ({totalClosedClients})</span>
            </button>

            <button
              onClick={() => setActiveSubTab('invoices')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeSubTab === 'invoices' ? 'bg-blue-600 text-white shadow' : 'text-slate-600'
              }`}
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Invoices Ledger ({invoices.length})</span>
            </button>
          </div>

          <button
            onClick={() => setIsInvoiceModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md shadow-emerald-600/30 flex items-center space-x-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Issue Invoice</span>
          </button>
        </div>
      </div>

      {/* 6 Key Revenue & Closed Client Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
        <div className="glass-panel p-4 rounded-2xl border border-slate-200 space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
            <span>Closed Clients</span>
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 font-mono">{totalClosedClients}</p>
          <p className="text-[10px] text-slate-400">Won active accounts</p>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-slate-200 space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
            <span>One-Time Rev</span>
            <Award className="w-4 h-4 text-purple-500" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 font-mono">
            {curr}{totalOneTimeRevenue.toLocaleString()}
          </p>
          <p className="text-[10px] text-slate-400">Fixed project contracts</p>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-slate-200 space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
            <span>Monthly MRR</span>
            <DollarSign className="w-4 h-4 text-indigo-500" />
          </div>
          <p className="text-2xl font-extrabold text-indigo-600 font-mono">
            {curr}{totalMRR.toLocaleString()}
            <span className="text-[10px] text-slate-400 font-normal">/mo</span>
          </p>
          <p className="text-[10px] text-slate-400">Active retainers</p>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-slate-200 space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
            <span>Pipeline Value</span>
            <TrendingUp className="w-4 h-4 text-blue-500" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 font-mono">
            {curr}{totalPotentialPipeline.toLocaleString()}
          </p>
          <p className="text-[10px] text-slate-400">Total active deal value</p>
        </div>

        <div className="glass-panel p-4 rounded-2xl border-emerald-500/30 bg-emerald-500/10 space-y-1">
          <div className="flex items-center justify-between text-emerald-700 text-xs font-bold uppercase tracking-wider">
            <span>Collected</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-extrabold text-emerald-700 font-mono">
            {curr}{revenueCollected.toLocaleString()}
          </p>
          <p className="text-[10px] text-emerald-600">Paid in bank</p>
        </div>

        <div className="glass-panel p-4 rounded-2xl border-amber-500/30 bg-amber-500/10 space-y-1">
          <div className="flex items-center justify-between text-amber-700 text-xs font-bold uppercase tracking-wider">
            <span>Pending</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-2xl font-extrabold text-amber-700 font-mono">
            {curr}{pendingPayment.toLocaleString()}
          </p>
          <p className="text-[10px] text-amber-600">Invoices outstanding</p>
        </div>
      </div>

      {/* Main Connected View */}
      {activeSubTab === 'closed_clients' ? (
        <div className="glass-panel rounded-2xl overflow-hidden border border-slate-200">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Closed Clients & Connected Project Revenue</h3>
              <p className="text-xs text-slate-500">Complete record of won deals, project details, date closed, and acquiring admin.</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 text-xs font-mono font-bold">
              {closedClients.length} Won Deals
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-100 text-slate-600 uppercase font-semibold text-[11px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="p-4">Client / Business Name</th>
                  <th className="p-4">Contact Person</th>
                  <th className="p-4">Project Details</th>
                  <th className="p-4">Acquired By Admin</th>
                  <th className="p-4">Project Value</th>
                  <th className="p-4">Date Closed</th>
                  <th className="p-4">Payment Status</th>
                  <th className="p-4">Project Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {closedClients.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-slate-500">
                      No closed clients yet. Drag leads to "Won / Active" in your Sales Pipeline to track revenue here.
                    </td>
                  </tr>
                ) : (
                  closedClients.map((client) => (
                    <tr key={client.id} className="hover:bg-slate-100 transition-colors">
                      <td className="p-4">
                        <p className="font-bold text-slate-900 text-sm">{client.businessName}</p>
                        <p className="text-[10px] text-slate-400 font-mono">{client.niche}</p>
                      </td>
                      <td className="p-4 font-medium text-slate-800">
                        {client.contactName || 'N/A'}
                      </td>
                      <td className="p-4 font-semibold text-slate-900">
                        {client.projectName || 'Website Development'}
                      </td>
                      <td className="p-4 font-semibold text-blue-700">
                        👤 {client.addedBy || 'yvpms2006'}
                      </td>
                      <td className="p-4 font-mono font-bold text-emerald-600 text-sm">
                        {curr}{client.dealValue?.toLocaleString()}
                        <span className="text-[10px] text-slate-400 font-normal ml-1">
                          ({client.pricingType === 'retainer' ? 'monthly MRR' : 'one-time'})
                        </span>
                      </td>
                      <td className="p-4 font-mono text-slate-600">
                        {client.dateClosed || new Date().toISOString().split('T')[0]}
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                            client.paymentStatus?.includes('Paid') || client.paymentStatus?.includes('Collected')
                              ? 'bg-emerald-500/20 text-emerald-700 border border-emerald-500/30'
                              : 'bg-amber-500/20 text-amber-700 border border-amber-500/30'
                          }`}
                        >
                          {client.paymentStatus || 'Paid'}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 border border-slate-200 font-semibold">
                          {client.projectStatus || (client.pricingType === 'retainer' ? 'Active Retainer' : 'In Progress')}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="glass-panel rounded-2xl overflow-hidden border border-slate-200">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Invoices Ledger</h3>
              <p className="text-xs text-slate-500">Issued milestone invoices and payment completion logs.</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-100 text-slate-600 uppercase font-semibold text-[11px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="p-4">Invoice #</th>
                  <th className="p-4">Client</th>
                  <th className="p-4">Due Date</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {invoices.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-500">
                      No invoices issued yet. Click "Issue Invoice" above to generate a client invoice.
                    </td>
                  </tr>
                ) : (
                  invoices.map((inv) => (
                    <tr key={inv.id} className="hover:bg-slate-100 transition-colors">
                      <td className="p-4 font-mono font-bold text-slate-900">{inv.invoiceNumber}</td>
                      <td className="p-4">
                        <p className="font-bold text-slate-900">{inv.clientName}</p>
                        <p className="text-[11px] text-slate-500">{inv.description}</p>
                      </td>
                      <td className="p-4 font-mono">{inv.dueDate}</td>
                      <td className="p-4 font-mono font-bold text-emerald-600">{curr}{inv.amount?.toLocaleString()}</td>
                      <td className="p-4">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            inv.status === 'paid'
                              ? 'bg-emerald-500/20 text-emerald-700'
                              : 'bg-amber-500/20 text-amber-700'
                          }`}
                        >
                          {inv.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        {inv.status === 'pending' && (
                          <button
                            onClick={() => handleMarkPaid(inv.id)}
                            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow"
                          >
                            Mark Paid 🎉
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal for Invoice Creation */}
      {isInvoiceModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-md p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-900">Issue Client Invoice</h3>

            <form onSubmit={handleCreateInvoice} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="text-slate-700 font-semibold">Client</label>
                <select
                  value={newInv.leadId}
                  onChange={(e) => setNewInv({ ...newInv, leadId: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-xl p-2 text-slate-800"
                >
                  {closedClients.map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.businessName} ({l.contactName})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-slate-700 font-semibold">Amount ({curr})</label>
                <input
                  type="number"
                  value={newInv.amount}
                  onChange={(e) => setNewInv({ ...newInv, amount: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-xl p-2 text-slate-800 font-mono font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-700 font-semibold">Description</label>
                <input
                  type="text"
                  value={newInv.description}
                  onChange={(e) => setNewInv({ ...newInv, description: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-xl p-2 text-slate-800"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <button
                  type="button"
                  onClick={() => setIsInvoiceModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold">
                  Issue Invoice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
