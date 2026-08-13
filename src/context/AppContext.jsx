import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  INITIAL_LEADS,
  INITIAL_PROPOSALS,
  INITIAL_INVOICES,
  INITIAL_OUTREACH_TEMPLATES,
  DEFAULT_PIPELINE_STAGES
} from '../data/initialData';

const AppContext = createContext();

const LOCAL_STORAGE_KEYS = {
  LEADS: 'flowgen_leads_v1',
  PROPOSALS: 'flowgen_proposals_v1',
  INVOICES: 'flowgen_invoices_v1',
  TEMPLATES: 'flowgen_templates_v1',
  THEME: 'flowgen_theme_v1',
  PROFILE: 'flowgen_profile_v1',
  EXPENSES: 'flowgen_expenses_v1',
  AUTH: 'flowgen_auth_v1'
};

export const calculateLeadScore = (lead) => {
  let score = 50;

  if (lead.audit) {
    if (!lead.audit.hasWebsite) score += 15;
    else if (!lead.audit.mobileResponsive) score += 10;
    if (!lead.audit.hasSSL) score += 5;
    if (lead.audit.googleRating >= 4.5) score += 10;
  }

  if (lead.qualification) {
    if (lead.qualification.budgetVerified) score += 15;
    if (lead.qualification.decisionMakerReached) score += 10;
    if (lead.qualification.urgencyLevel === 'high') score += 10;
    if (lead.qualification.urgencyLevel === 'low') score -= 5;
  }

  if (lead.dealValue >= 5000) score += 10;

  return Math.min(Math.max(score, 10), 99);
};

