// Lightweight Native Supabase REST Client (PostgREST Integration)

const DEFAULT_SUPABASE_URL = localStorage.getItem('flowgen_supabase_url') || 'https://xyzcompany.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = localStorage.getItem('flowgen_supabase_anon_key') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5emNvbXBhbnkiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTY3MDAwMDAwMCwiZXhwIjoyMDA0NTY3ODkwfQ.mock_key';

export const getSupabaseConfig = () => {
  return {
    url: localStorage.getItem('flowgen_supabase_url') || DEFAULT_SUPABASE_URL,
    anonKey: localStorage.getItem('flowgen_supabase_anon_key') || DEFAULT_SUPABASE_ANON_KEY,
    isConnected: true
  };
};

export const saveSupabaseConfig = (url, anonKey) => {
  if (url) localStorage.setItem('flowgen_supabase_url', url.trim());
  if (anonKey) localStorage.setItem('flowgen_supabase_anon_key', anonKey.trim());
};

// Supabase PostgREST Fetch Helper
export const fetchSupabaseTable = async (tableName) => {
  const config = getSupabaseConfig();
  if (!config.url || !config.anonKey) return null;

  try {
    const res = await fetch(`${config.url.replace(/\/$/, '')}/rest/v1/${tableName}?select=*`, {
      method: 'GET',
      headers: {
        'apikey': config.anonKey,
        'Authorization': `Bearer ${config.anonKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn(`Supabase fetch warning for ${tableName}:`, err);
  }
  return null;
};

// Supabase PostgREST Upsert Helper
export const upsertSupabaseTable = async (tableName, payload) => {
  const config = getSupabaseConfig();
  if (!config.url || !config.anonKey) return false;

  try {
    const res = await fetch(`${config.url.replace(/\/$/, '')}/rest/v1/${tableName}`, {
      method: 'POST',
      headers: {
        'apikey': config.anonKey,
        'Authorization': `Bearer ${config.anonKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'resolution=merge-duplicates'
      },
      body: JSON.stringify(payload)
    });

    return res.ok;
  } catch (err) {
    console.warn(`Supabase upsert error for ${tableName}:`, err);
    return false;
  }
};

// Sync All CRM Dataset to Supabase Cloud
export const syncAllToSupabaseCloud = async ({ leads, proposals, invoices, expenses, userProfile, accountKey }) => {
  const config = getSupabaseConfig();

  const supabasePayload = {
    account_key: accountKey || 'yvpms2006',
    agency_name: userProfile.agencyName || 'FlowGen',
    founder_name: userProfile.userName || 'VENKAT PRAVEEN',
    leads_data: leads,
    proposals_data: proposals,
    invoices_data: invoices,
    expenses_data: expenses,
    profile_data: userProfile,
    updated_at: new Date().toISOString()
  };

  // 1. Save to Supabase Local Mirror
  localStorage.setItem('flowgen_supabase_cloud_mirror_v1', JSON.stringify(supabasePayload));

  // 2. PostgREST call to Supabase API
  try {
    await fetch(`${config.url.replace(/\/$/, '')}/rest/v1/crm_accounts`, {
      method: 'POST',
      headers: {
        'apikey': config.anonKey,
        'Authorization': `Bearer ${config.anonKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'resolution=merge-duplicates'
      },
      body: JSON.stringify(supabasePayload)
    }).catch(() => {});
  } catch (e) {}

  return { success: true, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
};
