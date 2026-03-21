// Product Types
export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  created_at?: string;
  updated_at?: string;
}

export interface ProductPrice {
  id: string;
  product_id: string;
  platform_name: string;
  price: number;
  link: string;
  is_best_seller: boolean;
  created_at?: string;
}

export interface ProductWithPrices extends Product {
  prices: ProductPrice[];
  lowestPrice?: number;
  discount?: number;
}

// Category Types
export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

// Banner Types
export interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  link?: string;
  bgColor: string;
}

// User Types
export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  is_admin: boolean;
}

// Chat Types
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// Platform Types
export type Platform = 'Amazon' | 'Flipkart' | 'Myntra' | 'Tata Cliq' | 'Nykaa';

export interface PlatformPrice {
  platform: Platform;
  price: number;
  link: string;
  isBestSeller: boolean;
}
