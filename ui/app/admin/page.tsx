'use client';

import { apiGet } from '@/services/api/GetApi';
import { useQuery } from '@tanstack/react-query';
import {
  ArrowLeft,
  CircleHelp,
  LayoutGrid,
  Package,
  Plus,
  RefreshCw,
} from 'lucide-react';
import Link from 'next/link';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface CategoryItem {
  id: string;
  title?: string;
  name?: string;
}

interface ProductsResponse {
  products?: unknown[];
  count?: number;
}

function unwrapData<T>(response: T | { data: T }): T {
  return response && typeof response === 'object' && 'data' in response
    ? response.data
    : response;
}

export default function Admin() {
  const faqsQuery = useQuery({
    queryKey: ['admin', 'faqs'],
    queryFn: () => apiGet<FaqItem[] | { data: FaqItem[] }>('admin/faq'),
  });
  const categoriesQuery = useQuery({
    queryKey: ['admin', 'categories'],
    queryFn: () =>
      apiGet<CategoryItem[] | { data: CategoryItem[] }>('admin/categories'),
  });
  const productsQuery = useQuery({
    queryKey: ['admin', 'products', 'dashboard'],
    queryFn: () =>
      apiGet<ProductsResponse | { data: ProductsResponse }>(
        'admin/products?page=1',
      ),
  });

  const faqs = unwrapData(faqsQuery.data) ?? [];
  const categories = unwrapData(categoriesQuery.data) ?? [];
  const products = unwrapData(productsQuery.data);
  const productCount = products?.count ?? products?.products?.length ?? 0;
  const isLoading =
    faqsQuery.isLoading || categoriesQuery.isLoading || productsQuery.isLoading;

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-2xl bg-slate-950 px-5 py-6 text-white sm:px-7 sm:py-8">
        <div className="relative z-10 max-w-2xl">
          <p className="mb-2 text-sm font-medium text-slate-300">
            نمای کلی فروشگاه
          </p>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            امروز چه چیزی را مدیریت می‌کنیم؟
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-7 text-slate-300">
            محصولات، دسته‌بندی‌ها و محتوای راهنمای فروشگاه را از همین‌جا به‌روز
            نگه دارید.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/admin/products"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
            >
              <Plus size={17} />
              افزودن محصول
            </Link>
            <Link
              href="/admin/faq"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              مدیریت سوالات
              <ArrowLeft size={17} />
            </Link>
          </div>
        </div>
        <div className="absolute -top-24 -left-16 h-64 w-64 rounded-full border-36 border-green-400/20" />
        <div className="absolute right-1/3 -bottom-28 h-56 w-56 rounded-full border-28 border-cyan-300/10" />
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard
          label="محصولات فعال"
          value={productCount}
          caption="در کاتالوگ فروشگاه"
          icon={<Package size={21} />}
          accent="text-green-600 bg-green-50"
          loading={isLoading}
        />
        <StatCard
          label="دسته‌بندی‌ها"
          value={categories.length}
          caption="برای مرتب‌سازی محصولات"
          icon={<LayoutGrid size={21} />}
          accent="text-emerald-600 bg-emerald-50"
          loading={isLoading}
        />
        <StatCard
          label="سوالات متداول"
          value={faqs.length}
          caption="محتوای آماده پاسخ‌گویی"
          icon={<CircleHelp size={21} />}
          accent="text-amber-600 bg-amber-50"
          loading={isLoading}
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.35fr_1fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-slate-900">سوالات اخیر</h3>
              <p className="mt-1 text-sm text-slate-500">
                آخرین محتوای ثبت‌شده در راهنمای مشتریان
              </p>
            </div>
            <Link
              href="/admin/faq"
              className="shrink-0 text-sm font-semibold text-green-600 hover:text-green-700"
            >
              مشاهده همه
            </Link>
          </div>

          {faqsQuery.isError ? (
            <QueryError />
          ) : isLoading ? (
            <LoadingRows />
          ) : faqs.length ? (
            <div className="divide-y divide-slate-100">
              {faqs.slice(0, 4).map((faq) => (
                <div
                  key={faq.id}
                  className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-800">
                      {faq.question}
                    </p>
                    <p className="mt-1 truncate text-xs text-slate-500">
                      {faq.answer}
                    </p>
                  </div>
                  <CircleHelp className="shrink-0 text-slate-300" size={19} />
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              href="/admin/faq"
              label="هنوز سوالی ثبت نشده"
              action="افزودن سوال"
            />
          )}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
          <h3 className="font-bold text-slate-900">دسترسی سریع</h3>
          <p className="mt-1 text-sm text-slate-500">
            کارهای پرتکرار پنل مدیریت
          </p>
          <div className="mt-5 space-y-3">
            <QuickLink
              href="/admin/products"
              icon={<Package size={19} />}
              title="مدیریت محصولات"
              detail={`${productCount} محصول در کاتالوگ`}
            />
            <QuickLink
              href="/admin/faq"
              icon={<CircleHelp size={19} />}
              title="مدیریت سوالات متداول"
              detail={`${faqs.length} سوال ثبت شده`}
            />
            <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3 text-slate-500">
              <RefreshCw size={19} />
              <div>
                <p className="text-sm font-semibold text-slate-700">
                  وضعیت اتصال
                </p>
                <p className="mt-0.5 text-xs">اطلاعات از API دریافت می‌شود</p>
              </div>
              <span className="mr-auto h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function StatCard({
  label,
  value,
  caption,
  icon,
  accent,
  loading,
}: {
  label: string;
  value: number;
  caption: string;
  icon: React.ReactNode;
  accent: string;
  loading: boolean;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500">{label}</p>
          {loading ? (
            <div className="mt-3 h-9 w-16 animate-pulse rounded-lg bg-slate-100" />
          ) : (
            <p className="mt-2 text-3xl font-bold text-slate-950">{value}</p>
          )}
        </div>
        <span
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${accent}`}
        >
          {icon}
        </span>
      </div>
      <p className="mt-4 text-xs text-slate-400">{caption}</p>
    </div>
  );
}

function QuickLink({
  href,
  icon,
  title,
  detail,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  detail: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-3 rounded-xl border border-slate-100 px-4 py-3 transition hover:border-green-100 hover:bg-green-50/50"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-50 text-green-600">
        {icon}
      </span>
      <span>
        <span className="block text-sm font-semibold text-slate-800">
          {title}
        </span>
        <span className="mt-0.5 block text-xs text-slate-500">{detail}</span>
      </span>
      <ArrowLeft
        className="mr-auto text-slate-300 transition group-hover:-translate-x-1 group-hover:text-green-500"
        size={17}
      />
    </Link>
  );
}

function LoadingRows() {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="h-12 animate-pulse rounded-xl bg-slate-100"
        />
      ))}
    </div>
  );
}

function QueryError() {
  return (
    <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
      دریافت اطلاعات داشبورد با مشکل مواجه شد.
    </p>
  );
}

function EmptyState({
  href,
  label,
  action,
}: {
  href: string;
  label: string;
  action: string;
}) {
  return (
    <div className="rounded-xl border border-dashed border-slate-200 px-4 py-8 text-center">
      <p className="text-sm text-slate-500">{label}</p>
      <Link
        href={href}
        className="mt-3 inline-block text-sm font-semibold text-green-600 hover:text-green-700"
      >
        {action}
      </Link>
    </div>
  );
}
