import { useState, useEffect, useCallback } from 'react';
import { createClient } from "@supabase/supabase-js";
import { SplashScreen } from '@/components/SplashScreen';
import { Navbar } from '@/components/Navbar';
import { HeroBanner } from '@/components/HeroBanner';
import { CategoryGrid } from '@/components/CategoryGrid';
import { PlatformStrip } from '@/components/PlatformStrip';
import { ProductListing } from '@/components/ProductListing';
import { ProductDetail } from '@/components/ProductDetail';
import { ChatAssistant } from '@/components/ChatAssistant';
import { AdminPanel } from '@/components/AdminPanel';
import { AuthModal } from '@/components/AuthModal';
import { ComingSoonModal } from '@/components/ComingSoonModal';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';
import { categories, banners, getProductsWithPrices } from '@/data/mockData';
import type { Product, ProductPrice, ProductWithPrices, User } from '@/types';
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://wolhksrjrossztdsuuly.supabase.co","sb_publishable_UltwN-C9DGrlNgiFzu1Auw_V5MY-Mos");

type Page = 'home' | 'product' | 'admin';

function App() {
  const [products, setProducts] = useState([]);
  console.log("APP RUNNING");
  useEffect(() => {
   async function fetchProducts() {
    const { data, error } = await supabase
      .from("products")
      .select("*");

    if (error) {
      console.log("ERROR:", error);
    } else {
      console.log("DATA:", data);
      setProducts(data);
    }
  }

  fetchProducts();
}, []);

return (
  <div>
    <h1>Products</h1>

    {products.map((item, index) => (
      <div key={index} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
        
        <h2>{item["Product Name"]}</h2>

        <p>Price: ₹{item["Price"]}</p>

        <p>Rating: {item["Product Rating"]}</p>

        <img 
          src={item["Product Image"]} 
          alt={item["Product Name"]} 
          width="150"
        />

        <br />

        <a href={item["Product URL"]} target="_blank">
          Buy Now
        </a>

      </div>
    ))}
  </div>
);

  // App state
  const [showSplash, setShowSplash] = useState(true);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedProduct, setSelectedProduct] = useState<ProductWithPrices | null>(null);
  
  // Data state
  const [products, setProducts] = useState<Product[]>([]);
  const [productPrices, setProductPrices] = useState<ProductPrice[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductWithPrices[]>(getProductsWithPrices());
  
  // Filter state
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Auth state
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
  // Coming soon modal
  const [comingSoonFeature, setComingSoonFeature] = useState<string | null>(null);

  // Handle splash screen completion
  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
  }, []);

  // Filter products based on category and search
  useEffect(() => {
    let filtered = getProductsWithPrices();
    
    if (selectedCategory && selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredProducts(filtered);
  }, [selectedCategory, searchQuery, products, productPrices]);

  // Navigation handlers
  const navigateToHome = useCallback(() => {
    setCurrentPage('home');
    setSelectedProduct(null);
  }, []);

  const navigateToProduct = useCallback((product: ProductWithPrices) => {
    setSelectedProduct(product);
    setCurrentPage('product');
    window.scrollTo(0, 0);
  }, []);

  const navigateToAdmin = useCallback(() => {
    if (!user?.is_admin) {
      toast.error('Admin access required');
      return;
    }
    setCurrentPage('admin');
    window.scrollTo(0, 0);
  }, [user]);

  // Auth handlers
  const handleLogin = useCallback((_provider: 'google' | 'apple' | 'email', _credentials?: { email: string; password: string }) => {
    // Simulate login
    setTimeout(() => {
      setUser(null);
      setIsAuthModalOpen(false);
      toast.success('Welcome back, Admin!');
    }, 1000);
  }, []);

  const handleLogout = useCallback(() => {
    setUser(null);
    toast.success('Logged out successfully');
    if (currentPage === 'admin') {
      setCurrentPage('home');
    }
  }, [currentPage]);

  // Product management handlers
  const handleAddProduct = useCallback((product: Product, prices: ProductPrice[]) => {
    setProducts(prev => [...prev, product]);
    setProductPrices(prev => [...prev, ...prices]);
    toast.success('Product added successfully!');
  }, []);

  const handleEditProduct = useCallback((product: Product, prices: ProductPrice[]) => {
    setProducts(prev => prev.map(p => p.id === product.id ? product : p));
    
    // Remove old prices for this product
    setProductPrices(prev => prev.filter(p => p.product_id !== product.id));
    
    // Add new prices
    const updatedPrices = prices.map(p => ({
      ...p,
      product_id: product.id,
    }));
    
    setProductPrices(prev => [...prev, ...updatedPrices]);
    toast.success('Product updated successfully!');
  }, []);

  const handleDeleteProduct = useCallback((id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    setProductPrices(prev => prev.filter(p => p.product_id !== id));
    toast.success('Product deleted successfully!');
  }, []);

  // Category handler
  const handleCategorySelect = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  // Search handler
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  // Coming soon handler - reserved for future use
  // const showComingSoon = useCallback((feature: string) => {
  //   setComingSoonFeature(feature);
  // }, []);

  // Render current page
  const renderPage = () => {
    switch (currentPage) {
      case 'product':
        if (!selectedProduct) return null;
        return (
          <ProductDetail
            product={selectedProduct}
            onBack={navigateToHome}
          />
        );
      
      case 'admin':
        return (
          <AdminPanel
            products={products}
            productPrices={productPrices}
            categories={categories.map(c => c.name)}
            onBack={navigateToHome}
            onAddProduct={handleAddProduct}
            onEditProduct={handleEditProduct}
            onDeleteProduct={handleDeleteProduct}
          />
        );
      
      case 'home':
      default:
        return (
          <>
            <HeroBanner banners={banners} />
            <CategoryGrid
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={handleCategorySelect}
            />
            <PlatformStrip />
            <ProductListing
              products={filteredProducts}
              onProductClick={navigateToProduct}
              title={selectedCategory !== 'all' ? `${selectedCategory} Products` : 'Trending Products'}
            />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Toaster position="top-center" richColors />
      
      {/* Splash Screen */}
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      
      {/* Main App */}
      {!showSplash && (
        <>
          <Navbar
            user={user}
            onLogin={() => setIsAuthModalOpen(true)}
            onLogout={handleLogout}
            onSearch={handleSearch}
            searchQuery={searchQuery}
            onNavigate={(page) => {
              if (page === 'home') navigateToHome();
              if (page === 'admin') navigateToAdmin();
            }}
          />
          
          <main>
            {renderPage()}
          </main>
          
          {/* Chat Assistant */}
          <ChatAssistant />
          
          {/* Auth Modal */}
          <AuthModal
            isOpen={isAuthModalOpen}
            onClose={() => setIsAuthModalOpen(false)}
            onLogin={handleLogin}
          />
          
          {/* Coming Soon Modal */}
          <ComingSoonModal
            isOpen={!!comingSoonFeature}
            onClose={() => setComingSoonFeature(null)}
            featureName={comingSoonFeature || undefined}
          />
        </>
      )}
    </div>
  );
}

export default App;

