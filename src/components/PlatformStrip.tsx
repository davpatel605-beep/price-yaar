import { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Platform {
  id: string;
  name: string;
  color: string;
}

const platforms: Platform[] = [
  { id: '1', name: 'Amazon', color: '#FF9900' },
  { id: '2', name: 'Flipkart', color: '#2874F0' },
  { id: '3', name: 'Meesho', color: '#F43397' },
  { id: '4', name: 'Myntra', color: '#FF3F6C' },
  { id: '5', name: 'Tata Cliq', color: '#6C1D7C' },
  { id: '6', name: 'Nykaa', color: '#FC2779' },
  { id: '7', name: 'Ajio', color: '#2C4A7C' },
  { id: '8', name: 'Snapdeal', color: '#E40046' },
];

export function PlatformStrip() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll);
      return () => el.removeEventListener('scroll', checkScroll);
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 150;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-2 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <h3 className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
          Compare prices from top platforms
        </h3>
        
        <div className="relative">
          {/* Left Arrow */}
          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-6 h-6 bg-white shadow-md border border-gray-100 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="w-3 h-3 text-gray-600" />
            </button>
          )}

          {/* Platforms - Text only in circles */}
          <div
            ref={scrollRef}
            className="flex gap-2 overflow-x-auto scrollbar-hide px-1 py-1"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {platforms.map((platform) => (
              <div
                key={platform.id}
                className="flex flex-col items-center min-w-[64px] cursor-pointer group"
              >
                <div 
                  className="w-14 h-14 rounded-full flex items-center justify-center text-[10px] font-semibold text-white shadow-sm group-hover:shadow-md transition-all duration-200"
                  style={{ backgroundColor: platform.color }}
                >
                  <span className="text-center leading-tight px-1">
                    {platform.name}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          {canScrollRight && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-6 h-6 bg-white shadow-md border border-gray-100 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <ChevronRight className="w-3 h-3 text-gray-600" />
            </button>
          )}
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
