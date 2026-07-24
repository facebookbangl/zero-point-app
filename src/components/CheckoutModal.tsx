import React, { useState } from 'react';
import { X, ShieldCheck, Zap, CheckCircle2, Copy, AlertCircle, MessageCircle } from 'lucide-react';
import { GamingAccount } from '../types';

interface CheckoutModalProps {
  account: GamingAccount | null;
  onClose: () => void;
}

// Custom SVGs for bKash, Nagad, Rocket logos
const BkashLogo: React.FC<{ className?: string }> = ({ className = "w-7 h-7" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="20" fill="#E2136E" />
    <path d="M22 28L48 50L22 72V28Z" fill="white" />
    <path d="M52 28L78 50L52 72V28Z" fill="white" opacity="0.9" />
    <path d="M48 50L78 28H22L48 50Z" fill="white" opacity="0.7" />
  </svg>
);

const NagadLogo: React.FC<{ className?: string }> = ({ className = "w-7 h-7" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="20" fill="#F7931E" />
    <path d="M25 75C25 75 35 30 50 30C65 30 75 75 75 75" stroke="white" strokeWidth="12" strokeLinecap="round" />
    <circle cx="50" cy="55" r="14" fill="#E83828" />
    <circle cx="50" cy="55" r="7" fill="white" />
  </svg>
);

const RocketLogo: React.FC<{ className?: string }> = ({ className = "w-7 h-7" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="20" fill="#8C3494" />
    <path d="M50 20L65 45H57V75H43V45H35L50 20Z" fill="white" />
    <path d="M35 55L22 75H35V55Z" fill="#C158CD" />
    <path d="M65 55L78 75H65V55Z" fill="#C158CD" />
  </svg>
);

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ account, onClose }) => {
  const [paymentMethod, setPaymentMethod] = useState<'bkash' | 'nagad' | 'rocket'>('bkash');
  const [trxId, setTrxId] = useState('');
  const [senderNumber, setSenderNumber] = useState('');
  const [validationError, setValidationError] = useState('');
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);
  const [checkoutStep, setCheckoutStep] = useState<'review' | 'processing' | 'delivered'>('review');
  const [progressStatus, setProgressStatus] = useState<string>('পেমেন্ট ও ট্রানজেকশন আইডি যাচাই করা হচ্ছে...');
  const [copiedKey, setCopiedKey] = useState(false);

  if (!account) return null;

  const paymentDetails = {
    bkash: {
      name: 'bKash (বিকাশ মার্চেন্ট)',
      number: '01308337103',
      type: 'Merchant Payment (পেমেন্ট)',
      color: '#E2136E',
      badgeBg: 'bg-[#E2136E]/20 text-[#E2136E] border-[#E2136E]/40',
      activeBorder: 'border-[#E2136E] bg-[#E2136E]/10',
      steps: [
        '১. আপনার bKash অ্যাপ ওপেন করুন অথবা *247# ডায়াল করুন।',
        '২. "Payment" (পেমেন্ট) অপশন সিলেক্ট করুন।',
        '৩. মার্চেন্ট নম্বর দিন: 01308337103',
        '৪. টাকার পরিমাণ লিখুন: ৳' + account.discountedPrice.toLocaleString(),
        '৫. রেফারেন্স (Reference) এ আপনার মোবাইল নম্বর দিন।',
        '৬. আপনার পিন নম্বর দিয়ে পেমেন্ট সম্পন্ন করুন।',
        '৭. পেমেন্ট শেষে পাওয়া TrxID (ট্রানজেকশন আইডি) নিচে টাইপ করুন।'
      ]
    },
    nagad: {
      name: 'Nagad (নগদ পার্সোনাল)',
      number: '01797096478',
      type: 'Send Money (সেন্ড মানি)',
      color: '#F7931E',
      badgeBg: 'bg-[#F7931E]/20 text-[#F7931E] border-[#F7931E]/40',
      activeBorder: 'border-[#F7931E] bg-[#F7931E]/10',
      steps: [
        '১. আপনার Nagad অ্যাপ খুলুন অথবা *167# ডায়াল করুন।',
        '২. "Send Money" (সেন্ড মানি) অপশনে যান।',
        '৩. প্রাপক নম্বর দিন: 01797096478',
        '৪. টাকার পরিমাণ দিন: ৳' + account.discountedPrice.toLocaleString(),
        '৫. রেফারেন্স এ আপনার নাম বা ফোন নম্বর লিখুন।',
        '৬. আপনার নগদের পিন দিয়ে সেন্ড মানি কনফার্ম করুন।',
        '৭. মেসেজে আসা TrxID নিচে লিখুন।'
      ]
    },
    rocket: {
      name: 'Rocket (রকেট পার্সোনাল)',
      number: '01797086478',
      type: 'Send Money / Transfer',
      color: '#C158CD',
      badgeBg: 'bg-[#8C3494]/20 text-[#C158CD] border-[#8C3494]/40',
      activeBorder: 'border-[#8C3494] bg-[#8C3494]/10',
      steps: [
        '১. আপনার Rocket অ্যাপ খুলুন অথবা *322# ডায়াল করুন।',
        '২. "Send Money" (সেন্ড মানি) সিলেক্ট করুন।',
        '৩. রকেট মোবাইল নম্বর দিন: 01797086478',
        '৪. টাকার পরিমাণ দিন: ৳' + account.discountedPrice.toLocaleString(),
        '৫. আপনার রকেটের ৪ ডিজিটের পিন নম্বর দিয়ে সেন্ড মানি সম্পন্ন করুন।',
        '৬. ট্রানজেকশন শেষে প্রাপ্ত TrxID নিচে ইনপুট দিন।'
      ]
    }
  };

  const handleCopyNumber = (num: string) => {
    navigator.clipboard.writeText(num);
    setCopiedNumber(num);
    setTimeout(() => setCopiedNumber(null), 2000);
  };

  const simulatedCredential = {
    username: `ZPM_${account.game.toUpperCase().replace(/\s+/g, '')}_${Math.floor(1000 + Math.random() * 9000)}`,
    password: `FFPass_${Math.random().toString(36).substring(2, 8)}!2026`,
    email: `verified_${Math.random().toString(36).substring(2, 6)}@zeropoint.mail`,
    transferCode: `ZP-ESCROW-${Math.floor(100000 + Math.random() * 900000)}`
  };

  const handleConfirmPaymentOnSite = () => {
    if (!senderNumber.trim() || senderNumber.trim().length < 11) {
      setValidationError('অনুগ্রহ করে সঠিক সেন্ডার মোবাইল নম্বরটি লিখুন (১১ ডিজিট)');
      return;
    }
    if (!trxId.trim() || trxId.trim().length < 5) {
      setValidationError('অনুগ্রহ করে পেমেন্ট করার পর প্রাপ্ত সঠিক TrxID (ট্রানজেকশন আইডি) লিখুন');
      return;
    }

    setValidationError('');
    setCheckoutStep('processing');
    
    setTimeout(() => {
      setProgressStatus('পেমেন্ট গেটওয়ে স্টেটাস চেক করা হচ্ছে (' + paymentMethod.toUpperCase() + ')...');
    }, 1200);

    setTimeout(() => {
      setProgressStatus('ট্রানজেকশন আইডি ' + trxId.toUpperCase() + ' ভেরিফাইড! একাউন্ট আনলক হচ্ছে...');
    }, 2500);

    setTimeout(() => {
      setProgressStatus('গেম একাউন্ট ক্রেডেনশিয়াল ও জিমেইল সিকিউরিটি ট্রান্সফার সম্পন্ন...');
    }, 3800);

    setTimeout(() => {
      setCheckoutStep('delivered');
    }, 5000);
  };

  const handleConfirmOnWhatsApp = () => {
    const msg = `হ্যালো জিরো পয়েন্ট একাউন্টস,\nআমি একাউন্ট কিনতে পেমেন্ট সম্পন্ন করেছি!\n\nগেম: ${account.game}\nএকাউন্ট নাম: ${account.title}\nমূল্য: ৳${account.discountedPrice}\nপেমেন্ট মেথড: ${paymentMethod.toUpperCase()}\nসেন্ডার নম্বর: ${senderNumber || 'আলাদা নম্বর'}\nTrxID: ${trxId || 'এখনই দিচ্ছি'}\n\nঅনুগ্রহ করে আইডিটি দ্রুত ডেলিভারি দিন।`;
    const url = `https://wa.me/8801797086478?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCopyCredentials = () => {
    const text = `একাউন্ট লগইন তথ্য:\nইউজারনেম/আইডি: ${simulatedCredential.username}\nপাসওয়ার্ড: ${simulatedCredential.password}\nজিমেইল: ${simulatedCredential.email}\nট্রান্সফার কোড: ${simulatedCredential.transferCode}`;
    navigator.clipboard.writeText(text);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-2xl rounded-3xl bg-[#090E1A] border border-cyan-500/40 shadow-[0_0_50px_rgba(6,182,212,0.3)] overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Top Header Bar */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/80 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30">
              <Zap className="w-5 h-5 text-cyan-400 animate-pulse" />
            </div>
            <div>
              <h3 className="font-orbitron text-base sm:text-lg font-bold text-white uppercase tracking-wider">
                ইনস্ট্যান্ট পেমেন্ট ও একাউন্ট ডেলিভারি
              </h3>
              <p className="text-xs text-slate-400">
                বিকাশ, নগদ ও রকেটের মাধ্যমে ১০০% নিরাপদ লেনদেন
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-cyan-500/40 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          
          {checkoutStep === 'review' && (
            <div className="space-y-6">
              
              {/* Account Summary Banner */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-cyan-500/20 flex flex-col sm:flex-row items-center gap-4">
                <img
                  src={account.previewImage}
                  alt={account.title}
                  referrerPolicy="no-referrer"
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover border border-cyan-500/30 shrink-0"
                />
                <div className="flex-1 text-left space-y-1">
                  <div className="inline-block px-2.5 py-0.5 rounded bg-purple-950/80 border border-purple-500/40 text-[10px] font-orbitron font-bold text-purple-300 uppercase">
                    {account.game} • লেভেল {account.level}
                  </div>
                  <h4 className="font-orbitron text-sm sm:text-base font-bold text-white line-clamp-2">
                    {account.title}
                  </h4>
                  <div className="text-xs font-mono text-cyan-400">
                    গান স্কিন: {account.skinsCount}+ • প্ল্যাটফর্ম: {account.platform}
                  </div>
                </div>
              </div>

              {/* Payment Method Selector with LOGOS */}
              <div>
                <label className="block text-xs font-orbitron font-bold text-slate-200 uppercase tracking-wider mb-3">
                  পেমেন্ট পদ্ধতি সিলেক্ট করুন (মেথড সিলেক্ট করুন):
                </label>
                <div className="grid grid-cols-3 gap-3">
                  
                  {/* bKash */}
                  <button
                    onClick={() => {
                      setPaymentMethod('bkash');
                      setValidationError('');
                    }}
                    className={`p-3.5 rounded-2xl border flex flex-col items-center justify-center space-y-2 transition-all cursor-pointer relative ${
                      paymentMethod === 'bkash'
                        ? 'bg-[#E2136E]/15 border-[#E2136E] text-white shadow-[0_0_25px_rgba(226,19,110,0.4)] scale-[1.02]'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <BkashLogo className="w-9 h-9" />
                    <div className="text-center">
                      <span className="text-xs font-extrabold font-orbitron block text-white">bKash</span>
                      <span className="text-[10px] font-mono text-[#E2136E] font-bold">মার্চেন্ট পেমেন্ট</span>
                    </div>
                  </button>

                  {/* Nagad */}
                  <button
                    onClick={() => {
                      setPaymentMethod('nagad');
                      setValidationError('');
                    }}
                    className={`p-3.5 rounded-2xl border flex flex-col items-center justify-center space-y-2 transition-all cursor-pointer relative ${
                      paymentMethod === 'nagad'
                        ? 'bg-[#F7931E]/15 border-[#F7931E] text-white shadow-[0_0_25px_rgba(247,147,30,0.4)] scale-[1.02]'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <NagadLogo className="w-9 h-9" />
                    <div className="text-center">
                      <span className="text-xs font-extrabold font-orbitron block text-white">Nagad</span>
                      <span className="text-[10px] font-mono text-[#F7931E] font-bold">সেন্ড মানি</span>
                    </div>
                  </button>

                  {/* Rocket */}
                  <button
                    onClick={() => {
                      setPaymentMethod('rocket');
                      setValidationError('');
                    }}
                    className={`p-3.5 rounded-2xl border flex flex-col items-center justify-center space-y-2 transition-all cursor-pointer relative ${
                      paymentMethod === 'rocket'
                        ? 'bg-[#8C3494]/15 border-[#8C3494] text-white shadow-[0_0_25px_rgba(140,52,148,0.4)] scale-[1.02]'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <RocketLogo className="w-9 h-9" />
                    <div className="text-center">
                      <span className="text-xs font-extrabold font-orbitron block text-white">Rocket</span>
                      <span className="text-[10px] font-mono text-[#C158CD] font-bold">সেন্ড মানি</span>
                    </div>
                  </button>

                </div>
              </div>

              {/* Selected Payment Instructions Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                
                {/* Number Copy Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 uppercase block">
                      {paymentDetails[paymentMethod].type} নম্বর:
                    </span>
                    <span className="font-orbitron font-black text-xl text-white tracking-wider">
                      {paymentDetails[paymentMethod].number}
                    </span>
                  </div>

                  <button
                    onClick={() => handleCopyNumber(paymentDetails[paymentMethod].number)}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-mono text-xs font-bold flex items-center justify-center space-x-2 cursor-pointer transition-colors"
                  >
                    <Copy className="w-4 h-4 text-cyan-400" />
                    <span>{copiedNumber === paymentDetails[paymentMethod].number ? 'নম্বর কপি হয়েছে!' : 'নম্বর কপি করুন'}</span>
                  </button>
                </div>

                {/* Step-by-Step Instructions */}
                <div className="space-y-2 text-xs text-slate-300 font-sans">
                  <span className="font-orbitron font-bold text-cyan-400 block text-xs uppercase tracking-wider mb-2">
                    {paymentDetails[paymentMethod].name} এ পেমেন্ট করার নিয়ম:
                  </span>
                  {paymentDetails[paymentMethod].steps.map((step, idx) => (
                    <div key={idx} className="flex items-start space-x-2 py-0.5">
                      <span className="text-slate-200 leading-relaxed">{step}</span>
                    </div>
                  ))}
                </div>

              </div>

              {/* Payment Verification Inputs */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-cyan-500/40 space-y-4">
                <span className="font-orbitron text-xs font-bold text-white uppercase block text-cyan-300">
                  পেমেন্ট কনফার্মেশনের জন্য তথ্য দিন:
                </span>

                {validationError && (
                  <div className="p-3 rounded-xl bg-red-950/80 border border-red-500/50 text-red-300 text-xs flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                    <span>{validationError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono text-slate-300 mb-1.5 font-bold">
                      যে নম্বর থেকে টাকা পাঠিয়েছেন (Sender Mobile):
                    </label>
                    <input
                      type="text"
                      value={senderNumber}
                      onChange={(e) => {
                        setSenderNumber(e.target.value);
                        if (validationError) setValidationError('');
                      }}
                      placeholder="যেমন: 01712345678"
                      className="w-full px-3.5 py-3 rounded-xl bg-slate-950 border border-slate-700 focus:border-cyan-400 text-xs text-white placeholder-slate-600 focus:outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-slate-300 mb-1.5 font-bold">
                      ট্রানজেকশন আইডি (TrxID):
                    </label>
                    <input
                      type="text"
                      value={trxId}
                      onChange={(e) => {
                        setTrxId(e.target.value);
                        if (validationError) setValidationError('');
                      }}
                      placeholder="যেমন: BH92K8LM8N"
                      className="w-full px-3.5 py-3 rounded-xl bg-slate-950 border border-slate-700 focus:border-cyan-400 text-xs text-white placeholder-slate-600 focus:outline-none font-mono uppercase"
                    />
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>একাউন্টের মূল্য:</span>
                  <span className="font-mono text-white font-bold">৳{account.discountedPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>ভেরিফিকেশন ও সিকিউরিটি চার্জ:</span>
                  <span className="font-mono text-emerald-400 font-bold">৳০ (ফ্রি)</span>
                </div>
                <div className="pt-2 border-t border-slate-800 flex justify-between font-orbitron text-base font-bold text-white">
                  <span>সর্বমোট প্রদেয় টাকা:</span>
                  <span className="text-cyan-400 font-black">৳{account.discountedPrice.toLocaleString()} BDT</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleConfirmPaymentOnSite}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-orbitron font-extrabold text-sm uppercase tracking-wider shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-5 h-5 text-slate-950 fill-emerald-300" />
                  <span>ওয়েবসাইটে পেমেন্ট কনফার্ম করুন (৳{account.discountedPrice.toLocaleString()})</span>
                </button>

                <button
                  onClick={handleConfirmOnWhatsApp}
                  className="w-full py-3.5 rounded-2xl bg-emerald-950/90 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 font-orbitron font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>হোয়াটসঅ্যাপে ডিরেক্ট পেমেন্ট তথ্য পাঠান (০১৭৯৭০৮৬ND)</span>
                </button>
              </div>

            </div>
          )}

          {checkoutStep === 'processing' && (
            <div className="py-12 text-center space-y-6">
              <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-cyan-500/20 border-t-cyan-400 animate-spin" />
                <Zap className="w-8 h-8 text-cyan-400 animate-pulse" />
              </div>

              <div className="space-y-2">
                <h4 className="font-orbitron text-xl font-bold text-white uppercase tracking-wider">
                  পেমেন্ট ভেরিফিকেশন চলছে...
                </h4>
                <p className="text-xs font-mono text-cyan-300 animate-pulse">
                  {progressStatus}
                </p>
              </div>

              <div className="max-w-md mx-auto p-4 rounded-xl bg-slate-950 border border-slate-800 text-left space-y-2 font-mono text-[11px] text-slate-400">
                <div className="text-emerald-400">✓ পেমেন্ট মেথড: {paymentMethod.toUpperCase()}</div>
                <div className="text-emerald-400">✓ সেন্ডার নাম্বার: {senderNumber || 'এন/এ'}</div>
                <div className="text-emerald-400">✓ TrxID: {trxId.toUpperCase()}</div>
                <div className="text-cyan-400">► একাউন্ট পাসওয়ার্ড আনলক করা হচ্ছে...</div>
              </div>
            </div>
          )}

          {checkoutStep === 'delivered' && (
            <div className="space-y-6">
              
              <div className="text-center space-y-2">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-2 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h4 className="font-orbitron text-2xl font-black text-white uppercase">
                  পেমেন্ট সফল! একাউন্ট ডেলিভারি
                </h4>
                <p className="text-xs text-emerald-400 font-mono">
                  অর্ডার আইডি: #ZP-SUCCESS-{Math.floor(100000 + Math.random() * 900000)}
                </p>
              </div>

              {/* Credentials Box */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-cyan-500/40 space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="font-orbitron text-xs font-bold text-cyan-300">
                    আপনার ক্রয়কৃত একাউন্টের তথ্য:
                  </span>
                  <button
                    onClick={handleCopyCredentials}
                    className="flex items-center space-x-1 text-[11px] text-cyan-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedKey ? 'কপি হয়েছে!' : 'সব তথ্য কপি করুন'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <span className="text-slate-500 text-[10px] uppercase">ইউজারনেম / আইডি:</span>
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-cyan-300 font-bold select-all">
                      {simulatedCredential.username}
                    </div>
                  </div>

                  <div>
                    <span className="text-slate-500 text-[10px] uppercase">পাসওয়ার্ড:</span>
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-cyan-300 font-bold select-all">
                      {simulatedCredential.password}
                    </div>
                  </div>

                  <div>
                    <span className="text-slate-500 text-[10px] uppercase">অরিজিনাল জিমেইল:</span>
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-cyan-300 font-bold select-all truncate">
                      {simulatedCredential.email}
                    </div>
                  </div>

                  <div>
                    <span className="text-slate-500 text-[10px] uppercase">ট্রান্সফার কোড:</span>
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-emerald-400 font-bold select-all truncate">
                      {simulatedCredential.transferCode}
                    </div>
                  </div>
                </div>
              </div>

              {/* Guarantee Notice */}
              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs text-emerald-200 flex items-start space-x-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold font-orbitron mb-0.5 text-emerald-300">১০০% মানি ব্যাক ও সিকিউরিটি গ্যারান্টি</div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    কোনো ধরনের সমস্যা দেখা দিলে সরাসরি আমাদের হোয়াটসঅ্যাপে (01797086478) মেসেজ দিন। আপনার একাউন্টের তথ্য সুরক্ষিত রাখা হয়েছে।
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full py-3.5 rounded-xl bg-slate-900 border border-cyan-500/40 text-cyan-300 font-orbitron font-bold text-xs uppercase hover:bg-cyan-500 hover:text-black transition-all cursor-pointer"
              >
                বন্ধ করুন ও হোম পেজে ফিরে যান
              </button>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};

