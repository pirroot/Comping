'use client';

import AddCategory from '@/components/Admin/Categories/AddCategory';
import DelCategory from '@/components/Admin/Categories/DelCategory';
import EditCategory from '@/components/Admin/Categories/EditCategory';
import { CategoryType } from '@/lib/types/Product.type';
import { ApiResponse } from '@/lib/types/Response.type';
import { apiGet } from '@/services/api/GetApi';
import { useQuery } from '@tanstack/react-query';
import {
  ChevronDown,
  FolderTree,
  Package,
  Search,
  SearchX,
} from 'lucide-react';
import { useMemo, useState } from 'react';

const GRID_COLS = 'md:grid-cols-[1.5fr_1fr_0.8fr_100px]';

function Avatar({
  src,
  title,
  size = 44,
}: {
  src?: string;
  title?: string;
  size?: number;
}) {
  const [broken, setBroken] = useState(false);
  const initial = title?.trim()?.[0] ?? '?';

  if (!src || broken) {
    return (
      <div
        style={{ width: size, height: size }}
        className="flex shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-50 text-sm font-bold text-emerald-600 ring-1 ring-emerald-100"
      >
        {initial}
      </div>
    );
  }

  return (
    <img
      src={'http://localhost:8000' + src}
      alt={title}
      onError={() => setBroken(true)}
      style={{ width: size, height: size }}
      className="shrink-0 rounded-xl object-cover ring-1 ring-emerald-100"
    />
  );
}

