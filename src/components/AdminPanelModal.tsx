import React, { useState } from 'react';
import { X, ShieldAlert, Plus, Trash2, Package, Sparkles, CheckCircle2, Image as ImageIcon, Video as VideoIcon, Tag, Search, RefreshCw, Zap, Upload, Film, KeyRound, AlertCircle, Edit, Check, Clock, Phone } from 'lucide-react';
import { GamingAccount } from '../types';

interface AdminPanelModalProps {
  accounts: GamingAccount[];
  onAddAccount: (newAccount: GamingAccount) => void;
  onUpdateAccount?: (updatedAccount: GamingAccount) => void;
  onApproveAccount?: (accountId: string) => void;
  onRemoveAccount: (accountId: string) => void;
  onClose: () => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  accounts,
  onAddAccount,
  onUpdateAccount,
  onApproveAccount,
  onRemoveAccount,
  onClose,
}) => {
  // Admin PIN Lock State
  const [isPinAuthenticated, setIsPinAuthenticated] = useState(false);
  const [adminPin, setAdminPin] = useState('');
  const [pinError, setPinError] = useState('');

  const [activeTab, setActiveTab] = useState<'list' | 'add'>('list');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved'>('all');
  const [searchFilter, setSearchFilter] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // Edit Post State
  const [editingAccount, setEditingAccount] = useState<GamingAccount | null>(null);

  const handleVerifyPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPin.trim() === '21200212') {
      setIsPinAuthenticated(true);
      setPinError('');
    } else {
      setPinError('ভুল এডমিন পিন! এডমিন প্যানেলে প্রবেশ করা সম্ভব নয়।');
    }
  };

  // Form State for Add / Edit
  const [title, setTitle] = useState('');
  const [game, setGame] = useState<'Valorant' | 'Counter-Strike 2' | 'League of Legends' | 'Fortnite' | 'Genshin Impact'>('Valorant');
  const [discountedPrice, setDiscountedPrice] = useState('199');
  const [originalPrice, setOriginalPrice] = useState('299');
  const [level, setLevel] = useState(150);
  const [rankBadge, setRankBadge] = useState('IMMORTAL III');
  const [skinsCount, setSkinsCount] = useState(120);
  const [rareItemsText, setRareItemsText] = useState('Kuronami Vandal, Reaver Karambit, Prime 2.0');
  const [previewImage, setPreviewImage] = useState('https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1000');
  const [videoUrl, setVideoUrl] = useState('https://assets.mixkit.co/videos/preview/mixkit-cyberpunk-game-character-animation-41556-large.mp4');
  const [isPremium, setIsPremium] = useState(true);
  const [sellerContact, setSellerContact] = useState('');
  const [postStatus, setPostStatus] = useState<'approved' | 'pending' | 'rejected'>('approved');

  // If not PIN authenticated, show PIN Lock Gateway
  if (!isPinAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl animate-fade-in">
        <div className="relative w-full max-w-md rounded-3xl bg-[#090E1A] border border-cyan-500/50 shadow-[0_0_80px_rgba(6,182,212,0.4)] overflow-hidden p-6 sm:p-8 space-y-6">
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Lock Icon */}
          <div className="text-center space-y-3 pt-2">
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 border border-cyan-400/60 flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(6,182,212,0.4)]">
              <ShieldAlert className="w-9 h-9 text-cyan-400" />
            </div>
            <h3 className="font-orbitron text-xl font-black text-white uppercase tracking-wider">
              এডমিন প্যানেল সিকিউরিটি
            </h3>
            <p className="text-xs text-slate-400">
              এডমিন প্যানেলে প্রবেশ করার জন্য ৮-ডিজিটের পিন প্রদান করুন:
            </p>
          </div>

          {/* PIN Verification Form */}
          <form onSubmit={handleVerifyPin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-cyan-300 uppercase mb-2 font-bold">
                সিক্রেট এডমিন পিন (PIN):
              </label>
              <div className="relative">
                <KeyRound className="absolute left-3.5 top-3.5 w-4 h-4 text-cyan-400" />
                <input
                  type="password"
                  autoComplete="new-password"
                  required
                  autoFocus
                  value={adminPin}
                  onChange={(e) => {
                    setAdminPin(e.target.value);
                    if (pinError) setPinError('');
                  }}
                  placeholder="এডমিন পিন টাইপ করুন..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-700 focus:border-cyan-400 text-center font-orbitron font-extrabold text-lg text-cyan-300 tracking-[0.2em] placeholder-slate-600 focus:outline-none"
                />
              </div>
            </div>

            {pinError && (
              <div className="p-3 rounded-xl bg-red-950/90 border border-red-500/60 text-red-300 text-xs font-bold text-center flex items-center justify-center space-x-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{pinError}</span>
              </div>
            )}

            <div className="flex items-center space-x-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="w-1/3 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-xs uppercase transition-all cursor-pointer"
              >
                বাতিল
              </button>
              <button
                type="submit"
                className="w-2/3 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-orbitron font-extrabold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all cursor-pointer"
              >
                প্যানেল আনলক করুন
              </button>
            </div>
          </form>

          <div className="text-center pt-2">
            <span className="text-[10px] font-mono text-slate-500 uppercase">
              [ কেবল রেজিস্টার্ড অনুমোদিত এডমিনদের জন্য ]
            </span>
          </div>

        </div>
      </div>
    );
  }

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewImage(url);
      showToast('PHOTO UPLOADED SUCCESSFULLY');
    }
  };

  const handleVideoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
      showToast('VIDEO UPLOADED SUCCESSFULLY');
    }
  };

  const startEditAccount = (acc: GamingAccount) => {
    setEditingAccount(acc);
    setTitle(acc.title);
    setGame(acc.game);
    setDiscountedPrice(acc.discountedPrice.toString());
    setOriginalPrice(acc.originalPrice.toString());
    setLevel(acc.level);
    setRankBadge(acc.rankBadge);
    setSkinsCount(acc.skinsCount);
    setRareItemsText(acc.rareItems.join(', '));
    setPreviewImage(acc.previewImage);
    setVideoUrl(acc.videoUrl || '');
    setIsPremium(acc.isPremium);
    setSellerContact(acc.sellerContact || '');
    setPostStatus(acc.status || 'approved');
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAccount) return;

    const rareItems = rareItemsText
      .split(',')
      .map(item => item.trim())
      .filter(Boolean);

    const updated: GamingAccount = {
      ...editingAccount,
      title: title.trim(),
      game,
      category: game.toLowerCase().includes('valorant') ? 'valorant' : game.toLowerCase().includes('counter') ? 'cs2' : game.toLowerCase().includes('league') ? 'league' : game.toLowerCase().includes('fortnite') ? 'fortnite' : 'genshin',
      originalPrice: parseFloat(originalPrice) || 299,
      discountedPrice: parseFloat(discountedPrice) || 199,
      rankBadge,
      level: Number(level) || 100,
      skinsCount: Number(skinsCount) || 50,
      isPremium,
      previewImage: previewImage.trim() || editingAccount.previewImage,
      videoUrl: videoUrl.trim() || undefined,
      rareItems: rareItems.length > 0 ? rareItems : editingAccount.rareItems,
      status: postStatus,
      sellerContact: sellerContact.trim()
    };

    if (onUpdateAccount) {
      onUpdateAccount(updated);
    }
    setEditingAccount(null);
    showToast(`পোস্ট #${updated.id.toUpperCase()} সফলভাবে এডিট ও সেভ করা হয়েছে!`);
  };

  const handleApprove = (acc: GamingAccount) => {
    if (onApproveAccount) {
      onApproveAccount(acc.id);
      showToast(`পোস্ট #${acc.id.toUpperCase()} এপ্রুভ করা হয়েছে! এখন ওয়েবসাইটে লাইভ।`);
    }
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const rareItems = rareItemsText
      .split(',')
      .map(item => item.trim())
      .filter(Boolean);

    const newAcc: GamingAccount = {
      id: `acc-${Date.now()}`,
      title: title.trim().toUpperCase(),
      game,
      category: game.toLowerCase().includes('valorant') ? 'valorant' : game.toLowerCase().includes('counter') ? 'cs2' : game.toLowerCase().includes('league') ? 'league' : game.toLowerCase().includes('fortnite') ? 'fortnite' : 'genshin',
      originalPrice: parseFloat(originalPrice) || 299,
      discountedPrice: parseFloat(discountedPrice) || 199,
      rankBadge,
      level: Number(level) || 100,
      skinsCount: Number(skinsCount) || 50,
      sellerRating: 5.0,
      likes: 88,
      featured: true,
      regions: ['GLOBAL', 'EU', 'NA'],
      evolutionTags: ['AI VERIFIED', 'INSTANT ESCROW', 'FULL ACCESS'],
      instantDelivery: true,
      isPremium,
      platform: 'PC',
      previewImage: previewImage.trim() || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1000',
      videoUrl: videoUrl.trim() || undefined,
      rareItems: rareItems.length > 0 ? rareItems : ['Exclusive Battlepass Skins', 'Full Email Access'],
      inventoryHighlights: ['Full Native Email Ownership', 'Zero Strike Clean History', 'Instant AI Escrow Release'],
      status: 'approved'
    };

    onAddAccount(newAcc);
    showToast(`SUCCESSFULLY ADDED: ${newAcc.title}`);
    
    // Reset basic fields
    setTitle('');
    setActiveTab('list');
  };

  const handleExecuteDelete = (acc: GamingAccount) => {
    onRemoveAccount(acc.id);
    setConfirmDeleteId(null);
    showToast(`পোস্ট #${acc.id.toUpperCase()} সফলভাবে রিমুভ করা হয়েছে!`);
  };

  const pendingCount = accounts.filter(a => a.status === 'pending').length;

  const filteredAccounts = accounts.filter(acc => {
    const matchesSearch = acc.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      acc.game.toLowerCase().includes(searchFilter.toLowerCase()) ||
      acc.rankBadge.toLowerCase().includes(searchFilter.toLowerCase());

    if (statusFilter === 'pending') {
      return matchesSearch && acc.status === 'pending';
    }
    if (statusFilter === 'approved') {
      return matchesSearch && acc.status !== 'pending' && acc.status !== 'rejected';
    }
    return matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl animate-fade-in">
      <div className="relative w-full max-w-4xl rounded-3xl bg-[#090E1A] border border-cyan-500/50 shadow-[0_0_80px_rgba(6,182,212,0.35)] overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Toast Alert */}
        {toastMessage && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-2xl bg-emerald-500 text-black font-orbitron font-black text-xs uppercase shadow-[0_0_30px_rgba(16,185,129,0.8)] flex items-center space-x-2 animate-bounce">
            <CheckCircle2 className="w-5 h-5 fill-black" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Header Bar */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/90">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-400/50">
              <ShieldAlert className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h3 className="font-orbitron text-lg font-black text-white uppercase tracking-wider flex items-center space-x-2">
                <span>ADMIN CONTROL PANEL</span>
                {pendingCount > 0 && (
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500 text-black font-bold animate-pulse">
                    {pendingCount} PENDING POSTS
                  </span>
                )}
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Post Approvals • Edit Listing Details • Manage Live Vault Products
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-cyan-500/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center justify-between px-6 pt-4 border-b border-slate-800/80 bg-slate-950/50">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setActiveTab('list');
                setEditingAccount(null);
              }}
              className={`px-5 py-3 font-orbitron font-bold text-xs uppercase tracking-wider rounded-t-xl transition-all flex items-center space-x-2 border-b-2 ${
                activeTab === 'list' && !editingAccount
                  ? 'border-cyan-400 bg-cyan-500/10 text-cyan-300'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>ALL POSTS ({accounts.length})</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('add');
                setEditingAccount(null);
              }}
              className={`px-5 py-3 font-orbitron font-bold text-xs uppercase tracking-wider rounded-t-xl transition-all flex items-center space-x-2 border-b-2 ${
                activeTab === 'add'
                  ? 'border-cyan-400 bg-cyan-500/10 text-cyan-300'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Plus className="w-4 h-4" />
              <span>ADD NEW POST</span>
            </button>
          </div>

          {editingAccount && (
            <span className="px-3 py-1 rounded-lg bg-purple-950 border border-purple-500/40 text-purple-300 font-mono text-xs flex items-center space-x-1">
              <Edit className="w-3.5 h-3.5 text-purple-400" />
              <span>EDITING: #{editingAccount.id}</span>
            </span>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">
          
          {/* EDIT FORM DRAWER */}
          {editingAccount ? (
            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/40 flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs font-bold text-purple-300 font-orbitron">
                  <Edit className="w-4 h-4 text-purple-400" />
                  <span>পোস্ট এডিট করুন (EDITING POST DETAILS)</span>
                </div>
                <button
                  type="button"
                  onClick={() => setEditingAccount(null)}
                  className="px-3 py-1 rounded-lg bg-slate-800 text-slate-300 text-xs hover:bg-slate-700"
                >
                  বাতিল (Cancel)
                </button>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                  Product Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                    Approval Status *
                  </label>
                  <select
                    value={postStatus}
                    onChange={(e) => setPostStatus(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-purple-500/50 text-xs text-white focus:outline-none"
                  >
                    <option value="approved">APPROVED (ওয়েবসাইটে শো করবে)</option>
                    <option value="pending">PENDING (পেন্ডিং অবস্থায় থাকবে)</option>
                    <option value="rejected">REJECTED (বাতিল)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                    Price (৳ BDT) *
                  </label>
                  <input
                    type="number"
                    required
                    value={discountedPrice}
                    onChange={(e) => setDiscountedPrice(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                    Original Price (৳)
                  </label>
                  <input
                    type="number"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                    Rank Badge
                  </label>
                  <input
                    type="text"
                    value={rankBadge}
                    onChange={(e) => setRankBadge(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                    Level
                  </label>
                  <input
                    type="number"
                    value={level}
                    onChange={(e) => setLevel(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                    Seller Contact (ফোন/হোয়াটসঅ্যাপ)
                  </label>
                  <input
                    type="text"
                    value={sellerContact}
                    onChange={(e) => setSellerContact(e.target.value)}
                    placeholder="017XXXXXXXX"
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
                  />
                </div>
              </div>

              {/* MEDIA PHOTO & VIDEO */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <label className="block text-xs font-mono text-purple-300 uppercase font-bold">
                  Image & Video Media Links
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Image URL or Upload</label>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        value={previewImage}
                        onChange={(e) => setPreviewImage(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white font-mono"
                      />
                      <label className="px-3 py-2 rounded-xl bg-purple-950 border border-purple-500/40 text-purple-300 text-xs font-mono cursor-pointer shrink-0">
                        Upload
                        <input type="file" accept="image/*" onChange={handleImageFileUpload} className="hidden" />
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Video URL or Upload</label>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        value={videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white font-mono"
                      />
                      <label className="px-3 py-2 rounded-xl bg-purple-950 border border-purple-500/40 text-purple-300 text-xs font-mono cursor-pointer shrink-0">
                        Upload
                        <input type="file" accept="video/*" onChange={handleVideoFileUpload} className="hidden" />
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                  Rare Skins / Features
                </label>
                <input
                  type="text"
                  value={rareItemsText}
                  onChange={(e) => setRareItemsText(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="flex items-center space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingAccount(null)}
                  className="w-1/3 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs uppercase"
                >
                  বাতিল (Cancel)
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-orbitron font-extrabold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(168,85,247,0.5)] cursor-pointer"
                >
                  পরিবর্তন সেভ করুন (SAVE CHANGES)
                </button>
              </div>
            </form>
          ) : activeTab === 'list' ? (
            <div className="space-y-4">
              
              {/* Filter Tabs & Search */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center space-x-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 w-full sm:w-auto">
                  <button
                    onClick={() => setStatusFilter('all')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      statusFilter === 'all'
                        ? 'bg-cyan-500 text-black'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    সকল পোস্ট ({accounts.length})
                  </button>
                  <button
                    onClick={() => setStatusFilter('pending')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all relative ${
                      statusFilter === 'pending'
                        ? 'bg-amber-500 text-black'
                        : 'text-amber-400 hover:text-amber-300'
                    }`}
                  >
                    পেন্ডিং ({pendingCount})
                  </button>
                  <button
                    onClick={() => setStatusFilter('approved')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      statusFilter === 'approved'
                        ? 'bg-emerald-500 text-black'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    লাইভ/অনুমোদিত ({accounts.length - pendingCount})
                  </button>
                </div>

                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    placeholder="Search posts..."
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* Products Table / Cards */}
              {filteredAccounts.length === 0 ? (
                <div className="p-12 text-center text-slate-500 font-mono text-xs border border-dashed border-slate-800 rounded-2xl">
                  NO PRODUCTS FOUND IN INVENTORY
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-3">
                  {filteredAccounts.map((acc) => {
                    const isPending = acc.status === 'pending';
                    return (
                      <div
                        key={acc.id}
                        className={`p-4 rounded-2xl bg-slate-950/80 border transition-all flex flex-col sm:flex-row items-center justify-between gap-4 ${
                          isPending
                            ? 'border-amber-500/60 shadow-[0_0_20px_rgba(245,158,11,0.15)] bg-amber-950/20'
                            : 'border-slate-800 hover:border-cyan-500/40'
                        }`}
                      >
                        <div className="flex items-center space-x-3.5 w-full sm:w-auto">
                          <img
                            src={acc.previewImage}
                            alt={acc.title}
                            referrerPolicy="no-referrer"
                            className="w-16 h-16 rounded-xl object-cover border border-slate-800 shrink-0"
                          />
                          <div>
                            <div className="flex items-center space-x-2">
                              {isPending ? (
                                <span className="px-2 py-0.5 rounded bg-amber-500 text-black font-orbitron font-extrabold text-[9px] uppercase animate-pulse flex items-center space-x-1">
                                  <Clock className="w-3 h-3" />
                                  <span>পেন্ডিং অনুমোদন (AWAITING APPROVAL)</span>
                                </span>
                              ) : (
                                <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/40 text-emerald-300 font-orbitron font-bold text-[9px] uppercase">
                                  ✓ LIVE ON WEBSITE
                                </span>
                              )}
                              <span className="text-[10px] font-mono text-slate-500">
                                #{acc.id}
                              </span>
                            </div>

                            <h4 className="font-orbitron font-bold text-sm text-white mt-1 line-clamp-1">
                              {acc.title}
                            </h4>

                            <div className="flex items-center space-x-3 text-[11px] font-mono text-slate-400 mt-0.5">
                              <span>LVL {acc.level} • {acc.rankBadge}</span>
                              {acc.sellerContact && (
                                <span className="text-cyan-400 font-bold flex items-center space-x-1">
                                  <Phone className="w-3 h-3" />
                                  <span>{acc.sellerContact}</span>
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                          <div className="text-right pr-2">
                            <div className="font-orbitron text-lg font-extrabold text-cyan-300">
                              ৳{acc.discountedPrice.toLocaleString()}
                            </div>
                          </div>

                          {/* 1. APPROVE BUTTON IF PENDING */}
                          {isPending && (
                            <button
                              onClick={() => handleApprove(acc)}
                              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-slate-950 font-orbitron font-extrabold text-xs uppercase shadow-[0_0_15px_rgba(16,185,129,0.5)] transition-all flex items-center space-x-1 shrink-0 cursor-pointer"
                            >
                              <Check className="w-4 h-4 stroke-[3]" />
                              <span>এপ্রুভ করুন (Approve)</span>
                            </button>
                          )}

                          {/* 2. EDIT BUTTON */}
                          <button
                            onClick={() => startEditAccount(acc)}
                            className="px-3 py-2 rounded-xl bg-purple-950/70 hover:bg-purple-600 border border-purple-500/40 text-purple-300 hover:text-white font-orbitron font-bold text-xs uppercase transition-all flex items-center space-x-1 shrink-0 cursor-pointer"
                            title="এডিট করুন"
                          >
                            <Edit className="w-3.5 h-3.5" />
                            <span>এডিট</span>
                          </button>

                          {/* 3. DELETE BUTTON */}
                          {confirmDeleteId === acc.id ? (
                            <div className="flex items-center space-x-2 shrink-0 animate-fade-in">
                              <button
                                onClick={() => handleExecuteDelete(acc)}
                                className="px-3 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-orbitron font-bold text-xs uppercase shadow-[0_0_15px_rgba(239,68,68,0.5)] transition-all cursor-pointer"
                              >
                                ডিলিট
                              </button>
                              <button
                                onClick={() => setConfirmDeleteId(null)}
                                className="px-2 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs"
                              >
                                X
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setConfirmDeleteId(acc.id)}
                              className="p-2 rounded-xl bg-red-950/50 hover:bg-red-600 border border-red-500/30 text-red-400 hover:text-white transition-all shrink-0 cursor-pointer"
                              title="ডিলিট করুন"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

            </div>
          ) : (
            /* TAB 2: ADD NEW PRODUCT FORM */
            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                  Product Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. VALORANT: RADIANT #100 + KURONAMI SET"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                    Game Category *
                  </label>
                  <select
                    value={game}
                    onChange={(e) => setGame(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Valorant">Valorant</option>
                    <option value="Counter-Strike 2">Counter-Strike 2</option>
                    <option value="League of Legends">League of Legends</option>
                    <option value="Fortnite">Fortnite</option>
                    <option value="Genshin Impact">Genshin Impact</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                    Price (৳ BDT) *
                  </label>
                  <input
                    type="number"
                    required
                    value={discountedPrice}
                    onChange={(e) => setDiscountedPrice(e.target.value)}
                    placeholder="199"
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                    Original Price (৳)
                  </label>
                  <input
                    type="number"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(e.target.value)}
                    placeholder="299"
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                    Rank Badge / Rating
                  </label>
                  <input
                    type="text"
                    required
                    value={rankBadge}
                    onChange={(e) => setRankBadge(e.target.value)}
                    placeholder="RADIANT or GLOBAL ELITE"
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                    Account Level
                  </label>
                  <input
                    type="number"
                    value={level}
                    onChange={(e) => setLevel(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                    Skins Count
                  </label>
                  <input
                    type="number"
                    value={skinsCount}
                    onChange={(e) => setSkinsCount(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* PHOTO & VIDEO UPLOAD SECTION */}
              <div className="p-4 rounded-2xl bg-slate-950/90 border border-cyan-500/30 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                  <h4 className="font-orbitron text-xs font-bold text-cyan-300 uppercase tracking-wider flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span>PRODUCT MEDIA (PHOTO & VIDEO OPTIONS)</span>
                  </h4>
                  <span className="text-[10px] text-slate-500 font-mono">JPG, PNG, WEBP, MP4, WEBM</span>
                </div>

                {/* 1. PHOTO OPTION */}
                <div className="space-y-2">
                  <label className="block text-xs font-mono text-slate-300 uppercase flex items-center justify-between">
                    <span className="flex items-center space-x-1.5 text-cyan-400">
                      <ImageIcon className="w-4 h-4" />
                      <span>1. Account Photo (Image) *</span>
                    </span>
                    <span className="text-[10px] text-slate-500">Paste URL or Select Image File</span>
                  </label>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                    <div className="sm:col-span-8 flex gap-2">
                      <input
                        type="url"
                        value={previewImage}
                        onChange={(e) => setPreviewImage(e.target.value)}
                        placeholder="Image URL (https://...)"
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                      />
                      <label className="px-3 py-2.5 rounded-xl bg-cyan-950 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-300 text-xs font-mono cursor-pointer transition-all shrink-0 flex items-center space-x-1.5">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageFileUpload}
                          className="hidden"
                        />
                      </label>
                    </div>

                    <div className="sm:col-span-4 flex items-center space-x-2 bg-slate-900/80 p-2 rounded-xl border border-slate-800">
                      <img
                        src={previewImage}
                        alt="Photo Preview"
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 rounded-lg object-cover border border-slate-700 shrink-0"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1000';
                        }}
                      />
                      <div className="text-[10px] font-mono text-slate-400 truncate">
                        Photo Loaded
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. VIDEO OPTION */}
                <div className="space-y-2 pt-2 border-t border-slate-800/80">
                  <label className="block text-xs font-mono text-slate-300 uppercase flex items-center justify-between">
                    <span className="flex items-center space-x-1.5 text-purple-400">
                      <VideoIcon className="w-4 h-4" />
                      <span>2. Account Gameplay Video (Video)</span>
                    </span>
                    <span className="text-[10px] text-slate-500">MP4 / WebM Video URL or Upload File</span>
                  </label>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                    <div className="sm:col-span-8 flex gap-2">
                      <input
                        type="url"
                        value={videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)}
                        placeholder="Video MP4/WebM URL (https://...)"
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
                      />
                      <label className="px-3 py-2.5 rounded-xl bg-purple-950 hover:bg-purple-900 border border-purple-500/40 text-purple-300 text-xs font-mono cursor-pointer transition-all shrink-0 flex items-center space-x-1.5">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Video</span>
                        <input
                          type="file"
                          accept="video/*"
                          onChange={handleVideoFileUpload}
                          className="hidden"
                        />
                      </label>
                    </div>

                    <div className="sm:col-span-4 flex items-center space-x-2 bg-slate-900/80 p-2 rounded-xl border border-slate-800">
                      {videoUrl ? (
                        <video
                          src={videoUrl}
                          className="w-10 h-10 rounded-lg object-cover border border-purple-500/50 shrink-0"
                          muted
                          autoPlay
                          loop
                          playsInline
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0 text-slate-600">
                          <Film className="w-4 h-4" />
                        </div>
                      )}
                      <div className="text-[10px] font-mono text-slate-400 truncate">
                        {videoUrl ? 'Video Loaded' : 'No Video Selected'}
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                  Rare Skins / Features (comma-separated)
                </label>
                <input
                  type="text"
                  value={rareItemsText}
                  onChange={(e) => setRareItemsText(e.target.value)}
                  placeholder="Kuronami Vandal, Reaver Karambit, VCT 2023"
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="isPremium"
                  checked={isPremium}
                  onChange={(e) => setIsPremium(e.target.checked)}
                  className="w-4 h-4 rounded bg-slate-950 border-slate-800 text-cyan-500 focus:ring-cyan-500"
                />
                <label htmlFor="isPremium" className="text-xs text-slate-300 font-mono">
                  Tag as PREMIUM ASSET (Shows purple badge on card)
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-blue-500 text-black font-orbitron font-extrabold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(6,182,212,0.5)] transition-all flex items-center justify-center space-x-2 mt-4 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>PUBLISH NEW PRODUCT TO MARKETPLACE</span>
              </button>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};
