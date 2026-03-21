import { 
  Smartphone, 
  Shirt, 
  Home, 
  Refrigerator, 
  Laptop, 
  Sparkles, 
  Dumbbell,
  Headphones,
  Watch,
  Camera,
  Gamepad2,
  Armchair,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useRef } from 'react';
import type { Category } from '@/types';

interface CategoryGridProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const iconMap: Record<string, React.ElementType> = {
  Smartphone,
  Shirt,
  Home,
  Refrigerator,
  Laptop,
  Sparkles,
  Dumbbell,
  Headphones,
  Watch,
  Camera,
  Gamepad2,
  Armchair,
};

export function CategoryGrid({ categories, selectedCategory, onSelectCategory }: CategoryGridProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-3 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        {/* Scroll Container */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-7 h-7 bg-white shadow-md rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          </button>

          {/* Categories */}
          <div
            ref={scrollRef}
            className="flex gap-3 overflow-x-auto scrollbar-hide px-8 py-1"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {categories.map((category) => {
              const IconComponent = iconMap[category.icon] || Smartphone;
              const isSelected = selectedCategory === category.name;
              
              return (
                <button
                  key={category.id}
                  onClick={() => onSelectCategory(isSelected ? 'all' : category.name)}
                  className={`flex flex-col items-center gap-1.5 min-w-[72px] p-2 rounded-xl transition-all duration-200 ${
                    isSelected
                      ? 'bg-blue-50 ring-1 ring-blue-500'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div
                    className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 ${
                      isSelected ? 'shadow-md' : 'bg-gray-100'
                    }`}
                    style={{
                      backgroundColor: isSelected ? category.color : undefined,
                    }}
                  >
                    <IconComponent
                      className={`w-5 h-5 transition-colors ${
                        isSelected ? 'text-white' : 'text-gray-600'
                      }`}
                      style={{
                        color: isSelected ? undefined : category.color,
                      }}
                    />
                  </div>
                  <span
                    className={`text-[11px] font-medium text-center whitespace-nowrap transition-colors ${
                      isSelected ? 'text-blue-600' : 'text-gray-600'
                    }`}
                  >
                    {category.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-7 h-7 bg-white shadow-md rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </button>
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
