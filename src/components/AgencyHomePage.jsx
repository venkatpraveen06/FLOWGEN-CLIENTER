import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Globe,
  Code,
  TrendingUp,
  MessageSquare,
  CheckCircle2,
  Lock,
  ChevronDown,
  ChevronRight,
  Check,
  CheckCheck,
  Calendar,
  Phone,
  Mail,
  User,
  Star,
  Zap,
  Building2,
  Utensils,
  Stethoscope,
  Dumbbell,
  Laptop,
  Layers,
  Send,
  HelpCircle,
  Clock,
  Activity,
  Award,
  CircleCheck,
  Menu,
  X,
  FileText
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { FlowGenLogo } from './FlowGenLogo';
import { ServiceDetailPage } from './ServiceDetailPage';

export const AgencyHomePage = ({ onNavigateAdmin }) => {
  const { userProfile, addLead } = useApp();
  const curr = userProfile.currencySymbol || '₹';

  // Mobile Navigation & Service Detail Page Modal State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(0);
  const [activeServiceModal, setActiveServiceModal] = useState(null);

  // REALISTIC STEP-BY-STEP WHATSAPP CHAT ANIMATION ENGINE
  const [chatStep, setChatStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [userCustomInput, setUserCustomInput] = useState('');
  const chatScrollRef = useRef(null);

  const initialScript = [
    { id: 1, text: "Hi there! Welcome to Flowgen. What digital solutions are you looking for today?", sender: "bot", time: "9:41 AM" },
    { id: 2, text: "I want an automated WhatsApp AI booking engine for my business.", sender: "user", time: "9:41 AM", status: "read" },
    { id: 3, text: "Awesome! We engineer official Meta-certified WhatsApp flows live in 5–7 days. Select your sector below:", sender: "bot", time: "9:42 AM" },
    { id: 4, text: "🍽️ Restaurant Table Booking System", sender: "user", time: "9:42 AM", status: "read" },
    { id: 5, text: "Perfect! Meeting slot reserved with Founder VENKAT PRAVEEN for today at 4:00 PM.", sender: "bot", time: "9:43 AM" }
  ];

  const [visibleMessages, setVisibleMessages] = useState([initialScript[0]]);

  // Realistic step-by-step chat progression sequence
  useEffect(() => {
    let timer;
    if (chatStep === 0) {
      timer = setTimeout(() => {
        setVisibleMessages(prev => [...prev, initialScript[1]]);
        setChatStep(1);
      }, 1200);
    } else if (chatStep === 1) {
      timer = setTimeout(() => {
        setIsTyping(true);
        setChatStep(2);
      }, 1000);
    } else if (chatStep === 2) {
      timer = setTimeout(() => {
        setIsTyping(false);
        setVisibleMessages(prev => [...prev, initialScript[2]]);
        setChatStep(3);
      }, 1500);
    } else if (chatStep === 3) {
      timer = setTimeout(() => {
        setVisibleMessages(prev => [...prev, initialScript[3]]);
        setChatStep(4);
      }, 1500);
    } else if (chatStep === 4) {
      timer = setTimeout(() => {
        setIsTyping(true);
        setChatStep(5);
      }, 1000);
    } else if (chatStep === 5) {
      timer = setTimeout(() => {
        setIsTyping(false);
        setVisibleMessages(prev => [...prev, initialScript[4]]);
        setChatStep(6);
      }, 1500);
    } else if (chatStep === 6) {
      timer = setTimeout(() => {
        setVisibleMessages([initialScript[0]]);
        setChatStep(0);
      }, 6000);
    }
    return () => clearTimeout(timer);
  }, [chatStep]);

  // Auto-scroll chat body on new message
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [visibleMessages, isTyping]);

  // Send custom visitor message in mockup
  const handleSendCustomMessage = (e) => {
    e.preventDefault();
    if (!userCustomInput.trim()) return;

    const newMsg = {
      id: Date.now(),
      text: userCustomInput,
      sender: "user",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: "read"
    };

    setVisibleMessages(prev => [...prev, newMsg]);
    setUserCustomInput('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setVisibleMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          text: `Thank you! Our technical team under Founder VENKAT PRAVEEN will reach out right away.`,
          sender: "bot",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 1400);
  };

  // Form State
  const [form, setForm] = useState({
    businessName: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    niche: 'Restaurant',
    dealValue: 6750,
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.businessName || !form.contactName) return;

    addLead({
      businessName: form.businessName,
      contactName: form.contactName,
      contactEmail: form.contactEmail,
      contactPhone: form.contactPhone,
      niche: form.niche,
      source: 'website',
      stage: 'new_lead',
      dealValue: Number(form.dealValue) || 6750,
      pricingType: 'retainer',
      projectName: 'WhatsApp Automation & Web Booking System',
      addedBy: 'Website Inbound Inquiry',
      qualification: {
        budgetVerified: true,
        urgencyLevel: 'high',
        aiPitchHook: `Website quote request from ${form.contactName} for ${form.businessName} (${form.niche}).`
      },
      audit: {
        hasWebsite: true,
        notes: form.notes || 'Inbound demo request from Flowgen website.'
      }
    });

    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 }
    });

    setSubmitted(true);
  };

  const faqs = [
    {
      q: "How fast can my WhatsApp automation go live?",
      a: "Our WhatsApp Meta partner workflows go live in 5 to 7 business days after template approvals."
    },
    {
      q: "Are these live working customer dashboards or sample demos?",
      a: "Every project and dashboard preview on Flowgen is a demonstration created to showcase what Flowgen can build for your business."
    },
    {
      q: "Do you provide ongoing monthly support?",
      a: "Yes, we provide fully managed monthly support, hosting management, and Meta API maintenance."
    },
    {
      q: "Can you build custom web software for unique business workflows?",
      a: "Yes, our Enterprise package covers custom web apps, management portals, and internal business tools."
    }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-600 selection:text-white relative overflow-x-hidden">
      {/* Active Service Detail Page Modal */}
      {activeServiceModal && (
        <ServiceDetailPage
          serviceId={activeServiceModal}
          onClose={() => setActiveServiceModal(null)}
          onSelectServiceForForm={(serviceTitle) => setForm(prev => ({ ...prev, niche: serviceTitle, notes: `Consultation for ${serviceTitle}` }))}
        />
      )}

      {/* Ambient Background Blur Motion Orbs */}
      <div className="absolute top-10 left-1/4 w-72 md:w-96 h-72 md:h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none ambient-orb-1" />
      <div className="absolute top-96 right-1/4 w-72 md:w-96 h-72 md:h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none ambient-orb-2" />

      {/* 1. Floating Pill Navbar with Glassmorphism & Mobile Menu Drawer */}
      <div className="fixed top-3 left-0 right-0 z-50 px-3 md:px-4 flex justify-center pointer-events-none">
        <nav className="pointer-events-auto bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-full px-4 md:px-5 py-2.5 md:py-3 shadow-lg flex items-center justify-between w-full max-w-5xl transition-all duration-300">
          <a href="#" className="flex items-center space-x-2">
            <FlowGenLogo className="w-7 h-7" showText={true} />
          </a>

          {/* Desktop Navigation Links with Mega Menu */}
          <div className="hidden md:flex items-center space-x-7 text-xs font-semibold text-slate-700">
            <div
              className="relative py-1"
              onMouseEnter={() => setIsMegaMenuOpen(true)}
              onMouseLeave={() => setIsMegaMenuOpen(false)}
            >
              <button className="flex items-center space-x-1 hover:text-blue-600 transition-colors">
                <span>Services</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {/* Glossy Mega Menu Dropdown */}
              {isMegaMenuOpen && (
                <div className="absolute top-full -left-12 w-[520px] bg-white/98 backdrop-blur-xl border border-slate-200 rounded-2xl p-4 shadow-2xl space-y-3 pt-3 animate-in fade-in zoom-in-95 duration-200">
                  <div className="flex items-center justify-between px-2">
                    <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Our Services & Solutions</p>
                    <span className="text-[9px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">Click to view dedicated page</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => { setIsMegaMenuOpen(false); setActiveServiceModal('business-websites'); }}
                      className="p-2.5 rounded-xl hover:bg-slate-50 flex items-start space-x-3 transition-all hover:translate-x-1 text-left w-full"
                    >
                      <div className="p-2 rounded-lg bg-blue-50 text-blue-600 shrink-0"><Laptop className="w-4 h-4" /></div>
                      <div><h6 className="font-bold text-slate-900 text-xs">Business Websites</h6><p className="text-[10px] text-slate-500">Responsive web platforms</p></div>
                    </button>
                    <button
                      onClick={() => { setIsMegaMenuOpen(false); setActiveServiceModal('ai-automation'); }}
                      className="p-2.5 rounded-xl hover:bg-slate-50 flex items-start space-x-3 transition-all hover:translate-x-1 text-left w-full"
                    >
                      <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600 shrink-0"><Sparkles className="w-4 h-4" /></div>
                      <div><h6 className="font-bold text-slate-900 text-xs">AI Automation</h6><p className="text-[10px] text-slate-500">Automate business tasks</p></div>
                    </button>
                    <button
                      onClick={() => { setIsMegaMenuOpen(false); setActiveServiceModal('whatsapp-automation'); }}
                      className="p-2.5 rounded-xl hover:bg-slate-50 flex items-start space-x-3 transition-all hover:translate-x-1 text-left w-full"
                    >
                      <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 shrink-0"><MessageSquare className="w-4 h-4" /></div>
                      <div><h6 className="font-bold text-slate-900 text-xs">WhatsApp Automation</h6><p className="text-[10px] text-slate-500">Customer engagement</p></div>
                    </button>
                    <button
                      onClick={() => { setIsMegaMenuOpen(false); setActiveServiceModal('custom-software'); }}
                      className="p-2.5 rounded-xl hover:bg-slate-50 flex items-start space-x-3 transition-all hover:translate-x-1 text-left w-full"
                    >
                      <div className="p-2 rounded-lg bg-purple-50 text-purple-600 shrink-0"><Code className="w-4 h-4" /></div>
                      <div><h6 className="font-bold text-slate-900 text-xs">Custom Software</h6><p className="text-[10px] text-slate-500">Business management</p></div>
                    </button>
                    <button
                      onClick={() => { setIsMegaMenuOpen(false); setActiveServiceModal('landing-pages'); }}
                      className="p-2.5 rounded-xl hover:bg-slate-50 flex items-start space-x-3 transition-all hover:translate-x-1 text-left w-full"
                    >
                      <div className="p-2 rounded-lg bg-amber-50 text-amber-600 shrink-0"><TrendingUp className="w-4 h-4" /></div>
                      <div><h6 className="font-bold text-slate-900 text-xs">Landing Pages</h6><p className="text-[10px] text-slate-500">High conversion funnels</p></div>
                    </button>
                    <button
                      onClick={() => { setIsMegaMenuOpen(false); setActiveServiceModal('ui-ux-design'); }}
                      className="p-2.5 rounded-xl hover:bg-slate-50 flex items-start space-x-3 transition-all hover:translate-x-1 text-left w-full"
                    >
                      <div className="p-2 rounded-lg bg-rose-50 text-rose-600 shrink-0"><Layers className="w-4 h-4" /></div>
                      <div><h6 className="font-bold text-slate-900 text-xs">UI/UX Design</h6><p className="text-[10px] text-slate-500">Design systems & brand</p></div>
                    </button>
                  </div>
                </div>
              )}
            </div>

            <a href="#pricing" className="hover:text-blue-600 transition-colors">Pricing</a>
            <button onClick={() => setActiveServiceModal('case-studies')} className="hover:text-blue-600 transition-colors">Case Studies</button>
            <a href="#solutions" className="hover:text-blue-600 transition-colors">Why us</a>
            <a href="#faq" className="hover:text-blue-600 transition-colors">FAQ</a>
          </div>

          {/* Right Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <button
              onClick={onNavigateAdmin}
              className="px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center space-x-1.5 transition-all hover:scale-105 active:scale-95"
            >
              <Lock className="w-3.5 h-3.5 text-blue-600" />
              <span>Admin Portal</span>
            </button>
            <a
              href="#contact"
              className="px-4 py-2 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all shadow-md hover:shadow-lg hover:scale-105 active:scale-95 btn-animated"
            >
              Book a demo
            </a>
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={onNavigateAdmin}
              className="p-2 rounded-full bg-slate-100 text-blue-700 font-bold text-xs"
              title="Admin Portal"
            >
              <Lock className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-full bg-slate-900 text-white"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Navigation Glass Overlay Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white/98 backdrop-blur-2xl p-6 pt-24 space-y-6 flex flex-col justify-between animate-in slide-in-from-top duration-300 md:hidden overflow-y-auto">
          <div className="space-y-4">
            <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">Services & Pages</p>
            <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-100">
              <button onClick={() => { setIsMobileMenuOpen(false); setActiveServiceModal('business-websites'); }} className="p-3 rounded-xl bg-blue-50 text-blue-900 text-left font-bold text-xs">
                Business Websites &rarr;
              </button>
              <button onClick={() => { setIsMobileMenuOpen(false); setActiveServiceModal('ai-automation'); }} className="p-3 rounded-xl bg-indigo-50 text-indigo-900 text-left font-bold text-xs">
                AI Automation &rarr;
              </button>
              <button onClick={() => { setIsMobileMenuOpen(false); setActiveServiceModal('whatsapp-automation'); }} className="p-3 rounded-xl bg-emerald-50 text-emerald-900 text-left font-bold text-xs">
                WhatsApp API &rarr;
              </button>
              <button onClick={() => { setIsMobileMenuOpen(false); setActiveServiceModal('custom-software'); }} className="p-3 rounded-xl bg-purple-50 text-purple-900 text-left font-bold text-xs">
                Custom Software &rarr;
              </button>
            </div>
            <button onClick={() => { setIsMobileMenuOpen(false); setActiveServiceModal('case-studies'); }} className="block w-full text-left text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">Case Studies & Gallery</button>
            <a onClick={() => setIsMobileMenuOpen(false)} href="#solutions" className="block text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">Industry Focus</a>
            <a onClick={() => setIsMobileMenuOpen(false)} href="#pricing" className="block text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">Pricing</a>
            <a onClick={() => setIsMobileMenuOpen(false)} href="#faq" className="block text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">FAQ</a>
            <a onClick={() => setIsMobileMenuOpen(false)} href="#contact" className="block text-lg font-bold text-blue-600 border-b border-slate-100 pb-3">Schedule Consultation</a>
          </div>

          <div className="space-y-3 pt-4 border-t border-slate-200">
            <button
              onClick={() => { setIsMobileMenuOpen(false); onNavigateAdmin(); }}
              className="w-full py-3.5 rounded-2xl bg-slate-100 text-slate-900 font-bold text-sm flex items-center justify-center space-x-2"
            >
              <Lock className="w-4 h-4 text-blue-600" />
              <span>Admin Portal Login</span>
            </button>
            <a
              onClick={() => setIsMobileMenuOpen(false)}
              href="#contact"
              className="w-full py-3.5 rounded-2xl bg-slate-900 text-white font-bold text-sm flex items-center justify-center space-x-2"
            >
              <span>Book a Demo</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}

      {/* 2. Hero Section with Mobile Responsive Container */}
      <section className="pt-28 sm:pt-32 pb-16 md:pb-20 px-4 md:px-8 max-w-6xl mx-auto text-center space-y-6 sm:space-y-8 relative">
        {/* Meta Business Partner Badge */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold shadow-sm cursor-default">
          <svg className="w-4 h-4 text-blue-600 fill-current animate-pulse" viewBox="0 0 24 24">
            <path d="M16.96 4.04C14.87 4.04 13.11 5.37 12 7.05C10.89 5.37 9.13 4.04 7.04 4.04C3.15 4.04 0 7.19 0 11.08C0 16.36 7.6 20.08 11.45 20.91C11.81 20.99 12.19 20.99 12.55 20.91C16.4 20.08 24 16.36 24 11.08C24 7.19 20.85 4.04 16.96 4.04ZM7.04 18.04C4.38 18.04 2.04 15.7 2.04 13.04C2.04 10.38 4.38 8.04 7.04 8.04C9.28 8.04 11.04 9.8 11.04 12.04C11.04 15.35 8.7 18.04 7.04 18.04ZM16.96 18.04C15.3 18.04 12.96 15.35 12.96 12.04C12.96 9.8 14.72 8.04 16.96 8.04C19.62 18.04 21.96 10.38 21.96 13.04C21.96 15.7 19.62 18.04 16.96 18.04Z" />
          </svg>
          <span>Meta Business Partners</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight max-w-4xl mx-auto">
          Turn your <span className="inline-flex items-center px-2 py-0.5 rounded-2xl bg-emerald-100 text-emerald-700 align-middle shadow-sm"><MessageSquare className="w-6 h-6 sm:w-10 sm:h-10 fill-current animate-bounce" /></span> WhatsApp into a
          <div className="gradient-text font-black text-4xl sm:text-7xl pt-2">business engine</div>
        </h1>

        {/* Checkmarks Row */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs font-bold text-slate-700">
          <div className="flex items-center space-x-2">
            <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-sm"><Check className="w-3.5 h-3.5 stroke-[3]" /></span>
            <span>Official Meta partner</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-sm"><Check className="w-3.5 h-3.5 stroke-[3]" /></span>
            <span>Live in 5–7 days</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-sm"><Check className="w-3.5 h-3.5 stroke-[3]" /></span>
            <span>Monthly managed</span>
          </div>
        </div>

        {/* Hero CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2">
          <a
            href="#contact"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs shadow-xl flex items-center justify-center space-x-2 transition-all hover:scale-105 active:scale-95"
          >
            <span>Book a Demo</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <button
            onClick={() => setActiveServiceModal('case-studies')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white hover:bg-slate-100 border border-slate-300 text-slate-900 font-extrabold text-xs shadow-sm flex items-center justify-center space-x-2 transition-all hover:scale-105 active:scale-95"
          >
            <span>View Case Studies & Projects</span>
          </button>
        </div>

        {/* Hero Visual Mobile Responsive Container */}
        <div className="pt-6 sm:pt-10 max-w-4xl mx-auto relative flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">
          {/* Left App Stack Icons */}
          <div className="hidden lg:flex flex-col space-y-4 shrink-0 animate-float">
            <button onClick={() => setActiveServiceModal('business-websites')} className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg hover:rotate-12 transition-transform" title="Business Websites"><Globe className="w-6 h-6" /></button>
            <button onClick={() => setActiveServiceModal('whatsapp-automation')} className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-lg hover:rotate-12 transition-transform" title="WhatsApp API"><MessageSquare className="w-6 h-6" /></button>
            <button onClick={() => setActiveServiceModal('ai-automation')} className="w-12 h-12 rounded-2xl bg-fuchsia-600 text-white flex items-center justify-center shadow-lg hover:rotate-12 transition-transform" title="AI Automation"><Sparkles className="w-6 h-6" /></button>
          </div>

          {/* Center WhatsApp Mockup (Clean Borderless Floating Container) */}
          <div className="w-full max-w-[310px] sm:w-80 rounded-3xl border border-slate-200/80 shadow-2xl shrink-0 text-left overflow-hidden bg-white mx-auto">
            {/* Header */}
            <div className="bg-[#075e54] text-white p-3.5 rounded-t-3xl flex items-center space-x-3 shadow">
              {/* WhatsApp DP Avatar with Official FlowGen Logo */}
              <div className="w-9 h-9 rounded-full bg-white border-2 border-white/40 flex items-center justify-center shrink-0 p-1 shadow-md overflow-hidden">
                <FlowGenLogo className="w-7 h-7" showText={false} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-1">
                  <h5 className="font-bold text-xs truncate">Flowgen Official</h5>
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-300 fill-sky-300 text-slate-900 shrink-0" />
                </div>
                <p className="text-[10px] text-emerald-100">
                  {isTyping ? <span className="text-emerald-200 font-semibold animate-pulse">typing...</span> : "online • Meta Partner"}
                </p>
              </div>
            </div>

            {/* Chat Body Wallpaper with Real Animations */}
            <div
              ref={chatScrollRef}
              className="bg-[#efeae2] p-3 space-y-3 h-[270px] sm:h-[290px] max-h-[290px] overflow-y-auto text-[11px] relative shadow-inner scroll-smooth"
            >
              <div className="text-center">
                <span className="px-2 py-0.5 rounded-md bg-white/80 backdrop-blur text-[9px] text-slate-500 font-semibold uppercase shadow-2xs">
                  Today
                </span>
              </div>

              {visibleMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-2.5 rounded-2xl max-w-[88%] shadow-sm transition-all duration-300 transform animate-in fade-in slide-in-from-bottom-2 ${
                    msg.sender === 'user'
                      ? 'ml-auto bg-[#d9fdd3] text-slate-900 rounded-tr-none'
                      : 'bg-white text-slate-900 rounded-tl-none border border-slate-200/60'
                  }`}
                >
                  <p className="leading-snug text-xs">{msg.text}</p>
                  <div className="flex items-center justify-end space-x-1 mt-1">
                    <span className="text-[9px] text-slate-400">{msg.time}</span>
                    {msg.sender === 'user' && (
                      <CheckCheck className="w-3.5 h-3.5 text-[#34b7f1]" />
                    )}
                  </div>
                </div>
              ))}

              {/* Realistic Animated Typing Bubble */}
              {isTyping && (
                <div className="bg-white text-slate-500 p-2.5 rounded-2xl rounded-tl-none max-w-[70px] shadow-sm flex items-center space-x-1 animate-in fade-in slide-in-from-bottom-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              )}
            </div>

            {/* Interactive Live Message Input */}
            <form onSubmit={handleSendCustomMessage} className="p-2.5 bg-slate-100/90 rounded-b-3xl flex items-center space-x-2 border-t border-slate-200/80">
              <input
                type="text"
                value={userCustomInput}
                onChange={(e) => setUserCustomInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-white border border-slate-300 rounded-full px-3 py-1.5 text-[10px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-emerald-600 font-medium"
              />
              <button
                type="submit"
                className="w-7 h-7 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shadow transition-transform active:scale-90 shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

          {/* Right Floating Synchronized Meeting Card */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xl space-y-3 text-left shrink-0 w-full max-w-[280px] sm:w-60 animate-float neumorphic-glow mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="p-2 rounded-xl bg-amber-50 text-amber-600 font-bold">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <h6 className="font-bold text-slate-900 text-xs">Meeting</h6>
                  <p className="text-[10px] text-slate-500">Scheduled</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold animate-pulse">
                Confirmed
              </span>
            </div>
            <div className="border-t border-slate-100 pt-2 text-xs">
              <p className="font-bold text-slate-900">VENKAT PRAVEEN</p>
              <p className="text-[10px] text-slate-500 font-mono">Founder • 4:00 PM</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Trust & Stats Bar with Counter Animation */}
      <section className="bg-slate-50 border-y border-slate-200 py-8 md:py-10 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-center">
          <div className="glass-card p-4 rounded-2xl cursor-pointer" onClick={() => setActiveServiceModal('case-studies')}>
            <div className="text-2xl sm:text-3xl font-black text-blue-600">50+</div>
            <p className="text-[11px] sm:text-xs text-slate-600 font-semibold mt-1">Projects Delivered &rarr;</p>
          </div>
          <div className="glass-card p-4 rounded-2xl">
            <div className="text-2xl sm:text-3xl font-black text-blue-600">99.8%</div>
            <p className="text-[11px] sm:text-xs text-slate-600 font-semibold mt-1">System Uptime</p>
          </div>
          <div className="glass-card p-4 rounded-2xl">
            <div className="text-2xl sm:text-3xl font-black text-blue-600">3x</div>
            <p className="text-[11px] sm:text-xs text-slate-600 font-semibold mt-1">Conversion Growth</p>
          </div>
          <div className="glass-card p-4 rounded-2xl">
            <div className="text-2xl sm:text-3xl font-black text-blue-600">24/7</div>
            <p className="text-[11px] sm:text-xs text-slate-600 font-semibold mt-1">Managed Support</p>
          </div>
        </div>
      </section>

      {/* 4. Services Showcase Grid with Interactive Modal Links */}
      <section id="services" className="py-16 md:py-20 px-4 max-w-6xl mx-auto space-y-10 md:space-y-12">
        <div className="text-center space-y-3">
          <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold font-mono">Capabilities & Services</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Everything Your Business Needs to Scale</h2>
          <p className="text-xs text-slate-500 max-w-2xl mx-auto">
            Click on any service card below to view dedicated deliverables, architecture, timelines, and pricing options.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-6 items-stretch">
          <div
            onClick={() => setActiveServiceModal('business-websites')}
            className="glass-card p-5 sm:p-6 rounded-2xl cursor-pointer hover:-translate-y-1 transition-all group border hover:border-blue-300 flex flex-col justify-between h-full space-y-4"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <Laptop className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-blue-600 group-hover:translate-x-1 transition-transform flex items-center space-x-1">
                  <span>View Details</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
              <h3 className="font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors">Business Website Development</h3>
              <p className="text-xs text-slate-600 leading-relaxed mt-1.5">
                Professional, responsive websites built to generate more leads, showcase your brand, and turn visitors into buyers.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span>Delivery: 5-7 Days</span>
              <span className="text-blue-600 font-bold">Explore &rarr;</span>
            </div>
          </div>

          <div
            onClick={() => setActiveServiceModal('ai-automation')}
            className="glass-card p-5 sm:p-6 rounded-2xl cursor-pointer hover:-translate-y-1 transition-all group border hover:border-indigo-300 flex flex-col justify-between h-full space-y-4"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                  <Sparkles className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-indigo-600 group-hover:translate-x-1 transition-transform flex items-center space-x-1">
                  <span>View Details</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
              <h3 className="font-bold text-base text-slate-900 group-hover:text-indigo-600 transition-colors">AI Automation</h3>
              <p className="text-xs text-slate-600 leading-relaxed mt-1.5">
                Automate repetitive business tasks, customer inquiries, and data pipelines using intelligent custom workflows.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span>Delivery: 7-10 Days</span>
              <span className="text-indigo-600 font-bold">Explore &rarr;</span>
            </div>
          </div>

          <div
            onClick={() => setActiveServiceModal('whatsapp-automation')}
            className="glass-card p-5 sm:p-6 rounded-2xl cursor-pointer hover:-translate-y-1 transition-all group border hover:border-emerald-300 flex flex-col justify-between h-full space-y-4"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-emerald-600 group-hover:translate-x-1 transition-transform flex items-center space-x-1">
                  <span>View Details</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
              <h3 className="font-bold text-base text-slate-900 group-hover:text-emerald-600 transition-colors">WhatsApp Automation</h3>
              <p className="text-xs text-slate-600 leading-relaxed mt-1.5">
                Automate customer communication, instant bookings, inquiry replies, and follow-ups directly inside WhatsApp.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span>Meta Partner API</span>
              <span className="text-emerald-600 font-bold">Explore &rarr;</span>
            </div>
          </div>

          <div
            onClick={() => setActiveServiceModal('custom-software')}
            className="glass-card p-5 sm:p-6 rounded-2xl cursor-pointer hover:-translate-y-1 transition-all group border hover:border-purple-300 flex flex-col justify-between h-full space-y-4"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                  <Code className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-purple-600 group-hover:translate-x-1 transition-transform flex items-center space-x-1">
                  <span>View Details</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
              <h3 className="font-bold text-base text-slate-900 group-hover:text-purple-600 transition-colors">Custom Business Software</h3>
              <p className="text-xs text-slate-600 leading-relaxed mt-1.5">
                Tailored web applications, internal dashboards, and custom management platforms engineered for unique operational needs.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span>Enterprise Scope</span>
              <span className="text-purple-600 font-bold">Explore &rarr;</span>
            </div>
          </div>

          <div
            onClick={() => setActiveServiceModal('landing-pages')}
            className="glass-card p-5 sm:p-6 rounded-2xl cursor-pointer hover:-translate-y-1 transition-all group border hover:border-amber-300 flex flex-col justify-between h-full space-y-4"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-amber-600 group-hover:translate-x-1 transition-transform flex items-center space-x-1">
                  <span>View Details</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
              <h3 className="font-bold text-base text-slate-900 group-hover:text-amber-600 transition-colors">Landing Pages</h3>
              <p className="text-xs text-slate-600 leading-relaxed mt-1.5">
                High-converting marketing landing pages designed with sharp copy, fast speeds, and optimized CTA flows.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span>Delivery: 3-5 Days</span>
              <span className="text-amber-600 font-bold">Explore &rarr;</span>
            </div>
          </div>

          <div
            onClick={() => setActiveServiceModal('ui-ux-design')}
            className="glass-card p-5 sm:p-6 rounded-2xl cursor-pointer hover:-translate-y-1 transition-all group border hover:border-rose-300 flex flex-col justify-between h-full space-y-4"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
                  <Layers className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-rose-600 group-hover:translate-x-1 transition-transform flex items-center space-x-1">
                  <span>View Details</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
              <h3 className="font-bold text-base text-slate-900 group-hover:text-rose-600 transition-colors">UI/UX Design</h3>
              <p className="text-xs text-slate-600 leading-relaxed mt-1.5">
                Modern user experience and interface design crafted to give your business an enterprise-grade digital presence.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span>Figma System</span>
              <span className="text-rose-600 font-bold">Explore &rarr;</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Industry Focus Section */}
      <section id="solutions" className="py-16 md:py-20 px-4 bg-slate-50 border-t border-slate-200">
        <div className="max-w-6xl mx-auto space-y-10 md:space-y-12">
          <div className="text-center space-y-3">
            <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold font-mono">Industry Focus</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Tailored Solutions for Key Business Sectors</h2>
            <p className="text-xs text-slate-500">Discover how Flowgen solves real digital and operational challenges across top industries.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            <div className="glass-card p-5 sm:p-6 rounded-2xl space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-rose-50 text-rose-600"><Utensils className="w-5 h-5" /></div>
                <h4 className="font-bold text-slate-900 text-base">Restaurants</h4>
              </div>
              <div className="space-y-1 text-xs">
                <p className="font-bold text-slate-800">Problem:</p>
                <p className="text-slate-500">Missed table booking calls during peak dining hours.</p>
              </div>
              <div className="space-y-1 text-xs">
                <p className="font-bold text-blue-700">Solution:</p>
                <p className="text-slate-700 font-medium">Digital Menu Website + Instant WhatsApp Table Booking.</p>
              </div>
            </div>

            <div className="glass-card p-5 sm:p-6 rounded-2xl space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-cyan-50 text-cyan-600"><Stethoscope className="w-5 h-5" /></div>
                <h4 className="font-bold text-slate-900 text-base">Clinics</h4>
              </div>
              <div className="space-y-1 text-xs">
                <p className="font-bold text-slate-800">Problem:</p>
                <p className="text-slate-500">Overwhelmed reception staff handling patient call volumes.</p>
              </div>
              <div className="space-y-1 text-xs">
                <p className="font-bold text-blue-700">Solution:</p>
                <p className="text-slate-700 font-medium">Online appointment booking with doctor schedule sync.</p>
              </div>
            </div>

            <div className="glass-card p-5 sm:p-6 rounded-2xl space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600"><Dumbbell className="w-5 h-5" /></div>
                <h4 className="font-bold text-slate-900 text-base">Gyms</h4>
              </div>
              <div className="space-y-1 text-xs">
                <p className="font-bold text-slate-800">Problem:</p>
                <p className="text-slate-500">Low conversion rates on membership trial signups.</p>
              </div>
              <div className="space-y-1 text-xs">
                <p className="font-bold text-blue-700">Solution:</p>
                <p className="text-slate-700 font-medium">Fitness portal with interactive BMI calculator & class schedules.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. 7-Step Methodology Journey Timeline */}
      <section className="py-16 md:py-20 px-4 max-w-6xl mx-auto space-y-10 md:space-y-12">
        <div className="text-center space-y-3">
          <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold font-mono">Methodology</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Our 7-Step Development Journey</h2>
          <p className="text-xs text-slate-500">A transparent timeline from discovery to long-term post-launch support.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {["Discovery", "Planning", "UI Design", "Development", "Testing", "Launch", "Support"].map((step, idx) => (
            <div key={idx} className="glass-card p-4 rounded-2xl text-center space-y-2 group">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                {idx + 1}
              </div>
              <h5 className="font-bold text-xs text-slate-900">{step}</h5>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Transparent Pricing Grid (Indian Rupees) */}
      <section id="pricing" className="py-16 md:py-20 px-4 bg-slate-50 border-t border-slate-200">
        <div className="max-w-6xl mx-auto space-y-10 md:space-y-12">
          <div className="text-center space-y-3">
            <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold font-mono">Pricing</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Transparent Indian Rupee Pricing</h2>
            <p className="text-xs text-slate-500">Select the plan that aligns best with your business growth goals in India.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <h3 className="font-extrabold text-lg text-slate-900">Basic Plan</h3>
                <div className="text-3xl font-black text-slate-900 font-mono">
                  {curr}4,050<span className="text-xs text-slate-500 font-sans font-normal">/ month</span>
                </div>
                <p className="text-xs text-slate-500 border-b border-slate-100 pb-3">Plan includes 1 user. Extra user: {curr}999 per month.</p>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-blue-600" /><span>Team Inbox</span></li>
                  <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-blue-600" /><span>Broadcasting Interface</span></li>
                  <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-blue-600" /><span>Broadcast Analytics</span></li>
                  <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-blue-600" /><span>WhatsApp Templates & Flows</span></li>
                </ul>
              </div>
              <a href="#contact" className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs text-center block transition-all">Book a demo</a>
            </div>

            <div className="glass-card p-6 sm:p-8 rounded-3xl border-2 border-blue-600 shadow-xl flex flex-col justify-between space-y-6 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-bold shadow">
                Most Popular
              </div>
              <div className="space-y-4">
                <h3 className="font-extrabold text-lg text-slate-900">Starter Plan</h3>
                <div className="text-3xl font-black text-blue-600 font-mono">
                  {curr}6,750<span className="text-xs text-slate-500 font-sans font-normal">/ month</span>
                </div>
                <p className="text-xs text-slate-500 border-b border-slate-100 pb-3">Plan includes 1 user. Extra user: {curr}999 per month.</p>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-blue-600" /><span>All features in Basic, plus</span></li>
                  <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-blue-600" /><span>20 WhatsApp Flows</span></li>
                  <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-blue-600" /><span>Broadcast Scheduler</span></li>
                  <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-blue-600" /><span>E-commerce Catalogs & Orders</span></li>
                </ul>
              </div>
              <a href="#contact" className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs text-center block shadow-lg shadow-blue-600/20 transition-all">Book a demo</a>
            </div>

            <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <h3 className="font-extrabold text-lg text-slate-900">Enterprise / Custom</h3>
                <div className="text-2xl font-extrabold text-slate-900">Let's talk</div>
                <p className="text-xs text-slate-500 border-b border-slate-100 pb-3">Custom users, pricing tailored to your scale.</p>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-blue-600" /><span>All features in Starter, plus</span></li>
                  <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-blue-600" /><span>Advanced AI Chatbot Builder</span></li>
                  <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-blue-600" /><span>Unlimited Workflows</span></li>
                  <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-blue-600" /><span>Developer API & SLA Support</span></li>
                </ul>
              </div>
              <a href="#contact" className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs text-center block transition-all">Book a Call</a>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FAQ Accordion */}
      <section id="faq" className="py-16 md:py-20 px-4 max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold font-mono">FAQ</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Frequently Asked Questions</h2>
          <p className="text-xs text-slate-500">Clear answers regarding Flowgen's website development and AI workflows.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="glass-card rounded-2xl overflow-hidden shadow-sm">
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? -1 : idx)}
                className="w-full p-4 text-left font-bold text-xs sm:text-sm text-slate-900 flex items-center justify-between bg-slate-50/80 hover:bg-slate-100 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeFaq === idx ? 'rotate-180 text-blue-600' : 'text-slate-400'}`} />
              </button>
              {activeFaq === idx && (
                <div className="p-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-white animate-in fade-in duration-300">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 9. Inbound Demo / Consultation Contact Form (Feeds into Real CRM) */}
      <section id="contact" className="py-16 md:py-20 px-4 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto bg-white p-6 sm:p-12 rounded-3xl border border-slate-200 shadow-xl space-y-8 glass-card">
          <div className="text-center space-y-2 border-b border-slate-200 pb-6">
            <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold font-mono">Get Started</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Schedule a Consultation</h2>
            <p className="text-xs text-slate-500">
              Discuss your project directly with Founder <span className="text-slate-900 font-bold">{userProfile.userName || 'VENKAT PRAVEEN'}</span>.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 text-center space-y-4 bg-emerald-50 border border-emerald-200 rounded-2xl animate-in zoom-in duration-300">
              <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto animate-bounce" />
              <h3 className="text-2xl font-bold text-slate-900">Demo Request Submitted!</h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you <span className="font-bold">{form.contactName}</span>! Your request for <span className="font-bold">{form.businessName}</span> has been received. We will contact you within 24 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Business / Company Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Morgan Restaurant"
                    value={form.businessName}
                    onChange={(e) => setForm({ ...form, businessName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600 font-semibold transition-all focus:ring-2 focus:ring-blue-600/20"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Morgan"
                    value={form.contactName}
                    onChange={(e) => setForm({ ...form, contactName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600 font-semibold transition-all focus:ring-2 focus:ring-blue-600/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="alex@company.com"
                    value={form.contactEmail}
                    onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600 transition-all focus:ring-2 focus:ring-blue-600/20"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Phone / WhatsApp Number *</label>
                  <input
                    type="text"
                    required
                    placeholder="+91 98765 43210"
                    value={form.contactPhone}
                    onChange={(e) => setForm({ ...form, contactPhone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600 transition-all focus:ring-2 focus:ring-blue-600/20"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Message / Service Requirements</label>
                <textarea
                  rows={3}
                  placeholder="Tell us about your business requirements..."
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-blue-600 transition-all focus:ring-2 focus:ring-blue-600/20 font-medium"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-lg flex items-center justify-center space-x-2 transition-all hover:scale-[1.01] active:scale-[0.99] btn-animated"
              >
                <span>Submit Demo Request</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </section>

      {/* 10. Multi-Column Footer */}
      <footer className="border-t border-slate-200 py-12 px-4 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 text-xs">
          <div className="sm:col-span-2 space-y-3">
            <FlowGenLogo className="w-8 h-8" textClassName="font-extrabold text-xl text-white tracking-tight" showText={true} />
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Building premium digital experiences through websites, AI automation, WhatsApp automation, and custom software development.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">Services</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li><button onClick={() => setActiveServiceModal('business-websites')} className="hover:text-white transition-colors">Business Websites</button></li>
              <li><button onClick={() => setActiveServiceModal('ai-automation')} className="hover:text-white transition-colors">AI Automation</button></li>
              <li><button onClick={() => setActiveServiceModal('whatsapp-automation')} className="hover:text-white transition-colors">WhatsApp Automation</button></li>
              <li><button onClick={() => setActiveServiceModal('custom-software')} className="hover:text-white transition-colors">Custom Software</button></li>
              <li><button onClick={() => setActiveServiceModal('landing-pages')} className="hover:text-white transition-colors">Landing Pages</button></li>
              <li><button onClick={() => setActiveServiceModal('ui-ux-design')} className="hover:text-white transition-colors">UI/UX Design</button></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">Solutions & Case Studies</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li><button onClick={() => setActiveServiceModal('case-studies')} className="hover:text-white transition-colors">Case Studies</button></li>
              <li><a href="#solutions" className="hover:text-white transition-colors">Restaurants</a></li>
              <li><a href="#solutions" className="hover:text-white transition-colors">Healthcare Clinics</a></li>
              <li><a href="#solutions" className="hover:text-white transition-colors">Fitness & Gyms</a></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">Company & Legal</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
              <li><button onClick={() => setActiveServiceModal('privacy-policy')} className="hover:text-white transition-colors">Privacy Policy</button></li>
              <li><button onClick={() => setActiveServiceModal('terms-of-service')} className="hover:text-white transition-colors">Terms of Service</button></li>
              <li><button onClick={onNavigateAdmin} className="hover:text-blue-400 text-blue-400 font-bold">Admin Portal Login</button></li>
            </ul>
          </div>
        </div>

        <div className="max-w-6xl mx-auto pt-8 border-t border-slate-800 mt-8 text-center text-slate-500 text-[11px] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>&copy; 2026 Flowgen. All rights reserved.</p>
          <p>Founder: <span className="text-slate-300 font-bold">VENKAT PRAVEEN</span></p>
        </div>
      </footer>
    </div>
  );
};
