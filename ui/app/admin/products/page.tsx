'use client';

import AddProduct from '@/components/Admin/Products/AddProduct';
import { ProductType } from '@/lib/types/Product.type';
import { ApiResponse } from '@/lib/types/Response.type';
import { apiGet } from '@/services/api/ApiGet';
import { useQuery } from '@tanstack/react-query';
import { Edit3, MoreHorizontal, Package, Plus, Search, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';

type StatusFilter = 'همه' | 'فعال' | 'پیش‌نویس' | 'غیرفعال';

const STATUS_STYLES: Record<string, string> = {
  فعال: 'bg-green-50 text-green-700 ring-1 ring-inset ring-green-200',
  پیش‌نویس: 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200',
  غیرفعال: 'bg-slate-100 text-slate-500 ring-1 ring-inset ring-slate-200',
};

export default function AdminProduct() {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<StatusFilter>('همه');

  // دریافت محصولات
  const { data, isLoading, isError } = useQuery<ApiResponse<ProductType[]>>({
    queryKey: ['products'],
    queryFn: () => apiGet('admin/products'),
  });

  const products = data?.data ?? [];

  const filteredProducts = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((product) => {
      const matchesFilter = activeFilter === 'همه' || product.status === activeFilter;
      const matchesQuery = !q || product.title?.toLowerCase().includes(q);
      return matchesFilter && matchesQuery;
    });
  }, [products, activeFilter, query]);

  return (
    <div className="space-y-6">
      {/* هدر صفحه */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-950">محصولات</h1>
          <p className="mt-2 text-sm text-slate-500">مدیریت محصولات سایت.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="products/categories"
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
          >
            مدیریت دسته‌بندی‌ها
          </Link>
          <AddProduct />
        </div>
      </div>

      {/* نوار جستجو و فیلتر */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3">
        <label className="flex min-w-60 flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-500 focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500">
          <Search size={17} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="جستجوی محصول..."
            className="min-w-0 flex-1 bg-transparent text-slate-800 outline-none placeholder:text-slate-400"
          />
        </label>
        <div className="flex flex-wrap gap-1 rounded-xl bg-white p-1">
          {(['همه', 'فعال', 'پیش‌نویس', 'غیرفعال'] as const).map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`rounded-lg px-3 py-2 text-xs font-bold transition ${
                activeFilter === filter
                  ? 'bg-green-600 text-white shadow-sm'
                  : 'text-slate-500 hover:bg-slate-100'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* جدول محصولات */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="hidden grid-cols-[1.5fr_0.8fr_0.7fr_0.9fr_110px] gap-4 border-b border-slate-100 bg-slate-50 px-5 py-3 text-xs font-bold text-slate-500 md:grid">
          <span>محصول</span>
          <span>قیمت</span>
          <span>وضعیت</span>
          <span>آخرین تغییر</span>
          <span className="text-left">عملیات</span>
        </div>

        <div className="divide-y divide-slate-100">
          {isLoading &&
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="animate-pulse px-5 py-4">
                <div className="h-4 w-1/3 rounded bg-slate-100" />
              </div>
            ))}

          {isError && (
            <div className="px-5 py-16 text-center">
              <p className="text-sm font-bold text-red-500">
                خطا در دریافت محصولات. دوباره تلاش کنید.
              </p>
            </div>
          )}

          {!isLoading && !isError && filteredProducts.length === 0 && (
            <div className="px-5 py-16 text-center">
              <Package className="mx-auto text-slate-300" size={28} />
              <p className="mt-3 text-sm font-bold text-slate-600">موردی با این فیلتر پیدا نشد.</p>
            </div>
          )}

          {!isLoading &&
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="grid gap-3 px-5 py-4 transition hover:bg-slate-50 md:grid-cols-[1.5fr_0.8fr_0.7fr_0.9fr_110px] md:items-center md:gap-4"
              >
                <div className="flex items-center gap-3">
                  {product.image && (
                    <img
                      src={product.image}
                      alt={product.title}
                      className="h-10 w-10 shrink-0 rounded-lg object-cover ring-1 ring-slate-100"
                    />
                  )}
                  <p className="font-bold text-slate-800">{product.title}</p>
                </div>

                <span className="text-sm text-slate-600">
                  {product.price ? `${product.price.toLocaleString('fa-IR')} تومان` : '—'}
                </span>

                <span
                  className={`inline-flex w-fit items-center rounded-full px-2.5 py-1 text-[11px] font-bold ${
                    STATUS_STYLES[product.status ?? ''] ?? STATUS_STYLES['غیرفعال']
                  }`}
                >
                  {product.status ?? 'نامشخص'}
                </span>

                <span className="text-xs text-slate-400">آخرین تغییر امروز</span>

                <div className="flex items-center gap-1 md:justify-end">
                  <button
                    type="button"
                    aria-label="ویرایش"
                    className="rounded-lg p-2 text-slate-400 transition hover:bg-green-50 hover:text-green-600"
                  >
                    <Edit3 size={16} />
                  </button>
                  <button
                    type="button"
                    aria-label="حذف"
                    className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                  <button
                    type="button"
                    aria-label="بیشتر"
                    className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100"
                  >
                    <MoreHorizontal size={16} />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>

      {!isLoading && !isError && (
        <p className="text-xs text-slate-400">
          نمایش {filteredProducts.length} محصول از {products.length}
        </p>
      )}
    </div>
  );
}
