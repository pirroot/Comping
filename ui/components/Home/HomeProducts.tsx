'use client';

import ProductImage1 from '@/public/images/Products/1.png';
import formatToman from '@/utils/formatToman';
import useEmblaCarousel from 'embla-carousel-react';
import { Heart, MoveLeftIcon, ShoppingBag, StarIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

type BestSeller = {
  id: string;
  title: string;
  rating: number;
  price: number;
  is_offer: boolean;
  offer_percent: number;
  images: string[];
  image_alt: string;
};

const bestSellers: BestSeller[] = [
  {
    id: 'b1',
    title: 'چادر کمپ ۵ نفره',
    rating: 4.9,
    price: 5000000,
    is_offer: false,
    offer_percent: 0,
    images: [ProductImage1.src],
    image_alt: 'چادر کمپ ۵ نفره',
  },
  {
    id: 'b2',
    title: 'کوله پشتی کوهنوردی ۶۰ لیتری',
    rating: 4.8,
    price: 3200000,
    is_offer: true,
    offer_percent: 10,
    images: [ProductImage1.src],
    image_alt: 'کوله پشتی کوهنوردی ۶۰ لیتری',
  },
  {
    id: 'b3',
    title: 'صندلی تاشو کمپینگ',
    rating: 4.6,
    price: 1450000,
    is_offer: false,
    offer_percent: 0,
    images: [ProductImage1.src],
    image_alt: 'صندلی تاشو کمپینگ',
  },
  {
    id: 'b4',
    title: 'فلاسک استیل ۱ لیتری',
    rating: 4.7,
    price: 850000,
    is_offer: false,
    offer_percent: 0,
    images: [ProductImage1.src],
    image_alt: 'فلاسک استیل ۱ لیتری',
  },
  {
    id: 'b5',
    title: 'چراغ قوه شارژی حرفه‌ای',
    rating: 4.5,
    price: 620000,
    is_offer: true,
    offer_percent: 12,
    images: [ProductImage1.src],
    image_alt: 'چراغ قوه شارژی حرفه‌ای',
  },
];

function ProductCard({ product }: { product: BestSeller }) {
  const discountedPrice = Math.round(product.price * (1 - (product.offer_percent || 0) / 100));

  return (
    <div className="group relative flex h-full flex-col rounded-3xl border border-neutral_normal bg-bg p-3.5 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10">
      {product.is_offer && (
        <span className="absolute right-5 top-5 z-10 rounded-lg bg-auxiliary px-2.5 py-1 text-xs font-bold text-text shadow-sm">
          {product.offer_percent}% تخفیف
        </span>
      )}

      <button
        type="button"
        aria-label="افزودن به علاقه‌مندی‌ها"
        className="absolute left-5 top-5 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-neutral_dark shadow-sm transition hover:text-red-500"
      >
        <Heart size={15} />
      </button>

      <div className="relative mb-4 aspect-square w-full overflow-hidden rounded-2xl bg-neutral_light">
        <Image
          src={product.images[0]}
          alt={product.image_alt}
          fill
          sizes="(max-width: 640px) 70vw, (max-width: 1024px) 32vw, 22vw"
          className="object-contain transition-transform duration-300 ease-out group-hover:scale-105"
        />
      </div>

      <div className="flex min-h-12 items-start justify-between gap-2">
        <h3 className="line-clamp-2 text-sm font-bold leading-6 text-text sm:text-base">
          {product.title}
        </h3>
        <span className="flex shrink-0 items-center gap-1 text-xs font-medium text-auxiliary">
          <StarIcon size={14} className="fill-auxiliary" />
          {product.rating}
        </span>
      </div>

      <div className="mt-4 flex items-end justify-between gap-2 border-t border-neutral_normal pt-3">
        <button
          type="button"
          aria-label="افزودن به سبد خرید"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-white transition hover:bg-[#5a9a63] hover:shadow-md"
        >
          <ShoppingBag size={16} />
        </button>
        <div className="flex flex-col items-end">
          {product.is_offer && (
            <span className="text-xs text-neutral-400 line-through">
              {formatToman(product.price)}
            </span>
          )}
          <span className="text-sm font-bold text-text sm:text-base">
            {formatToman(product.is_offer ? discountedPrice : product.price)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function HomeProducts() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    direction: 'rtl',
    align: 'start',
    dragFree: true,
    containScroll: 'trimSnaps',
    slidesToScroll: 1,
  });

  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const frame = requestAnimationFrame(() => {
      onSelect();
      setScrollSnaps(emblaApi.scrollSnapList());
    });
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      cancelAnimationFrame(frame);
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  return (
    <section className="bg-bg">
      <div className="container mx-auto px-4 py-10 md:py-14">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-medium text-primary">انتخاب محبوب مشتری‌ها</p>
            <h2 className="text-2xl font-extrabold text-text">محصولات پرفروش سایت</h2>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/products"
              className="hidden items-center gap-2 rounded-xl border border-primary/20 bg-white px-4 py-2.5 text-sm font-bold text-primary transition hover:border-primary hover:bg-primary hover:text-white sm:inline-flex"
            >
              مشاهده بیشتر
              <MoveLeftIcon size={18} />
            </Link>
          </div>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4">
            {bestSellers.map((product) => (
              <div
                key={product.id}
                className="min-w-0 shrink-0 basis-[75%] sm:basis-[45%] md:basis-[32%] lg:basis-[19%]"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between gap-4">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => emblaApi?.scrollPrev()}
              disabled={!canPrev}
              aria-label="محصول قبلی"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-neutral_normal bg-white text-neutral_dark shadow-sm transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
            >
              <MoveLeftIcon size={18} className="rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => emblaApi?.scrollNext()}
              disabled={!canNext}
              aria-label="محصول بعدی"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-neutral_normal bg-white text-neutral_dark shadow-sm transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
            >
              <MoveLeftIcon size={18} />
            </button>
          </div>

          <div className="flex gap-2">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => scrollTo(index)}
                aria-label={`اسلاید ${index + 1}`}
                className={`
                  h-2 rounded-full transition-all duration-300
                  ${
                    index === selectedIndex ? 'w-6 bg-primary' : 'w-2 bg-gray-300 hover:bg-gray-400'
                  }
                `}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
