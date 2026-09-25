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

const formatPrice = (value: number) =>
  `${new Intl.NumberFormat('fa-IR').format(value)} تومان`;

export default function CartPage() {
  const [items, setItems] = useState(initialItems);
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);

  const totals = useMemo(() => {
    const subtotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    const productDiscount = items.reduce(
      (sum, item) =>
        sum + Math.round((item.price * item.discount) / 100) * item.quantity,
      0,
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
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item,
      ),
    );
  }

  function removeItem(id: number) {
    setItems((current) => current.filter((item) => item.id !== id));
  }

  return (
    <div className="min-h-screen bg-[#FFFFFF] px-4 pt-8 pb-20 sm:px-6 lg:px-8">
      <PageRouter routes={[{ title: 'سبد خرید', link: '/cart' }]} />
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-primary mb-2 text-sm font-medium">خرید شما</p>
            <h1 className="text-text text-3xl font-extrabold sm:text-4xl">
              سبد خرید
            </h1>
            <p className="text-neutral_dark mt-2 text-sm">
              {items.length
                ? `${items.length} محصول در سبد خرید شماست.`
                : 'سبد خرید شما خالی است.'}
            </p>
          </div>
          <Link
            href="/products"
            className="border-neutral_normal text-primary hover:border-primary inline-flex items-center gap-2 rounded-xl border bg-white px-4 py-3 text-sm font-bold transition"
          >
            <ArrowLeft size={17} /> ادامه خرید
          </Link>
        </div>

        {!items.length ? (
          <EmptyCart />
        ) : (
          <div className="grid items-start gap-6 lg:grid-cols-[1fr_350px]">
            <section className="border-neutral_normal rounded-3xl border bg-white p-5 shadow-sm sm:p-7">
              <div className="border-neutral_normal mb-5 flex items-center justify-between border-b pb-5">
                <h2 className="text-text text-lg font-extrabold">
                  محصولات انتخاب‌شده
                </h2>
                <span className="bg-primary_light text-primary rounded-full px-3 py-1 text-xs font-bold">
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
              <div className="bg-primary_light/60 mt-6 flex items-center gap-3 rounded-2xl p-4 text-sm text-[#356c3e]">
                <Truck size={20} className="shrink-0" />
                <span>
                  با خرید بیشتر از ۲ میلیون تومان، ارسال برای شما رایگان می‌شود.
                </span>
              </div>
            </section>
            <aside className="space-y-4 lg:sticky lg:top-28">
              <section className="border-neutral_normal rounded-3xl border bg-white p-5 shadow-sm sm:p-6">
                <h2 className="text-text text-lg font-extrabold">
                  خلاصه سفارش
                </h2>
                <div className="mt-5 space-y-4 text-sm">
                  <SummaryRow
                    label="جمع کالاها"
                    value={formatPrice(totals.subtotal)}
                  />
                  <SummaryRow
                    label="تخفیف محصولات"
                    value={`− ${formatPrice(totals.productDiscount)}`}
                    accent
                  />
                  <SummaryRow
                    label="تخفیف کد سفارش"
                    value={
                      couponApplied
                        ? `− ${formatPrice(totals.couponDiscount)}`
                        : 'اعمال نشده'
                    }
                    accent={couponApplied}
                  />
                  <SummaryRow
                    label="هزینه ارسال"
                    value={
                      totals.shipping ? formatPrice(totals.shipping) : 'رایگان'
                    }
                    accent={!totals.shipping}
                  />
                </div>
                <div className="border-neutral_normal my-5 border-t" />
                <div className="flex items-center justify-between gap-3">
                  <span className="text-text font-bold">مبلغ قابل پرداخت</span>
                  <strong className="text-primary text-lg">
                    {formatPrice(totals.total)}
                  </strong>
                </div>
                <Link
                  href="/checkout"
                  className="bg-primary mt-6 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#5a9a63] hover:shadow-lg"
                >
                  ادامه و پرداخت <ChevronLeft size={18} />
                </Link>
                <div className="text-neutral_dark mt-4 flex items-center justify-center gap-2 text-xs">
                  <ShieldCheck size={15} className="text-primary" /> پرداخت امن
                  و محافظت‌شده
                </div>
              </section>
              <section className="border-neutral_normal rounded-3xl border bg-white p-5 shadow-sm">
                <div className="text-text flex items-center gap-2 text-sm font-bold">
                  <Tag size={17} className="text-primary" /> کد تخفیف داری؟
                </div>
                <div className="mt-3 flex gap-2">
                  <input
                    value={coupon}
                    onChange={(event) => setCoupon(event.target.value)}
                    placeholder="کد تخفیف"
                    className="border-neutral_normal focus:border-primary min-w-0 flex-1 rounded-xl border bg-[#fbfcfb] px-3 py-2.5 text-sm outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => coupon.trim() && setCouponApplied(true)}
                    className="bg-neutral_light text-text hover:bg-primary_light hover:text-primary rounded-xl px-4 py-2.5 text-xs font-bold transition"
                  >
                    اعمال
                  </button>
                </div>
                {couponApplied && (
                  <p className="text-primary mt-3 flex items-center gap-1 text-xs font-bold">
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
    <div className="border-neutral_normal flex flex-wrap items-center gap-4 rounded-2xl border p-3 sm:p-4">
      <div className="bg-neutral_light relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl">
        <Image
          src="/images/Products/1.png"
          alt={item.title}
          fill
          className="object-contain p-2"
        />
      </div>
      <div className="min-w-40 flex-1">
        <h3 className="text-text leading-7 font-bold">{item.title}</h3>
        <p className="text-neutral_dark mt-1 text-xs leading-6">
          {item.detail}
        </p>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-text text-sm font-extrabold">
            {formatPrice(finalPrice)}
          </span>
          <span className="text-neutral_dark text-xs line-through">
            {formatPrice(item.price)}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onDecrease}
          aria-label="کم کردن تعداد"
          className="border-neutral_normal text-neutral_dark hover:border-primary hover:text-primary flex h-8 w-8 items-center justify-center rounded-lg border"
        >
          <Minus size={15} />
        </button>
        <span className="bg-neutral_light text-text flex h-8 min-w-8 items-center justify-center rounded-lg text-sm font-bold">
          {item.quantity}
        </span>
        <button
          type="button"
          onClick={onIncrease}
          aria-label="زیاد کردن تعداد"
          className="border-neutral_normal text-neutral_dark hover:border-primary hover:text-primary flex h-8 w-8 items-center justify-center rounded-lg border"
        >
          <Plus size={15} />
        </button>
      </div>
      <button
        type="button"
        onClick={onRemove}
        aria-label="حذف محصول"
        className="text-neutral_dark flex h-9 w-9 items-center justify-center rounded-xl transition hover:bg-red-50 hover:text-red-500"
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
      <span
        className={accent ? 'text-primary font-bold' : 'text-text font-medium'}
      >
        {value}
      </span>
    </div>
  );
}
function EmptyCart() {
  return (
    <section className="border-neutral_normal rounded-3xl border bg-white px-6 py-20 text-center shadow-sm">
      <span className="bg-primary_light text-primary mx-auto flex h-16 w-16 items-center justify-center rounded-2xl">
        <ShoppingBag size={28} />
      </span>
      <h2 className="text-text mt-5 text-xl font-extrabold">
        سبد خریدت هنوز خالی است
      </h2>
      <p className="text-neutral_dark mt-2 text-sm">
        برای شروع، سری به محصولات کاربردی کمپینک بزن.
      </p>
      <Link
        href="/products"
        className="bg-primary mt-6 inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-white"
      >
        مشاهده محصولات <ArrowLeft size={16} />
      </Link>
    </section>
  );
}
