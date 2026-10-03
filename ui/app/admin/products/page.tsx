'use client';

import AddProduct from '@/components/Admin/Products/AddProduct';
import ProductList, {
  AdminProduct,
} from '@/components/Admin/Products/List';
import { apiGet } from '@/services/api/GetApi';
import { useQuery } from '@tanstack/react-query';
import { Package, Search } from 'lucide-react';
import { useMemo, useState } from 'react';

type ProductsResponse = { products: AdminProduct[]; count: number };
type StatusFilter = 'همه' | 'فعال' | 'غیرفعال';

export default function AdminProductPage() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<StatusFilter>('همه');
  const { data, isLoading, isError } = useQuery({
    queryKey: ['products'],
    queryFn: () => apiGet<ProductsResponse>('admin/products?limit=100'),
  });
  const products = data?.products ?? [];
  const visibleProducts = useMemo(() => {
    const normalized = search.trim().toLocaleLowerCase('fa');
    return products.filter((product) => {
      const matchesStatus =
        status === 'همه' ||
        (status === 'فعال' && product.isActive) ||
        (status === 'غیرفعال' && !product.isActive);
      const matchesSearch =
        !normalized ||
        `${product.title} ${product.slug} ${product.brand?.title ?? ''} ${product.category.title}`
          .toLocaleLowerCase('fa')
          .includes(normalized);
      return matchesStatus && matchesSearch;
    });
  }, [products, search, status]);

  return (
    <section className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
            <Package size={13} /> مدیریت فروشگاه
          </span>
          <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-950">محصولات</h1>
          <p className="mt-2 text-sm text-slate-500">
            مدیریت اطلاعات، موجودی انتشار، دسته‌بندی و تصاویر محصولات
            {!isLoading && !isError && ` · ${data?.count ?? 0} محصول`}
          </p>
        </div>
        <AddProduct />
      </header>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3">
        <label className="flex min-w-60 flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-500">
          <Search size={17} />
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="جست‌وجوی عنوان، شناسه، دسته یا برند..." className="min-w-0 flex-1 bg-transparent outline-none" />
        </label>
        <div className="flex gap-1 rounded-xl bg-white p-1">
          {(['همه', 'فعال', 'غیرفعال'] as const).map((filter) => (
            <button key={filter} type="button" onClick={() => setStatus(filter)} className={`rounded-lg px-3 py-2 text-xs font-bold transition ${status === filter ? 'bg-emerald-600 text-white' : 'text-slate-500 hover:bg-slate-100'}`}>
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="hidden grid-cols-[1.5fr_0.8fr_0.7fr_0.9fr_110px] gap-4 border-b border-slate-100 bg-slate-50 px-5 py-3 text-xs font-bold text-slate-500 md:grid">
          <span>محصول</span><span>دسته‌بندی</span><span>وضعیت</span><span>قیمت</span><span>عملیات</span>
        </div>
        {isLoading ? (
          <p className="px-5 py-12 text-center text-sm text-slate-500">در حال دریافت محصولات...</p>
        ) : isError ? (
          <p role="alert" className="px-5 py-12 text-center text-sm text-rose-600">دریافت محصولات انجام نشد؛ دسترسی ادمین و اتصال API را بررسی کنید.</p>
        ) : (
          <ProductList products={visibleProducts} />
        )}
      </div>
    </section>
  );
}
