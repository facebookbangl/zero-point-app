import React from 'react';
import { ShieldCheck, Zap, Lock, Sparkles, MessageSquare, Youtube } from 'lucide-react';

interface FooterProps {
  onOpenExtraModal: (tab: 'tutorials' | 'affiliate' | 'api') => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenExtraModal, onNavigateSection }) => {
  return (
    <footer className="bg-[#050810] border-t border-slate-900 text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-cyan-400" />
              <span className="font-orbitron font-extrabold text-white text-base tracking-wider uppercase">
                ZERO POINT ACCOUNTS
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              বাংলাদেশের সেরা এবং সবচেয়ে ট্রাস্টেড গেমিং একাউন্ট মার্কেটপ্লেস। অটো পেমেন্ট ও দ্রুততম ডেলিভারি সেবা।
            </p>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-[10px] font-mono text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>হোয়াটসঅ্যাপ সাপোর্ট সক্রিয়</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-orbitron text-xs font-bold text-white uppercase mb-3">
              মার্কেটপ্লেস
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigateSection('vault')} className="hover:text-cyan-400 transition-colors">
                  একাউন্ট ক্যাটালগ
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('customer-reviews')} className="hover:text-cyan-400 transition-colors">
                  কাস্টমার রিভিউ
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('how-it-works')} className="hover:text-cyan-400 transition-colors">
                  যেভাবে কাজ করে
                </button>
              </li>
              <li>
                <button onClick={() => onOpenExtraModal('affiliate')} className="hover:text-cyan-400 transition-colors">
                  অ্যাফিলিয়েট প্রোগ্রাম (১৫%)
                </button>
              </li>
            </ul>
          </div>

          {/* Developer & Legal */}
          <div>
            <h4 className="font-orbitron text-xs font-bold text-white uppercase mb-3">
              হেল্প ও টিউটোরিয়াল
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onOpenExtraModal('tutorials')} className="hover:text-cyan-400 transition-colors">
                  বায়ার গাইড টিউটোরিয়াল
                </button>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@freefireidbuyandsellbangladesh"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-red-400 text-red-400 font-bold flex items-center space-x-1.5 transition-colors"
                >
                  <Youtube className="w-4 h-4 text-red-500" />
                  <span>অফিশিয়াল ইউটিউব চ্যানেল</span>
                </a>
              </li>
              <li>
                <a href="#about" onClick={(e) => { e.preventDefault(); alert('জিরো পয়েন্ট একাউন্টস - একাউন্ট কেনাবেচার বিশ্বস্ত মাধ্যম'); }} className="hover:text-cyan-400 transition-colors">
                  আমাদের সম্পর্কে
                </a>
              </li>
              <li>
                <a href="https://wa.me/8801797086478" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">
                  ২৪/৭ হোয়াটসঅ্যাপ সাপোর্ট
                </a>
              </li>
            </ul>
          </div>

          {/* Community & Security */}
          <div>
            <h4 className="font-orbitron text-xs font-bold text-white uppercase mb-3">
              YOUTUBE & COMMUNITY
            </h4>
            <p className="text-xs text-slate-400 mb-3">
              আমাদের ইউটিউব চ্যানেলে ফ্রি ফায়ার আইডি রিভিউ ও নতুন স্টক আপডেট দেখতে এখনই সাবস্ক্রাইব করুন।
            </p>
            <a
              href="https://www.youtube.com/@freefireidbuyandsellbangladesh"
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 rounded-xl bg-red-600/20 border border-red-500/40 text-red-300 font-orbitron font-bold text-xs uppercase hover:bg-red-600 hover:text-white transition-all flex items-center justify-center space-x-2 group cursor-pointer shadow-[0_0_15px_rgba(239,68,68,0.2)]"
            >
              <Youtube className="w-4 h-4 text-red-500 group-hover:text-white transition-colors" />
              <span>VISIT YOUTUBE CHANNEL</span>
            </a>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © 2026 ZERO POINT MARKET. All rights reserved.
          </div>

          <div className="flex items-center space-x-6">
            <a href="#terms" onClick={(e) => { e.preventDefault(); alert('Terms of Service: All accounts protected by AI Escrow Hold.'); }} className="hover:text-slate-300">Terms</a>
            <a href="#privacy" onClick={(e) => { e.preventDefault(); alert('Privacy Policy: Zero data tracking.'); }} className="hover:text-slate-300">Privacy</a>
            <a href="#security" onClick={(e) => { e.preventDefault(); alert('256-Bit SSL Escrow Shield.'); }} className="hover:text-slate-300">Security</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
