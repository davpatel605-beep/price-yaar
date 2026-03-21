import { useEffect, useState } from 'react';
import { ShoppingCart, Check } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Start fade out animation after 2 seconds
    const timer = setTimeout(() => {
      setIsAnimating(true);
    }, 2000);

    // Complete after animation
    const completeTimer = setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, 2500);

    return () => {
      clearTimeout(timer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-orange-50 transition-opacity duration-500 ${
        isAnimating ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center">
        {/* Logo Animation */}
        <div
          className={`flex items-center gap-3 transition-all duration-700 ${
            isAnimating ? 'scale-90 opacity-0' : 'scale-100 opacity-100'
          }`}
          style={{
            animation: !isAnimating ? 'fadeInZoom 0.8s ease-out' : undefined,
          }}
        >
          {/* Shopping Cart Icon */}
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-700 to-blue-900 rounded-2xl flex items-center justify-center shadow-2xl">
              <ShoppingCart className="w-10 h-10 text-white" />
            </div>
            {/* Checkmark badge */}
            <div className="absolute -top-1 -right-1 w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
              <Check className="w-5 h-5 text-white" strokeWidth={3} />
            </div>
          </div>

          {/* Brand Name */}
          <div className="flex flex-col">
            <span className="text-4xl font-bold">
              <span className="text-orange-500">Price</span>
              <span className="text-blue-800">Yaar</span>
            </span>
            <span className="text-sm text-gray-500 font-medium tracking-wide">
              Compare. Save. Shop Smart.
            </span>
          </div>
        </div>

        {/* Loading indicator */}
        <div className="mt-8 flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>

      <style>{`
        @keyframes fadeInZoom {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
