import { ExternalLink, TrendingDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { ProductWithPrices } from '@/types';

interface ProductCardProps {
  product: ProductWithPrices;
  onClick: () => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  const lowestPricePlatform = product.prices?.[0];
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Discount Badge */}
        {product.discount && product.discount > 0 && (
          <div className="absolute top-2 left-2 flex items-center gap-0.5 px-1.5 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded">
            <TrendingDown className="w-3 h-3" />
            {product.discount}% OFF
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="text-[9px] bg-white/90 text-gray-600 px-1.5 py-0.5">
            {product.category}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-2 space-y-1">
        {/* Title */}
        <h3 className="font-medium text-gray-900 text-xs line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight">
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex items-center gap-1">
          <span className="text-sm font-bold text-gray-900">
            {formatPrice(product.lowestPrice || 0)}
          </span>
          {product.discount && product.discount > 0 && (
            <span className="text-[10px] text-gray-400 line-through">
              {formatPrice((product.prices?.[0]?.price || 0) * (1 + product.discount / 100))}
            </span>
          )}
        </div>

        {/* Platform */}
        <span className="text-[9px] text-gray-500 block">
          at <span className="font-medium text-blue-600">{lowestPricePlatform?.platform_name}</span>
        </span>

        {/* Compare Button */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          className="w-full flex items-center justify-center gap-1 py-1.5 bg-blue-600 text-white text-[11px] font-medium rounded-lg hover:bg-blue-700 transition-colors mt-1"
        >
          Compare Prices
          <ExternalLink className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
