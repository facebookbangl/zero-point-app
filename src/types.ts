export type GameCategory = 'all' | 'valorant' | 'cs2' | 'league' | 'fortnite' | 'genshin';

export interface GamingAccount {
  id: string;
  title: string;
  game: 'Valorant' | 'Counter-Strike 2' | 'League of Legends' | 'Fortnite' | 'Genshin Impact';
  category: GameCategory;
  previewImage: string;
  videoUrl?: string;
  level: number;
  rankBadge: string;
  likes: number;
  platform: 'PC' | 'Riot' | 'Steam' | 'Console' | 'Multi-Platform';
  regions: ('NA' | 'EU' | 'AP' | 'LATAM' | 'GLOBAL')[];
  evolutionTags: string[];
  discountedPrice: number;
  originalPrice: number;
  isPremium: boolean;
  featured: boolean;
  skinsCount: number;
  rareItems: string[];
  inventoryHighlights: string[];
  instantDelivery: boolean;
  sellerRating: number;
  status?: 'approved' | 'pending' | 'rejected';
  sellerContact?: string;
  submittedBy?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  recommendedAccounts?: GamingAccount[];
}

export type LanguageCode = 'BN' | 'EN';

export interface RecentSale {
  id: string;
  buyer: string;
  accountTitle: string;
  game: string;
  price: number;
  timeAgo: string;
  deliveryTime: string;
}
