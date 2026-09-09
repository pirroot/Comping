'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import Link from 'next/link';
import { MoveLeftIcon, ShoppingBag, StarIcon } from 'lucide-react';
import { ProductType } from '@/lib/types/Product.type';
import ProductImage1 from '@/public/images/Products/1.png';
import formatToman from '@/utils/formatToman';

const bestSellers: ProductType[] = [
  {
    id: 'b1',
    title: 'چادر کمپ ۵ نفره',
    rating: 4.9,
    price: 5000000,
    is_offer: false,
    offer_percent: 0,
    images: [ProductImage1 as string],
    image_alt: 'چادر کمپ ۵ نفره',
  },
  {
    id: 'b2',
    title: 'کوله پشتی کوهنوردی ۶۰ لیتری',
    rating: 4.8,
    price: 3200000,
    is_offer: true,
    offer_percent: 10,
    images: [ProductImage1 as string],
    image_alt: 'کوله پشتی کوهنوردی ۶۰ لیتری',
  },
  {
    id: 'b3',
    title: 'صندلی تاشو کمپینگ',
    rating: 4.6,
    price: 1450000,
    is_offer: false,
    offer_percent: 0,
    images: [ProductImage1 as string],
    image_alt: 'صندلی تاشو کمپینگ',
  },
  {
    id: 'b4',
    title: 'فلاسک استیل ۱ لیتری',
    rating: 4.7,
    price: 850000,
    is_offer: false,
    offer_percent: 0,
    images: [ProductImage1 as string],
    image_alt: 'فلاسک استیل ۱ لیتری',
  },
  {
    id: 'b5',
    title: 'چراغ قوه شارژی حرفه‌ای',
    rating: 4.5,
    price: 620000,
    is_offer: true,
    offer_percent: 12,
    images: [ProductImage1 as string],
    image_alt: 'چراغ قوه شارژی حرفه‌ای',
  },
];

function ProductCard({ product }: { product: ProductType }) {
  const discountedPrice = Math.round(product.price * (1 - (product.offer_percent || 0) / 100));

  return (
    <div className="group relative flex h-full flex-col rounded-3xl bg-bg p-4 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_12px_28px_-10px_rgba(0,0,0,0.28)]">
      {product.is_offer && (
        <span className="absolute right-4 top-4 z-10 rounded-full bg-auxiliary px-2.5 py-1 text-xs font-bold text-white">
          {product.offer_percent}% تخفیف
        </span>
      )}

      <div className="relative mb-3 aspect-square w-full overflow-hidden rounded-2xl bg-white">
        <Image
          src={product.images[0]}
          alt={product.image_alt}
          fill
          sizes="(max-width: 640px) 70vw, (max-width: 1024px) 32vw, 22vw"
          className="object-contain transition-transform duration-300 ease-out group-hover:scale-105"
        />
      </div>

      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-medium text-text sm:text-base">{product.title}</h3>
        <span className="flex shrink-0 items-center gap-1 text-xs font-medium text-auxiliary">
          <StarIcon size={14} className="fill-auxiliary" />
          {product.rating}
        </span>
      </div>

      <div className="mt-3 flex items-end justify-between gap-2">
        <button
          type="button"
          aria-label="افزودن به سبد خرید"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-white transition hover:opacity-90"
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
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
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
    <section className="bg-neutral_light">
      <div className="container mx-auto px-4 py-10 md:py-14">
        <div className="mb-6 flex items-center justify-between gap-5">
          <h2 className="text-xl font-bold text-text sm:text-2xl">محصولات پرفروش سایت</h2>

          <div className="flex items-center gap-3">
            <Link
              href="/products"
              className="hidden items-center gap-2 rounded-2xl bg-primary px-6 py-3 text-sm font-medium text-white transition hover:opacity-90 sm:inline-flex sm:text-base"
            >
              مشاهده بیشتر
              <MoveLeftIcon size={18} />
            </Link>
          </div>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4 ">
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

        <div className="mt-6 flex justify-between gap-5 items-center gap-4">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => emblaApi?.scrollPrev()}
              disabled={!canPrev}
              aria-label="محصول قبلی"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-200 text-gray-600 transition hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <MoveLeftIcon size={18} className="rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => emblaApi?.scrollNext()}
              disabled={!canNext}
              aria-label="محصول بعدی"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-200 text-gray-600 transition hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-40"
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
