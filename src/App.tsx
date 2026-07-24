import React, { useState } from 'react';
import { INITIAL_ACCOUNTS, RECENT_SALES_DATA } from './data/accounts';
import { GamingAccount, LanguageCode } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { VaultSection } from './components/VaultSection';
import { CustomerReviews } from './components/CustomerReviews';
import { HowItWorks } from './components/HowItWorks';
import { SellAccountSection } from './components/SellAccountSection';
import { Footer } from './components/Footer';
import { CheckoutModal } from './components/CheckoutModal';
import { QuickViewModal } from './components/QuickViewModal';
import { AuthModal } from './components/AuthModal';
import { SellAccountModal } from './components/SellAccountModal';
import { ExtraSectionsModal } from './components/ExtraSectionsModal';
import { AIAssistantChat } from './components/AIAssistantChat';
import { AdminPanelModal } from './components/AdminPanelModal';

const ADMIN_EMAIL = 'jibonchowdhury.personal@gmail.com';

export default function App() {
  const [accounts, setAccounts] = useState<GamingAccount[]>(() => {
    const saved = localStorage.getItem('zp_gaming_accounts');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch (e) {
        console.error('Failed to load accounts from storage', e);
      }
    }
    return INITIAL_ACCOUNTS;
  });

  // Save to localStorage when accounts state changes
  React.useEffect(() => {
    localStorage.setItem('zp_gaming_accounts', JSON.stringify(accounts));
  }, [accounts]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentLang, setCurrentLang] = useState<LanguageCode>('BN');
  const [selectedForCheckout, setSelectedForCheckout] = useState<GamingAccount | null>(null);
  const [selectedForQuickView, setSelectedForQuickView] = useState<GamingAccount | null>(null);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register' | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [activeExtraModal, setActiveExtraModal] = useState<'tutorials' | 'affiliate' | 'api' | null>(null);

  const isAdmin = userEmail?.toLowerCase() === ADMIN_EMAIL.toLowerCase();

  const handleLoginSuccess = (email: string) => {
    setUserEmail(email);
  };

  const handleLogout = () => {
    setUserEmail(null);
    setIsAdminPanelOpen(false);
  };

  const handleAddAccount = (newAccount: GamingAccount) => {
    setAccounts(prev => [newAccount, ...prev]);
  };

  const handleUpdateAccount = (updatedAccount: GamingAccount) => {
    setAccounts(prev => prev.map(a => a.id === updatedAccount.id ? updatedAccount : a));
  };

  const handleApproveAccount = (accountId: string) => {
    setAccounts(prev => prev.map(a => a.id === accountId ? { ...a, status: 'approved' } : a));
  };

  const handleRemoveAccount = (accountId: string) => {
    setAccounts(prev => prev.filter(a => a.id !== accountId));
  };

  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#070B14] text-slate-100 flex flex-col font-['Inter',sans-serif] selection:bg-cyan-500 selection:text-black relative">
      
      {/* Top Header Navigation */}
      <Header
        currentLang={currentLang}
        onSelectLang={(lang) => setCurrentLang(lang)}
        onOpenAuth={(mode) => setAuthModalMode(mode)}
        onOpenSellModal={() => setIsSellModalOpen(true)}
        onOpenExtraModal={(tab) => setActiveExtraModal(tab)}
        onNavigateSection={handleNavigateSection}
        onOpenAdminPanel={() => setIsAdminPanelOpen(true)}
        userEmail={userEmail}
        isAdmin={isAdmin}
        onLogout={handleLogout}
      />

      {/* Main Content Areas */}
      <main className="flex-1">
        
        {/* Hero Section */}
        <Hero
          searchQuery={searchQuery}
          onSearchChange={(q) => setSearchQuery(q)}
          onBrowseClick={() => handleNavigateSection('vault')}
          onOpenSellModal={() => setIsSellModalOpen(true)}
          totalAccountCount={accounts.length}
        />

        {/* Featured Marketplace Section - THE VAULT SHOWCASE */}
        <VaultSection
          accounts={accounts}
          searchQuery={searchQuery}
          onBuyNow={(acc) => setSelectedForCheckout(acc)}
          onQuickView={(acc) => setSelectedForQuickView(acc)}
        />

        {/* Customer Reviews Section */}
        <CustomerReviews />

        {/* Dedicated Account Sale Section */}
        <SellAccountSection
          onOpenSellModal={() => setIsSellModalOpen(true)}
        />

        {/* How It Works Section */}
        <HowItWorks />

      </main>

      {/* Footer */}
      <Footer
        onOpenExtraModal={(tab) => setActiveExtraModal(tab)}
        onNavigateSection={handleNavigateSection}
      />

      {/* Floating WhatsApp Quick Contact Button */}
      <AIAssistantChat />

      {/* Modals & Overlays */}
      {selectedForCheckout && (
        <CheckoutModal
          account={selectedForCheckout}
          onClose={() => setSelectedForCheckout(null)}
        />
      )}

      {selectedForQuickView && (
        <QuickViewModal
          account={selectedForQuickView}
          onClose={() => setSelectedForQuickView(null)}
          onBuyNow={(acc) => {
            setSelectedForQuickView(null);
            setSelectedForCheckout(acc);
          }}
        />
      )}

      {authModalMode && (
        <AuthModal
          mode={authModalMode}
          onClose={() => setAuthModalMode(null)}
          onSwitchMode={(mode) => setAuthModalMode(mode)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {isSellModalOpen && (
        <SellAccountModal
          onAddAccount={handleAddAccount}
          userEmail={userEmail}
          onClose={() => setIsSellModalOpen(false)}
        />
      )}

      {isAdminPanelOpen && (
        <AdminPanelModal
          accounts={accounts}
          onAddAccount={handleAddAccount}
          onUpdateAccount={handleUpdateAccount}
          onApproveAccount={handleApproveAccount}
          onRemoveAccount={handleRemoveAccount}
          onClose={() => setIsAdminPanelOpen(false)}
        />
      )}

      {activeExtraModal && (
        <ExtraSectionsModal
          activeTab={activeExtraModal}
          onClose={() => setActiveExtraModal(null)}
        />
      )}

    </div>
  );
}
