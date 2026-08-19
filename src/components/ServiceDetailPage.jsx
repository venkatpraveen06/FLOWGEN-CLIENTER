import React from 'react';
import {
  X,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Laptop,
  MessageSquare,
  Code,
  TrendingUp,
  Layers,
  ShieldCheck,
  Zap,
  Globe,
  Clock,
  Check,
  Building2,
  FileText,
  Star,
  Users,
  Award
} from 'lucide-react';
import { FlowGenLogo } from './FlowGenLogo';

export const SERVICE_DETAILS = {
  'business-websites': {
    id: 'business-websites',
    title: 'Business Website Development',
    tagline: 'High-converting, responsive web platforms engineered to convert visitors into loyal clients.',
    icon: Laptop,
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    iconBg: 'bg-blue-600 text-white',
    pricing: '₹4,050 / month or ₹25,000 one-off',
    turnaround: '5 – 7 Business Days',
    heroDesc: 'We design and build state-of-the-art corporate and business websites tailored to your specific industry. Built with ultra-fast page speeds, mobile-first responsiveness, SEO optimization, and integrated lead capture funnels.',
    features: [
      { title: 'Mobile-First Responsive Layout', desc: 'Flawless design across iPhones, Android devices, iPads, and high-resolution desktop monitors.' },
      { title: 'Ultra-Fast Performance (<1s Load)', desc: 'Optimized image assets, lightweight JavaScript, and edge CDN hosting for lightning-fast loads.' },
      { title: 'Integrated Lead Capture Forms', desc: 'Direct webhook integration with your Flowgen CRM pipeline to log inquiries automatically.' },
      { title: 'Search Engine Optimization (SEO)', desc: 'Meta tag tags, schema markup, Google Search Console indexation, and keyword structure.' },
      { title: 'Free SSL & Security Hardening', desc: 'Bank-grade HTTPS encryption, automated backups, and DDoS protection.' },
      { title: 'Content Management System (CMS)', desc: 'Easy-to-use editor for updating team members, services, portfolio, and blog posts.' }
    ],
    techStack: ['React', 'Vite', 'Tailwind CSS', 'Node.js', 'Vercel CDN', 'Google Analytics 4'],
    timeline: [
      { step: '01', title: 'Discovery & Wireframing', desc: 'We outline site architecture, sitemap, content requirements, and design tokens.' },
      { step: '02', title: 'UI/UX Visual Design', desc: 'High-fidelity glassmorphic mockup design review and brand alignment.' },
      { step: '03', title: 'Frontend Development', desc: 'Coding responsive interfaces with smooth micro-interactions and fast performance.' },
      { step: '04', title: 'Testing & Launch', desc: 'Cross-browser testing, SEO audit, domain connection, and live production deployment.' }
    ]
  },

  'ai-automation': {
    id: 'ai-automation',
    title: 'AI Automation & Intelligent Workflows',
    tagline: 'Automate customer support, lead qualification, and internal ops using custom AI agents.',
    icon: Sparkles,
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    iconBg: 'bg-indigo-600 text-white',
    pricing: '₹6,750 / month or custom build',
    turnaround: '7 – 10 Business Days',
    heroDesc: 'Eliminate manual repetitive tasks and increase team productivity. Flowgen builds custom AI chatbots, automated document parsers, lead scoring algorithms, and smart CRM workflows tailored to your business operations.',
    features: [
      { title: '24/7 AI Customer Support Agent', desc: 'Handles client FAQs, pricing inquiries, and support tickets instantly without human delay.' },
      { title: 'Automated Lead Qualification', desc: 'AI evaluates inbound lead details, calculates budget scores, and alerts senior account managers.' },
      { title: 'Document & PDF Parsing', desc: 'Extracts structured data from customer invoices, receipts, and contracts automatically.' },
      { title: 'Multi-Channel AI Assistants', desc: 'Unified AI intelligence across Website Chat, WhatsApp, Email, and Instagram DMs.' },
      { title: 'Smart Email Auto-Responders', desc: 'Generates personalized context-aware response drafts for incoming sales inquiries.' },
      { title: 'CRM Workflow Trigger Sync', desc: 'Automatically updates lead stages, tags, and follow-up reminders based on AI conversations.' }
    ],
    techStack: ['OpenAI GPT-4o', 'Claude 3.5 Sonnet', 'LangChain', 'Python REST API', 'Supabase Vector', 'Webhooks'],
    timeline: [
      { step: '01', title: 'Process Audit', desc: 'We map out your manual workflows, repetitive tasks, and integration endpoints.' },
      { step: '02', title: 'Prompt & Model Tuning', desc: 'Customizing AI knowledge bases with your business FAQs, services, and brand tone.' },
      { step: '03', title: 'Webhook Integration', desc: 'Connecting AI endpoints into your website, WhatsApp API, and CRM pipeline.' },
      { step: '04', title: 'Testing & Deployment', desc: 'Stress testing AI accuracy, guardrails safety, and launching automated triggers.' }
    ]
  },

  'whatsapp-automation': {
    id: 'whatsapp-automation',
    title: 'Meta WhatsApp Business Automation',
    tagline: 'Official Meta Partner WhatsApp Cloud API workflows, automated bookings & catalog ordering.',
    icon: MessageSquare,
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    iconBg: 'bg-emerald-600 text-white',
    pricing: '₹4,050 / month (Basic) or ₹6,750 / month (Starter)',
    turnaround: '5 – 7 Business Days',
    heroDesc: 'Turn WhatsApp into your highest-converting sales engine. With official Meta Cloud API integration, your business gets green tick verification, interactive button menus, automated appointment scheduling, and 98% open-rate broadcasts.',
    features: [
      { title: 'Official Meta Cloud API Verification', desc: 'Green tick verified business profile with official Meta WhatsApp Business API access.' },
      { title: 'Interactive Flow Menus & Buttons', desc: 'Custom button menus for table reservations, doctor appointments, or service quotes.' },
      { title: 'High-Open Rate Broadcast Engine', desc: 'Send targeted promotional broadcasts to opted-in customer lists with instant analytics.' },
      { title: 'E-Commerce Product Catalogs', desc: 'Showcase menus or product catalogs directly inside WhatsApp with 1-tap ordering.' },
      { title: 'Multi-Agent Shared Inbox', desc: 'Allow your whole team to respond from a single unified WhatsApp phone number.' },
      { title: 'Automated CRM Sync', desc: 'Every WhatsApp inquiry auto-populates as a fresh qualified lead inside Flowgen CRM.' }
    ],
    techStack: ['WhatsApp Meta Cloud API', 'Node.js', 'PostgREST', 'Webhooks', 'Meta Business Manager', 'Flowgen Engine'],
    timeline: [
      { step: '01', title: 'Meta API Setup', desc: 'Verifying your Facebook Business Manager and securing official WhatsApp API tokens.' },
      { step: '02', title: 'Flow & Template Design', desc: 'Designing interactive WhatsApp decision trees, button menus, and template approvals.' },
      { step: '03', title: 'Chatbot Logic Coding', desc: 'Programming instant auto-replies, catalog flows, and CRM lead capture triggers.' },
      { step: '04', title: 'Team Onboarding', desc: 'Setting up multi-agent inbox credentials and going live with broadcasting capabilities.' }
    ]
  },

  'custom-software': {
    id: 'custom-software',
    title: 'Custom Business Software & Portals',
    tagline: 'Tailored enterprise web applications, internal dashboards, and custom client portals.',
    icon: Code,
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
    iconBg: 'bg-purple-600 text-white',
    pricing: 'Enterprise / Custom Project Scope',
    turnaround: '2 – 4 Weeks',
    heroDesc: 'When standard off-the-shelf software falls short, Flowgen builds bespoke web applications designed specifically around your proprietary operational workflows, client management needs, and reporting requirements.',
    features: [
      { title: 'Role-Based Access Control (RBAC)', desc: 'Custom permissions for Super Admins, Branch Managers, Employees, and External Clients.' },
      { title: 'Real-Time Operational Dashboards', desc: 'Live data visualizations, KPI metric widgets, revenue graphs, and team activity logs.' },
      { title: 'Automated Billing & Invoice Generation', desc: 'PDF generation, recurring payment gateway links, GST calculations, and receipt tracking.' },
      { title: 'Client Self-Service Portals', desc: 'Secure client login areas to view project status, approve deliverables, and download files.' },
      { title: 'RESTful API & Third-Party Integrations', desc: 'Seamless connections with Razorpay, Stripe, WhatsApp, Google Workspace, and Zapier.' },
      { title: 'Scalable Database Architecture', desc: 'PostgreSQL / Supabase infrastructure optimized for high speed and data reliability.' }
    ],
    techStack: ['React', 'Node.js', 'Express', 'Supabase PostgreSQL', 'Tailwind CSS', 'Docker', 'AWS'],
    timeline: [
      { step: '01', title: 'Requirements Scoping', desc: 'Detailed technical blueprinting, user persona mapping, and database schema design.' },
      { step: '02', title: 'Architecture & UI Mockups', desc: 'Figma wireframes and frontend UI prototyping for all portal screens and user roles.' },
      { step: '03', title: 'Agile Full-Stack Coding', desc: 'Iterative sprint development with regular demo reviews and staging environment testing.' },
      { step: '04', title: 'Deployment & Training', desc: 'Production server provisioning, security auditing, data migration, and team training.' }
    ]
  },

  'landing-pages': {
    id: 'landing-pages',
    title: 'High-Converting Landing Pages',
    tagline: 'Precision marketing landing pages built for max conversion rates and paid ad ROI.',
    icon: TrendingUp,
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
    iconBg: 'bg-amber-600 text-white',
    pricing: '₹3,500 – ₹8,000 per landing page',
    turnaround: '3 – 5 Business Days',
    heroDesc: 'Stop wasting ad spend on low-converting pages. Flowgen engineers high-impact landing pages with persuasive copywriting, clear visual hierarchy, social proof badges, and seamless booking funnels.',
    features: [
      { title: 'Persuasive Sales Copywriting', desc: 'Headline hooks, pain-point addressing, and benefit-driven copy tailored to your offer.' },
      { title: 'A/B Test Ready Architecture', desc: 'Designed for easy variant testing on headlines, CTA buttons, and pricing structures.' },
      { title: 'High-Speed Page Optimization', desc: 'Loads under 800ms to minimize ad bounce rates and maximize Google/Meta ad quality scores.' },
      { title: 'Embedded Video & Micro-Animations', desc: 'Engaging visual micro-interactions, doodle effects, and video testimonial embeds.' },
      { title: '1-Tap WhatsApp & Call CTAs', desc: 'Instant mobile click-to-call and click-to-WhatsApp buttons for immediate lead conversions.' },
      { title: 'Ad Pixel & Analytics Tracking', desc: 'Pre-configured Meta Pixel, Google Tag Manager, and conversion tracking event scripts.' }
    ],
    techStack: ['HTML5', 'Tailwind CSS', 'React', 'Meta Pixel', 'Google Tag Manager', 'Vercel'],
    timeline: [
      { step: '01', title: 'Offer Analysis', desc: 'Analyzing your target audience, core unique selling proposition (USP), and offer stack.' },
      { step: '02', title: 'Conversion Copywriting', desc: 'Drafting high-converting copy headlines, callouts, FAQs, and guarantee sections.' },
      { step: '03', title: 'Visual Build & Micro-Interactions', desc: 'Coding responsive landing page UI with interactive glassmorphism & CTA triggers.' },
      { step: '04', title: 'Pixel Setup & Launch', desc: 'Verifying conversion tracking scripts, connecting custom domain, and launching live.' }
    ]
  },

  'ui-ux-design': {
    id: 'ui-ux-design',
    title: 'UI/UX Design & Brand Strategy',
    tagline: 'World-class visual design systems, sleek glassmorphic interfaces, and micro-interactions.',
    icon: Layers,
    badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
    iconBg: 'bg-rose-600 text-white',
    pricing: 'Custom Design Package Scope',
    turnaround: '5 – 8 Business Days',
    heroDesc: 'Elevate your business brand aesthetics to match top-tier global tech companies. Flowgen crafts custom Figma design systems, modern glassmorphic web aesthetics, brand guidelines, and delightful user micro-interactions.',
    features: [
      { title: 'Figma Design System & Tokens', desc: 'Complete library of typography styles, color palettes, button states, and UI components.' },
      { title: 'User Experience (UX) Audits', desc: 'Analyzing existing site friction points, navigation drop-offs, and usability improvements.' },
      { title: 'Interactive Prototype Demos', desc: 'Clickable Figma prototypes to preview user journeys before a single line of code is written.' },
      { title: 'Glassmorphism & Dark Mode Styles', desc: 'Modern rich aesthetics including ambient glows, backdrop blurs, and sleek dark modes.' },
      { title: 'Custom Vector Illustration & Icons', desc: 'Tailored icon sets, doodle micro-sparkles, and custom brand visual assets.' },
      { title: 'Developer Handoff Specs', desc: 'Pixel-perfect CSS variables, spacing scales, and asset export bundles for clean coding.' }
    ],
    techStack: ['Figma', 'Adobe Illustrator', 'Framer', 'CSS Tokens', 'SVG Animations', 'Lottie'],
    timeline: [
      { step: '01', title: 'Brand Discovery', desc: 'Reviewing your visual brand goals, reference benchmarks, and color palette preferences.' },
      { step: '02', title: 'UX Wireframing', desc: 'Structuring low-fidelity layout wireframes for key page templates and mobile views.' },
      { step: '03', title: 'High-Fidelity UI Design', desc: 'Applying colors, glassmorphism effects, typography, and micro-interactions.' },
      { step: '04', title: 'Clickable Prototype Handoff', desc: 'Delivering final interactive Figma link, design system tokens, and asset exports.' }
    ]
  },

  'case-studies': {
    id: 'case-studies',
    title: 'Client Case Studies & Project Gallery',
    tagline: 'Real business results engineered through Flowgen websites and AI automations.',
    icon: Award,
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    iconBg: 'bg-emerald-600 text-white',
    pricing: 'Verified Client Results',
    turnaround: 'Live Proven System',
    heroDesc: 'Explore how businesses across hospitality, healthcare, fitness, and retail use Flowgen custom web platforms and Meta WhatsApp automations to capture more leads and streamline operations.',
    features: [
      { title: 'Grand Luxe Resort & Spa', desc: 'Custom luxury booking website + WhatsApp AI reservation bot. Result: +42% direct booking conversions.' },
      { title: 'Apex Fitness & Gym Club', desc: 'Fitness portal with interactive BMI calculator & class schedules. Result: 18 new trial signups in week 1.' },
      { title: 'Curry & Spice Gourmet Restaurant', desc: 'Digital QR menu + automated WhatsApp table reservation system. Result: 0 missed table bookings during peak hours.' },
      { title: 'Metro Care Multi-Specialty Clinic', desc: 'Doctor appointment portal with automated SMS/WhatsApp appointment reminders. Result: -35% patient no-shows.' },
      { title: 'Urban Tech E-Commerce Store', desc: 'Catalog landing page with 1-tap WhatsApp checkout catalog. Result: +28% repeat order frequency.' },
      { title: 'Horizon Real Estate Developers', desc: 'Property showcase portal with instant PDF brochure download via WhatsApp. Result: 85 qualified buyer leads in 30 days.' }
    ],
    techStack: ['Full-Stack Web', 'WhatsApp API', 'Supabase', 'CRM Integration', 'Meta Ads'],
    timeline: [
      { step: '01', title: 'Problem Identification', desc: 'Analyzing the client operational bottlenecks and lost revenue opportunities.' },
      { step: '02', title: 'Custom Solution Architecture', desc: 'Designing high-converting website and automated WhatsApp messaging workflows.' },
      { step: '03', title: 'Rapid 7-Day Implementation', desc: 'Coding, testing, and deploying live production system with zero downtime.' },
      { step: '04', title: 'Continuous Managed Growth', desc: 'Ongoing monthly analytics tracking, template optimization, and maintenance.' }
    ]
  },

  'privacy-policy': {
    id: 'privacy-policy',
    title: 'Privacy Policy',
    tagline: 'Flowgen AI data protection, privacy guidelines, and user confidentiality commitment.',
    icon: ShieldCheck,
    badgeColor: 'bg-slate-100 text-slate-700 border-slate-200',
    iconBg: 'bg-slate-900 text-white',
    pricing: 'Legal Compliance',
    turnaround: 'Effective Aug 2026',
    heroDesc: 'At Flowgen, we take your privacy and data security seriously. This document outlines how we collect, store, process, and protect your personal information and client database records when using our website development services and CRM workspace.',
    features: [
      { title: 'Information We Collect', desc: 'Name, email address, phone number, business details, and form inputs submitted through our contact forms.' },
      { title: 'How Data is Used', desc: 'To provide digital development services, send project updates, process consultation requests, and power your CRM pipeline.' },
      { title: 'Data Security & Storage', desc: 'All data is encrypted in transit via SSL/TLS and stored securely using industry-standard cloud database infrastructure.' },
      { title: 'No Third-Party Selling', desc: 'We do not sell, rent, or trade your personal data or client leads to third-party marketing companies under any circumstances.' },
      { title: 'Meta WhatsApp API Compliance', desc: 'WhatsApp API integration follows official Meta Cloud API privacy standards and data protection guidelines.' },
      { title: 'Your Data Rights', desc: 'You have the right to request access, correction, or complete deletion of your stored account data at any time.' }
    ],
    techStack: ['GDPR Compliant', 'HTTPS SSL Encryption', 'Meta API Security', 'Encrypted Database'],
    timeline: [
      { step: '01', title: 'Collection', desc: 'We collect minimal necessary business info required to fulfill your project requests.' },
      { step: '02', title: 'Encryption', desc: 'Data is protected using 256-bit SSL encryption across all web endpoints.' },
      { step: '03', title: 'Storage', desc: 'Stored safely in cloud database infrastructure under strict access control.' },
      { step: '04', title: 'Control', desc: 'You maintain 100% ownership and control over your customer lead database.' }
    ]
  },

  'terms-of-service': {
    id: 'terms-of-service',
    title: 'Terms of Service',
    tagline: 'Terms, conditions, and service delivery agreements for Flowgen client projects.',
    icon: FileText,
    badgeColor: 'bg-slate-100 text-slate-700 border-slate-200',
    iconBg: 'bg-slate-900 text-white',
    pricing: 'Legal Terms',
    turnaround: 'Effective Aug 2026',
    heroDesc: 'These Terms of Service govern your use of the Flowgen website, development services, and CRM software. By engaging Flowgen for web development, AI automation, or WhatsApp API setup, you agree to these terms.',
    features: [
      { title: 'Scope of Services', desc: 'Flowgen provides website development, AI workflow automation, Meta WhatsApp API setups, and software engineering as outlined in client proposals.' },
      { title: 'Payment Terms & Indian Rupee Pricing', desc: 'Fees are specified in project quotes (e.g. ₹4,050/mo Basic, ₹6,750/mo Starter). Monthly retainers are billed in advance.' },
      { title: 'Intellectual Property Ownership', desc: 'Upon full payment, clients hold ownership of custom website code, brand assets, and customer database records.' },
      { title: 'Service Level Agreement (SLA)', desc: 'Flowgen strives for 99.8% system uptime for hosted web services and automated Meta WhatsApp workflows.' },
      { title: 'Client Responsibilities', desc: 'Clients must provide timely feedback, approved branding content, and necessary Meta account permissions.' },
      { title: 'Limitation of Liability', desc: 'Flowgen is committed to high-quality code delivery and managed support as outlined in your project proposal.' }
    ],
    techStack: ['Legal Framework', 'Service Level Agreement', 'Meta Partner Compliance'],
    timeline: [
      { step: '01', title: 'Agreement', desc: 'Reviewing scope and accepting proposal terms prior to development kickoff.' },
      { step: '02', title: 'Execution', desc: 'Delivering design mockups and code iterations as scheduled.' },
      { step: '03', title: 'Approval', desc: 'Client review and sign-off prior to production website launch.' },
      { step: '04', title: 'Support', desc: 'Ongoing managed support according to selected plan retainer.' }
    ]
  }
};

