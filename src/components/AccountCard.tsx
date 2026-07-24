import React, { useState } from 'react';
import { Heart, ShieldCheck, Zap, Globe, Sparkles, Tag, CheckCircle2, Mail } from 'lucide-react';
import { GamingAccount } from '../types';

interface AccountCardProps {
  account: GamingAccount;
  onBuyNow: (account: GamingAccount) => void;
  onQuickView: (account: GamingAccount) => void;
}

export const AccountCard: React.FC<AccountCardProps> = ({
  account,
  onBuyNow,
  onQuickView
}) => {
  const [likesCount, setLikesCount] = useState(account.likes);
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isLiked) {
      setLikesCount(prev => prev - 1);
      setIsLiked(false);
    } else {
      setLikesCount(prev => prev + 1);
      setIsLiked(true);
    }
  };

  return (
    <div 
      onClick={() => onQuickView(account)}
      className="group relative rounded-2xl bg-slate-900/70 border border-cyan-500/20 hover:border-cyan-400/70 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
    >
      
      {/* Top Image Preview Container */}
      <div className="relative w-full h-52 overflow-hidden bg-slate-950">
        <img
          src={account.previewImage}
          alt={account.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
        />
        
        {/* Dark Gradient Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

        {/* Top Badges Row */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          
          <div className="flex items-center space-x-1.5">
            {/* Purple PREMIUM badge */}
            {account.isPremium && (
              <span className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-800 text-[10px] font-orbitron font-black text-white uppercase tracking-wider shadow-[0_0_12px_rgba(147,51,234,0.6)] border border-purple-400/50 flex items-center space-x-1">
                <Sparkles className="w-3 h-3 text-purple-200" />
                <span>প্রিমিয়াম</span>
              </span>
            )}

            {/* Level Badge */}
            <span className="px-2.5 py-1 rounded-lg bg-cyan-950/80 border border-cyan-400/50 text-[10px] font-orbitron font-bold text-cyan-300 uppercase tracking-wider backdrop-blur-md">
              লেভেল {account.level} • {account.rankBadge}
            </span>
          </div>

          {/* Likes Counter Button */}
          <button
            onClick={handleLikeToggle}
            className={`px-2.5 py-1 rounded-lg backdrop-blur-md border text-xs font-mono font-bold flex items-center space-x-1 transition-all ${
              isLiked 
                ? 'bg-rose-950/80 border-rose-500 text-rose-400' 
                : 'bg-slate-950/70 border-slate-700/60 text-slate-300 hover:border-rose-400 hover:text-rose-400'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
            <span>{likesCount}</span>
          </button>
        </div>

        {/* Platform & Video Badge (Bottom Left of Image) */}
        <div className="absolute bottom-3 left-3 z-10 flex items-center space-x-2">
          <span className="px-2 py-0.5 rounded bg-slate-950/90 border border-slate-700 text-[10px] font-mono font-semibold text-slate-300 uppercase">
            {account.platform}
          </span>
          <span className="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40 text-[10px] font-mono font-semibold text-emerald-300 uppercase flex items-center space-x-1">
            <Zap className="w-2.5 h-2.5 text-emerald-400" />
            <span>AI INSTANT</span>
          </span>
          {account.videoUrl && (
            <span className="px-2 py-0.5 rounded bg-purple-950/90 border border-purple-500/50 text-[10px] font-mono font-bold text-purple-300 uppercase flex items-center space-x-1 shadow-[0_0_10px_rgba(168,85,247,0.5)]">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              <span>VIDEO</span>
            </span>
          )}
        </div>

      </div>

      {/* Card Content Section */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        <div>
          {/* Account Title */}
          <h3 className="font-orbitron text-base font-bold text-white line-clamp-2 group-hover:text-cyan-300 transition-colors leading-snug mb-3">
            {account.title}
          </h3>

          {/* Region Tags */}
          <div className="flex flex-wrap items-center gap-1.5 mb-3">
            <span className="text-[10px] font-rajdhani font-bold uppercase text-slate-400 mr-1 flex items-center">
              <Globe className="w-3 h-3 text-cyan-400 inline mr-1" />
              REGIONS:
            </span>
            {account.regions.map(reg => (
              <span key={reg} className="px-2 py-0.5 text-[10px] font-mono font-bold rounded bg-slate-800/90 text-cyan-300 border border-cyan-500/20">
                {reg}
              </span>
            ))}
          </div>

          {/* Evolution / Feature Tags */}
          <div className="flex flex-wrap gap-1.5 mb-2.5">
            {account.evolutionTags.slice(0, 3).map((tag, idx) => (
              <span key={idx} className="px-2 py-1 text-[10px] font-medium rounded-md bg-cyan-950/40 text-cyan-200 border border-cyan-500/20 flex items-center space-x-1">
                <CheckCircle2 className="w-2.5 h-2.5 text-cyan-400" />
                <span>{tag}</span>
              </span>
            ))}
          </div>

          {/* Gmail Account & Server Country Notice */}
          <div className="p-2 rounded-lg bg-emerald-950/50 border border-emerald-500/30 text-[11px] font-mono font-bold text-emerald-300 flex items-center space-x-1.5">
            <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Gmail Account • Bangladesh / Nepal</span>
          </div>
        </div>

        {/* Pricing & Glowing CTA Button Row */}
        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
          
          {/* Price Container */}
          <div className="flex flex-col">
            <span className="text-[10px] font-rajdhani font-semibold text-slate-400 uppercase tracking-wider">
              ভেরিফাইড অফার মূল্য
            </span>
            <div className="flex items-baseline space-x-2">
              <span className="font-orbitron text-xl font-black text-white group-hover:text-cyan-300 transition-colors">
                ৳{account.discountedPrice.toLocaleString()}
              </span>
              <span className="text-xs font-mono text-slate-500 line-through">
                ৳{account.originalPrice.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Glowing CTA Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onBuyNow(account);
            }}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-blue-500 text-black font-orbitron font-extrabold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.8)] transition-all duration-300 flex items-center space-x-1.5 active:scale-95 cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5 fill-black" />
            <span>এখনই কিনুন</span>
          </button>

        </div>

      </div>

    </div>
  );
};
