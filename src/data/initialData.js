// Production Initial Dataset for FlowGen AI - Clean Slate for Real Client Entry

export const DEFAULT_PIPELINE_STAGES = [
  { id: 'new_lead', name: 'New Lead', color: 'bg-slate-500/20 text-slate-700 dark:text-slate-300 border-slate-500/30', badgeColor: 'bg-slate-500' },
  { id: 'qualified', name: 'Qualified', color: 'bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border-indigo-500/30', badgeColor: 'bg-indigo-500' },
  { id: 'outreach_sent', name: 'Outreach Sent', color: 'bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border-cyan-500/30', badgeColor: 'bg-cyan-500' },
  { id: 'meeting_scheduled', name: 'Meeting Set', color: 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/30', badgeColor: 'bg-amber-500' },
  { id: 'proposal_sent', name: 'Proposal Sent', color: 'bg-purple-500/20 text-purple-700 dark:text-purple-300 border-purple-500/30', badgeColor: 'bg-purple-500' },
  { id: 'negotiation', name: 'Negotiation', color: 'bg-amber-500/20 text-amber-700 border-amber-500/30', badgeColor: 'bg-amber-500' },
  { id: 'won', name: 'Won / Active', color: 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/30', badgeColor: 'bg-emerald-500' },
  { id: 'lost', name: 'Closed Lost', color: 'bg-rose-500/20 text-rose-700 dark:text-rose-300 border-rose-500/30', badgeColor: 'bg-rose-500' },
];

export const DEFAULT_LEAD_SOURCES = [
  { id: 'google_maps', label: 'Google Maps', icon: 'MapPin', color: 'text-rose-400 bg-rose-500/10 border-rose-500/20' },
  { id: 'instagram', label: 'Instagram DM', icon: 'Instagram', color: 'text-fuchsia-400 bg-fuchsia-500/10 border-fuchsia-500/20' },
  { id: 'whatsapp', label: 'WhatsApp', icon: 'MessageCircle', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
  { id: 'website', label: 'Website Inbound', icon: 'Globe', color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
  { id: 'referral', label: 'Referral', icon: 'Users', color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
  { id: 'manual', label: 'Manual Input', icon: 'Edit3', color: 'text-slate-400 bg-slate-500/10 border-slate-500/20' }
];

export const INITIAL_OUTREACH_TEMPLATES = [
  {
    id: 'tpl_1',
    name: 'Google Maps Cold Email (Website Modernization)',
    channel: 'email',
    subject: 'Quick observation regarding {{business_name}}\'s mobile site',
    category: 'Cold Outreach',
    body: `Hi {{contact_name}},

I came across {{business_name}} on Google Maps while looking at high-rated businesses in your area. Your {{google_rating}}-star reputation and customer feedback are incredible!

I noticed your website isn't fully optimized for mobile visitors, which might be costing you booking conversions when customers search from their phones. 

I recently helped a similar business increase mobile leads by 34% by redesigning their online booking funnel. Would you be open to a 5-minute video breakdown of 3 quick improvements you can make today?

Best regards,
[Your Name]
Freelance Web Strategist`
  },
  {
    id: 'tpl_2',
    name: 'WhatsApp Quick Pitch (Local Lead Gen)',
    channel: 'whatsapp',
    subject: 'WhatsApp Direct Outreach',
    category: 'WhatsApp Pitch',
    body: `Hey {{contact_name}} 👋 Hope your week is off to a great start! 

Loved seeing {{business_name}}'s recent posts. Quick question — are you currently taking on new clients for {{niche}} services this month?

We built a lightweight local lead engine for a team nearby that brought in 18 qualified inquiries in their first 2 weeks. 

Would love to send over a 60-second preview of how it works for {{business_name}} if you're interested?`
  },
  {
    id: 'tpl_3',
    name: 'Instagram DM Opener (Social Redesign)',
    channel: 'instagram',
    subject: 'IG Direct Message',
    category: 'Social DM',
    body: `Hey {{contact_name}}! 🚀 Big fan of {{business_name}}'s work on Instagram.

I noticed you guys post amazing content, but your link-in-bio page and landing page design could convert much higher with a streamlined offer section.

I drafted a quick design concept specifically tailored for {{business_name}}. Mind if I drop a screenshot here for feedback?`
  }
];

// Clean slate arrays for real client entry by admin
export const INITIAL_LEADS = [];
export const INITIAL_PROPOSALS = [];
export const INITIAL_INVOICES = [];
