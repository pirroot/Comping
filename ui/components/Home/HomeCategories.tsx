'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import bacbak from '@/public/images/Home/Categories/bacbak.webp';
import chear from '@/public/images/Home/Categories/chear.webp';
import gogome from '@/public/images/Home/Categories/gogome.webp';
import light from '@/public/images/Home/Categories/light.webp';
import { CategoryType } from '@/lib/types/Product.type';
import { MoveLeftIcon, MoveRightIcon } from 'lucide-react';

export default function HomeCategory() {
  // direction: 'rtl' makes Embla's internal prev/next match the visual
  // right-to-left reading order (so "next" naturally goes to the left).
  const [emblaRef, emblaApi] = useEmblaCarousel({
    direction: 'rtl',
    align: 'center',
    dragFree: false,
    containScroll: 'trimSnaps',
    breakpoints: {
      '(min-width: 1024px)': { active: false }, // grid takes over on lg+
    },
  });

  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const categories: CategoryType[] = [
    { id: '132', title: 'چراغ قوه', image: light },
    { id: '3321', title: 'فلاسک و ماگ', image: gogome },
    { id: '4223', title: 'میز و صندلی', image: chear },
    { id: '4432432', title: 'کوله پشتی', image: bacbak },
  ];

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="container mx-auto px-4 py-10 md:py-14">
      {/* Shaped primary container — final version: just a plain rounded
          box. Nothing extra. */}
      <div className="relative w-full rounded-4xl bg-primary">
        {/* Chevron badge sitting in the notch */}
        <div className="absolute left-1/2 top-0 z-20 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/25 shadow-sm backdrop-blur-sm">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-10 px-5 py-12 sm:px-8 md:px-10 md:py-20">
          {/* Heading + underline */}
          <div className="mb-10 flex flex-col items-center">
            <h2 className="text-center text-2xl font-bold text-white md:text-3xl">
              دسته بندی محصولات
            </h2>
            <span className="mt-3 h-1 w-14 rounded-full bg-white/40" />
          </div>

          {/* Embla viewport (mobile/tablet) / plain grid (lg+) */}
          <div className="overflow-hidden lg:overflow-visible" ref={emblaRef}>
            <div className="flex gap-4 px-2 sm:gap-6 md:gap-8 lg:grid lg:grid-cols-4 lg:gap-6 lg:px-4">
              {categories.map((category: CategoryType) => (
                <div
                  key={category.id}
                  className="min-w-0 shrink-0 basis-[42%] sm:basis-[34%] lg:basis-auto"
                >
                  <div className="group relative flex h-full flex-col items-center justify-center rounded-3xl bg-bg p-5 text-center shadow-[0_6px_20px_-8px_rgba(0,0,0,0.25)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_12px_28px_-10px_rgba(0,0,0,0.3)] sm:p-6 md:rounded-4xl">
                    <div className="relative mb-4 aspect-square w-full max-w-24 transition-transform duration-300 ease-out group-hover:scale-110 sm:max-w-28 md:max-w-30">
                      <Image
                        src={category.image}
                        alt={category.title}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 120px, 200px"
                      />
                    </div>
                    <h3 className="text-sm font-medium text-text sm:text-base md:text-lg">
                      {category.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Carousel navigation — Embla-driven, hidden on lg where the grid takes over */}
      <div className="mt-8 flex items-center justify-center gap-5 lg:hidden">
        <button
          type="button"
          onClick={() => emblaApi?.scrollPrev()}
          disabled={!canPrev}
          aria-label="دسته‌بندی قبلی"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-200 text-gray-600 transition hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-neutral-200"
        >
          <MoveRightIcon size={18} />
        </button>
        <button
          type="button"
          onClick={() => emblaApi?.scrollNext()}
          disabled={!canNext}
          aria-label="دسته‌بندی بعدی"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-200 text-gray-600 transition hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-neutral-200"
        >
          <MoveLeftIcon size={18} />
        </button>
      </div>

      {/* Description */}
      <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-8 text-text md:text-base">
        تجهیزات حرفه‌ای، ماجراجویی‌های فراموش‌نشدنی! باور داریم که هر سفر به طبیعت می‌تونه به تجربه منحصر‌ به‌فرد و خاطره‌انگیز تبدیل شه.
        به همین دلیل بهترین و باکیفیت‌ترین لوازم کمپینگ و سفر رو برای شما فراهم کردیم. از چادرهای سبک و کم‌حجم تا وسایل آشپزی و روشنایی،
        همه‌چیز آماده‌ست تا شما بدون نگرانی به دل طبیعت بزنید.
      </p>
    </section>
  );
}
