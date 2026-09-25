'use client';

import ProductImage1 from '@/public/images/Products/1.png';
import useEmblaCarousel from 'embla-carousel-react';
import {
  Clock3,
  Heart,
  MoveLeftIcon,
  MoveRightIcon,
  ShoppingBag,
  StarIcon,
} from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

type OfferProduct = {
  id: string;
  title: string;
  rating: number;
  price: number;
  is_offer: boolean;
  offer_percent: number;
  images: string[];
  image_alt: string;
};

const products: OfferProduct[] = [
  {
    id: 'r34s',
    title: 'چادر کمپ ۵ نفره',
    rating: 5.6,
    price: 5000000,
    is_offer: true,
    offer_percent: 10,
    images: [ProductImage1.src],
    image_alt: 'چادر کمپ ۵ نفره',
  },
  {
    id: 'k9pl',
    title: 'کوله پشتی کوهنوردی ۶۰ لیتری',
    rating: 4.8,
    price: 3200000,
    is_offer: true,
    offer_percent: 15,
    images: [ProductImage1.src],
    image_alt: 'کوله پشتی کوهنوردی ۶۰ لیتری',
  },
  {
    id: 'm2xz-1',
    title: 'صندلی تاشو کمپینگ',
    rating: 4.5,
    price: 1450000,
    is_offer: true,
    offer_percent: 20,
    images: [ProductImage1.src],
    image_alt: 'صندلی تاشو کمپینگ',
  },
  {
    id: 'm2xz-2',
    title: 'صندلی تاشو کمپینگ',
    rating: 4.5,
    price: 1450000,
    is_offer: true,
    offer_percent: 20,
    images: [ProductImage1.src],
    image_alt: 'صندلی تاشو کمپینگ',
  },
  {
    id: 'm2xz-3',
    title: 'صندلی تاشو کمپینگ',
    rating: 4.5,
    price: 1450000,
    is_offer: true,
    offer_percent: 20,
    images: [ProductImage1.src],
    image_alt: 'صندلی تاشو کمپینگ',
  },
  {
    id: 'm2xz-4',
    title: 'صندلی تاشو کمپینگ',
    rating: 4.5,
    price: 1450000,
    is_offer: true,
    offer_percent: 20,
    images: [ProductImage1.src],
    image_alt: 'صندلی تاشو کمپینگ',
  },
  {
    id: 'm2xz-5',
    title: 'صندلی تاشو کمپینگ',
    rating: 4.5,
    price: 1450000,
    is_offer: true,
    offer_percent: 20,
    images: [ProductImage1.src],
    image_alt: 'صندلی تاشو کمپینگ',
  },
  {
    id: 'm2xz-6',
    title: 'صندلی تاشو کمپینگ',
    rating: 4.5,
    price: 1450000,
    is_offer: true,
    offer_percent: 20,
    images: [ProductImage1.src],
    image_alt: 'صندلی تاشو کمپینگ',
  },
  {
    id: 'm2xz-7',
    title: 'صندلی تاشو کمپینگ',
    rating: 4.5,
    price: 1450000,
    is_offer: true,
    offer_percent: 20,
    images: [ProductImage1.src],
    image_alt: 'صندلی تاشو کمپینگ',
  },
];

const OFFER_END = new Date(Date.now() + 1000 * 60 * 60 * 26).getTime();

