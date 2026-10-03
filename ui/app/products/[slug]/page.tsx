'use client';

import PageRouter from '@/components/PageRouter/PageRouter';
import { useCart } from '@/hooks/useCart';
import { apiGet } from '@/services/api/GetApi';
import { getAssetUrl } from '@/services/api/BaseApi';
import { useQuery } from '@tanstack/react-query';
import {
  ArrowRight,
  BadgeCheck,
  Check,
  Heart,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Star,
  Truck,
} from 'lucide-react';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

type ProductDetailData = {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: string | number;
  stars: number;
  views: number;
  isActive: boolean;
  category: { title: string; slug: string };
  brand: { title: string; logo: string | null } | null;
  images: { id: string; url: string; alt: string | null; main: boolean }[];
  features: { id: string; key: string; value: string }[];
};

const priceFormat = (value: number) =>
  `${new Intl.NumberFormat('fa-IR').format(value)} تومان`;

export default function ProductDetail() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [liked, setLiked] = useState(false);
  const cart = useCart();
  const { data: product, isLoading, isError } = useQuery({
    queryKey: ['store-product', slug],
    queryFn: () => apiGet<ProductDetailData>(`store/products/${encodeURIComponent(slug)}`),
    enabled: Boolean(slug),
  });

  if (isLoading) {
    return <main className="mx-auto min-h-screen max-w-6xl px-4 py-16"><div className="h-96 animate-pulse rounded-3xl bg-emerald-50" /></main>;
  }
  if (isError || !product) {
    return <main className="mx-auto min-h-[50vh] max-w-4xl px-4 py-20 text-center"><h1 className="text-2xl font-extrabold">محصول پیدا نشد</h1><p className="mt-3 text-slate-500">این محصول حذف شده یا در حال حاضر قابل نمایش نیست.</p></main>;
  }

  const images = product.images.length ? product.images : [{ id: 'fallback', url: '/images/Products/1.png', alt: product.title, main: true }];
  const selectedImage = images[Math.min(activeImage, images.length - 1)];
  const add = () => {
    cart.add({
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: Number(product.price),
      image: selectedImage.url,
      category: product.category.title,
      brand: product.brand?.title,
    }, quantity);
    toast.success(`${product.title} به سبد خرید اضافه شد.`);
  };

  return (
    <main className="min-h-screen bg-[#f8faf8] px-4 pb-20 pt-6 sm:px-6">
      <PageRouter routes={[
        { title: 'محصولات', link: '/products' },
        { title: product.category.title, link: `/products?category=${product.category.slug}` },
        { title: product.title, link: `/products/${product.slug}` },
      ]} />
      <div className="mx-auto max-w-6xl">
        <section className="grid gap-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8 lg:grid-cols-2">
          <div className="flex flex-col gap-3 sm:flex-row-reverse">
            <div className="relative flex min-h-80 flex-1 items-center justify-center overflow-hidden rounded-3xl bg-slate-50 sm:min-h-[480px]">
              <button type="button" onClick={() => setLiked((value) => !value)} aria-label={liked ? 'حذف از علاقه‌مندی' : 'افزودن به علاقه‌مندی'} className={`absolute left-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow ${liked ? 'text-rose-500' : 'text-slate-500'}`}>
                <Heart size={19} className={liked ? 'fill-current' : ''} />
              </button>
              <img src={getAssetUrl(selectedImage.url)} alt={selectedImage.alt ?? product.title} className="h-full max-h-[480px] w-full object-contain p-8" />
            </div>
            <div className="flex gap-2 overflow-x-auto sm:w-20 sm:flex-col">
              {images.map((image, index) => (
                <button key={image.id} type="button" onClick={() => setActiveImage(index)} aria-label={`نمایش تصویر ${index + 1}`} className={`h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 bg-slate-50 p-1 sm:h-20 sm:w-20 ${activeImage === index ? 'border-emerald-600' : 'border-transparent'}`}>
                  <img src={getAssetUrl(image.url)} alt="" className="h-full w-full object-contain" />
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <a href={`/products?category=${encodeURIComponent(product.category.slug)}`} className="text-sm font-bold text-emerald-700">{product.category.title}</a>
            <h1 className="mt-3 text-2xl font-extrabold leading-relaxed text-slate-900 sm:text-3xl">{product.title}</h1>
            {product.brand && <p className="mt-2 text-sm text-slate-500">برند: {product.brand.title}</p>}
            <div className="mt-4 flex items-center gap-2 text-amber-500">
              <Star size={16} className="fill-current" />
              <span className="text-sm font-bold">{product.stars ? product.stars.toLocaleString('fa-IR') : 'بدون امتیاز'}</span>
              <span className="text-xs text-slate-400">بازدید {product.views.toLocaleString('fa-IR')}</span>
            </div>
            <div className="mt-5 flex items-center gap-2 text-sm font-bold text-emerald-700"><BadgeCheck size={17} /> موجود و قابل سفارش</div>
            <p className="mt-5 whitespace-pre-line text-sm leading-8 text-slate-600">{product.description}</p>

            {product.features.length > 0 && (
              <div className="mt-5 space-y-2">
                {product.features.map((feature) => (
                  <p key={feature.id} className="flex items-center gap-2 text-sm text-slate-600"><Check size={16} className="text-emerald-600" /><b>{feature.key}:</b> {feature.value}</p>
                ))}
              </div>
            )}

            <div className="mt-7 border-t border-slate-100 pt-6">
              <strong className="text-2xl font-extrabold text-slate-900">{priceFormat(Number(product.price))}</strong>
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <div className="flex items-center rounded-xl border border-slate-200 p-1">
                <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="کم کردن تعداد" className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100"><Minus size={16} /></button>
                <span className="min-w-10 text-center text-sm font-bold">{quantity.toLocaleString('fa-IR')}</span>
                <button type="button" onClick={() => setQuantity((value) => value + 1)} aria-label="زیاد کردن تعداد" className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100"><Plus size={16} /></button>
              </div>
              <button type="button" onClick={add} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-emerald-700 sm:flex-none">
                <ShoppingBag size={18} /> افزودن به سبد خرید
              </button>
            </div>
            <p className="mt-4 text-xs text-slate-500">تعداد فعلی در سبد خرید: {cart.items.find((item) => item.id === product.id)?.quantity ?? 0}</p>
            <div className="mt-7 grid gap-3 border-t border-slate-100 pt-5 sm:grid-cols-2">
              <MiniTrust icon={<Truck />} text="ارسال به سراسر کشور" />
              <MiniTrust icon={<ShieldCheck />} text="تضمین اصالت و کیفیت" />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function MiniTrust({ icon, text }: { icon: React.ReactNode; text: string }) {
  return <div className="flex items-center gap-2 text-xs font-bold text-slate-600"><span className="text-emerald-700">{icon}</span>{text}</div>;
}
