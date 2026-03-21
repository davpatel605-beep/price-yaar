import { createClient } from '@supabase/supabase-js';
import type { Product, ProductPrice, Banner } from '@/types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Auth functions
export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });
  return { data, error };
};

export const signInWithApple = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'apple',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

// Product functions
export const getProducts = async (category?: string, search?: string) => {
  let query = supabase.from('products').select('*');
  
  if (category && category !== 'all') {
    query = query.eq('category', category);
  }
  
  if (search) {
    query = query.ilike('name', `%${search}%`);
  }
  
  const { data, error } = await query.order('created_at', { ascending: false });
  return { data: data as Product[] | null, error };
};

export const getProductById = async (id: string) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();
  return { data: data as Product | null, error };
};

export const getProductPrices = async (productId: string) => {
  const { data, error } = await supabase
    .from('product_prices')
    .select('*')
    .eq('product_id', productId)
    .order('price', { ascending: true });
  return { data: data as ProductPrice[] | null, error };
};

export const createProduct = async (product: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('products')
    .insert(product)
    .select()
    .single();
  return { data: data as Product | null, error };
};

export const updateProduct = async (id: string, product: Partial<Product>) => {
  const { data, error } = await supabase
    .from('products')
    .update(product)
    .eq('id', id)
    .select()
    .single();
  return { data: data as Product | null, error };
};

export const deleteProduct = async (id: string) => {
  const { error } = await supabase.from('products').delete().eq('id', id);
  return { error };
};

export const addProductPrice = async (price: Omit<ProductPrice, 'id' | 'created_at'>) => {
  const { data, error } = await supabase
    .from('product_prices')
    .insert(price)
    .select()
    .single();
  return { data: data as ProductPrice | null, error };
};

export const updateProductPrice = async (id: string, price: Partial<ProductPrice>) => {
  const { data, error } = await supabase
    .from('product_prices')
    .update(price)
    .eq('id', id)
    .select()
    .single();
  return { data: data as ProductPrice | null, error };
};

export const deleteProductPrice = async (id: string) => {
  const { error } = await supabase.from('product_prices').delete().eq('id', id);
  return { error };
};

// Banner functions
export const getBanners = async () => {
  const { data, error } = await supabase
    .from('banners')
    .select('*')
    .order('created_at', { ascending: false });
  return { data: data as Banner[] | null, error };
};

export const createBanner = async (banner: Omit<Banner, 'id'>) => {
  const { data, error } = await supabase
    .from('banners')
    .insert(banner)
    .select()
    .single();
  return { data: data as Banner | null, error };
};

export const updateBanner = async (id: string, banner: Partial<Banner>) => {
  const { data, error } = await supabase
    .from('banners')
    .update(banner)
    .eq('id', id)
    .select()
    .single();
  return { data: data as Banner | null, error };
};

export const deleteBanner = async (id: string) => {
  const { error } = await supabase.from('banners').delete().eq('id', id);
  return { error };
};

// Upload image
export const uploadImage = async (file: File, bucket: string = 'products') => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
  
  const { error } = await supabase.storage
    .from(bucket)
    .upload(fileName, file);
  
  if (error) return { error };
  
  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(fileName);
  
  return { url: publicUrl, error: null };
};
