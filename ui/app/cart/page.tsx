'use client';

import {
  ArrowLeft,
  Check,
  ChevronLeft,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Tag,
  Trash2,
  Truck,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';

const initialItems = [
  {
    id: 1,
    title: 'کوله پشتی کوهنوردی ۶۰ لیتری',
    detail: 'رنگ مشکی · گارانتی اصالت کالا',
    price: 3200000,
    discount: 10,
    quantity: 1,
  },
  {
    id: 2,
    title: 'چراغ قوه شارژی حرفه‌ای',
    detail: 'نوردهی قدرتمند · شارژ USB',
    price: 620000,
    discount: 12,
    quantity: 2,
  },
];

const formatPrice = (value: number) => `${new Intl.NumberFormat('fa-IR').format(value)} تومان`;

export default function CartPage() {
  const [items, setItems] = useState(initialItems);
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);

  const totals = useMemo(() => {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const productDiscount = items.reduce(
      (sum, item) => sum + Math.round((item.price * item.discount) / 100) * item.quantity,
      0
    );
    const couponDiscount = couponApplied ? Math.round(subtotal * 0.05) : 0;
    const shipping = subtotal - productDiscount >= 2000000 ? 0 : 85000;
    return {
      subtotal,
      productDiscount,
      couponDiscount,
      shipping,
      total: subtotal - productDiscount - couponDiscount + shipping,
    };
  }, [items, couponApplied]);

  function updateQuantity(id: number, amount: number) {
    setItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
      )
    );
  }

  function removeItem(id: number) {
    setItems((current) => current.filter((item) => item.id !== id));
  }

  return (
    <div className="min-h-screen bg-[#FFFFFF] px-4 pb-20 pt-8 sm:px-6 lg:px-8">
      <PageRouter routes={[{ title: 'سبد خرید', link: '/cart' }]} />
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-medium text-primary">خرید شما</p>
            <h1 className="text-3xl font-extrabold text-text sm:text-4xl">سبد خرید</h1>
            <p className="mt-2 text-sm text-neutral_dark">
              {items.length ? `${items.length} محصول در سبد خرید شماست.` : 'سبد خرید شما خالی است.'}
            </p>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-xl border border-neutral_normal bg-white px-4 py-3 text-sm font-bold text-primary transition hover:border-primary"
          >
            <ArrowLeft size={17} /> ادامه خرید
          </Link>
        </div>

        {!items.length ? (
          <EmptyCart />
        ) : (
          <div className="grid items-start gap-6 lg:grid-cols-[1fr_350px]">
            <section className="rounded-3xl border border-neutral_normal bg-white p-5 shadow-sm sm:p-7">
              <div className="mb-5 flex items-center justify-between border-b border-neutral_normal pb-5">
                <h2 className="text-lg font-extrabold text-text">محصولات انتخاب‌شده</h2>
                <span className="rounded-full bg-primary_light px-3 py-1 text-xs font-bold text-primary">
                  {items.length} کالا
                </span>
              </div>
              <div className="space-y-4">
                {items.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onIncrease={() => updateQuantity(item.id, 1)}
                    onDecrease={() => updateQuantity(item.id, -1)}
                    onRemove={() => removeItem(item.id)}
                  />
                ))}
              </div>
              <div className="mt-6 flex items-center gap-3 rounded-2xl bg-primary_light/60 p-4 text-sm text-[#356c3e]">
                <Truck size={20} className="shrink-0" />
                <span>با خرید بیشتر از ۲ میلیون تومان، ارسال برای شما رایگان می‌شود.</span>
              </div>
            </section>
            <aside className="space-y-4 lg:sticky lg:top-28">
              <section className="rounded-3xl border border-neutral_normal bg-white p-5 shadow-sm sm:p-6">
                <h2 className="text-lg font-extrabold text-text">خلاصه سفارش</h2>
                <div className="mt-5 space-y-4 text-sm">
                  <SummaryRow label="جمع کالاها" value={formatPrice(totals.subtotal)} />
                  <SummaryRow
                    label="تخفیف محصولات"
                    value={`− ${formatPrice(totals.productDiscount)}`}
                    accent
                  />
                  <SummaryRow
                    label="تخفیف کد سفارش"
                    value={couponApplied ? `− ${formatPrice(totals.couponDiscount)}` : 'اعمال نشده'}
                    accent={couponApplied}
                  />
                  <SummaryRow
                    label="هزینه ارسال"
                    value={totals.shipping ? formatPrice(totals.shipping) : 'رایگان'}
                    accent={!totals.shipping}
                  />
                </div>
                <div className="my-5 border-t border-neutral_normal" />
                <div className="flex items-center justify-between gap-3">
                  <span className="font-bold text-text">مبلغ قابل پرداخت</span>
                  <strong className="text-lg text-primary">{formatPrice(totals.total)}</strong>
                </div>
                <Link
                  href="/checkout"
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#5a9a63] hover:shadow-lg"
                >
                  ادامه و پرداخت <ChevronLeft size={18} />
                </Link>
                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-neutral_dark">
                  <ShieldCheck size={15} className="text-primary" /> پرداخت امن و محافظت‌شده
                </div>
              </section>
              <section className="rounded-3xl border border-neutral_normal bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2 text-sm font-bold text-text">
                  <Tag size={17} className="text-primary" /> کد تخفیف داری؟
                </div>
                <div className="mt-3 flex gap-2">
                  <input
                    value={coupon}
                    onChange={(event) => setCoupon(event.target.value)}
                    placeholder="کد تخفیف"
                    className="min-w-0 flex-1 rounded-xl border border-neutral_normal bg-[#fbfcfb] px-3 py-2.5 text-sm outline-none focus:border-primary"
                  />
                  <button
                    type="button"
                    onClick={() => coupon.trim() && setCouponApplied(true)}
                    className="rounded-xl bg-neutral_light px-4 py-2.5 text-xs font-bold text-text transition hover:bg-primary_light hover:text-primary"
                  >
                    اعمال
                  </button>
                </div>
                {couponApplied && (
                  <p className="mt-3 flex items-center gap-1 text-xs font-bold text-primary">
                    <Check size={14} /> کد تخفیف با موفقیت اعمال شد.
                  </p>
                )}
              </section>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}

