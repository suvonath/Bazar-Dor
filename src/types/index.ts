export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  emoji: string;
  unit: string;
  currentPrice: number;
  changePercentage: number;
  changeType: 'up' | 'down' | 'flat';
  markets?: {
    marketName: string;
    division: string;
    minPrice: number;
    maxPrice: number;
    avgPrice: number;
  }[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
}