'use client';

import {
  ArrowRight,
  BadgeCheck,
  Check,
  Clock3,
  Heart,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Star,
  Truck,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';

const product = {
  title: 'چراغ کمپینگ شارژی مدل لایت',
  category: 'تجهیزات کمپینگ',
  price: 890000,
  oldPrice: 1090000,
  rating: 4.8,
  reviews: 24,
  description:
    'چراغی سبک و قدرتمند برای شب‌های کمپ، حیاط و سفر. با شارژدهی مناسب، بدنه مقاوم و چند حالت نوردهی.',
  features: [
    'نوردهی قدرتمند و یکنواخت',
    'شارژ از طریق USB',
    'بدنه سبک و مقاوم',
    'مناسب کمپینگ و استفاده اضطراری',
  ],
  specs: [
    ['نوع شارژ', 'USB Type-C'],
    ['مدت شارژدهی', 'تا ۱۲ ساعت'],
    ['وزن', '۴۸۰ گرم'],
    ['مقاومت', 'مقاوم در برابر پاشش آب'],
  ],
};
const formatPrice = (value: number) => `${new Intl.NumberFormat('fa-IR').format(value)} تومان`;

export default function ProductDetail() {
  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState<'description' | 'reviews'>('description');
  const addToCart = () => toast.success('محصول به سبد خرید اضافه شد');
  const gallery = ['/images/Products/1.png', '/images/Products/2.png', '/images/Products/3.png'];

  return (
    <main className="min-h-screen bg-[#f8faf8] px-4 pb-20 pt-6 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/products"
          className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-neutral_dark hover:text-primary"
        >
          <ArrowRight size={17} /> بازگشت به محصولات
        </Link>
        <section className="grid gap-8 rounded-3xl border border-neutral_normal bg-white p-5 shadow-sm sm:p-8 lg:grid-cols-2">
          <div className="flex flex-col gap-3 sm:flex-row-reverse">
            <div className="relative flex min-h-80 flex-1 items-center justify-center overflow-hidden rounded-3xl bg-neutral_light sm:min-h-125">
              <span className="absolute right-5 top-5 z-10 rounded-lg bg-auxiliary px-3 py-1.5 text-xs font-bold text-text">
                پرفروش
              </span>
              <button
                type="button"
                onClick={() => setLiked(!liked)}
                aria-label="افزودن به علاقه‌مندی"
                className={`absolute left-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm ${liked ? 'text-red-500' : 'text-neutral_dark'}`}
              >
                <Heart size={19} className={liked ? 'fill-current' : ''} />
              </button>
              <Image
                src={gallery[activeImage]}
                alt={product.title}
                fill
                className="object-contain p-10 transition duration-500 hover:scale-105"
              />
            </div>
            <div className="flex gap-2 sm:w-20 sm:flex-col">
              {gallery.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  className={`relative h-16 flex-1 overflow-hidden rounded-xl border-2 bg-neutral_light sm:h-20 sm:flex-none ${activeImage === index ? 'border-primary' : 'border-transparent'}`}
                >
                  <Image
                    src={image}
                    alt={`${product.title} تصویر ${index + 1}`}
                    fill
                    className="object-contain p-1"
                  />
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-sm font-bold text-primary">{product.category}</p>
            <h1 className="mt-3 text-2xl font-extrabold leading-relaxed text-text sm:text-3xl">
              {product.title}
            </h1>
            <div className="mt-4 flex items-center gap-3">
              <span className="flex items-center gap-1 rounded-lg bg-[#fff4dc] px-2.5 py-1 text-sm font-bold text-[#bd7e17]">
                <Star size={15} className="fill-current" /> {product.rating}
              </span>
              <span className="text-sm text-neutral_dark">بر اساس {product.reviews} نظر</span>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 font-bold text-emerald-600">
                <BadgeCheck size={15} /> موجود در انبار
              </span>
              <span className="text-neutral_dark">۱۵ عدد باقی مانده</span>
            </div>
            <p className="mt-6 text-sm leading-8 text-neutral_dark">{product.description}</p>
            <div className="mt-6 flex flex-wrap items-end gap-3">
              <strong className="text-2xl font-extrabold text-text">
                {formatPrice(product.price)}
              </strong>
              <span className="text-sm text-neutral_dark line-through">
                {formatPrice(product.oldPrice)}
              </span>
              <span className="rounded-lg bg-auxiliary_light px-2 py-1 text-xs font-bold text-[#9a6815]">
                {Math.round((1 - product.price / product.oldPrice) * 100)}٪ تخفیف
              </span>
            </div>
            <div className="mt-5 rounded-2xl bg-primary_light/60 p-4">
              <div className="flex items-center gap-2 text-sm font-bold text-[#356c3e]">
                <Truck size={18} /> ارسال رایگان برای سفارش‌های بالای ۲ میلیون
              </div>
              <p className="mt-2 flex items-center gap-2 text-xs text-neutral_dark">
                <Clock3 size={14} /> تحویل بین ۲ تا ۵ روز کاری
              </p>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <div className="flex items-center rounded-xl border border-neutral_normal p-1">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral_dark hover:bg-neutral_light"
                >
                  <Minus size={16} />
                </button>
                <span className="min-w-9 text-center text-sm font-bold">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral_dark hover:bg-neutral_light"
                >
                  <Plus size={16} />
                </button>
              </div>
              <button
                type="button"
                onClick={addToCart}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#5a9a63] sm:flex-none"
              >
                <ShoppingBag size={18} /> افزودن به سبد خرید
              </button>
            </div>
            <div className="mt-7 grid gap-3 border-t border-neutral_normal pt-5 sm:grid-cols-2">
              <MiniTrust icon={<Truck />} text="ارسال سریع به سراسر کشور" />
              <MiniTrust icon={<ShieldCheck />} text="تضمین اصالت و کیفیت" />
            </div>
          </div>
        </section>
        <section className="mt-6 rounded-3xl border border-neutral_normal bg-white p-5 shadow-sm sm:p-8">
          <div className="flex gap-6 border-b border-neutral_normal">
            <button
              type="button"
              onClick={() => setActiveTab('description')}
              className={`border-b-2 pb-4 text-sm font-bold ${activeTab === 'description' ? 'border-primary text-primary' : 'border-transparent text-neutral_dark'}`}
            >
              ویژگی‌های محصول
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('reviews')}
              className={`border-b-2 pb-4 text-sm font-bold ${activeTab === 'reviews' ? 'border-primary text-primary' : 'border-transparent text-neutral_dark'}`}
            >
              نظرات کاربران ({product.reviews})
            </button>
          </div>
          {activeTab === 'description' ? (
            <div className="grid gap-3 pt-6 sm:grid-cols-2">
              {product.features.map((feature) => (
                <p key={feature} className="flex items-center gap-2 text-sm text-neutral_dark">
                  <Check size={17} className="text-primary" /> {feature}
                </p>
              ))}
              <div className="mt-3 overflow-hidden rounded-2xl border border-neutral_normal sm:col-span-2">
                <div className="grid grid-cols-2 bg-neutral_light px-4 py-3 text-xs font-bold text-neutral_dark">
                  <span>مشخصه</span>
                  <span>جزئیات</span>
                </div>
                {product.specs.map(([label, value]) => (
                  <div
                    key={label}
                    className="grid grid-cols-2 border-t border-neutral_normal px-4 py-3 text-sm"
                  >
                    <span className="text-neutral_dark">{label}</span>
                    <span className="font-bold text-text">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4 pt-6">
              <div className="flex items-center gap-3 rounded-2xl bg-[#fff8eb] p-4">
                <span className="text-3xl font-black text-[#bd7e17]">{product.rating}</span>
                <div>
                  <div className="flex text-[#f2ad28]">
                    {[1, 2, 3, 4, 5].map((item) => (
                      <Star key={item} size={15} className="fill-current" />
                    ))}
                  </div>
                  <p className="mt-1 text-xs text-neutral_dark">
                    امتیاز کاربران از {product.reviews} نظر
                  </p>
                </div>
              </div>
              <p className="rounded-2xl border border-neutral_normal p-4 text-sm leading-7 text-neutral_dark">
                «نوردهی خیلی خوب و شارژدهی قابل قبولی دارد؛ برای کمپینگ آخر هفته کاملاً راضی بودم.»
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

function MiniTrust({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2 text-xs font-bold text-neutral_dark">
      <span className="text-primary">{icon}</span>
      {text}
    </div>
  );
}
