import { createClient } from '@supabase/supabase-js';
import type { Product, ProductPrice, Banner } from '@/types';

const supabaseUrl = "https://wolhksrjrossztdsuuly.supabase.co";
const supabaseKey = "sb_publishable_UltwN-C9DGrlNgiFzu1Auw_V5MY-Mos";

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

// Banner functions
export const getBanners = async () => {
  const { data, error } = await supabase
    .from('banners')
    .select('*')
    .order('created_at', { ascending: false });
  return { data: data as Banner[] | null, error };
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
