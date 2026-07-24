import React, { useState } from 'react';
import { X, ShieldCheck, Zap, Globe, Sparkles, Heart, Star, CheckCircle2, Trophy, Tag, Image as ImageIcon, Video as VideoIcon } from 'lucide-react';
import { GamingAccount } from '../types';

interface QuickViewModalProps {
  account: GamingAccount | null;
  onClose: () => void;
  onBuyNow: (account: GamingAccount) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ account, onClose, onBuyNow }) => {
  const [activeMediaTab, setActiveMediaTab] = useState<'photo' | 'video'>('photo');

  if (!account) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-3xl rounded-3xl bg-[#090E1A] border border-cyan-500/40 shadow-[0_0_50px_rgba(6,182,212,0.3)] overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-1 rounded bg-purple-950/80 border border-purple-500/40 text-[10px] font-orbitron font-bold text-purple-300 uppercase">
              {account.game}
            </span>
            <span className="text-xs font-mono text-cyan-400 font-bold">
              আইডি: #{account.id.toUpperCase()}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-cyan-500/40 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Media Switcher Tabs if Video exists */}
          {account.videoUrl && (
            <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800 w-fit">
              <button
                onClick={() => setActiveMediaTab('photo')}
                className={`px-4 py-1.5 rounded-lg text-xs font-orbitron font-bold flex items-center space-x-1.5 transition-all ${
                  activeMediaTab === 'photo'
                    ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.5)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>ছবি দেখুন</span>
              </button>

              <button
                onClick={() => setActiveMediaTab('video')}
                className={`px-4 py-1.5 rounded-lg text-xs font-orbitron font-bold flex items-center space-x-1.5 transition-all ${
                  activeMediaTab === 'video'
                    ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(147,51,234,0.6)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <VideoIcon className="w-3.5 h-3.5" />
                <span>ভিডিও রিভিউ</span>
              </button>
            </div>
          )}

          {/* Top Banner & Media Preview */}
          <div className="relative rounded-2xl overflow-hidden border border-cyan-500/30 min-h-[16rem] bg-slate-950">
            {activeMediaTab === 'photo' || !account.videoUrl ? (
              <img
                src={account.previewImage}
                alt={account.title}
                referrerPolicy="no-referrer"
                className="w-full h-64 object-cover"
              />
            ) : (
              <div className="w-full h-64 bg-black relative flex items-center justify-center">
                <video
                  src={account.videoUrl}
                  controls
                  autoPlay
                  loop
                  className="w-full h-full object-contain max-h-64"
                />
              </div>
            )}

            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
            
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between pointer-events-auto">
              <div>
                <span className="px-2.5 py-1 rounded bg-cyan-950/90 border border-cyan-400 text-xs font-orbitron font-bold text-cyan-300 uppercase">
                  র‍্যাংক: {account.rankBadge} • লেভেল {account.level}
                </span>
                <h3 className="font-orbitron text-xl font-black text-white mt-2">
                  {account.title}
                </h3>
              </div>

              <div className="text-right">
                <div className="text-xs text-slate-400 font-mono line-through">৳{account.originalPrice.toLocaleString()}</div>
                <div className="font-orbitron text-3xl font-black text-cyan-300">৳{account.discountedPrice.toLocaleString()}</div>
              </div>
            </div>
          </div>

          {/* Key Attributes Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
              <span className="text-[10px] font-mono text-slate-400 uppercase">প্ল্যাটফর্ম</span>
              <div className="font-orbitron text-sm font-bold text-white mt-0.5">{account.platform}</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
              <span className="text-[10px] font-mono text-slate-400 uppercase">গান স্কিন</span>
              <div className="font-orbitron text-sm font-bold text-cyan-400 mt-0.5">{account.skinsCount}+</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
              <span className="text-[10px] font-mono text-slate-400 uppercase">কাস্টমার রেটিং</span>
              <div className="font-orbitron text-sm font-bold text-amber-400 mt-0.5 flex items-center justify-center space-x-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{account.sellerRating}/৫.০</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
              <span className="text-[10px] font-mono text-slate-400 uppercase">সার্ভার রিজিওন</span>
              <div className="font-orbitron text-xs font-bold text-slate-200 mt-0.5">{account.regions.join(', ')}</div>
            </div>
          </div>

          {/* Gmail Account & Country Notice */}
          <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-xs font-mono font-bold text-emerald-300 flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>জিমেইল একাউন্ট (Gmail Account) • বাংলাদেশ / নেপাল সার্ভার (Bangladesh / Nepal)</span>
          </div>

          {/* Rare Skins & Inventory Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center space-x-2 font-orbitron text-xs font-bold text-purple-300 uppercase">
                <Trophy className="w-4 h-4 text-purple-400" />
                <span>বিশেষ রেয়ার আইটেম ও গান স্কিন</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {account.rareItems.map((item, idx) => (
                  <li key={idx} className="flex items-center space-x-2">
                    <Sparkles className="w-3 h-3 text-cyan-400 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center space-x-2 font-orbitron text-xs font-bold text-cyan-300 uppercase">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>একাউন্ট ভেরিফিকেশন সুবিধা</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {account.inventoryHighlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

        {/* Action Footer */}
        <div className="p-5 border-t border-slate-800 bg-slate-950/90 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase">ইনস্ট্যান্ট অফার মূল্য</span>
            <div className="font-orbitron text-2xl font-black text-cyan-300">
              ৳{account.discountedPrice.toLocaleString()} BDT
            </div>
          </div>

          <button
            onClick={() => {
              onClose();
              onBuyNow(account);
            }}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-blue-500 text-black font-orbitron font-extrabold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(6,182,212,0.5)] transition-all flex items-center space-x-2 cursor-pointer"
          >
            <Zap className="w-4 h-4 fill-black" />
            <span>এখনই কিনুন</span>
          </button>
        </div>

      </div>
    </div>
  );
};
