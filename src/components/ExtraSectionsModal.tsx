import React from 'react';
import { X, BookOpen, Users, Code, CheckCircle2, Copy, Sparkles, ExternalLink, Youtube } from 'lucide-react';

interface ExtraSectionsModalProps {
  activeTab: 'tutorials' | 'affiliate' | 'api' | null;
  onClose: () => void;
}

export const ExtraSectionsModal: React.FC<ExtraSectionsModalProps> = ({ activeTab, onClose }) => {
  if (!activeTab) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-2xl rounded-3xl bg-[#090E1A] border border-cyan-500/40 shadow-[0_0_50px_rgba(6,182,212,0.3)] overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
          <div className="flex items-center space-x-2">
            {activeTab === 'tutorials' && <BookOpen className="w-5 h-5 text-blue-400" />}
            {activeTab === 'affiliate' && <Users className="w-5 h-5 text-purple-400" />}
            {activeTab === 'api' && <Code className="w-5 h-5 text-emerald-400" />}

            <h3 className="font-orbitron text-base font-bold text-white uppercase tracking-wider">
              {activeTab === 'tutorials' && 'TUTORIALS & BUYER SAFETY'}
              {activeTab === 'affiliate' && 'AFFILIATE PROGRAM (15% REVENUE SHARE)'}
              {activeTab === 'api' && 'DEVELOPER INSTANT DELIVERY API'}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          
          {activeTab === 'tutorials' && (
            <div className="space-y-4 text-xs">
              
              {/* Official YouTube Channel Card */}
              <a
                href="https://www.youtube.com/@freefireidbuyandsellbangladesh"
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-xl bg-gradient-to-r from-red-950/60 via-slate-950 to-slate-950 border border-red-500/50 hover:border-red-400 transition-all flex items-center justify-between group shadow-[0_0_20px_rgba(239,68,68,0.2)]"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 rounded-lg bg-red-600/30 border border-red-500/60">
                    <Youtube className="w-6 h-6 text-red-500 group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <div className="font-orbitron font-bold text-white text-xs group-hover:text-red-300 flex items-center space-x-2">
                      <span>অফিশিয়াল ইউটিউব চ্যানেল</span>
                      <span className="text-[9px] font-mono bg-red-500/20 text-red-300 px-1.5 py-0.5 rounded border border-red-500/40">SUBSCRIBE</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      সবগুলো ফ্রি ফায়ার আইডির লাইব ভিডিও রিভিউ ও একাউন্ট কেনাবেচার গাইড টিউটোরিয়াল দেখতে ভিজিট করুন
                    </p>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-red-400 shrink-0" />
              </a>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="font-orbitron font-bold text-cyan-300">1. How to Secure Your Purchased Account</div>
                <p className="text-slate-300 leading-relaxed">
                  After receiving your credentials via the Instant AI Escrow portal, log in to the official game client, update the security email to your personal address using the provided transfer code, and enable 2-Factor Authentication (2FA).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="font-orbitron font-bold text-cyan-300">2. Understanding Lifetime Pullback Protection</div>
                <p className="text-slate-300 leading-relaxed">
                  Every account sold on Zero Point Market is cryptographically verified by our automated system. In the rare event of a seller dispute, our AI escrow hold provides instant 100% money-back coverage.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'affiliate' && (
            <div className="space-y-4 text-xs">
              <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-950/60 to-slate-950 border border-purple-500/40 text-center space-y-3">
                <Sparkles className="w-8 h-8 text-purple-400 mx-auto" />
                <h4 className="font-orbitron text-lg font-black text-white uppercase">
                  EARN 15% ON EVERY VAULT SALE
                </h4>
                <p className="text-slate-300">
                  Share your personalized Zero Point Market referral link with your gaming community or Discord channels and earn instant crypto payouts on every completed purchase.
                </p>

                <div className="p-3 rounded-xl bg-slate-900 border border-purple-500/30 flex items-center justify-between font-mono text-cyan-300 select-all">
                  <span>https://zeropoint.market/?ref=CYBER_PRO_2026</span>
                  <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-1 rounded">YOUR UNIQUE CODE</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'api' && (
            <div className="space-y-4 text-xs font-mono">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-emerald-400 font-bold">POST /api/v1/instant-transfer</div>
                <p className="text-slate-400 text-[11px]">
                  Bulk reseller endpoint to initiate automated account transfers and fetch live cryptographic keys programmatically.
                </p>
                <div className="p-3 rounded bg-slate-900 text-cyan-300 text-[11px] overflow-x-auto">
                  {`{\n  "apiKey": "zp_live_9f82a1...",\n  "accountId": "acc-001",\n  "escrowTarget": "0x4f82...3b1a"\n}`}
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
