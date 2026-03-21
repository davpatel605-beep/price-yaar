import { ArrowLeft, ExternalLink, TrendingDown, Award, Check, Star, Share2, Heart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import type { ProductWithPrices } from '@/types';

interface ProductDetailProps {
  product: ProductWithPrices;
  onBack: () => void;
}

export function ProductDetail({ product, onBack }: ProductDetailProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Sort prices: lowest first, then by price ascending
  const sortedPrices = [...(product.prices || [])].sort((a, b) => a.price - b.price);
  const lowestPrice = sortedPrices[0];

  const getPlatformColor = (platform: string) => {
    const colors: Record<string, string> = {
      'Amazon': 'bg-[#FF9900] text-white',
      'Flipkart': 'bg-[#2874F0] text-white',
      'Myntra': 'bg-[#FF3F6C] text-white',
      'Tata Cliq': 'bg-[#6C1D7C] text-white',
      'Nykaa': 'bg-[#FC2779] text-white',
      'Meesho': 'bg-[#F43397] text-white',
      'Ajio': 'bg-[#2C4A7C] text-white',
      'Snapdeal': 'bg-[#E40046] text-white',
    };
    return colors[platform] || 'bg-gray-600 text-white';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-14 z-30 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-3">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {/* Left - Image */}
          <div className="space-y-3">
            <div className="aspect-square bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-2">
              <button 
                onClick={() => alert('Wishlist feature coming soon!')}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors text-sm"
              >
                <Heart className="w-4 h-4" />
                <span className="font-medium">Wishlist</span>
              </button>
              <button 
                onClick={() => alert('Share feature coming soon!')}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors text-sm"
              >
                <Share2 className="w-4 h-4" />
                <span className="font-medium">Share</span>
              </button>
            </div>
          </div>

          {/* Right - Details */}
          <div className="space-y-4">
            {/* Category & Badges */}
            <div className="flex flex-wrap items-center gap-1.5">
              <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 text-xs">
                {product.category}
              </Badge>
            </div>

            {/* Title */}
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
              {product.name}
            </h1>

            {/* Description */}
            <p className="text-sm text-gray-600 leading-relaxed">
              {product.description}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${star <= 4 ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">4.2 (1,234 reviews)</span>
            </div>

            <Separator />

            {/* Best Price Highlight */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-center gap-1.5 text-green-700 mb-1">
                <TrendingDown className="w-4 h-4" />
                <span className="text-sm font-semibold">Best Price Available</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-gray-900">
                  {formatPrice(lowestPrice?.price || 0)}
                </span>
                <span className="text-sm text-gray-500">
                  on {lowestPrice?.platform_name}
                </span>
              </div>
              {product.discount && product.discount > 0 && (
                <p className="text-green-600 mt-1 text-sm font-medium">
                  Save {product.discount}% by comparing prices
                </p>
              )}
            </div>

            {/* Price Comparison Table */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900">Compare Prices</h3>
              </div>
              
              <div className="divide-y divide-gray-100">
                {sortedPrices.map((price, index) => (
                  <div
                    key={price.id}
                    className={`flex items-center justify-between px-4 py-3 min-h-[56px] ${
                      index === 0 ? 'bg-green-50/50' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {/* Platform Badge */}
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${getPlatformColor(price.platform_name)}`}>
                        {price.platform_name}
                      </span>
                      
                      {/* Tags */}
                      <div className="flex items-center gap-1.5">
                        {index === 0 && (
                          <span className="flex items-center gap-0.5 px-2 py-0.5 bg-green-500 text-white text-[10px] font-medium rounded-full">
                            <Check className="w-2.5 h-2.5" />
                            Best Price
                          </span>
                        )}
                        {price.is_best_seller && (
                          <span className="flex items-center gap-0.5 px-2 py-0.5 bg-amber-500 text-white text-[10px] font-medium rounded-full">
                            <Award className="w-2.5 h-2.5" />
                            Best Seller
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-lg font-bold text-gray-900">
                        {formatPrice(price.price)}
                      </span>
                      <a
                        href={price.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Buy
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { icon: Check, text: 'Genuine Products' },
                { icon: TrendingDown, text: 'Best Prices' },
                { icon: Award, text: 'Trusted Stores' },
              ].map((badge, index) => (
                <div key={index} className="flex flex-col items-center gap-1.5 p-3 bg-white rounded-xl border border-gray-100">
                  <badge.icon className="w-5 h-5 text-blue-600" />
                  <span className="text-[10px] font-medium text-gray-600 text-center">{badge.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
