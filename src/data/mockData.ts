import type { Product, ProductPrice, Banner, Category } from '@/types';

export const categories: Category[] = [
  { id: '1', name: 'Electronics', icon: 'Smartphone', color: '#3B82F6' },
  { id: '2', name: 'Fashion', icon: 'Shirt', color: '#EC4899' },
  { id: '3', name: 'Home', icon: 'Home', color: '#10B981' },
  { id: '4', name: 'Appliances', icon: 'Refrigerator', color: '#F59E0B' },
  { id: '5', name: 'Mobiles', icon: 'Smartphone', color: '#8B5CF6' },
  { id: '6', name: 'Laptops', icon: 'Laptop', color: '#EF4444' },
  { id: '7', name: 'Beauty', icon: 'Sparkles', color: '#EC4899' },
  { id: '8', name: 'Sports', icon: 'Dumbbell', color: '#06B6D4' },
];

export const banners: Banner[] = [
  {
    id: '1',
    title: 'Best Deals on Electronics',
    subtitle: 'Up to 50% off on top brands',
    image: 'https://images.unsplash.com/photo-1498049860654-af1a5c5668ba?w=1200',
    link: '/category/electronics',
    bgColor: 'from-blue-600 to-blue-800',
  },
  {
    id: '2',
    title: 'Summer Fashion Sale',
    subtitle: 'Trendy styles at best prices',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200',
    link: '/category/fashion',
    bgColor: 'from-pink-500 to-rose-600',
  },
  {
    id: '3',
    title: 'Home Appliances',
    subtitle: 'Make your home smarter',
    image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200',
    link: '/category/appliances',
    bgColor: 'from-amber-500 to-orange-600',
  },
];

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max',
    description: 'The most advanced iPhone with A17 Pro chip, titanium design, and 48MP camera system.',
    category: 'Mobiles',
    image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?w=600',
  },
  {
    id: '2',
    name: 'Samsung Galaxy S24 Ultra',
    description: 'Experience the future with AI-powered features and S Pen functionality.',
    category: 'Mobiles',
    image: 'https://images.unsplash.com/photo-1610945265078-3858a0828671?w=600',
  },
  {
    id: '3',
    name: 'MacBook Pro 16" M3',
    description: 'Supercharged by M3 Max chip for the most demanding workflows.',
    category: 'Laptops',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca4?w=600',
  },
  {
    id: '4',
    name: 'Sony WH-1000XM5',
    description: 'Industry-leading noise canceling headphones with exceptional sound quality.',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600',
  },
  {
    id: '5',
    name: 'Nike Air Max 270',
    description: 'Iconic style meets incredible comfort with the largest Air heel yet.',
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600',
  },
  {
    id: '6',
    name: 'Dyson V15 Detect',
    description: 'Laser reveals microscopic dust. The most powerful, intelligent Dyson vacuum.',
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=600',
  },
  {
    id: '7',
    name: 'LG 55" OLED C4',
    description: 'Stunning OLED picture quality with perfect blacks and infinite contrast.',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600',
  },
  {
    id: '8',
    name: 'Adidas Ultraboost 23',
    description: 'Ultimate energy return with Boost technology for your best run yet.',
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=600',
  },
];

export const mockProductPrices: ProductPrice[] = [
  // iPhone 15 Pro Max
  { id: '1', product_id: '1', platform_name: 'Amazon', price: 159900, link: 'https://amazon.in', is_best_seller: true },
  { id: '2', product_id: '1', platform_name: 'Flipkart', price: 156999, link: 'https://flipkart.com', is_best_seller: false },
  { id: '3', product_id: '1', platform_name: 'Tata Cliq', price: 158500, link: 'https://tatacliq.com', is_best_seller: false },
  
  // Samsung Galaxy S24 Ultra
  { id: '4', product_id: '2', platform_name: 'Amazon', price: 129999, link: 'https://amazon.in', is_best_seller: false },
  { id: '5', product_id: '2', platform_name: 'Flipkart', price: 127999, link: 'https://flipkart.com', is_best_seller: true },
  { id: '6', product_id: '2', platform_name: 'Myntra', price: 131000, link: 'https://myntra.com', is_best_seller: false },
  
  // MacBook Pro 16" M3
  { id: '7', product_id: '3', platform_name: 'Amazon', price: 299900, link: 'https://amazon.in', is_best_seller: true },
  { id: '8', product_id: '3', platform_name: 'Flipkart', price: 294999, link: 'https://flipkart.com', is_best_seller: false },
  { id: '9', product_id: '3', platform_name: 'Tata Cliq', price: 297000, link: 'https://tatacliq.com', is_best_seller: false },
  
  // Sony WH-1000XM5
  { id: '10', product_id: '4', platform_name: 'Amazon', price: 29990, link: 'https://amazon.in', is_best_seller: false },
  { id: '11', product_id: '4', platform_name: 'Flipkart', price: 27999, link: 'https://flipkart.com', is_best_seller: true },
  { id: '12', product_id: '4', platform_name: 'Myntra', price: 28500, link: 'https://myntra.com', is_best_seller: false },
  
  // Nike Air Max 270
  { id: '13', product_id: '5', platform_name: 'Amazon', price: 12995, link: 'https://amazon.in', is_best_seller: false },
  { id: '14', product_id: '5', platform_name: 'Flipkart', price: 11999, link: 'https://flipkart.com', is_best_seller: false },
  { id: '15', product_id: '5', platform_name: 'Myntra', price: 11499, link: 'https://myntra.com', is_best_seller: true },
  
  // Dyson V15
  { id: '16', product_id: '6', platform_name: 'Amazon', price: 59900, link: 'https://amazon.in', is_best_seller: true },
  { id: '17', product_id: '6', platform_name: 'Flipkart', price: 58999, link: 'https://flipkart.com', is_best_seller: false },
  { id: '18', product_id: '6', platform_name: 'Tata Cliq', price: 59500, link: 'https://tatacliq.com', is_best_seller: false },
  
  // LG OLED
  { id: '19', product_id: '7', platform_name: 'Amazon', price: 149999, link: 'https://amazon.in', is_best_seller: false },
  { id: '20', product_id: '7', platform_name: 'Flipkart', price: 144999, link: 'https://flipkart.com', is_best_seller: true },
  { id: '21', product_id: '7', platform_name: 'Tata Cliq', price: 147500, link: 'https://tatacliq.com', is_best_seller: false },
  
  // Adidas Ultraboost
  { id: '22', product_id: '8', platform_name: 'Amazon', price: 16999, link: 'https://amazon.in', is_best_seller: false },
  { id: '23', product_id: '8', platform_name: 'Flipkart', price: 15999, link: 'https://flipkart.com', is_best_seller: false },
  { id: '24', product_id: '8', platform_name: 'Myntra', price: 15499, link: 'https://myntra.com', is_best_seller: true },
];

// Helper function to get products with prices
export const getProductsWithPrices = () => {
  return mockProducts.map(product => {
    const prices = mockProductPrices.filter(p => p.product_id === product.id);
    const lowestPrice = prices.length > 0 ? Math.min(...prices.map(p => p.price)) : 0;
    const originalPrice = prices.length > 0 ? Math.max(...prices.map(p => p.price)) : 0;
    const discount = originalPrice > 0 ? Math.round(((originalPrice - lowestPrice) / originalPrice) * 100) : 0;
    
    return {
      ...product,
      prices,
      lowestPrice,
      discount,
    };
  });
};

// Mock auth user
export const mockUser = {
  id: '1',
  email: 'admin@priceyaar.com',
  name: 'Admin User',
  avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff',
  is_admin: true,
};
