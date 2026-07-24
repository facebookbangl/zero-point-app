import React, { useState } from 'react';
import { X, PlusCircle, Sparkles, CheckCircle2, ShieldCheck, Upload, Image as ImageIcon, Video as VideoIcon, Phone } from 'lucide-react';
import { GamingAccount } from '../types';

interface SellAccountModalProps {
  onAddAccount?: (newAccount: GamingAccount) => void;
  userEmail?: string | null;
  onClose: () => void;
}

export const SellAccountModal: React.FC<SellAccountModalProps> = ({ onAddAccount, userEmail, onClose }) => {
  const [title, setTitle] = useState('');
  const [game, setGame] = useState<'Valorant' | 'Counter-Strike 2' | 'League of Legends' | 'Fortnite' | 'Genshin Impact'>('Valorant');
  const [price, setPrice] = useState('1500');
  const [level, setLevel] = useState('75');
  const [rankBadge, setRankBadge] = useState('HEROIC / GRANDMASTER');
  const [skinsCount, setSkinsCount] = useState('80');
  const [sellerContact, setSellerContact] = useState('');
  const [previewImage, setPreviewImage] = useState('https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1000');
  const [videoUrl, setVideoUrl] = useState('');
  const [rareItemsText, setRareItemsText] = useState('Cobra MP40, Hip Hop Bundle, Evo Gun Level 7');

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewImage(url);
    }
  };

  const handleVideoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
    }
  };

  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !price) return;

    const rareItems = rareItemsText
      .split(',')
      .map(item => item.trim())
      .filter(Boolean);

    const priceNum = parseFloat(price) || 1000;

    const newPost: GamingAccount = {
      id: `post-${Date.now()}`,
      title: title.trim(),
      game,
      category: game.toLowerCase().includes('valorant') ? 'valorant' : game.toLowerCase().includes('counter') ? 'cs2' : game.toLowerCase().includes('league') ? 'league' : game.toLowerCase().includes('fortnite') ? 'fortnite' : 'genshin',
      originalPrice: Math.round(priceNum * 1.25),
      discountedPrice: priceNum,
      rankBadge: rankBadge.trim() || 'HEROIC',
      level: parseInt(level) || 50,
      skinsCount: parseInt(skinsCount) || 30,
      sellerRating: 5.0,
      likes: 12,
      featured: false,
      regions: ['GLOBAL', 'AP'],
      evolutionTags: ['MEMBER POST', 'PENDING APPROVAL', 'FULL ACCESS'],
      instantDelivery: true,
      isPremium: false,
      platform: 'PC',
      previewImage: previewImage.trim() || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1000',
      videoUrl: videoUrl.trim() || undefined,
      rareItems: rareItems.length > 0 ? rareItems : ['Exclusive Skins', 'Full Clean Email Access'],
      inventoryHighlights: ['Member Submitted Post', 'Awaiting Admin Verification'],
      status: 'pending',
      sellerContact: sellerContact.trim(),
      submittedBy: userEmail || 'Member'
    };

    if (onAddAccount) {
      onAddAccount(newPost);
    }

    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-xl rounded-3xl bg-[#090E1A] border border-emerald-500/40 shadow-[0_0_50px_rgba(16,185,129,0.3)] overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/90">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40">
              <PlusCircle className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="font-orbitron text-sm font-bold text-white uppercase tracking-wider">
                নতুন একাউন্ট পোস্ট করুন (POST FOR SALE)
              </h3>
              <p className="text-[11px] text-slate-400">
                এডমিন রিভিউ এবং এপ্রুভালের পর ওয়েবসাইটে লাইভ হবে
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          
          {isSubmitted ? (
            <div className="p-8 text-center space-y-4 animate-fade-in my-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.5)]">
                <CheckCircle2 className="w-10 h-10 text-emerald-400" />
              </div>
              <h4 className="font-orbitron text-xl font-bold text-white uppercase">
                পোস্টটি সফলভাবে সাবমিট হয়েছে!
              </h4>
              <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                আপনার একাউন্ট পোস্টটি আমাদের প্যান্ডিং লিস্টে জমা হয়েছে। <span className="text-emerald-400 font-bold">এডমিন প্যানেল থেকে রিভিউর পর এটি এপ্রুভ (Approve) করা হলে</span> মূল ওয়েবসাইটে প্রদর্শিত হবে।
              </p>
              <div className="pt-2">
                <button
                  onClick={onClose}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-orbitron font-extrabold text-xs uppercase cursor-pointer shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                >
                  ঠিক আছে (Close)
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmitPost} className="space-y-4">
              
              <div>
                <label className="block text-xs font-mono text-emerald-300 uppercase mb-1 font-bold">
                  পোস্ট টাইটেল (Account Title) *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="যেমন: FREE FIRE LEVEL 75 + COBRA MP40 & HIP HOP BUNDLE"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                    গেম ক্যাটাগরি *
                  </label>
                  <select
                    value={game}
                    onChange={(e) => setGame(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-400"
                  >
                    <option value="Valorant">Valorant / Free Fire</option>
                    <option value="Counter-Strike 2">Counter-Strike 2</option>
                    <option value="League of Legends">League of Legends</option>
                    <option value="Fortnite">Fortnite</option>
                    <option value="Genshin Impact">Genshin Impact</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                    বিক্রয় মূল্য (Price ৳ BDT) *
                  </label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="1500"
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-400 font-mono font-bold text-emerald-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                    একাউন্ট লেভেল (Level)
                  </label>
                  <input
                    type="number"
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    placeholder="75"
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                    র‍্যাংক (Rank Badge)
                  </label>
                  <input
                    type="text"
                    value={rankBadge}
                    onChange={(e) => setRankBadge(e.target.value)}
                    placeholder="HEROIC / GRANDMASTER"
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                    আপনার ফোন / হোয়াটসঅ্যাপ
                  </label>
                  <input
                    type="text"
                    required
                    value={sellerContact}
                    onChange={(e) => setSellerContact(e.target.value)}
                    placeholder="017XXXXXXXX"
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-400 font-mono"
                  />
                </div>
              </div>

              {/* MEDIA PHOTO / VIDEO UPLOAD */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-xs font-bold text-emerald-400 font-orbitron uppercase">
                    ছবি ও ভিডিও যুক্ত করুন (Upload Screenshots)
                  </span>
                </div>

                {/* Photo Image */}
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-mono text-slate-300">
                    একাউন্টের ছবি (Image URL or File Upload)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={previewImage}
                      onChange={(e) => setPreviewImage(e.target.value)}
                      placeholder="Image URL..."
                      className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-400 font-mono"
                    />
                    <label className="px-3 py-2 rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-xs font-mono cursor-pointer hover:bg-emerald-900 transition-all flex items-center space-x-1 shrink-0">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload</span>
                      <input type="file" accept="image/*" onChange={handleImageFileUpload} className="hidden" />
                    </label>
                  </div>
                </div>

                {/* Video */}
                <div className="space-y-1.5 pt-1">
                  <label className="block text-[11px] font-mono text-slate-300">
                    একাউন্টের গেমপ্লে ভিডিও (Video URL or File Upload - optional)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={videoUrl}
                      onChange={(e) => setVideoUrl(e.target.value)}
                      placeholder="Video MP4/WebM URL..."
                      className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-400 font-mono"
                    />
                    <label className="px-3 py-2 rounded-xl bg-purple-950 border border-purple-500/40 text-purple-300 text-xs font-mono cursor-pointer hover:bg-purple-900 transition-all flex items-center space-x-1 shrink-0">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload</span>
                      <input type="file" accept="video/*" onChange={handleVideoFileUpload} className="hidden" />
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                  রেয়ার আইটেমসমূহ (Rare Items)
                </label>
                <input
                  type="text"
                  value={rareItemsText}
                  onChange={(e) => setRareItemsText(e.target.value)}
                  placeholder="Cobra MP40, Hip Hop Bundle, Evo Guns"
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-[11px] text-emerald-300 flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>আপনার পোস্টটি সাবমিট করার সাথে সাথেই এডমিন নোটিফিকেশন চলে যাবে। অনুমোদন পাওয়ার পর সবাই এটি দেখতে পাবে।</span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-slate-950 font-orbitron font-extrabold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(16,185,129,0.5)] transition-all cursor-pointer flex items-center justify-center space-x-2"
              >
                <PlusCircle className="w-4 h-4 text-slate-950" />
                <span>পোস্ট সাবমিট করুন (SUBMIT POST)</span>
              </button>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};
