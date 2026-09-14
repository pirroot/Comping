'use client';

import bacbak from '@/public/images/Home/Categories/bacbak.webp';
import chear from '@/public/images/Home/Categories/chear.webp';
import gogome from '@/public/images/Home/Categories/gogome.webp';
import light from '@/public/images/Home/Categories/light.webp';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronDown, MoveLeftIcon, MoveRightIcon } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

type CategoryCard = {
  id: string;
  title: string;
  image: string;
};

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

  const categories: CategoryCard[] = [
    { id: '132', title: 'چراغ قوه', image: light.src },
    { id: '3321', title: 'فلاسک و ماگ', image: gogome.src },
    { id: '4223', title: 'میز و صندلی', image: chear.src },
    { id: '4432432', title: 'کوله پشتی', image: bacbak.src },
  ];

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const frame = requestAnimationFrame(onSelect);
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      cancelAnimationFrame(frame);
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="container mx-auto px-4 py-10 md:py-14">
      <div className="relative overflow-hidden rounded-4xl bg-[#123d34] shadow-xl shadow-[#123d34]/10">
        <div className="pointer-events-none absolute -left-24 -top-28 h-64 w-64 rounded-full border-24 border-primary/20" />
        <div className="pointer-events-none absolute -bottom-40 right-1/3 h-72 w-72 rounded-full border-28 border-auxiliary/10" />
        <div className="absolute left-1/2 top-0 z-20 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white shadow-sm backdrop-blur-sm">
          <ChevronDown size={17} />
        </div>

        {/* Content */}
        <div className="relative z-10 px-5 py-10 sm:px-8 md:px-10 md:py-14">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-xs font-medium text-primary_light">
                هر چیزی که برای سفر لازم داری
              </p>
              <h2 className="text-2xl font-extrabold text-white md:text-3xl">دسته‌بندی محصولات</h2>
            </div>
            <span className="hidden rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs text-white/70 sm:block">
              انتخاب سریع تجهیزات
            </span>
          </div>

          {/* Embla viewport (mobile/tablet) / plain grid (lg+) */}
          <div className="overflow-hidden lg:overflow-visible" ref={emblaRef}>
            <div className="flex gap-4 px-1 sm:gap-5 md:gap-6 lg:grid lg:grid-cols-4 lg:gap-5 lg:px-0">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="min-w-0 shrink-0 basis-[64%] sm:basis-[38%] lg:basis-auto"
                >
                  <div className="group relative flex h-full min-h-52 flex-col items-center justify-center rounded-3xl border border-white/70 bg-white p-5 text-center shadow-lg shadow-black/10 transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-2xl sm:p-6 md:rounded-4xl">
                    <div className="absolute right-4 top-4 h-2 w-2 rounded-full bg-primary/30 transition group-hover:bg-auxiliary" />
                    <div className="relative mb-4 aspect-square w-full max-w-24 rounded-2xl bg-neutral_light p-2 transition-transform duration-300 ease-out group-hover:scale-110 sm:max-w-28 md:max-w-30">
                      <Image
                        src={category.image}
                        alt={category.title}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 120px, 200px"
                      />
                    </div>
                    <h3 className="text-sm font-extrabold text-text sm:text-base md:text-lg">
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
      <div className="mt-6 flex items-center justify-center gap-3 lg:hidden">
        <button
          type="button"
          onClick={() => emblaApi?.scrollPrev()}
          disabled={!canPrev}
          aria-label="دسته‌بندی قبلی"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-neutral_normal bg-white text-neutral_dark shadow-sm transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
        >
          <MoveRightIcon size={18} />
        </button>
        <button
          type="button"
          onClick={() => emblaApi?.scrollNext()}
          disabled={!canNext}
          aria-label="دسته‌بندی بعدی"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-neutral_normal bg-white text-neutral_dark shadow-sm transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
        >
          <MoveLeftIcon size={18} />
        </button>
      </div>

      {/* Description */}
      <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-8 text-neutral_dark md:text-base">
        تجهیزات حرفه‌ای، ماجراجویی‌های فراموش‌نشدنی! باور داریم که هر سفر به طبیعت می‌تونه به تجربه
        منحصر‌ به‌فرد و خاطره‌انگیز تبدیل شه. به همین دلیل بهترین و باکیفیت‌ترین لوازم کمپینگ و سفر
        رو برای شما فراهم کردیم. از چادرهای سبک و کم‌حجم تا وسایل آشپزی و روشنایی، همه‌چیز آماده‌ست
        تا شما بدون نگرانی به دل طبیعت بزنید.
      </p>
    </section>
  );
}
