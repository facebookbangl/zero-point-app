import React, { useState } from 'react';
import { Star, ShieldCheck, ThumbsUp, MessageSquare, CheckCircle2, UserCheck, MessageCircle } from 'lucide-react';

interface Review {
  id: string;
  name: string;
  game: string;
  rating: number;
  comment: string;
  timeAgo: string;
  verified: boolean;
  priceTag?: string;
  initialLikes: number;
}

const REVIEWS_DATA: Review[] = [
  {
    id: 'rev-1',
    name: 'Sabbir Ahmed',
    game: 'Free Fire',
    rating: 5,
    comment: 'ভাই অসাধারণ সার্ভিস! বিকাশ এ পেমেন্ট করার ১০ সেকেন্ডের মধ্যে ফ্রী ফায়ার একাউন্ট পাসওয়ার্ড পাইছি। MP40 Cobra & AK Dragon Max account 100% Real!',
    timeAgo: '12 mins ago',
    verified: true,
    priceTag: '৳1,850',
    initialLikes: 1420
  },
  {
    id: 'rev-2',
    name: 'Tanvir Hossain',
    game: 'Valorant',
    rating: 5,
    comment: 'Very fast response on WhatsApp. Paid via bKash and got full Gmail access instantly with Kuronami VCT bundle. 100% recommended!',
    timeAgo: '35 mins ago',
    verified: true,
    priceTag: '৳3,200',
    initialLikes: 2180
  },
  {
    id: 'rev-3',
    name: 'Arafat Rahman',
    game: 'Free Fire',
    rating: 5,
    comment: 'একদম ট্রাস্টেড সাইট! আমি প্রথমে ভয় পাইছিলাম কিন্তু হোয়াটসঅ্যাপে ভাই অনেক হেল্পফুল ছিল। Bunny MP40 & Hip Hop Bundle একাউন্ট পাইছি।',
    timeAgo: '1 hour ago',
    verified: true,
    priceTag: '৳1,200',
    initialLikes: 1890
  },
  {
    id: 'rev-4',
    name: 'Mehedi Hasan',
    game: 'Counter-Strike 2',
    rating: 5,
    comment: 'Purchased a Global Elite account with Karambit Doppler. Full recovery details provided immediately. Safe and secure service.',
    timeAgo: '2 hours ago',
    verified: true,
    priceTag: '৳4,500',
    initialLikes: 1250
  },
  {
    id: 'rev-5',
    name: 'Shahriar Kabir',
    game: 'Free Fire',
    rating: 5,
    comment: 'Ami prothome voy paisseilam kintu bKash a taka deoyar shaathe shaathe account password peye gechi. Highly trusted Zero Point Accounts!',
    timeAgo: '3 hours ago',
    verified: true,
    priceTag: '৳2,900',
    initialLikes: 2430
  },
  {
    id: 'rev-6',
    name: 'Rifatur Rahman',
    game: 'Free Fire',
    rating: 5,
    comment: 'খুবই কম দামে ভালো আইডি পাইছি। লেভেল ৭০ ফ্রী ফায়ার একাউন্ট আর সাথে ডায়মন্ড ও পাইছি। ধন্যবাদ জিরো পয়েন্ট একাউন্টস টিম!',
    timeAgo: '5 hours ago',
    verified: true,
    priceTag: '৳950',
    initialLikes: 1670
  },
  {
    id: 'rev-7',
    name: 'Zubayer Chowdhury',
    game: 'Genshin Impact',
    rating: 5,
    comment: 'AR 58 Genshin account with C6 Raiden Shogun delivered smoothly. Admin fast support offered on WhatsApp line 01797086478!',
    timeAgo: '6 hours ago',
    verified: true,
    priceTag: '৳3,800',
    initialLikes: 1120
  },
  {
    id: 'rev-8',
    name: 'Mahfuzur Rahman',
    game: 'Free Fire',
    rating: 5,
    comment: 'অসাধারণ অভিজ্ঞতা! হোয়াটসঅ্যাপে মেসেজ দেয়ার ২ মিনিটের মধ্যে আইডি পাইছি। যারা ফ্রী ফায়ার একাউন্ট কিনবেন নিদ্বিধায় নিতে পারেন।',
    timeAgo: '8 hours ago',
    verified: true,
    priceTag: '৳1,500',
    initialLikes: 2890
  },
  {
    id: 'rev-9',
    name: 'Kazi Farhan',
    game: 'Fortnite',
    rating: 5,
    comment: 'OG Renegade Raider account full email access handover fast! Real deal no fraud. Support top notch.',
    timeAgo: '10 hours ago',
    verified: true,
    priceTag: '৳2,400',
    initialLikes: 1340
  }
];

export const CustomerReviews: React.FC = () => {
  const [likes, setLikes] = useState<Record<string, number>>({});

  const handleLike = (id: string) => {
    setLikes(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  const handleWhatsAppReview = () => {
    const url = `https://wa.me/8801797086478?text=${encodeURIComponent('Hello Zero Point Accounts, I want to submit a customer review!')}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="customer-reviews" className="py-14 bg-[#050913] border-y border-cyan-500/20 relative overflow-hidden">
      
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs font-bold uppercase mb-3">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>4.9 / 5.0 VERIFIED RATING (1,850+ REVIEWS)</span>
            </div>
            <h2 className="font-orbitron text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
              CUSTOMER <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">REVIEWS & FEEDBACK</span>
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Real reviews from verified gamers across Bangladesh
            </p>
          </div>

          <button
            onClick={handleWhatsAppReview}
            className="px-5 py-2.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 font-orbitron font-bold text-xs uppercase flex items-center space-x-2 transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] self-start md:self-auto"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>SUBMIT YOUR REVIEW ON WHATSAPP</span>
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REVIEWS_DATA.map((rev) => (
            <div
              key={rev.id}
              className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between space-y-4 backdrop-blur-md group hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]"
            >
              <div className="space-y-3">
                
                {/* User Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 p-[1.5px]">
                      <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center font-orbitron font-extrabold text-cyan-300 text-sm">
                        {rev.name.charAt(0)}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center space-x-1.5">
                        <span className="font-orbitron text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {rev.name}
                        </span>
                        {rev.verified && (
                          <UserCheck className="w-4 h-4 text-emerald-400 shrink-0" title="Verified Buyer" />
                        )}
                      </div>
                      <span className="text-[11px] font-mono text-slate-400 block">
                        {rev.timeAgo}
                      </span>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-lg bg-cyan-950/80 border border-cyan-500/30 text-[10px] font-mono font-bold text-cyan-300">
                    {rev.game}
                  </span>
                </div>

                {/* Star Rating */}
                <div className="flex items-center space-x-1">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Review Comment */}
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-sans">
                  "{rev.comment}"
                </p>
              </div>

              {/* Bottom Card Footer */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="text-emerald-400 font-bold flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified Purchase {rev.priceTag && `(${rev.priceTag})`}</span>
                </span>

                <button
                  onClick={() => handleLike(rev.id)}
                  className="flex items-center space-x-1 hover:text-cyan-400 transition-colors cursor-pointer bg-slate-950/50 px-2.5 py-1 rounded-lg border border-slate-800 text-xs font-mono font-bold text-cyan-300"
                >
                  <ThumbsUp className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{(rev.initialLikes + (likes[rev.id] || 0)).toLocaleString()}</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
