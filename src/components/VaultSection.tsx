import React, { useState } from 'react';
import { ShieldAlert, Sparkles, Filter, Lock, Zap, ArrowUpDown } from 'lucide-react';
import { GamingAccount, GameCategory } from '../types';
import { AccountCard } from './AccountCard';

interface VaultSectionProps {
  accounts: GamingAccount[];
  searchQuery: string;
  onBuyNow: (account: GamingAccount) => void;
  onQuickView: (account: GamingAccount) => void;
}

export const VaultSection: React.FC<VaultSectionProps> = ({
  accounts,
  searchQuery,
  onBuyNow,
  onQuickView
}) => {
  const [selectedCategory, setSelectedCategory] = useState<GameCategory>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'likes'>('featured');

  const categories: { id: GameCategory; label: string; icon: string }[] = [
    { id: 'all', label: 'সব একাউন্ট', icon: '⚡' },
    { id: 'valorant', label: 'Valorant', icon: '🎯' },
    { id: 'cs2', label: 'Counter-Strike 2', icon: '💥' },
    { id: 'league', label: 'League of Legends', icon: '👑' },
    { id: 'fortnite', label: 'Fortnite', icon: '⛏️' },
    { id: 'genshin', label: 'Genshin Impact', icon: '✨' },
  ];

  // Filter accounts by approval status, search query & selected category
  const filteredAccounts = accounts.filter(acc => {
    const isApproved = acc.status !== 'pending' && acc.status !== 'rejected';
    const matchesCategory = selectedCategory === 'all' || acc.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      acc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      acc.game.toLowerCase().includes(searchQuery.toLowerCase()) ||
      acc.rankBadge.toLowerCase().includes(searchQuery.toLowerCase()) ||
      acc.rareItems.some(item => item.toLowerCase().includes(searchQuery.toLowerCase()));

    return isApproved && matchesCategory && matchesSearch;
  });

  // Sort accounts
  const sortedAccounts = [...filteredAccounts].sort((a, b) => {
    if (sortBy === 'price-low') return a.discountedPrice - b.discountedPrice;
    if (sortBy === 'price-high') return b.discountedPrice - a.discountedPrice;
    if (sortBy === 'likes') return b.likes - a.likes;
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });

  return (
    <section id="vault" className="relative py-16 md:py-24 bg-[#070B14]">
      
      {/* Background Section Glows */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Title Block */}
        <div className="text-center mb-12">
          
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 mb-3 text-xs font-mono text-cyan-300 font-bold uppercase tracking-wider">
            <Lock className="w-3.5 h-3.5 text-cyan-400" />
            <span>ভেরিফাইড প্রিমিয়াম একাউন্ট কালেকশন</span>
          </div>

          <h2 className="font-orbitron text-4xl sm:text-5xl font-black text-white uppercase tracking-tight mb-3">
            একাউন্ট <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">মার্কেটপ্লেস</span>
          </h2>

          <p className="font-rajdhani text-lg font-semibold text-slate-300 uppercase tracking-widest">
            সর্বশেষ আপডেট হওয়া সকল গেমিং আইডি
          </p>

        </div>

        {/* Category Navigation & Sort Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-800">
          
          {/* Category Tabs */}
          <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-orbitron font-extrabold uppercase tracking-wider whitespace-nowrap transition-all duration-300 flex items-center space-x-2 ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-black shadow-[0_0_20px_rgba(6,182,212,0.4)]'
                    : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-slate-100 hover:border-cyan-500/40'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center space-x-3 self-end md:self-auto">
            <span className="text-xs font-mono text-slate-400 uppercase flex items-center space-x-1">
              <ArrowUpDown className="w-3.5 h-3.5 text-cyan-400" />
              <span>ফিল্টার:</span>
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-900/90 border border-cyan-500/30 text-xs font-semibold text-cyan-300 rounded-xl px-3 py-2 focus:outline-none focus:border-cyan-400 cursor-pointer"
            >
              <option value="featured">ফিচার্ড একাউন্ট</option>
              <option value="price-low">দাম: কম থেকে বেশি</option>
              <option value="price-high">দাম: বেশি থেকে কম</option>
              <option value="likes">সবচেয়ে জনপ্রিয়</option>
            </select>
          </div>

        </div>

        {/* Product Cards Row / Grid */}
        {sortedAccounts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedAccounts.map((account) => (
              <AccountCard
                key={account.id}
                account={account}
                onBuyNow={onBuyNow}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 glass-card rounded-2xl max-w-md mx-auto p-8">
            <ShieldAlert className="w-12 h-12 text-cyan-400 mx-auto mb-4 animate-bounce" />
            <h3 className="font-orbitron text-lg font-bold text-white uppercase mb-2">
              No Vault Accounts Found
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              We couldn't find any accounts matching "{searchQuery}". Try searching for another level or game title.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
              }}
              className="px-5 py-2.5 rounded-xl bg-cyan-500/20 border border-cyan-400 text-cyan-300 font-bold text-xs uppercase hover:bg-cyan-500 hover:text-black transition-all"
            >
              Reset Category Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