export const ServiceDetailPage = ({ serviceId, onClose, onSelectServiceForForm }) => {
  const service = SERVICE_DETAILS[serviceId] || SERVICE_DETAILS['business-websites'];
  const IconComponent = service.icon;

  const handleBookConsultation = () => {
    onClose();
    if (onSelectServiceForForm) {
      onSelectServiceForForm(service.title);
    }
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white text-slate-900 w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden relative my-auto max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="p-5 sm:p-8 bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 text-white relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Close detail modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className={`p-3 rounded-2xl ${service.iconBg} shadow-lg shrink-0`}>
                <IconComponent className="w-6 h-6" />
              </div>
              <div>
                <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider mb-1 ${service.badgeColor}`}>
                  Flowgen Service Page
                </span>
                <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight">{service.title}</h2>
              </div>
            </div>

            <div className="flex items-center space-x-3 shrink-0">
              <div className="text-left sm:text-right hidden sm:block">
                <p className="text-[10px] text-slate-400 font-mono uppercase">Turnaround</p>
                <p className="text-xs font-bold text-emerald-400">{service.turnaround}</p>
              </div>
              <button
                onClick={handleBookConsultation}
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg flex items-center space-x-1.5 transition-all active:scale-95"
              >
                <span>Book This Service</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Modal Content Scroll Area */}
        <div className="p-5 sm:p-8 overflow-y-auto space-y-8 flex-1 text-xs">
          {/* Tagline & Hero Description */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <h4 className="font-extrabold text-sm sm:text-base text-slate-900">{service.tagline}</h4>
            <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">{service.heroDesc}</p>
            <div className="pt-2 flex flex-wrap items-center gap-4 text-slate-500 font-semibold text-[11px]">
              <span className="flex items-center space-x-1 text-blue-600">
                <Zap className="w-4 h-4 fill-current" />
                <span>Price: {service.pricing}</span>
              </span>
              <span className="flex items-center space-x-1 text-emerald-600">
                <Clock className="w-4 h-4" />
                <span>Delivery: {service.turnaround}</span>
              </span>
              <span className="flex items-center space-x-1 text-indigo-600">
                <ShieldCheck className="w-4 h-4" />
                <span>Managed Support Included</span>
              </span>
            </div>
          </div>

          {/* Key Capabilities Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-slate-900 text-base flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>Core Deliverables & Capabilities</span>
              </h3>
              <span className="text-[10px] font-mono text-slate-400">6 Key Modules</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {service.features.map((feat, idx) => (
                <div key={idx} className="p-4.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between h-full space-y-2">
                  <div className="flex items-start space-x-3">
                    <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 shrink-0 mt-0.5 border border-emerald-100">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{feat.title}</h4>
                      <p className="text-[11px] text-slate-500 leading-normal mt-0.5">{feat.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Development Timeline Journey */}
          {service.timeline && service.timeline.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-extrabold text-slate-900 text-base flex items-center space-x-2">
                <Clock className="w-4 h-4 text-indigo-600" />
                <span>Step-by-Step Delivery Process</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                {service.timeline.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5 flex flex-col justify-between h-full relative group hover:bg-slate-100/80 transition-colors">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="px-2 py-0.5 rounded-md bg-blue-600 text-white font-mono text-[10px] font-extrabold shadow-2xs">
                          Step {item.step}
                        </span>
                        <span className="text-[9px] font-mono text-slate-400 font-semibold">Phase {idx + 1}</span>
                      </div>
                      <h5 className="font-bold text-slate-900 text-xs">{item.title}</h5>
                      <p className="text-[11px] text-slate-500 leading-snug mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech Stack Badges */}
          {service.techStack && (
            <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center space-x-2">
                <Code className="w-4 h-4 text-blue-400" />
                <span className="font-bold text-xs">Technologies Used:</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {service.techStack.map((tech, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200 font-mono text-[10px] font-semibold border border-slate-700">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer CTA */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center space-x-2 text-slate-500 text-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Founding Engineer: <strong>VENKAT PRAVEEN</strong> • Flowgen</span>
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-100 transition-colors"
            >
              Close Page
            </button>
            <button
              onClick={handleBookConsultation}
              className="flex-1 sm:flex-initial px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-md transition-all active:scale-95"
            >
              <span>Schedule Consultation</span>
              <ArrowRight className="w-4 h-4 text-blue-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
