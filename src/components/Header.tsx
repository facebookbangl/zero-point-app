import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ShieldAlert,
  Globe, 
  Menu, 
  X, 
  ChevronDown, 
  User, 
  Sparkles, 
  Zap, 
  Coins, 
  Code, 
  BookOpen, 
  Users, 
  Flame,
  Youtube,
  PlusCircle
} from 'lucide-react';
import { LanguageCode } from '../types';

interface HeaderProps {
  currentLang: LanguageCode;
  onSelectLang: (lang: LanguageCode) => void;
  onOpenAuth: (mode: 'login' | 'register') => void;
  onOpenSellModal: () => void;
  onOpenExtraModal: (tab: 'tutorials' | 'affiliate' | 'api') => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenAdminPanel: () => void;
  userEmail: string | null;
  isAdmin: boolean;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onSelectLang,
  onOpenAuth,
  onOpenSellModal,
  onOpenExtraModal,
  onNavigateSection,
  onOpenAdminPanel,
  userEmail,
  isAdmin,
  onLogout,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  const languages: { code: LanguageCode; label: string; flag: string }[] = [
    { code: 'BN', label: 'বাংলা (BN)', flag: '🇧🇩' },
    { code: 'EN', label: 'English (EN)', flag: '🇺🇸' },
  ];