function CountBadge({ count }: { count: number }) {
  const isZero = count === 0;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-bold ${
        isZero
          ? 'bg-slate-100 text-slate-400'
          : 'bg-emerald-50 text-emerald-700'
      }`}
    >
      <Package size={12} />
      {count}
    </span>
  );
}

function RowActions({ id }: { id: string }) {
  return (
    <div className="flex items-center gap-1 md:justify-end">
      <EditCategory id={id} />
      <DelCategory id={id} />
    </div>
  );
}

function SkeletonRow() {
  return (
    <div
      className={`grid animate-pulse gap-4 px-5 py-4 ${GRID_COLS} md:items-center`}
    >
      <div className="flex items-center gap-3">
        <div className="h-11 w-11 rounded-xl bg-emerald-50/70" />
        <div className="h-3.5 w-28 rounded bg-emerald-50/70" />
      </div>
      <div className="h-3.5 w-16 rounded bg-emerald-50/70" />
      <div className="h-6 w-14 rounded-lg bg-emerald-50/70" />
      <div className="h-3.5 w-10 rounded bg-emerald-50/70 md:mr-auto" />
    </div>
  );
}

export default function Categories() {
  const [query, setQuery] = useState('');
  const [collapsed, setCollapsed] = useState<Record<number | string, boolean>>(
    {},
  );

  const { data, isLoading, isError } = useQuery<ApiResponse<CategoryType[]>>({
    queryKey: ['categories'],
    queryFn: () => apiGet('admin/categories'),
  });

  const categories = data?.data ?? [];

  const filteredCategories = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return categories;

    return categories
      .map((c) => {
        const parentMatch = c.title?.toLowerCase().includes(q);
        const matchedChildren = c.children?.filter((child) =>
          child.title?.toLowerCase().includes(q),
        );

        if (parentMatch) return c;
        if (matchedChildren?.length) return { ...c, children: matchedChildren };
        return null;
      })
      .filter(Boolean) as CategoryType[];
  }, [categories, query]);

  const totalChildren = categories.reduce(
    (sum, c) => sum + (c.children?.length ?? 0),
    0,
  );

  const toggle = (id: number | string) =>
    setCollapsed((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="space-y-6">
      {/* هدر صفحه */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
            <FolderTree size={13} />
            مدیریت محصولات
          </span>
          <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-950">
            دسته‌بندی‌ها
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            مدیریت دسته‌بندی‌های محصولات سایت
            {!isLoading && !isError && (
              <>
                {' · '}
                <span className="font-semibold text-emerald-600">
                  {categories.length}
                </span>{' '}
                دسته اصلی،{' '}
                <span className="font-semibold text-emerald-600">
                  {totalChildren}
                </span>{' '}
                زیردسته
              </>
            )}
          </p>
        </div>
        <div className="flex justify-end gap-2">
          <AddCategory />
        </div>
      </div>

      {/* جستجو */}
      <label className="group flex w-full max-w-sm items-center gap-2 rounded-xl border border-emerald-100 bg-white px-3.5 py-2.5 text-sm shadow-sm shadow-emerald-900/5 transition-all duration-200 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 hover:border-emerald-200">
        <Search
          size={17}
          className="text-slate-400 transition-colors group-focus-within:text-emerald-500"
        />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="جستجوی دسته‌بندی..."
          className="min-w-0 flex-1 bg-transparent text-slate-800 outline-none placeholder:text-slate-400"
        />
      </label>

      {/* جدول */}
      <div className="overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm shadow-emerald-900/5">
        <div
          className={`hidden ${GRID_COLS} gap-4 border-b border-emerald-50 bg-gradient-to-b from-emerald-50/60 to-emerald-50/30 px-5 py-3 text-xs font-bold text-emerald-800/80 md:grid`}
        >
          <span>عکس / نام</span>
          <span>دسته والد</span>
          <span>تعداد محصولات</span>
          <span className="text-left">عملیات</span>
        </div>

        <div className="divide-y divide-emerald-50">
          {isLoading &&
            Array.from({ length: 4 }).map((_, i) => <SkeletonRow key={i} />)}

          {isError && (
            <div className="px-5 py-16 text-center">
              <p className="text-sm font-bold text-rose-500">
                خطا در دریافت دسته‌بندی‌ها. دوباره تلاش کنید.
              </p>
            </div>
          )}

          {!isLoading && !isError && filteredCategories.length === 0 && (
            <div className="px-5 py-16 text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-500">
                <SearchX size={26} />
              </span>
              <p className="mt-4 text-sm font-bold text-slate-700">
                دسته‌بندی‌ای پیدا نشد.
              </p>
              <p className="mt-1 text-xs text-slate-400">
                عبارت جستجو رو تغییر بده یا یه دسته جدید بساز.
              </p>
            </div>
          )}

          {!isLoading &&
            filteredCategories.map((category) => {
              const hasChildren = (category.children?.length ?? 0) > 0;
              const isCollapsed = collapsed[category.id];

              return (
                <div key={category.id}>
                  {/* ردیف دسته والد */}
                  <div
                    className={`group grid gap-3 px-5 py-3.5 transition-colors hover:bg-emerald-50/40 md:items-center md:gap-4 ${GRID_COLS}`}
                  >
                    <div className="flex items-center gap-3">
                      {hasChildren ? (
                        <button
                          type="button"
                          onClick={() => toggle(category.id)}
                          aria-label="نمایش/مخفی زیردسته‌ها"
                          className="flex h-6 w-6 items-center justify-center rounded-md text-slate-400 transition hover:bg-emerald-100 hover:text-emerald-600"
                        >
                          <ChevronDown
                            size={16}
                            className={`transition-transform duration-200 ${
                              isCollapsed ? '-rotate-90' : ''
                            }`}
                          />
                        </button>
                      ) : (
                        <span className="w-6" />
                      )}
                      <Avatar src={category.image} title={category.title} />
                      <div className="min-w-0">
                        <p className="truncate font-bold text-slate-800 transition-colors group-hover:text-emerald-700">
                          {category.title}
                        </p>
                        {hasChildren && (
                          <p className="text-xs text-slate-400">
                            {category.children!.length} زیردسته
                          </p>
                        )}
                      </div>
                    </div>
                    <span className="text-sm text-slate-400">—</span>
                    <CountBadge count={category.products?.length ?? 0} />
                    <RowActions id={category.id} />
                  </div>

                  {/* ردیف‌های زیردسته */}
                  {hasChildren && !isCollapsed && (
                    <div className="space-y-1 bg-emerald-50/30 pr-8 pb-2">
                      {category.children!.map((child) => (
                        <div
                          key={child.id}
                          className={`grid gap-3 rounded-xl px-4 py-2.5 transition-colors hover:bg-white md:items-center md:gap-4 ${GRID_COLS}`}
                        >
                          <div className="flex items-center gap-3">
                            <Avatar
                              src={child.image}
                              title={child.title}
                              size={36}
                            />
                            <p className="truncate text-sm font-semibold text-slate-700">
                              {child.title}
                            </p>
                          </div>
                          <span className="truncate text-sm text-slate-500">
                            {category.title}
                          </span>
                          <CountBadge count={child.products?.length ?? 0} />
                          <RowActions id={category.id} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
