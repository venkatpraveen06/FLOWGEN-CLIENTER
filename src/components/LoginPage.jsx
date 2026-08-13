import React, { useState } from 'react';
import {
  Lock,
  UserCheck,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  AlertCircle,
  Home
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { FlowGenLogo } from './FlowGenLogo';

export const LoginPage = ({ onNavigateHome }) => {
  const { login, userProfile, setAppViewMode } = useApp();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGoHome = () => {
    if (onNavigateHome) {
      onNavigateHome();
    } else {
      setAppViewMode('home');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!username.trim() || !password.trim()) {
      setErrorMessage('Please enter your admin username and password.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const res = login(username, password);
      if (!res.success) {
        setErrorMessage(res.error || 'Invalid credentials.');
        setIsLoading(false);
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Top Floating Back to Home Page Button */}
      <div className="absolute top-6 left-6 z-20">
        <button
          onClick={handleGoHome}
          className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow text-slate-700 hover:text-blue-600 text-xs font-bold transition-all hover:scale-[1.02]"
        >
          <ArrowLeft className="w-4 h-4 text-blue-600" />
          <span>Go to Home Page</span>
        </button>
      </div>

      {/* Background Soft Blue Gradients */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Glassmorphic Light Card */}
      <div className="w-full max-w-md relative z-10 bg-white p-8 rounded-3xl border border-slate-200 shadow-2xl space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2 flex flex-col items-center">
          <FlowGenLogo className="w-12 h-12" textClassName="font-extrabold text-2xl text-slate-900 tracking-tight" />

          <div className="pt-2">
            <span className="px-2.5 py-0.5 text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200 rounded-full">
              ADMIN PORTAL
            </span>
            <p className="text-xs text-slate-500 mt-2">
              Client Acquisition Workspace for <span className="text-blue-700 font-semibold">{userProfile.agencyName || 'FlowGen'}</span>
            </p>
          </div>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-700 text-xs font-semibold flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Manual Input Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Admin Username *</label>
            <div className="relative">
              <UserCheck className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter admin username"
                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 font-semibold"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Admin Password *</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full pl-9 pr-10 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-lg shadow-blue-600/20 flex items-center justify-center space-x-2 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
          >
            {isLoading ? (
              <span>Authenticating Admin...</span>
            ) : (
              <>
                <span>Sign In to Admin Workspace</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Go to Home Page Action */}
        <div className="pt-3 border-t border-slate-200 flex flex-col items-center space-y-2">
          <button
            onClick={handleGoHome}
            className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center space-x-2 transition-colors"
          >
            <Home className="w-4 h-4 text-blue-600" />
            <span>Go to Agency Home Page</span>
          </button>

          <div className="flex items-center space-x-1.5 text-[11px] text-slate-400 font-mono pt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Manual Admin Security Access</span>
          </div>
        </div>
      </div>
    </div>
  );
};