function CartItem({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: {
  item: (typeof initialItems)[number];
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}) {
  const finalPrice = Math.round(item.price * (1 - item.discount / 100));
  return (
    <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-neutral_normal p-3 sm:p-4">
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-neutral_light">
        <Image src="/images/Products/1.png" alt={item.title} fill className="object-contain p-2" />
      </div>
      <div className="min-w-40 flex-1">
        <h3 className="font-bold leading-7 text-text">{item.title}</h3>
        <p className="mt-1 text-xs leading-6 text-neutral_dark">{item.detail}</p>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-sm font-extrabold text-text">{formatPrice(finalPrice)}</span>
          <span className="text-xs text-neutral_dark line-through">{formatPrice(item.price)}</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onDecrease}
          aria-label="کم کردن تعداد"
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-neutral_normal text-neutral_dark hover:border-primary hover:text-primary"
        >
          <Minus size={15} />
        </button>
        <span className="flex h-8 min-w-8 items-center justify-center rounded-lg bg-neutral_light text-sm font-bold text-text">
          {item.quantity}
        </span>
        <button
          type="button"
          onClick={onIncrease}
          aria-label="زیاد کردن تعداد"
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-neutral_normal text-neutral_dark hover:border-primary hover:text-primary"
        >
          <Plus size={15} />
        </button>
      </div>
      <button
        type="button"
        onClick={onRemove}
        aria-label="حذف محصول"
        className="flex h-9 w-9 items-center justify-center rounded-xl text-neutral_dark transition hover:bg-red-50 hover:text-red-500"
      >
        <Trash2 size={17} />
      </button>
    </div>
  );
}
function SummaryRow({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-neutral_dark">{label}</span>
      <span className={accent ? 'font-bold text-primary' : 'font-medium text-text'}>{value}</span>
    </div>
  );
}
function EmptyCart() {
  return (
    <section className="rounded-3xl border border-neutral_normal bg-white px-6 py-20 text-center shadow-sm">
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary_light text-primary">
        <ShoppingBag size={28} />
      </span>
      <h2 className="mt-5 text-xl font-extrabold text-text">سبد خریدت هنوز خالی است</h2>
      <p className="mt-2 text-sm text-neutral_dark">
        برای شروع، سری به محصولات کاربردی کمپینک بزن.
      </p>
      <Link
        href="/products"
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white"
      >
        مشاهده محصولات <ArrowLeft size={16} />
      </Link>
    </section>
  );
}
