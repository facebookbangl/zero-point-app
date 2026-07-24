import React from 'react';
import { ShieldCheck, Zap, Key, Lock, Cpu, Sparkles, CheckCircle2 } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: '০১',
      icon: <Lock className="w-8 h-8 text-cyan-400" />,
      title: 'একাউন্ট সিলেক্ট করুন',
      description: 'আমাদের মার্কেটপ্লেস থেকে আপনার পছন্দের ফ্রী ফায়ার বা গেমিং একাউন্টটি বেছে নিন।',
      tag: 'জিরো রিস্ক'
    },
    {
      number: '০২',
      icon: <Cpu className="w-8 h-8 text-blue-400" />,
      title: 'অটো ভেরিফিকেশন',
      description: 'আমাদের সিস্টেমে একাউন্টের লেভেল, গান স্কিন এবং জিমেইল ভেরিফিকেশন সম্পূর্ণ যাচাই করা হয়।',
      tag: '১০০% ভেরিফাইড'
    },
    {
      number: '০৩',
      icon: <Key className="w-8 h-8 text-purple-400" />,
      title: 'ইনস্ট্যান্ট ডেলিভারি',
      description: 'বিকাশ বা নগদে পেমেন্ট করার সাথে সাথে আপনার ইমেইল/হোয়াটসঅ্যাপে পাসওয়ার্ড পেয়ে যাবেন।',
      tag: 'ইনস্ট্যান্ট অ্যাক্সেস'
    }
  ];

  return (
    <section id="how-it-works" className="relative py-20 bg-[#070B14] border-t border-slate-900">
      
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-cyan-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-400/40 text-xs font-mono text-cyan-300 font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>নিরাপদ কেনাবেচা পদ্ধতি</span>
          </div>

          <h2 className="font-orbitron text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mb-4">
            যেভাবে <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">কাজ করে</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base font-medium">
            জিরো পয়েন্ট একাউন্টস অত্যন্ত নিরাপদ প্রক্রিয়ায় একাউন্ট কেনাবেচার গ্যারান্টি প্রদান করে।
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, idx) => (
            <div 
              key={idx}
              className="relative glass-card p-8 rounded-2xl border border-cyan-500/20 hover:border-cyan-400/60 transition-all duration-300 group flex flex-col justify-between"
            >
              {/* Step Number Backdrop */}
              <div className="absolute top-4 right-6 font-orbitron text-6xl font-black text-slate-800/40 group-hover:text-cyan-500/10 transition-colors pointer-events-none">
                {step.number}
              </div>

              <div>
                <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-cyan-500/30 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(6,182,212,0.2)] group-hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-shadow">
                  {step.icon}
                </div>

                <div className="inline-block px-2.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/30 text-[10px] font-mono font-bold text-cyan-300 uppercase mb-3">
                  {step.tag}
                </div>

                <h3 className="font-orbitron text-xl font-bold text-white uppercase mb-3 group-hover:text-cyan-300 transition-colors">
                  {step.title}
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed font-normal">
                  {step.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center text-xs font-mono text-cyan-400 font-bold space-x-1">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>AI Escrow Protected</span>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges Bar */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-cyan-500/20 backdrop-blur-xl flex flex-wrap items-center justify-around gap-6 text-center">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span className="text-xs font-bold text-slate-200 uppercase font-orbitron">256-Bit Encryption</span>
          </div>
          <div className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-cyan-400" />
            <span className="text-xs font-bold text-slate-200 uppercase font-orbitron">Instant Key Release</span>
          </div>
          <div className="flex items-center space-x-2">
            <Lock className="w-5 h-5 text-purple-400" />
            <span className="text-xs font-bold text-slate-200 uppercase font-orbitron">Lifetime Pullback Protection</span>
          </div>
        </div>

      </div>
    </section>
  );
};
