import React from 'react';
import { DollarSign, ShieldCheck, Zap, ArrowRight, MessageCircle } from 'lucide-react';

interface SellAccountSectionProps {
  onOpenSellModal: () => void;
}

export const SellAccountSection: React.FC<SellAccountSectionProps> = ({ onOpenSellModal }) => {
  const whatsappNumber = '8801797086478';
  
  const handleOpenWhatsApp = (message: string) => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="sell-account-section" className="relative py-16 bg-[#0B101D] border-y border-cyan-500/30 overflow-hidden">
      {/* Radial Background Glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl bg-gradient-to-r from-slate-950 via-[#0A1324] to-slate-950 border border-emerald-500/40 p-8 sm:p-12 shadow-[0_0_50px_rgba(16,185,129,0.15)] relative overflow-hidden">
          
          {/* Subtle Top Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-cyan-400 to-purple-500" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-400/50 text-xs font-mono text-emerald-300 font-bold uppercase tracking-wider">
                <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                <span>ইনস্ট্যান্ট একাউন্ট বাইআউট ও ডিরেক্ট সেল</span>
              </div>

              <h2 className="font-orbitron text-3xl sm:text-5xl font-black text-white uppercase tracking-tight leading-tight">
                আপনার <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">গেমিং একাউন্ট বিক্রি করুন</span>
              </h2>

              <p className="text-slate-300 text-sm sm:text-base font-medium leading-relaxed">
                আপনার কি ফ্রী ফায়ার (Free Fire), ভ্যালোরেন্ট বা অন্য কোনো গেমিং আইডি আছে যা বিক্রি করতে চান? সরাসরি বিকাশ/নগদ ইনস্ট্যান্ট পেমেন্টে বিক্রি করুন! এখনই হোয়াটসঅ্যাপে মেসেজ দিন।
              </p>

              {/* Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="flex items-center space-x-2.5 bg-slate-900/80 border border-slate-800 p-3 rounded-xl">
                  <Zap className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-xs font-mono text-slate-200 font-bold">ইনস্ট্যান্ট ক্যাশ পেমেন্ট</span>
                </div>
                <div className="flex items-center space-x-2.5 bg-slate-900/80 border border-slate-800 p-3 rounded-xl">
                  <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="text-xs font-mono text-slate-200 font-bold">১০০% নিরাপদ লেনদেন</span>
                </div>
                <div className="flex items-center space-x-2.5 bg-slate-900/80 border border-slate-800 p-3 rounded-xl">
                  <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-xs font-mono text-slate-200 font-bold">ডাইরেক্ট হোয়াটসঅ্যাপ</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={() => handleOpenWhatsApp('free fire account for sale')}
                  className="px-6 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-green-500 to-emerald-700 hover:from-emerald-500 hover:to-green-400 text-white font-orbitron font-extrabold text-xs uppercase tracking-wider shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all flex items-center justify-center space-x-3 group cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 text-white" />
                  <span>হোয়াটসঅ্যাপে একাউন্ট সেল করুন</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={onOpenSellModal}
                  className="px-6 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-cyan-500/40 text-cyan-300 font-orbitron font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <span>একাউন্টের আনুমানিক দাম জানুন</span>
                </button>
              </div>

              <div className="text-[11px] font-mono text-emerald-400/90 pt-1 flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>হোয়াটসঅ্যাপ হটলাইন: 01797086478</span>
              </div>

            </div>

            {/* Right Card / Visual Badge */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="w-full max-w-sm rounded-2xl bg-slate-950/90 border border-emerald-500/30 p-6 space-y-4 text-center shadow-xl">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 mx-auto flex items-center justify-center text-emerald-400">
                  <DollarSign className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-orbitron text-lg font-black text-white uppercase">ফ্রী ফায়ার একাউন্ট সেল</h3>
                  <p className="text-xs text-slate-400 font-mono mt-1">তাত্ক্ষণিক মূল্যায়ন এবং বিকাশ / নগদ / ব্যাংকে টাকা গ্রহণ করুন</p>
                </div>
                
                <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs font-mono text-emerald-300">
                  আইডির তথ্য ও স্ক্রিনশট পাঠান: <br/>
                  <span className="font-bold text-white text-sm">01797086478</span>
                </div>

                <button
                  onClick={() => handleOpenWhatsApp('free fire account for sale')}
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-orbitron font-bold text-xs uppercase transition-all shadow-[0_0_20px_rgba(16,185,129,0.4)] flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>হোয়াটসঅ্যাপে মেসেজ পাঠান</span>
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
