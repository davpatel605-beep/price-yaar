import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import type { Banner } from '@/types';

interface HeroBannerProps {
  banners: Banner[];
}

export function HeroBanner({ banners }: HeroBannerProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000, stopOnInteraction: false }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  if (banners.length === 0) return null;

  // Get dot color based on banner
  const getDotColor = (index: number) => {
    const colors = ['bg-blue-500', 'bg-pink-500', 'bg-amber-500', 'bg-purple-500'];
    return colors[index % colors.length];
  };

  return (
    <section className="relative w-full overflow-hidden">
      <div className="embla" ref={emblaRef}>
        <div className="flex">
          {banners.map((banner) => (
            <div key={banner.id} className="flex-[0_0_100%] min-w-0 relative">
              <div
                className={`relative h-[180px] sm:h-[220px] lg:h-[260px] bg-gradient-to-r ${banner.bgColor} overflow-hidden`}
              >
                {/* Background Image with Overlay */}
                <div className="absolute inset-0">
                  <img
                    src={banner.image}
                    alt={banner.title}
                    className="w-full h-full object-cover opacity-30 mix-blend-overlay"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
                  <div className="max-w-md text-white space-y-2 sm:space-y-3">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold leading-tight">
                      {banner.title}
                    </h2>
                    {banner.subtitle && (
                      <p className="text-sm sm:text-base text-white/90">{banner.subtitle}</p>
                    )}
                    <button
                      onClick={() => banner.link && (window.location.href = banner.link)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-white text-gray-900 rounded-full text-sm font-semibold hover:bg-gray-100 transition-colors shadow-lg mt-2"
                    >
                      Shop Now
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Colored Dots Indicator - Below Banner */}
      <div className="flex items-center justify-center gap-2 py-3 bg-white">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === selectedIndex
                ? `${getDotColor(index)} w-6`
                : 'bg-gray-300 w-2 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
