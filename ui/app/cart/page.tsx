'use client';

import PageRouter from '@/components/PageRouter/PageRouter';
import { useCart } from '@/hooks/useCart';
import { getAssetUrl } from '@/services/api/BaseApi';
import {
  ArrowLeft,
  ChevronLeft,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  Truck,
} from 'lucide-react';
import Link from 'next/link';

const formatPrice = (value: number) =>
  `${new Intl.NumberFormat('fa-IR').format(value)} تومان`;

export default function CartPage() {
  const cart = useCart();
  const subtotal = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = subtotal >= 2_000_000 ? 0 : 85_000;

  return (
    <main className="min-h-screen bg-white px-4 pt-8 pb-20 sm:px-6 lg:px-8">
      <PageRouter routes={[{ title: 'سبد خرید', link: '/cart' }]} />
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-medium text-emerald-700">
              خرید شما
            </p>
            <h1 className="text-3xl font-extrabold text-slate-900">سبد خرید</h1>
            <p className="mt-2 text-sm text-slate-500">
              {cart.count
                ? `${cart.count.toLocaleString('fa-IR')} کالا در سبد خرید`
                : 'سبد خرید شما خالی است.'}
            </p>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-emerald-700 hover:bg-emerald-50"
          >
            <ArrowLeft size={17} /> ادامه خرید
          </Link>
        </header>

        {!cart.items.length ? (
          <section className="rounded-3xl border border-dashed border-slate-200 bg-white px-6 py-20 text-center">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
              <ShoppingBag size={28} />
            </span>
            <h2 className="mt-5 text-xl font-extrabold text-slate-900">
              سبد خریدت هنوز خالی است
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              برای شروع، سری به محصولات فروشگاه بزن.
            </p>
            <Link
              href="/products"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white hover:bg-emerald-700"
            >
              مشاهده محصولات <ArrowLeft size={16} />
            </Link>
          </section>
        ) : (
          <div className="grid items-start gap-6 lg:grid-cols-[1fr_350px]">
            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
              <div className="mb-5 flex items-center justify-between border-b border-slate-100 pb-5">
                <h2 className="text-lg font-extrabold text-slate-900">
                  محصولات انتخاب‌شده
                </h2>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                  {cart.items.length.toLocaleString('fa-IR')} نوع کالا
                </span>
              </div>
              <div className="space-y-4">
                {cart.items.map((item) => (
                  <article
                    key={item.id}
                    className="flex flex-wrap items-center gap-4 rounded-2xl border border-slate-200 p-3 sm:p-4"
                  >
                    <img
                      src={getAssetUrl(item.image)}
                      alt={item.title}
                      className="h-24 w-24 shrink-0 rounded-2xl bg-slate-50 object-contain p-2"
                    />
                    <div className="min-w-40 flex-1">
                      <Link
                        href={`/products/${item.slug}`}
                        className="leading-7 font-bold text-slate-900 hover:text-emerald-700"
                      >
                        {item.title}
                      </Link>
                      <p className="mt-1 text-xs text-slate-500">
                        {item.category}
                        {item.brand ? ` · ${item.brand}` : ''}
                      </p>
                      <p className="mt-2 text-sm font-extrabold text-emerald-700">
                        {formatPrice(item.price)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          cart.setQuantity(item.id, item.quantity - 1)
                        }
                        aria-label="کم کردن تعداد"
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 hover:border-emerald-500 hover:text-emerald-700"
                      >
                        <Minus size={15} />
                      </button>
                      <span className="flex h-8 min-w-8 items-center justify-center rounded-lg bg-slate-50 text-sm font-bold">
                        {item.quantity.toLocaleString('fa-IR')}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          cart.setQuantity(item.id, item.quantity + 1)
                        }
                        aria-label="افزایش تعداد"
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 hover:border-emerald-500 hover:text-emerald-700"
                      >
                        <Plus size={15} />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => cart.remove(item.id)}
                      aria-label="حذف از سبد خرید"
                      className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                    >
                      <Trash2 size={17} />
                    </button>
                  </article>
                ))}
              </div>
              <div className="mt-6 flex items-center gap-3 rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-800">
                <Truck size={20} className="shrink-0" />
                <span>
                  {shipping
                    ? `با خرید ${formatPrice(2_000_000 - subtotal)} بیشتر، ارسال عادی رایگان می‌شود.`
                    : 'ارسال عادی سفارش شما رایگان است.'}
                </span>
              </div>
            </section>
            <aside className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:sticky lg:top-28">
              <h2 className="text-lg font-extrabold text-slate-900">
                خلاصه سفارش
              </h2>
              <div className="mt-5 space-y-4 text-sm">
                <SummaryRow
                  label={`جمع کالاها (${cart.count} عدد)`}
                  value={formatPrice(subtotal)}
                />
                <SummaryRow
                  label="هزینه ارسال"
                  value={shipping ? formatPrice(shipping) : 'رایگان'}
                />
              </div>
              <div className="my-5 border-t border-slate-100" />
              <div className="flex items-center justify-between gap-3">
                <span className="font-bold text-slate-900">
                  مبلغ قابل پرداخت
                </span>
                <strong className="text-lg text-emerald-700">
                  {formatPrice(subtotal + shipping)}
                </strong>
              </div>
              <Link
                href="/checkout"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-emerald-700"
              >
                ادامه و ثبت سفارش <ChevronLeft size={18} />
              </Link>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-slate-500">{label}</span>
      <span className="font-medium text-slate-800">{value}</span>
    </div>
  );
}
