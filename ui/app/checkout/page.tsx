'use client';

import {
  ArrowRight,
  Check,
  CreditCard,
  MapPin,
  ShieldCheck,
  Truck,
} from 'lucide-react';
import Link from 'next/link';
import { FormEvent, useState } from 'react';

const formatPrice = (value: number) =>
  `${new Intl.NumberFormat('fa-IR').format(value)} تومان`;

export default function CheckoutPage() {
  const [submitted, setSubmitted] = useState(false);
  const [shipping, setShipping] = useState('normal');

  function submitOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted)
    return (
      <main className="flex min-h-[calc(100vh-8rem)] items-center justify-center bg-[#f8faf8] px-4 py-12">
        <section className="border-neutral_normal w-full max-w-lg rounded-3xl border bg-white p-8 text-center shadow-sm">
          <span className="bg-primary mx-auto flex h-16 w-16 items-center justify-center rounded-full text-white">
            <Check size={30} />
          </span>
          <h1 className="text-text mt-5 text-2xl font-extrabold">
            سفارش شما ثبت شد
          </h1>
          <p className="text-neutral_dark mt-3 text-sm leading-7">
            شماره سفارش شما <strong className="text-text">CP-24820</strong> است.
            جزئیات سفارش به شماره موبایل شما ارسال می‌شود.
          </p>
          <Link
            href="/"
            className="bg-primary mt-6 inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-white"
          >
            بازگشت به فروشگاه <ArrowRight size={16} />
          </Link>
        </section>
      </main>
    );

  return (
    <main className="min-h-screen bg-[#f8faf8] px-4 pt-8 pb-20 sm:px-6">
      <PageRouter
        routes={[
          { title: 'سبد خرید', link: '/cart' },
          { title: 'تکمیل سفارش', link: '#' },
        ]}
      />
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <Link
            href="/cart"
            className="text-neutral_dark hover:text-primary inline-flex items-center gap-2 text-sm font-bold"
          >
            <ArrowRight size={17} /> بازگشت به سبد خرید
          </Link>
          <p className="text-primary mt-7 text-sm font-medium">تکمیل خرید</p>
          <h1 className="text-text mt-1 text-3xl font-extrabold">
            اطلاعات ارسال و پرداخت
          </h1>
        </div>
        <form
          onSubmit={submitOrder}
          className="grid items-start gap-6 lg:grid-cols-[1fr_350px]"
        >
          <div className="space-y-5">
            <section className="border-neutral_normal rounded-3xl border bg-white p-5 shadow-sm sm:p-7">
              <h2 className="text-text flex items-center gap-2 text-lg font-extrabold">
                <MapPin size={20} className="text-primary" /> اطلاعات گیرنده
              </h2>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <Field label="نام و نام خانوادگی" placeholder="مهدی رضایی" />
                <Field
                  label="شماره موبایل"
                  placeholder="۰۹۱۲۱۲۳۴۵۶۷"
                  type="tel"
                />
                <div className="sm:col-span-2">
                  <Field
                    label="آدرس کامل"
                    placeholder="استان، شهر، خیابان، پلاک و واحد"
                  />
                </div>
                <Field label="کد پستی" placeholder="۱۰ رقمی" />
                <Field label="پلاک و واحد" placeholder="مثلاً ۲۴، واحد ۳" />
              </div>
            </section>
            <section className="border-neutral_normal rounded-3xl border bg-white p-5 shadow-sm sm:p-7">
              <h2 className="text-text flex items-center gap-2 text-lg font-extrabold">
                <Truck size={20} className="text-primary" /> روش ارسال
              </h2>
              <div className="mt-5 space-y-3">
                <ShippingOption
                  value="normal"
                  current={shipping}
                  onChange={setShipping}
                  title="ارسال عادی"
                  detail="۲ تا ۵ روز کاری"
                  price="رایگان"
                />
                <ShippingOption
                  value="fast"
                  current={shipping}
                  onChange={setShipping}
                  title="ارسال سریع"
                  detail="۱ تا ۲ روز کاری"
                  price="۸۵,۰۰۰ تومان"
                />
              </div>
            </section>
          </div>
          <aside className="space-y-4 lg:sticky lg:top-28">
            <section className="border-neutral_normal rounded-3xl border bg-white p-5 shadow-sm sm:p-6">
              <h2 className="text-text text-lg font-extrabold">خلاصه سفارش</h2>
              <div className="mt-5 space-y-4 text-sm">
                <div className="flex justify-between gap-3">
                  <span className="text-neutral_dark">۲ محصول</span>
                  <span className="text-text font-bold">۴,۴۴۰,۰۰۰ تومان</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-neutral_dark">تخفیف</span>
                  <span className="text-primary font-bold">
                    − ۴۶۵,۰۰۰ تومان
                  </span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-neutral_dark">ارسال</span>
                  <span className="text-primary font-bold">رایگان</span>
                </div>
              </div>
              <div className="border-neutral_normal my-5 border-t" />
              <div className="flex items-center justify-between">
                <span className="text-text font-bold">مبلغ نهایی</span>
                <strong className="text-primary text-lg">
                  {formatPrice(shipping === 'normal' ? 3975000 : 4060000)}
                </strong>
              </div>
              <button
                type="submit"
                className="bg-primary mt-6 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#5a9a63] hover:shadow-lg"
              >
                <CreditCard size={18} /> پرداخت و ثبت سفارش
              </button>
              <p className="text-neutral_dark mt-4 flex items-center justify-center gap-2 text-xs">
                <ShieldCheck size={15} className="text-primary" /> پرداخت امن و
                رمزگذاری‌شده
              </p>
            </section>
          </aside>
        </form>
      </div>
    </main>
  );
}

function Field({
  label,
  placeholder,
  type = 'text',
}: {
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="text-text mb-2 block text-sm font-bold">{label}</span>
      <input
        required
        type={type}
        placeholder={placeholder}
        className="border-neutral_normal text-text placeholder:text-neutral_dark/60 focus:border-primary focus:ring-primary/10 h-12 w-full rounded-xl border bg-[#fbfcfb] px-4 text-sm transition outline-none focus:ring-4"
      />
    </label>
  );
}
function ShippingOption({
  value,
  current,
  onChange,
  title,
  detail,
  price,
}: {
  value: string;
  current: string;
  onChange: (value: string) => void;
  title: string;
  detail: string;
  price: string;
}) {
  const active = value === current;
  return (
    <label
      className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-4 transition ${active ? 'border-primary bg-primary_light/40' : 'border-neutral_normal'}`}
    >
      <input
        type="radio"
        name="shipping"
        value={value}
        checked={active}
        onChange={() => onChange(value)}
        className="accent-primary"
      />
      <span className="flex-1">
        <b className="text-text block text-sm">{title}</b>
        <small className="text-neutral_dark mt-1 block text-xs">{detail}</small>
      </span>
      <strong className="text-primary text-sm">{price}</strong>
    </label>
  );
}
