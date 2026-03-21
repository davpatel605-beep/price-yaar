import { ProductCard } from './ProductCard';
import type { ProductWithPrices } from '@/types';

interface ProductListingProps {
  products: ProductWithPrices[];
  onProductClick: (product: ProductWithPrices) => void;
  title?: string;
}

export function ProductListing({ products, onProductClick, title = 'Trending Products' }: ProductListingProps) {
  if (products.length === 0) {
    return (
      <section className="py-3 bg-gray-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="text-center py-8">
            <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <svg className="w-7 h-7 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-sm font-semibold text-gray-900 mb-0.5">No products found</h3>
            <p className="text-xs text-gray-500">Try adjusting your search</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-2 bg-gray-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-bold text-gray-900">{title}</h2>
          <span className="text-[10px] text-gray-500">{products.length} items</span>
        </div>
        
        {/* 2 columns on mobile, more on larger screens */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => onProductClick(product)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
