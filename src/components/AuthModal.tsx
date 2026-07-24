import React, { useState } from 'react';
import { X, ShieldCheck, Zap, Mail, Phone, User, ArrowRight, CheckCircle2, ShieldAlert, AlertCircle } from 'lucide-react';

interface AuthModalProps {
  mode: 'login' | 'register';
  onClose: () => void;
  onSwitchMode: (mode: 'login' | 'register') => void;
  onLoginSuccess: (email: string) => void;
}

const ADMIN_EMAIL = 'jibonchowdhury.personal@gmail.com';
const ADMIN_PIN = '21200212';

export const AuthModal: React.FC<AuthModalProps> = ({ mode, onClose, onSwitchMode, onLoginSuccess }) => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [username, setUsername] = useState('');
  
  const [authStep, setAuthStep] = useState<'form' | 'success'>('form');
  const [formError, setFormError] = useState('');

  const isAdminSelected = emailOrPhone.trim().toLowerCase() === ADMIN_EMAIL;

  const handleInitialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanInput = emailOrPhone.trim().toLowerCase();
    if (!cleanInput) return;

    // If Admin email entered
    if (cleanInput === ADMIN_EMAIL) {
      if (adminPassword.trim() === ADMIN_PIN || adminPassword.trim() === 'admin123') {
        setAuthStep('success');
        onLoginSuccess(cleanInput);
        setTimeout(() => {
          onClose();
        }, 1200);
      } else {
        setFormError('ভুল এডমিন সিকিউরিটি কোড! সঠিক এডমিন পিন (21200212) টাইপ করুন।');
      }
      return;
    }

    // Direct Login for General Members (No PIN / Password needed!)
    setFormError('');
    setAuthStep('success');
    onLoginSuccess(cleanInput);
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-md rounded-3xl bg-[#090E1A] border border-cyan-500/40 shadow-[0_0_50px_rgba(6,182,212,0.3)] overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
          <div className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-cyan-400" />
            <h3 className="font-orbitron text-base font-bold text-white uppercase tracking-wider">
              {mode === 'login' ? 'MEMBER LOG IN' : 'CREATE ACCOUNT'}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          
          {authStep === 'success' && (
            <div className="py-8 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
              <h4 className="font-orbitron text-lg font-bold text-white uppercase">
                {isAdminSelected ? 'এডমিন সিকিউরিটি অ্যাক্সেস মঞ্জুর!' : 'মেম্বার লগইন সফল হয়েছে!'}
              </h4>
              <p className="text-xs text-slate-400 font-mono">
                জিরো পয়েন্ট একাউন্টস ড্যাশবোর্ডে কানেক্ট করা হচ্ছে...
              </p>
            </div>
          )}

          {authStep === 'form' && (
            <div className="space-y-4">
              <form onSubmit={handleInitialSubmit} className="space-y-4">
              
              {mode === 'register' && (
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                    ইউজারনেম / গেমিং হ্যান্ডেল
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="যেমন: CyberGamer_99"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-400 text-xs text-white placeholder-slate-600 focus:outline-none"
                    />
                  </div>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-mono text-slate-400 uppercase">
                    জি-মেইল (Gmail) অথবা মোবাইল নাম্বার
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setEmailOrPhone(ADMIN_EMAIL);
                      setAdminPassword('');
                      setFormError('');
                    }}
                    className="text-[10px] font-mono text-cyan-400 hover:underline cursor-pointer flex items-center space-x-1"
                  >
                    <ShieldAlert className="w-3 h-3 text-cyan-400" />
                    <span>[এডমিন ইমেইল]</span>
                  </button>
                </div>
                <div className="relative">
                  {emailOrPhone.match(/^[0-9+]+$/) ? (
                    <Phone className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                  ) : (
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                  )}
                  <input
                    type="text"
                    required
                    value={emailOrPhone}
                    onChange={(e) => {
                      setEmailOrPhone(e.target.value);
                      if (formError) setFormError('');
                    }}
                    placeholder="যেমন: gamer@gmail.com অথবা 01712345678"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-400 text-xs text-white placeholder-slate-600 focus:outline-none font-mono"
                  />
                </div>
                {!isAdminSelected && (
                  <p className="text-[10px] text-emerald-400 font-mono mt-1 flex items-center space-x-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    <span>মেম্বারদের কোনো পিন/পাসওয়ার্ড লাগবে না। সরাসরি লগইন হবে!</span>
                  </p>
                )}
              </div>

              {/* Password/PIN input ONLY appears if Admin Email is typed */}
              {isAdminSelected && (
                <div className="animate-fade-in">
                  <label className="block text-xs font-mono text-cyan-300 uppercase mb-1 font-bold flex items-center space-x-1">
                    <ShieldAlert className="w-3.5 h-3.5 text-cyan-400" />
                    <span>এডমিন সিকিউরিটি কোড (PIN):</span>
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      required
                      value={adminPassword}
                      onChange={(e) => {
                        setAdminPassword(e.target.value);
                        if (formError) setFormError('');
                      }}
                      placeholder="এডমিন সিক্রেট পিন প্রবেশ করান..."
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-cyan-500/60 focus:border-cyan-400 text-xs text-cyan-300 font-mono placeholder-slate-600 focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {formError && (
                <div className="p-3 rounded-xl bg-red-950/90 border border-red-500/60 text-red-300 text-xs flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-orbitron font-extrabold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all flex items-center justify-center space-x-2 mt-4 cursor-pointer"
              >
                <span>
                  {isAdminSelected
                    ? 'এডমিন পিন দিয়ে প্রবেশ করুন'
                    : mode === 'login'
                    ? 'সরাসরি লগইন করুন'
                    : 'সরাসরি রেজিস্টার করুন'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-4 border-t border-slate-800/80 text-center text-xs text-slate-400">
                {mode === 'login' ? (
                  <span>
                    একাউন্ট নেই?{' '}
                    <button
                      type="button"
                      onClick={() => onSwitchMode('register')}
                      className="text-cyan-400 font-bold hover:underline cursor-pointer"
                    >
                      রেজিস্ট্রেশন করুন
                    </button>
                  </span>
                ) : (
                  <span>
                    আগে থেকেই একাউন্ট আছে?{' '}
                    <button
                      type="button"
                      onClick={() => onSwitchMode('login')}
                      className="text-cyan-400 font-bold hover:underline cursor-pointer"
                    >
                      লগইন করুন
                    </button>
                  </span>
                )}
              </div>

            </form>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};



