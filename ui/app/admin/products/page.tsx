'use client';

import AddProduct from '@/components/Admin/Products/AddProduct';
import { ProductType } from '@/lib/types/Product.type';
import { ApiResponse } from '@/lib/types/Response.type';
import { apiGet } from '@/services/api/GetApi';
import { useQuery } from '@tanstack/react-query';
import { Package } from 'lucide-react';
import { useMemo, useState } from 'react';

type StatusFilter = 'همه' | 'فعال' | 'غیرفعال';

const STATUS_STYLES: Record<StatusFilter, string> = {
  همه: 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200',
  فعال: 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200',
  غیرفعال: 'bg-slate-100 text-slate-500 ring-1 ring-inset ring-slate-200',
};

const GRID_COLS = 'md:grid-cols-[1.5fr_0.8fr_0.7fr_0.9fr_110px]';

function SkeletonRow() {
  return (
    <div className={`grid animate-pulse gap-4 px-5 py-4 ${GRID_COLS} md:items-center`}>
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-lg bg-emerald-50/70" />
        <div className="h-3.5 w-32 rounded bg-emerald-50/70" />
      </div>
      <div className="h-3.5 w-20 rounded bg-emerald-50/70" />
      <div className="h-6 w-16 rounded-full bg-emerald-50/70" />
      <div className="h-3.5 w-24 rounded bg-emerald-50/70" />
      <div className="h-3.5 w-20 rounded bg-emerald-50/70 md:mr-auto" />
    </div>
  );
}

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
    // return products.filter((product) => {
    //   const matchesFilter =
    //     activeFilter === 'همه' ||
    //     (activeFilter === 'فعال' && product.is_active) ||
    //     (activeFilter === 'غیرفعال' && !product.is_active);

    //   const matchesQuery =
    //     !q || product.title?.toLowerCase().includes(q) || product.brand?.toLowerCase().includes(q);

    //   return matchesFilter && matchesQuery;
    // });
  }, [products, activeFilter, query]);

  const statusCounts = useMemo(() => {
    // return {
    //   همه: products.length,
    //   فعال: products.filter((p) => p.is_active).length,
    //   غیرفعال: products.filter((p) => !p.is_active).length,
    // };
  }, [products]);

  return (
    <div className="space-y-6">
      {/* هدر صفحه */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
            <Package size={13} />
            مدیریت فروشگاه
          </span>
          <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-950">محصولات</h1>
          <p className="mt-2 text-sm text-slate-500">
            مدیریت محصولات سایت
            {!isLoading && !isError && (
              <>
                {' · '}
                <span className="font-semibold text-emerald-600">{products.length}</span> محصول ثبت
                شده
              </>
            )}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <AddProduct />
        </div>
      </div>
    </div>
  );
}
