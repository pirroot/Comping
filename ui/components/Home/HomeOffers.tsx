'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ProductType } from '@/lib/types/Product.type';
import ProductImage1 from '@/public/images/Products/1.png';
import { MoveLeftIcon, MoveRightIcon, ShoppingBag, StarIcon } from 'lucide-react';
import Image from 'next/image';
import formatToman from '@/utils/formatToman';

const products: ProductType[] = [
  {
    id: 'r34s',
    title: 'چادر کمپ ۵ نفره',
    rating: 5.6,
    price: 5000000,
    is_offer: true,
    offer_percent: 10,
    images: [ProductImage1 as string],
    image_alt: 'چادر کمپ ۵ نفره',
  },
  {
    id: 'k9pl',
    title: 'کوله پشتی کوهنوردی ۶۰ لیتری',
    rating: 4.8,
    price: 3200000,
    is_offer: true,
    offer_percent: 15,
    images: [ProductImage1 as string],
    image_alt: 'کوله پشتی کوهنوردی ۶۰ لیتری',
  },
  {
    id: 'm2xz-1',
    title: 'صندلی تاشو کمپینگ',
    rating: 4.5,
    price: 1450000,
    is_offer: true,
    offer_percent: 20,
    images: [ProductImage1 as string],
    image_alt: 'صندلی تاشو کمپینگ',
  },
  {
    id: 'm2xz-2',
    title: 'صندلی تاشو کمپینگ',
    rating: 4.5,
    price: 1450000,
    is_offer: true,
    offer_percent: 20,
    images: [ProductImage1 as string],
    image_alt: 'صندلی تاشو کمپینگ',
  },
  {
    id: 'm2xz-3',
    title: 'صندلی تاشو کمپینگ',
    rating: 4.5,
    price: 1450000,
    is_offer: true,
    offer_percent: 20,
    images: [ProductImage1 as string],
    image_alt: 'صندلی تاشو کمپینگ',
  },
  {
    id: 'm2xz-4',
    title: 'صندلی تاشو کمپینگ',
    rating: 4.5,
    price: 1450000,
    is_offer: true,
    offer_percent: 20,
    images: [ProductImage1 as string],
    image_alt: 'صندلی تاشو کمپینگ',
  },
  {
    id: 'm2xz-5',
    title: 'صندلی تاشو کمپینگ',
    rating: 4.5,
    price: 1450000,
    is_offer: true,
    offer_percent: 20,
    images: [ProductImage1 as string],
    image_alt: 'صندلی تاشو کمپینگ',
  },
  {
    id: 'm2xz-6',
    title: 'صندلی تاشو کمپینگ',
    rating: 4.5,
    price: 1450000,
    is_offer: true,
    offer_percent: 20,
    images: [ProductImage1 as string],
    image_alt: 'صندلی تاشو کمپینگ',
  },
  {
    id: 'm2xz-7',
    title: 'صندلی تاشو کمپینگ',
    rating: 4.5,
    price: 1450000,
    is_offer: true,
    offer_percent: 20,
    images: [ProductImage1 as string],
    image_alt: 'صندلی تاشو کمپینگ',
  },
];

const OFFER_END = new Date(Date.now() + 1000 * 60 * 60 * 26).getTime();

function useCountdown(target: number) {
  const [timeLeft, setTimeLeft] = useState(() => Math.max(target - Date.now(), 0));

  useEffect(() => {
    const id = setInterval(() => {
      setTimeLeft(Math.max(target - Date.now(), 0));
    }, 1000);
    return () => clearInterval(id);
  }, [target]);

  const totalSeconds = Math.floor(timeLeft / 1000);
  return {
    hours: Math.floor(totalSeconds / 3600)
      .toString()
      .padStart(2, '0'),
    minutes: Math.floor((totalSeconds % 3600) / 60)
      .toString()
      .padStart(2, '0'),
    seconds: (totalSeconds % 60).toString().padStart(2, '0'),
  };
}

function OfferCard({ product }: { product: ProductType }) {
  const discountedPrice = Math.round(product.price * (1 - (product.offer_percent || 0) / 100));

  return (
    <div className="group relative flex h-full flex-col rounded-3xl bg-bg p-4 shadow-[0_6px_20px_-8px_rgba(0,0,0,0.2)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_12px_28px_-10px_rgba(0,0,0,0.28)]">
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
        <div className="flex flex-col">
          {product.is_offer && (
            <span className="text-xs text-neutral-400 line-through">
              {formatToman(product.price)}
            </span>
          )}
          <span className="text-sm font-bold text-text sm:text-base">
            {formatToman(discountedPrice)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function HomeOffers() {
  const { hours, minutes, seconds } = useCountdown(OFFER_END);
  const offers = products.filter((p) => p.is_offer);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    direction: 'rtl',
    align: 'start',
    dragFree: true,
    containScroll: 'trimSnaps',
    slidesToScroll: 1,
  });

  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

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
      <div className="flex flex-col gap-6 rounded-4xl bg-primary_light p-5 md:flex-row md:gap-8 md:p-8">
        {/* Timer / promo panel */}
        <div className="flex shrink-0 flex-col justify-between rounded-3xl bg-primary  p-6 text-white md:w-72">
          <div>
            <h2 className="text-3xl font-bold text-center">محصولات تخفیف‌دار</h2>
            <p className="mt-2 text-sm text-white text-center">
              فقط تا پایان زمان زیر، شامل تخفیف ویژه می‌شه
            </p>
          </div>

          <div className="my-6 flex items-center justify-center gap-2 sm:gap-3">
            {[
              { label: 'ثانیه', value: seconds },
              { label: 'دقیقه', value: minutes },
              { label: 'ساعت', value: hours },
            ].map((unit) => (
              <div
                key={unit.label}
                className="flex flex-col items-center gap-1 rounded-2xl bg-white/20 ring-2 ring-auxiliary px-3 py-2 sm:px-4"
              >
                <span className="text-lg font-bold tabular-nums sm:text-xl">{unit.value}</span>
                <span className="text-[11px] text-white/70">{unit.label}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => emblaApi?.scrollPrev()}
              disabled={!canPrev}
              aria-label="محصول قبلی"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <MoveRightIcon size={18} />
            </button>
            <button
              type="button"
              onClick={() => emblaApi?.scrollNext()}
              disabled={!canNext}
              aria-label="محصول بعدی"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <MoveLeftIcon size={18} />
            </button>
          </div>
        </div>

        {/* Offers carousel */}
        <div className="min-w-0 flex-1 overflow-hidden" ref={emblaRef}>
          <div className="flex gap-5">
            {offers.map((product) => (
              <div
                key={product.id}
                className="min-w-0 shrink-0 basis-[75%] sm:basis-[45%] md:basis-[32%] lg:basis-[24%]"
              >
                <OfferCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
