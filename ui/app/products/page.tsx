'use client';

import PageRouter from '@/components/PageRouter/PageRouter';
import { useCart } from '@/hooks/useCart';
import { apiGet } from '@/services/api/GetApi';
import { getAssetUrl } from '@/services/api/BaseApi';
import { useQuery } from '@tanstack/react-query';
import { PackageSearch, Search, ShoppingBag, SlidersHorizontal, Star, X } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';

type SortOption = 'newest' | 'price-asc' | 'price-desc';
type Category = { id: string; title: string; slug: string; parentId: string | null };
type StoreProduct = {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: string | number;
  stars: number;
  category: { title: string; slug: string };
  brand: { title: string } | null;
  images: { id: string; url: string; main: boolean }[];
};
type ProductPage = {
  products: StoreProduct[];
  count: number;
  page: number;
  limit: number;
  totalPages: number;
};

const formatPrice = (value: number) => `${value.toLocaleString('fa-IR')} تومان`;

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const cart = useCart();
  const [search, setSearch] = useState(searchParams.get('search') ?? '');
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') ?? '');
  const [sort, setSort] = useState<SortOption>('newest');
  const [page, setPage] = useState(1);

  const { data: categories = [] } = useQuery({
    queryKey: ['store-categories'],
    queryFn: () => apiGet<Category[]>('store/categories'),
  });

  const queryString = useMemo(() => {
    const params = new URLSearchParams({ page: String(page), limit: '12', sort });
    if (search.trim()) params.set('search', search.trim());
    if (activeCategory) params.set('category', activeCategory);
    return params.toString();
  }, [activeCategory, page, search, sort]);

  const {
    data: result,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['store-products', queryString],
    queryFn: () => apiGet<ProductPage>(`store/products?${queryString}`),
  });

  const categoriesByParent = categories.filter((category) => category.parentId);
  const add = (product: StoreProduct) => {
    cart.add({
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: Number(product.price),
      image: product.images.find((image) => image.main)?.url ?? product.images[0]?.url ?? '',
      category: product.category.title,
      brand: product.brand?.title,
    });
    toast.success(`${product.title} به سبد خرید اضافه شد.`);
  };

  return (
    <main className="min-h-screen bg-[#f8faf8] pb-20 pt-6">
      <PageRouter routes={[{ title: 'محصولات', link: '/products' }]} />
      <section className="relative mx-auto max-w-7xl overflow-hidden rounded-4xl bg-[#123d34] px-5 py-10 text-white sm:px-10 sm:py-14">
        <div className="relative z-10 max-w-2xl">
          <span className="mb-4 inline-flex rounded-full bg-white/10 px-3 py-1.5 text-xs text-emerald-100">فروشگاه کمپینک</span>
          <h1 className="text-3xl font-black leading-tight sm:text-5xl">محصول مناسب سفرت را پیدا کن</h1>
          <p className="mt-4 max-w-xl text-sm leading-7 text-white/70">محصولات فعال فروشگاه را بر اساس دسته‌بندی و قیمت بررسی کن و مستقیم به سبدت اضافه کن.</p>
        </div>
        <div className="absolute -left-16 -top-28 h-72 w-72 rounded-full border-[36px] border-emerald-400/20" />
      </section>

      <section className="mx-auto mt-8 max-w-7xl px-4 sm:px-0">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-900">همه محصولات</h2>
            <p className="mt-1 text-sm text-slate-500">{(result?.count ?? 0).toLocaleString('fa-IR')} محصول</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="flex min-w-0 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 sm:w-80">
              <Search className="shrink-0 text-slate-400" size={18} />
              <span className="sr-only">جستجوی محصولات</span>
              <input value={search} onChange={(event) => { setPage(1); setSearch(event.target.value); }} placeholder="جستجوی محصول..." className="min-w-0 flex-1 bg-transparent text-sm outline-none" />
              {search && <button type="button" onClick={() => { setPage(1); setSearch(''); }} aria-label="پاک کردن جستجو"><X size={16} /></button>}
            </label>
            <label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700">
              <SlidersHorizontal size={17} className="text-slate-400" />
              <span>مرتب‌سازی</span>
              <select value={sort} onChange={(event) => { setPage(1); setSort(event.target.value as SortOption); }} className="bg-transparent font-medium outline-none">
                <option value="newest">جدیدترین</option>
                <option value="price-asc">ارزان‌ترین</option>
                <option value="price-desc">گران‌ترین</option>
              </select>
            </label>
          </div>
        </div>

        <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
          {[{ title: 'همه', slug: '' }, ...categories.map(({ title, slug }) => ({ title, slug }))].map((category) => (
            <button key={category.slug || 'all'} type="button" onClick={() => { setPage(1); setActiveCategory(category.slug); }} className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition ${activeCategory === category.slug ? 'bg-emerald-700 text-white shadow-md' : 'bg-white text-slate-600 hover:bg-emerald-50 hover:text-emerald-700'}`}>
              {category.title}
            </button>
          ))}
        </div>
        {activeCategory && categoriesByParent.some((category) => category.parentId) && (
          <div className="mt-1 flex flex-wrap gap-2">
            {categoriesByParent.filter((category) => category.parentId === categories.find((parent) => parent.slug === activeCategory)?.id).map((category) => (
              <button key={category.id} type="button" onClick={() => { setPage(1); setActiveCategory(category.slug); }} className="rounded-full border border-emerald-100 bg-white px-3 py-1.5 text-xs text-emerald-800 hover:bg-emerald-50">{category.title}</button>
            ))}
          </div>
        )}

        {isLoading ? (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{Array.from({ length: 8 }, (_, index) => <div key={index} className="aspect-[4/5] animate-pulse rounded-2xl bg-white" />)}</div>
        ) : isError ? (
          <p role="alert" className="mt-8 rounded-2xl bg-rose-50 p-6 text-center text-sm text-rose-700">محصولات دریافت نشدند؛ دوباره تلاش کنید.</p>
        ) : result?.products.length ? (
          <>
            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {result.products.map((product) => (
                <ProductCard key={product.id} product={product} onAdd={() => add(product)} />
              ))}
            </div>
            {result.totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-3">
                <button type="button" disabled={page <= 1} onClick={() => setPage((current) => current - 1)} className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold disabled:opacity-40">قبلی</button>
                <span className="text-sm text-slate-500">صفحه {page.toLocaleString('fa-IR')} از {result.totalPages.toLocaleString('fa-IR')}</span>
                <button type="button" disabled={page >= result.totalPages} onClick={() => setPage((current) => current + 1)} className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold disabled:opacity-40">بعدی</button>
              </div>
            )}
          </>
        ) : (
          <div className="mt-6 flex min-h-72 flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-white px-6 text-center">
            <PackageSearch size={40} className="text-slate-400" />
            <h3 className="mt-4 font-bold text-slate-800">محصولی پیدا نشد</h3>
            <p className="mt-2 text-sm text-slate-500">فیلتر یا عبارت جستجو را تغییر بده.</p>
          </div>
        )}
      </section>
    </main>
  );
}

function ProductCard({ product, onAdd }: { product: StoreProduct; onAdd: () => void }) {
  const image = product.images.find((item) => item.main)?.url ?? product.images[0]?.url;
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl">
      <Link href={`/products/${product.slug}`} className="relative block aspect-square bg-slate-50">
        <img src={getAssetUrl(image)} alt={product.title} className="h-full w-full object-contain p-5 transition duration-300 group-hover:scale-105" />
      </Link>
      <div className="p-4">
        <div className="flex items-center justify-between gap-3 text-xs text-slate-500">
          <Link href={`/products?category=${encodeURIComponent(product.category.slug)}`} className="truncate hover:text-emerald-700">{product.category.title}</Link>
          <span className="flex items-center gap-1 text-amber-500"><Star size={13} className="fill-current" />{product.stars ? product.stars.toLocaleString('fa-IR') : 'جدید'}</span>
        </div>
        <Link href={`/products/${product.slug}`} className="mt-2 block font-bold text-slate-900 hover:text-emerald-700">{product.title}</Link>
        {product.brand && <p className="mt-1 text-xs text-slate-500">{product.brand.title}</p>}
        <p className="mt-2 line-clamp-2 min-h-10 text-xs leading-5 text-slate-500">{product.description}</p>
        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
          <strong className="text-sm font-black text-emerald-700">{formatPrice(Number(product.price))}</strong>
          <button type="button" onClick={onAdd} aria-label={`افزودن ${product.title} به سبد خرید`} className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white transition hover:bg-emerald-700"><ShoppingBag size={18} /></button>
        </div>
      </div>
    </article>
  );
}