function useCountdown(target: number) {
  const [timeLeft, setTimeLeft] = useState(() =>
    Math.max(target - Date.now(), 0),
  );

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

function OfferCard({ product }: { product: OfferProduct }) {
  const discountedPrice = Math.round(
    product.price * (1 - (product.offer_percent || 0) / 100),
  );

  return (
    <div className="group bg-bg hover:shadow-primary/10 relative flex h-full flex-col rounded-3xl border border-white/70 p-3.5 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-xl">
      {product.is_offer && (
        <span className="bg-auxiliary text-text absolute top-5 right-5 z-10 rounded-lg px-2.5 py-1 text-xs font-bold shadow-sm">
          {product.offer_percent}% تخفیف
        </span>
      )}

      <button
        type="button"
        aria-label="افزودن به علاقه‌مندی‌ها"
        className="text-neutral_dark absolute top-5 left-5 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-sm transition hover:text-red-500"
      >
        <Heart size={15} />
      </button>

      <div className="bg-neutral_light relative mb-4 aspect-square w-full overflow-hidden rounded-2xl">
        <Image
          src={product.images[0]}
          alt={product.image_alt}
          fill
          sizes="(max-width: 640px) 70vw, (max-width: 1024px) 32vw, 22vw"
          className="object-contain transition-transform duration-300 ease-out group-hover:scale-105"
        />
      </div>

      <div className="flex min-h-12 items-start justify-between gap-2">
        <h3 className="text-text line-clamp-2 text-sm leading-6 font-bold sm:text-base">
          {product.title}
        </h3>
        <span className="text-auxiliary flex shrink-0 items-center gap-1 text-xs font-medium">
          <StarIcon size={14} className="fill-auxiliary" />
          {product.rating}
        </span>
      </div>

      <div className="border-neutral_normal mt-4 flex items-end justify-between gap-2 border-t pt-3">
        <button
          type="button"
          aria-label="افزودن به سبد خرید"
          className="bg-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white transition hover:bg-[#5a9a63] hover:shadow-md"
        >
          <ShoppingBag size={16} />
        </button>
        <div className="flex flex-col">
          {product.is_offer && (
            <span className="text-xs text-neutral-400 line-through">
              {product.price}
            </span>
          )}
          <span className="text-text text-sm font-bold sm:text-base">
            {discountedPrice}
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
      <div className="relative flex flex-col gap-5 overflow-hidden rounded-4xl bg-[#123d34] p-4 shadow-xl shadow-[#123d34]/10 sm:p-5 md:flex-row md:gap-7 md:p-7">
        <div className="border-primary/20 pointer-events-none absolute -bottom-24 -left-20 h-52 w-52 rounded-full border-20" />
        <div className="border-auxiliary/10 pointer-events-none absolute -top-24 -right-20 h-56 w-56 rounded-full border-20" />
        {/* Timer / promo panel */}
        <div className="bg-primary relative z-10 flex shrink-0 flex-col justify-between rounded-3xl p-5 text-white shadow-lg md:w-72 md:p-6">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-bold text-white/80">
              <Clock3 size={14} /> پیشنهاد محدود
            </span>
            <h2 className="mt-5 text-center text-2xl font-extrabold sm:text-3xl">
              محصولات تخفیف‌دار
            </h2>
            <p className="mt-2 text-center text-sm leading-7 text-white/75">
              فرصت خرید با قیمت بهتر فقط تا پایان زمان زیر
            </p>
          </div>

          <div className="my-6 flex items-center justify-center gap-2 sm:gap-2.5">
            {[
              { label: 'ساعت', value: hours },
              { label: 'دقیقه', value: minutes },
              { label: 'ثانیه', value: seconds },
            ].map((unit) => (
              <div
                key={unit.label}
                className="flex min-w-14 flex-col items-center gap-1 rounded-xl border border-white/15 bg-[#123d34]/25 px-2 py-2.5 sm:min-w-16 sm:px-3"
              >
                <span className="text-lg font-bold tabular-nums sm:text-xl">
                  {unit.value}
                </span>
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
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-white transition hover:bg-white/25 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <MoveRightIcon size={18} />
            </button>
            <button
              type="button"
              onClick={() => emblaApi?.scrollNext()}
              disabled={!canNext}
              aria-label="محصول بعدی"
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-white transition hover:bg-white/25 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <MoveLeftIcon size={18} />
            </button>
          </div>
        </div>

        {/* Offers carousel */}
        <div
          className="relative z-10 min-w-0 flex-1 overflow-hidden rounded-3xl bg-white/5 p-1"
          ref={emblaRef}
        >
          <div className="flex gap-4">
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
