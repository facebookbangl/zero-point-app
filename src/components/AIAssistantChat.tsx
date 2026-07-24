import React from 'react';
import { ExternalLink } from 'lucide-react';

export const AIAssistantChat: React.FC = () => {
  const whatsappNumber = '8801797086478';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hello Zero Point Accounts, I want to inquire about gaming accounts!')}`;

  const handleOpenWhatsApp = () => {
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center group">
      
      {/* Tooltip / Label Badge on Hover */}
      <div 
        onClick={handleOpenWhatsApp}
        className="hidden sm:flex items-center space-x-2 mr-3 px-3.5 py-2 rounded-2xl bg-emerald-950/90 border border-emerald-500/50 text-emerald-300 font-mono text-xs shadow-[0_0_20px_rgba(16,185,129,0.3)] backdrop-blur-md cursor-pointer hover:bg-emerald-900 transition-all opacity-90 hover:opacity-100"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="font-bold tracking-wide">WhatsApp Support: 01797086478</span>
        <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
      </div>

      {/* Floating Glowing Circular WhatsApp Button */}
      <button
        onClick={handleOpenWhatsApp}
        title="Chat on WhatsApp (01797086478)"
        className="relative group flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-600 via-green-500 to-emerald-400 p-[2px] shadow-[0_0_30px_rgba(16,185,129,0.7)] hover:shadow-[0_0_50px_rgba(16,185,129,1)] hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
      >
        <span className="w-full h-full rounded-full bg-[#070B14] group-hover:bg-emerald-600/20 flex items-center justify-center relative overflow-hidden transition-colors">
          {/* WhatsApp SVG Icon */}
          <svg className="w-8 h-8 fill-emerald-400 group-hover:fill-white transition-colors duration-300" viewBox="0 0 24 24">
            <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.758.459 3.474 1.33 4.982l-1.413 5.16 5.283-1.385a9.947 9.947 0 004.788 1.229h.005c5.505 0 9.988-4.478 9.989-9.984 0-2.668-1.038-5.176-2.925-7.062A9.925 9.925 0 0012.012 2zm5.922 14.153c-.244.688-1.42 1.314-1.961 1.398-.541.085-1.246.121-3.593-.85-2.996-1.24-4.927-4.282-5.076-4.481-.149-.2-1.213-1.614-1.213-3.078 0-1.464.767-2.185 1.04-2.482.272-.297.596-.372.793-.372.198 0 .396.002.569.011.183.009.431-.07.674.514.243.584.828 2.02.9 2.169.073.149.123.322.024.519-.098.198-.148.322-.296.495-.149.173-.312.387-.446.52-.149.149-.304.312-.131.609.173.297.771 1.272 1.654 2.059 1.135 1.011 2.093 1.325 2.39 1.473.297.149.47.124.643-.074.173-.198.742-.866.94-1.163.198-.297.396-.248.668-.149.272.099 1.731.816 2.028.965.297.149.495.223.569.347.074.124.074.718-.17 1.406z" />
          </svg>
          <span className="absolute top-2 right-2 w-3.5 h-3.5 bg-emerald-400 rounded-full animate-ping" />
          <span className="absolute top-2 right-2 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-[#070B14]" />
        </span>
      </button>

    </div>
  );
};
