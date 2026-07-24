import React from 'react';
import { Search, Bot, ShieldCheck, Star, Zap, ChevronRight, Sparkles, Flame, PlusCircle } from 'lucide-react';

interface HeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onBrowseClick: () => void;
  onOpenSellModal: () => void;
  totalAccountCount: number;
}

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  onSearchChange,
  onBrowseClick,
  onOpenSellModal,
  totalAccountCount
}) => {
  return (
    <section id="hero" className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden bg-[#070B14]">
      
      {/* Background Cyber Glow Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-600/20 via-blue-600/25 to-purple-600/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Cyber Grid Pattern Backdrop */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none" 
        style={{
          backgroundImage: `linear-gradient(to right, rgba(6, 182, 212, 0.15) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(6, 182, 212, 0.15) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Small Glowing Top Badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-400/40 shadow-[0_0_20px_rgba(6,182,212,0.35)] backdrop-blur-md mb-8 animate-cyan-glow">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <Bot className="w-4 h-4 text-cyan-300" />
          <span className="font-orbitron text-xs font-extrabold uppercase tracking-widest text-cyan-200">
            ১০০% ট্রাস্টেড গেমিং মার্কেটপ্লেস
          </span>
          <span className="px-1.5 py-0.5 text-[9px] font-mono bg-cyan-500/30 text-cyan-300 rounded font-bold">
            অটো ডেলিভারি
          </span>
        </div>

        {/* Huge Bold Headline */}
        <h1 className="font-orbitron text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white uppercase leading-[1.08] mb-6 drop-shadow-[0_0_35px_rgba(6,182,212,0.3)]">
          ZERO POINT <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500">ACCOUNTS</span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 font-medium leading-relaxed mb-10">
          ফ্রী ফায়ার সহ সেরা সব প্রিমিয়াম গেমিং একাউন্ট কিনুন <span className="text-cyan-300 font-semibold">ইনস্ট্যান্ট বিকাশ/নগদ অটোমেটেড ডেলিভারি</span> সহ। সম্পূর্ণ নিরাপদ এবং দ্রুততম সেবা।
        </p>

        {/* Action Controls: Primary CTA & Search Bar */}
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-12">
          
          {/* Post Icon CTA Button */}
          <button
            onClick={onOpenSellModal}
            className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-slate-950 font-orbitron font-black text-sm uppercase tracking-wider shadow-[0_0_35px_rgba(16,185,129,0.5)] hover:shadow-[0_0_50px_rgba(16,185,129,0.8)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center space-x-2.5 cursor-pointer border border-emerald-300/40 shrink-0"
          >
            <PlusCircle className="w-5 h-5 text-slate-950 fill-emerald-300" />
            <span>পোস্ট করুন (POST / SELL ID)</span>
          </button>

          {/* Primary CTA Button */}
          <button
            onClick={onBrowseClick}
            className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-cyan-400 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-orbitron font-extrabold text-sm uppercase tracking-wider shadow-[0_0_30px_rgba(6,182,212,0.5)] hover:shadow-[0_0_45px_rgba(6,182,212,0.8)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center space-x-2 cursor-pointer shrink-0"
          >
            <span>একাউন্টগুলো দেখুন</span>
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Secondary Search Bar */}
          <div className="relative w-full sm:max-w-xs">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-cyan-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="আইডি বা স্কিন দিয়ে খুঁজুন..."
              className="w-full pl-11 pr-4 py-4 rounded-2xl bg-slate-900/80 border border-cyan-500/30 focus:border-cyan-400 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 backdrop-blur-xl shadow-inner transition-all font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-xs font-mono text-cyan-400 hover:text-white"
              >
                মুছে ফেলুন
              </button>
            )}
          </div>

        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          
          <div className="glass-card p-5 rounded-2xl flex items-center justify-center space-x-3 border-cyan-500/20">
            <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30">
              <Flame className="w-6 h-6 text-cyan-400" />
            </div>
            <div className="text-left">
              <div className="font-orbitron text-2xl font-black text-white">
                {totalAccountCount}+ একাউন্ট
              </div>
              <div className="text-xs font-rajdhani font-semibold text-slate-400 uppercase tracking-wider">
                ভেরিফাইড স্টক
              </div>
            </div>
          </div>

          <div className="glass-card p-5 rounded-2xl flex items-center justify-center space-x-3 border-cyan-500/20">
            <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/30">
              <Zap className="w-6 h-6 text-blue-400" />
            </div>
            <div className="text-left">
              <div className="font-orbitron text-2xl font-black text-white">
                ইনস্ট্যান্ট ডেলিভারি
              </div>
              <div className="text-xs font-rajdhani font-semibold text-slate-400 uppercase tracking-wider">
                অটোমেটেড &lt; ১০ সেকেন্ড
              </div>
            </div>
          </div>

          <div className="glass-card p-5 rounded-2xl flex items-center justify-center space-x-3 border-cyan-500/20">
            <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/30">
              <Star className="w-6 h-6 text-amber-400 fill-amber-400" />
            </div>
            <div className="text-left">
              <div className="font-orbitron text-2xl font-black text-white">
                ৪.৯/৫ রেটিং
              </div>
              <div className="text-xs font-rajdhani font-semibold text-slate-400 uppercase tracking-wider">
                ১,৮৫০+ ভেরিফাইড রিভিউ
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
