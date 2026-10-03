'use client';

import { getAssetUrl } from '@/services/api/BaseApi';
import { Eye } from 'lucide-react';
import Link from 'next/link';
import EditProduct from './EditProduct';
import RemoveProduct from './Remove';

export type AdminProduct = {
  id: string;
  title: string;
  slug: string;
  price: number | string;
  isActive: boolean;
  category: { title: string };
  brand: { title: string } | null;
  images: { id: string; url: string; main: boolean }[];
};

export default function ProductList({ products }: { products: AdminProduct[] }) {
  if (!products.length) {
    return <p className="px-5 py-12 text-center text-sm text-slate-500">محصولی با این مشخصات پیدا نشد.</p>;
  }

  return (
    <div className="divide-y divide-slate-100">
      {products.map((product) => {
        const image =
          product.images.find((item) => item.main)?.url ??
          product.images[0]?.url;
        return (
          <div key={product.id} className="grid gap-3 px-5 py-4 transition hover:bg-slate-50 md:grid-cols-[1.5fr_0.8fr_0.7fr_0.9fr_110px] md:items-center md:gap-4">
            <div className="flex min-w-0 items-center gap-3">
              <img
                src={getAssetUrl(image)}
                alt=""
                className="h-12 w-12 shrink-0 rounded-xl border border-slate-100 bg-white object-cover"
              />
              <div className="min-w-0">
                <p className="truncate font-bold text-slate-800">{product.title}</p>
                <p className="mt-1 truncate text-xs text-slate-500">{product.brand?.title ?? product.slug}</p>
              </div>
            </div>
            <span className="text-sm text-slate-600">{product.category.title}</span>
            <span className={`w-fit rounded-full px-2.5 py-1 text-xs font-bold ${product.isActive ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
              {product.isActive ? 'فعال' : 'غیرفعال'}
            </span>
            <span className="text-sm font-bold text-slate-700">{Number(product.price).toLocaleString('fa-IR')} تومان</span>
            <div className="flex items-center gap-1">
              <Link href={`/products/${product.slug}`} target="_blank" aria-label="نمایش محصول" className="rounded-lg p-2 text-slate-400 hover:bg-sky-50 hover:text-sky-600"><Eye size={16} /></Link>
              <EditProduct id={product.id} />
              <RemoveProduct id={product.id} title={product.title} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