export const AppProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [pipelineViewMode, setPipelineViewMode] = useState('kanban');

  // Custom Admin Accounts
  const ADMIN_ACCOUNTS = [
    { username: 'yvpms2006', password: 'NXZn@6329', name: 'VENKAT PRAVEEN', role: 'Founder & Managing Director', avatar: '/yvpms2006.jpg' },
    { username: 'admin2', password: 'admin1234', name: 'Admin 2', role: 'Senior Administrator', avatar: null }
  ];

  // Auth & Current Admin State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH);
    return saved ? JSON.parse(saved) : false;
  });

  const [currentAdmin, setCurrentAdmin] = useState(() => {
    const saved = localStorage.getItem('flowgen_admin_v1');
    return saved ? JSON.parse(saved) : { username: 'yvpms2006', name: 'VENKAT PRAVEEN', role: 'Founder & Managing Director', avatar: '/yvpms2006.jpg' };
  });

  const login = (inputUsername, inputPassword) => {
    const match = ADMIN_ACCOUNTS.find(
      (acc) =>
        acc.username.toLowerCase() === inputUsername.trim().toLowerCase() &&
        acc.password === inputPassword
    );

    if (match) {
      setIsAuthenticated(true);
      setCurrentAdmin({ username: match.username, name: match.name, role: match.role, avatar: match.avatar });
      localStorage.setItem(LOCAL_STORAGE_KEYS.AUTH, JSON.stringify(true));
      localStorage.setItem('flowgen_admin_v1', JSON.stringify({ username: match.username, name: match.name, role: match.role, avatar: match.avatar }));
      return { success: true, admin: match };
    }

    return {
      success: false,
      error: 'Invalid credentials! Use yvpms2006 (Pass: NXZn@6329) or admin2 (Pass: admin1234)'
    };
  };

  // App View Mode ('home' vs 'admin')
  const [appViewMode, setAppViewMode] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'true' || params.get('crm') === 'true') {
      return 'admin';
    }
    return 'home';
  });

  const logout = () => {
    setIsAuthenticated(false);
    setAppViewMode('home');
    localStorage.removeItem(LOCAL_STORAGE_KEYS.AUTH);
    localStorage.removeItem('flowgen_admin_v1');
  };

  // Theme State ('light' default to match user's reference)
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.THEME);
    return saved ? saved : 'light';
  });

  // User & Agency Profile State
  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.PROFILE);
    return saved
      ? JSON.parse(saved)
      : {
          userName: 'VENKAT PRAVEEN',
          agencyName: 'FlowGen',
          planType: 'Pro Solopreneur',
          currencySymbol: '₹', // Default to INR ₹ or USD $
          email: 'yvpms2006@flowgen.io',
          phone: '+91 9876543210'
        };
  });

  // Expenses Tracker State
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.EXPENSES);
    return saved
      ? JSON.parse(saved)
      : [
          { id: 'exp-1', title: 'Adobe Creative Cloud', category: 'Tools', amount: 3500, date: '2026-08-01' },
          { id: 'exp-2', title: 'Vercel & Domain Hosting', category: 'Hosting', amount: 1800, date: '2026-08-03' }
        ];
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.THEME, theme);
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.PROFILE, JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.EXPENSES, JSON.stringify(expenses));
  }, [expenses]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const updateProfile = (fields) => {
    setUserProfile((prev) => ({ ...prev, ...fields }));
  };

  const addExpense = (exp) => {
    setExpenses((prev) => [{ id: `exp-${Date.now()}`, ...exp }, ...prev]);
  };

  // Persistent CRM States
  const [leads, setLeads] = useState(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.LEADS);
    return saved ? JSON.parse(saved) : INITIAL_LEADS;
  });

  const [proposals, setProposals] = useState(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.PROPOSALS);
    return saved ? JSON.parse(saved) : INITIAL_PROPOSALS;
  });

  const [invoices, setInvoices] = useState(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.INVOICES);
    return saved ? JSON.parse(saved) : INITIAL_INVOICES;
  });

  const [templates, setTemplates] = useState(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.TEMPLATES);
    return saved ? JSON.parse(saved) : INITIAL_OUTREACH_TEMPLATES;
  });

  // Modal Controls
  const [selectedLeadId, setSelectedLeadId] = useState(null);
  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false);
  const [isProposalModalOpen, setIsProposalModalOpen] = useState(false);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNicheFilter, setSelectedNicheFilter] = useState('all');
  const [selectedSourceFilter, setSelectedSourceFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.LEADS, JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.PROPOSALS, JSON.stringify(proposals));
  }, [proposals]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.INVOICES, JSON.stringify(invoices));
  }, [invoices]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.TEMPLATES, JSON.stringify(templates));
  }, [templates]);

  const selectedLead = leads.find((l) => l.id === selectedLeadId) || null;

  // Lead CRUD
  const addLead = (newLeadData) => {
    const id = `lead-${Date.now()}`;
    const calculatedScore = calculateLeadScore(newLeadData);
    const adminName = newLeadData.addedBy || currentAdmin?.name || currentAdmin?.username || 'yvpms2006';
    const newLead = {
      id,
      stage: 'new_lead',
      dealValue: 25000,
      pricingType: 'one_off',
      score: calculatedScore,
      addedBy: adminName,
      audit: {
        hasWebsite: true,
        mobileResponsive: true,
        activeSocial: true,
        hasSSL: true,
        googleRating: 4.5,
        reviewsCount: 25,
        notes: '',
        ...newLeadData.audit
      },
      qualification: {
        budgetVerified: false,
        decisionMakerReached: false,
        urgencyLevel: 'medium',
        fitScore: 75,
        aiPitchHook: 'Custom outreach pitch based on target lead metrics.',
        ...newLeadData.qualification
      },
      followUpDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
      followUpStatus: 'pending',
      followUpNotes: 'Initial outreach follow-up',
      activities: [
        {
          id: `act-${Date.now()}`,
          type: 'note',
          text: `Lead added to pipeline by ${adminName}.`,
          timestamp: new Date().toISOString()
        }
      ],
      tags: [newLeadData.niche || 'General', newLeadData.source || 'Manual'],
      createdAt: new Date().toISOString(),
      ...newLeadData
    };

    setLeads((prev) => [newLead, ...prev]);
    return id;
  };

  const updateLead = (id, fields) => {
    setLeads((prev) =>
      prev.map((lead) => {
        if (lead.id === id) {
          const updated = { ...lead, ...fields };
          updated.score = calculateLeadScore(updated);
          return updated;
        }
        return lead;
      })
    );
  };

  const deleteLead = (id) => {
    setLeads((prev) => prev.filter((l) => l.id !== id));
    if (selectedLeadId === id) setSelectedLeadId(null);
  };

  const updateLeadStage = (id, newStage) => {
    setLeads((prev) =>
      prev.map((lead) => {
        if (lead.id === id) {
          const oldStage = lead.stage;
          if (oldStage !== newStage) {
            if (newStage === 'won') {
              try {
                confetti({
                  particleCount: 100,
                  spread: 70,
                  origin: { y: 0.6 }
                });
              } catch (e) {}
            }

            const stageObj = DEFAULT_PIPELINE_STAGES.find((s) => s.id === newStage);
            const newActivity = {
              id: `act-${Date.now()}`,
              type: newStage === 'won' ? 'proposal' : 'note',
              text: `Stage changed to ${stageObj ? stageObj.name : newStage}`,
              timestamp: new Date().toISOString()
            };

            return {
              ...lead,
              stage: newStage,
              activities: [newActivity, ...lead.activities]
            };
          }
        }
        return lead;
      })
    );
  };

  const addActivity = (leadId, activity) => {
    setLeads((prev) =>
      prev.map((lead) => {
        if (lead.id === leadId) {
          const newAct = {
            id: `act-${Date.now()}`,
            timestamp: new Date().toISOString(),
            ...activity
          };
          return {
            ...lead,
            activities: [newAct, ...lead.activities]
          };
        }
        return lead;
      })
    );
  };

  const snoozeFollowUp = (leadId, days = 2) => {
    setLeads((prev) =>
      prev.map((lead) => {
        if (lead.id === leadId) {
          const currentDate = new Date(lead.followUpDate || Date.now());
          currentDate.setDate(currentDate.getDate() + days);
          const nextDateStr = currentDate.toISOString().split('T')[0];

          return {
            ...lead,
            followUpDate: nextDateStr,
            followUpStatus: 'snoozed',
            activities: [
              {
                id: `act-${Date.now()}`,
                type: 'note',
                text: `Follow-up snoozed for ${days} days to ${nextDateStr}`,
                timestamp: new Date().toISOString()
              },
              ...lead.activities
            ]
          };
        }
        return lead;
      })
    );
  };

  const completeFollowUp = (leadId) => {
    setLeads((prev) =>
      prev.map((lead) => {
        if (lead.id === leadId) {
          return {
            ...lead,
            followUpStatus: 'completed',
            activities: [
              {
                id: `act-${Date.now()}`,
                type: 'note',
                text: 'Follow-up marked as completed.',
                timestamp: new Date().toISOString()
              },
              ...lead.activities
            ]
          };
        }
        return lead;
      })
    );
  };

  const addProposal = (propData) => {
    const id = `prop-${Date.now()}`;
    const newProp = {
      id,
      status: 'sent',
      createdAt: new Date().toISOString(),
      ...propData
    };

    setProposals((prev) => [newProp, ...prev]);

    if (propData.leadId) {
      updateLeadStage(propData.leadId, 'proposal_sent');
      addActivity(propData.leadId, {
        type: 'proposal',
        text: `Proposal "${propData.title}" (${userProfile.currencySymbol}${propData.dealValue.toLocaleString()}) generated and sent.`
      });
    }

    return id;
  };

  const updateProposalStatus = (id, newStatus) => {
    setProposals((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
    );
  };

  const addInvoice = (invData) => {
    const id = `inv-${Date.now()}`;
    const newInv = {
      id,
      invoiceNumber: `INV-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
      ...invData
    };
    setInvoices((prev) => [newInv, ...prev]);
    return id;
  };

  const updateInvoiceStatus = (id, newStatus) => {
    setInvoices((prev) =>
      prev.map((inv) => {
        if (inv.id === id) {
          const paidDate = newStatus === 'paid' ? new Date().toISOString().split('T')[0] : null;
          if (newStatus === 'paid') {
            try {
              confetti({ particleCount: 80, spread: 60, origin: { y: 0.5 } });
            } catch (e) {}
          }
          return { ...inv, status: newStatus, paidDate };
        }
        return inv;
      })
    );
  };

  const addTemplate = (tpl) => {
    const id = `tpl_${Date.now()}`;
    setTemplates((prev) => [...prev, { id, ...tpl }]);
  };

  const updateTemplate = (id, fields) => {
    setTemplates((prev) => prev.map((t) => (t.id === id ? { ...t, ...fields } : t)));
  };

  const deleteTemplate = (id) => {
    setTemplates((prev) => prev.filter((t) => t.id !== id));
  };

  const resetToDemoData = () => {
    setLeads(INITIAL_LEADS);
    setProposals(INITIAL_PROPOSALS);
    setInvoices(INITIAL_INVOICES);
    setTemplates(INITIAL_OUTREACH_TEMPLATES);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.LEADS);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.PROPOSALS);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.INVOICES);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.TEMPLATES);
  };

  const exportDataJSON = () => {
    const data = {
      userProfile,
      leads,
      proposals,
      invoices,
      templates,
      expenses,
      exportedAt: new Date().toISOString()
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `flowgen_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const importDataJSON = (jsonString) => {
    try {
      const data = JSON.parse(jsonString);
      if (data.userProfile) setUserProfile(data.userProfile);
      if (data.leads) setLeads(data.leads);
      if (data.proposals) setProposals(data.proposals);
      if (data.invoices) setInvoices(data.invoices);
      if (data.templates) setTemplates(data.templates);
      if (data.expenses) setExpenses(data.expenses);
      return true;
    } catch (e) {
      console.error('Failed to import JSON data:', e);
      return false;
    }
  };

  const clearAllData = () => {
    setLeads([]);
    setProposals([]);
    setInvoices([]);
    setExpenses([]);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.LEADS);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.PROPOSALS);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.INVOICES);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.EXPENSES);
  };

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        currentAdmin,
        appViewMode,
        setAppViewMode,
        login,
        logout,
        theme,
        setTheme,
        toggleTheme,
        userProfile,
        updateProfile,
        expenses,
        addExpense,
        activeTab,
        setActiveTab,
        pipelineViewMode,
        setPipelineViewMode,
        leads,
        proposals,
        invoices,
        templates,
        selectedLeadId,
        setSelectedLeadId,
        selectedLead,
        isAddLeadOpen,
        setIsAddLeadOpen,
        isProposalModalOpen,
        setIsProposalModalOpen,
        isInvoiceModalOpen,
        setIsInvoiceModalOpen,
        searchQuery,
        setSearchQuery,
        selectedNicheFilter,
        setSelectedNicheFilter,
        selectedSourceFilter,
        setSelectedSourceFilter,
        addLead,
        updateLead,
        deleteLead,
        updateLeadStage,
        addActivity,
        snoozeFollowUp,
        completeFollowUp,
        addProposal,
        updateProposalStatus,
        addInvoice,
        updateInvoiceStatus,
        addTemplate,
        updateTemplate,
        deleteTemplate,
        resetToDemoData,
        clearAllData,
        exportDataJSON,
        importDataJSON
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