  const handleNavClick = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    onNavigateSection(sectionId);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-cyan-500/20 bg-[#070B14]/85 backdrop-blur-xl transition-all duration-300">
      {/* Top Banner / Ticker accent line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 animate-pulse" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Subtitle */}
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => handleNavClick('hero')}>
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border border-cyan-400/50 shadow-[0_0_15px_rgba(6,182,212,0.3)] group-hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] group-hover:border-cyan-300 transition-all duration-300">
              <Zap className="w-6 h-6 text-cyan-400 animate-cyan-glow transform group-hover:scale-110 transition-transform" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full animate-ping opacity-75" />
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center space-x-1.5">
                <span className="font-orbitron text-xl font-black tracking-wider text-white uppercase group-hover:text-cyan-300 transition-colors">
                  ZERO POINT
                </span>
                <span className="font-orbitron text-xl font-black tracking-wider text-cyan-400 uppercase">
                  ACCOUNTS
                </span>
              </div>
              <span className="text-[10px] font-rajdhani font-semibold tracking-widest text-slate-400 uppercase flex items-center space-x-1">
                <Sparkles className="w-2.5 h-2.5 text-cyan-400 inline" />
                <span>AI GAMING COMMERCE</span>
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6 text-xs font-semibold uppercase tracking-wider text-slate-300">
            <button
              onClick={() => handleNavClick('hero')}
              className="hover:text-cyan-400 transition-colors py-2 relative group"
            >
              হোম
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-cyan-400 group-hover:w-full transition-all duration-300" />
            </button>

            <button
              onClick={() => handleNavClick('vault')}
              className="hover:text-cyan-400 transition-colors py-2 relative group flex items-center space-x-1"
            >
              <span>মার্কেটপ্লেস</span>
              <span className="px-1.5 py-0.5 text-[9px] font-mono bg-cyan-500/20 text-cyan-300 rounded border border-cyan-500/30">
                ৭০০+
              </span>
            </button>

            <button
              onClick={() => handleNavClick('customer-reviews')}
              className="hover:text-cyan-400 transition-colors py-2 relative group flex items-center space-x-1"
            >
              <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>রিভিউ</span>
            </button>

            <button
              onClick={() => handleNavClick('how-it-works')}
              className="hover:text-cyan-400 transition-colors py-2 relative group"
            >
              যেভাবে কাজ করে
            </button>

            <a
              href="https://www.youtube.com/@freefireidbuyandsellbangladesh"
              target="_blank"
              rel="noreferrer"
              className="hover:text-red-400 text-red-400 transition-colors py-2 relative group flex items-center space-x-1 font-bold"
            >
              <Youtube className="w-4 h-4 text-red-500" />
              <span>ইউটিউব চ্যানেল</span>
            </a>

            <button
              onClick={() => onOpenExtraModal('tutorials')}
              className="hover:text-cyan-400 transition-colors py-2 relative group flex items-center space-x-1"
            >
              <BookOpen className="w-3.5 h-3.5 text-blue-400" />
              <span>টিউটোরিয়াল</span>
            </button>

            <button
              onClick={() => onOpenExtraModal('affiliate')}
              className="hover:text-cyan-400 transition-colors py-2 relative group flex items-center space-x-1"
            >
              <Users className="w-3.5 h-3.5 text-purple-400" />
              <span>অ্যাফিলিয়েট</span>
            </button>

            <button
              onClick={onOpenSellModal}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-orbitron font-extrabold text-xs uppercase shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all duration-300 flex items-center space-x-1.5 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-slate-950 fill-emerald-300" />
              <span>পোস্ট করুন (SELL ID)</span>
            </button>

            <button
              onClick={onOpenAdminPanel}
              className="px-3 py-1.5 rounded-lg bg-cyan-950/90 border border-cyan-400/70 text-cyan-300 hover:text-white hover:bg-cyan-500/20 hover:border-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all duration-300 flex items-center space-x-1.5 font-bold cursor-pointer"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-cyan-400" />
              <span>এডমিন প্যানেল (PIN)</span>
            </button>
          </nav>

          {/* Right Action Controls */}
          <div className="hidden md:flex items-center space-x-3">
            
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-700/60 hover:border-cyan-500/50 text-xs font-semibold text-slate-300 hover:text-white transition-all"
              >
                <Globe className="w-3.5 h-3.5 text-cyan-400" />
                <span>{currentLang}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {isLangDropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 rounded-xl bg-slate-900 border border-cyan-500/30 shadow-2xl py-1 z-50 backdrop-blur-2xl">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        onSelectLang(lang.code);
                        setIsLangDropdownOpen(false);
                      }}
                      className={`w-full flex items-center space-x-2 px-3 py-2 text-xs text-left hover:bg-cyan-500/10 hover:text-cyan-300 transition-colors ${
                        currentLang === lang.code ? 'text-cyan-400 font-bold bg-cyan-500/10' : 'text-slate-300'
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Auth or Profile Status */}
            {userEmail ? (
              <div className="flex items-center space-x-2.5 bg-slate-950/90 border border-slate-800 p-1.5 pl-2.5 rounded-xl">
                <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-400/60 flex items-center justify-center text-cyan-300 font-bold text-xs">
                  {userEmail[0].toUpperCase()}
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[11px] font-mono text-white max-w-[130px] truncate">{userEmail}</span>
                  <span className="text-[9px] font-mono font-bold text-cyan-400 uppercase">
                    {isAdmin ? '⚡ ADMIN' : 'MEMBER'}
                  </span>
                </div>
                <button
                  onClick={onLogout}
                  className="px-2 py-1 rounded-lg bg-slate-900 hover:bg-red-950 hover:text-red-300 border border-slate-800 hover:border-red-500/40 text-[10px] font-mono text-slate-400 transition-all"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => onOpenAuth('login')}
                  className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-cyan-300 transition-colors hover:bg-slate-800/50"
                >
                  Login
                </button>

                <button
                  onClick={() => onOpenAuth('register')}
                  className="relative group overflow-hidden rounded-xl p-[1px] font-bold text-xs uppercase tracking-wider focus:outline-none"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-xl group-hover:opacity-100 transition-opacity" />
                  <span className="relative block px-5 py-2 rounded-[11px] bg-[#070B14] group-hover:bg-transparent text-white group-hover:text-black font-orbitron transition-colors duration-300 shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                    Register
                  </span>
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-900 border border-cyan-500/30 text-cyan-400 hover:bg-slate-800 focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-b border-cyan-500/20 bg-[#070B14]/95 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-3">
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onOpenSellModal();
            }}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-orbitron font-extrabold text-xs uppercase shadow-[0_0_20px_rgba(16,185,129,0.4)] flex items-center justify-center space-x-2"
          >
            <PlusCircle className="w-4 h-4 fill-emerald-300" />
            <span>পোস্ট করুন (POST / SELL ID)</span>
          </button>

          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-800">
            <button
              onClick={() => handleNavClick('hero')}
              className="text-left px-3 py-2 rounded-lg bg-slate-900/60 text-xs font-bold uppercase text-slate-200 hover:text-cyan-400"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('vault')}
              className="text-left px-3 py-2 rounded-lg bg-slate-900/60 text-xs font-bold uppercase text-slate-200 hover:text-cyan-400"
            >
              Marketplace
            </button>
            <button
              onClick={() => handleNavClick('recent-sales')}
              className="text-left px-3 py-2 rounded-lg bg-slate-900/60 text-xs font-bold uppercase text-slate-200 hover:text-cyan-400"
            >
              Recent Sales
            </button>
            <button
              onClick={() => handleNavClick('how-it-works')}
              className="text-left px-3 py-2 rounded-lg bg-slate-900/60 text-xs font-bold uppercase text-slate-200 hover:text-cyan-400"
            >
              How It Works
            </button>
            <a
              href="https://www.youtube.com/@freefireidbuyandsellbangladesh"
              target="_blank"
              rel="noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-left px-3 py-2 rounded-lg bg-red-950/50 border border-red-500/40 text-xs font-bold uppercase text-red-300 flex items-center space-x-2"
            >
              <Youtube className="w-4 h-4 text-red-500" />
              <span>YouTube Channel</span>
            </a>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenExtraModal('tutorials');
              }}
              className="text-left px-3 py-2 rounded-lg bg-slate-900/60 text-xs font-bold uppercase text-slate-200 hover:text-cyan-400"
            >
              Tutorials
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenExtraModal('affiliate');
              }}
              className="text-left px-3 py-2 rounded-lg bg-slate-900/60 text-xs font-bold uppercase text-slate-200 hover:text-cyan-400"
            >
              Affiliate
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenExtraModal('api');
              }}
              className="text-left px-3 py-2 rounded-lg bg-slate-900/60 text-xs font-bold uppercase text-slate-200 hover:text-cyan-400"
            >
              API Docs
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenSellModal();
              }}
              className="text-left px-3 py-2 rounded-lg bg-purple-900/30 border border-purple-500/40 text-xs font-bold uppercase text-purple-300"
            >
              Sell Account
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenAdminPanel();
              }}
              className="text-left px-3 py-2 rounded-lg bg-cyan-950 border border-cyan-400/50 text-xs font-bold uppercase text-cyan-300 cursor-pointer"
            >
              Admin Panel (PIN)
            </button>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => onSelectLang(lang.code)}
                  className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                    currentLang === lang.code ? 'bg-cyan-500 text-black' : 'bg-slate-900 text-slate-300'
                  }`}
                >
                  {lang.code}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-2">
              {userEmail ? (
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-mono text-cyan-300 truncate max-w-[100px]">{userEmail}</span>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onLogout();
                    }}
                    className="px-3 py-1.5 rounded-lg bg-red-950 text-red-300 border border-red-500/40 text-xs font-bold"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onOpenAuth('login');
                    }}
                    className="px-4 py-2 rounded-lg bg-slate-900 text-xs font-bold text-slate-300"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onOpenAuth('register');
                    }}
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-xs font-bold text-black"
                  >
                    Register
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
