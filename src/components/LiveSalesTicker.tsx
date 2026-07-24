import React from 'react';
import { Flame, Zap, ShieldCheck, ArrowRight } from 'lucide-react';
import { RecentSale } from '../types';

interface LiveSalesTickerProps {
  sales: RecentSale[];
  onExploreVault: () => void;
}

export const LiveSalesTicker: React.FC<LiveSalesTickerProps> = ({ sales, onExploreVault }) => {
  return (
    <section id="recent-sales" className="py-12 bg-[#050810] border-y border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30">
              <Flame className="w-5 h-5 text-amber-400 animate-bounce" />
            </div>
            <div>
              <h3 className="font-orbitron text-lg font-bold text-white uppercase tracking-wider flex items-center space-x-2">
                <span>RECENT LIVE SALES</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </h3>
              <p className="text-xs text-slate-400">
                Live automated AI escrow account transfers
              </p>
            </div>
          </div>

          <button
            onClick={onExploreVault}
            className="text-xs font-orbitron font-bold text-cyan-400 hover:text-white flex items-center space-x-1.5 transition-colors self-start md:self-auto"
          >
            <span>VIEW ALL VAULT LISTINGS</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Sales Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {sales.map((sale) => (
            <div
              key={sale.id}
              className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between space-y-2 backdrop-blur-md"
            >
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="text-cyan-400 font-bold">{sale.buyer}</span>
                <span>{sale.timeAgo}</span>
              </div>

              <div className="font-orbitron text-xs font-bold text-white line-clamp-1">
                {sale.accountTitle}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                <span className="font-orbitron text-sm font-black text-emerald-400">
                  ৳{sale.price.toLocaleString()}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 flex items-center space-x-1">
                  <Zap className="w-2.5 h-2.5 text-emerald-400" />
                  <span>{sale.deliveryTime}</span>
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
