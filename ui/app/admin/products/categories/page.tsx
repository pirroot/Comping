'use client';

import AddCategory from '@/components/Admin/Products/Categories/AddCategory';
import { ApiResponse } from '@/lib/types/Response.type';
import { apiGet } from '@/services/api/ApiGet';
import { useQuery } from '@tanstack/react-query';
import { Edit3, FolderTree, Plus, Search, Trash2, X } from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';

// ⚠️ فرض شده - اگه فایل تایپ جدا داری جایگزین کن
export type CategoryType = {
  id: string;
  name: string;
  slug?: string;
  productsCount?: number;
  parent?: string | null;
};

export default function Categories() {
  const [query, setQuery] = useState('');


  const { data, isLoading, isError } = useQuery<ApiResponse<CategoryType[]>>({
    queryKey: ['categories'],
    queryFn: () => apiGet('admin/categories'),
  });

  const categories = data?.data ?? [];

  const filteredCategories = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return categories;
    return categories.filter((c) => c.name?.toLowerCase().includes(q));
  }, [categories, query]);

  return (
    <div className="space-y-6">
      {/* هدر صفحه */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-950">دسته‌بندی‌ها</h1>
          <p className="mt-2 text-sm text-slate-500">مدیریت دسته‌بندی‌های محصولات سایت.</p>
        </div>
        <div className="flex justify-end gap-5">
          <Link
            href="/admin/products"
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
          >
            مدیریت محصولات
          </Link>
          <AddCategory />
        </div>
      </div>

      {/* جستجو */}
      <label className="flex w-full max-w-sm items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-500 focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500">
        <Search size={17} />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="جستجوی دسته‌بندی..."
          className="min-w-0 flex-1 bg-transparent text-slate-800 outline-none placeholder:text-slate-400"
        />
      </label>

      {/* جدول */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="hidden grid-cols-[1.5fr_1fr_0.8fr_100px] gap-4 border-b border-slate-100 bg-slate-50 px-5 py-3 text-xs font-bold text-slate-500 md:grid">
          <span>نام دسته‌بندی</span>
          <span>دسته والد</span>
          <span>تعداد محصولات</span>
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
                خطا در دریافت دسته‌بندی‌ها. دوباره تلاش کنید.
              </p>
            </div>
          )}

          {!isLoading && !isError && filteredCategories.length === 0 && (
            <div className="px-5 py-16 text-center">
              <FolderTree className="mx-auto text-slate-300" size={28} />
              <p className="mt-3 text-sm font-bold text-slate-600">دسته‌بندی‌ای پیدا نشد.</p>
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="mt-4 text-sm font-bold text-green-600 hover:underline"
              >
                افزودن اولین دسته‌بندی
              </button>
            </div>
          )}

          {!isLoading &&
            filteredCategories.map((category) => (
              <div
                key={category.id}
                className="grid gap-3 px-5 py-4 transition hover:bg-slate-50 md:grid-cols-[1.5fr_1fr_0.8fr_100px] md:items-center md:gap-4"
              >
                <p className="font-bold text-slate-800">{category.name}</p>
                <span className="text-sm text-slate-500">{category.parent ?? '—'}</span>
                <span className="text-sm text-slate-500">{category.productsCount ?? 0}</span>

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
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
