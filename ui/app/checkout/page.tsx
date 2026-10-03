'use client';

import PageRouter from '@/components/PageRouter/PageRouter';
import { useCart } from '@/hooks/useCart';
import { apiGet } from '@/services/api/GetApi';
import { apiAdd } from '@/services/api/PostApi';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ApiError } from '@/services/api/ApiFetch';
import {
  ArrowRight,
  Check,
  ChevronLeft,
  CreditCard,
  MapPin,
  ShieldCheck,
  Truck,
} from 'lucide-react';
import Link from 'next/link';
import { FormEvent, useEffect, useState } from 'react';

type Profile = { name: string | null; family: string | null; phone: string };
type CreatedOrder = { orderNumber: string; total: string | number };
type CheckoutFields = {
  shippingName: string;
  shippingPhone: string;
  shippingAddress: string;
  postalCode: string;
  shippingUnit: string;
  shippingMethod: 'normal' | 'express';
};

const formatPrice = (value: number) =>
  `${new Intl.NumberFormat('fa-IR').format(value)} تومان`;

export default function CheckoutPage() {
  const cart = useCart();
  const subtotal = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const [order, setOrder] = useState<CreatedOrder | null>(null);
  const [fields, setFields] = useState<CheckoutFields>({
    shippingName: '',
    shippingPhone: '',
    shippingAddress: '',
    postalCode: '',
    shippingUnit: '',
    shippingMethod: 'normal',
  });

  const {
    data: profile,
    isLoading: isProfileLoading,
    isError: profileError,
  } = useQuery({
    queryKey: ['profile'],
    queryFn: () => apiGet<Profile>('profile'),
  });

  useEffect(() => {
    if (!profile) return;
    setFields((current) => ({
      ...current,
      shippingName:
        current.shippingName ||
        [profile.name, profile.family].filter(Boolean).join(' '),
      shippingPhone: current.shippingPhone || profile.phone,
    }));
  }, [profile]);

  const {
    mutate: placeOrder,
    isPending,
    error,
  } = useMutation({
    mutationFn: () => {
      if (!cart.items.length) throw new Error('سبد خرید خالی است.');
      return apiAdd<CreatedOrder, object>('profile/orders', {
        ...fields,
        items: cart.items.map(({ id, quantity }) => ({
          productId: id,
          quantity,
        })),
      });
    },
    onSuccess: (created) => {
      setOrder(created);
      cart.clear();
    },
  });

  const field = (name: keyof CheckoutFields, value: string) =>
    setFields((current) => ({ ...current, [name]: value }));

  if (order) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-[#f8faf8] px-4 py-12">
        <section className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-600 text-white">
            <Check size={30} />
          </span>
          <h1 className="mt-5 text-2xl font-extrabold text-slate-900">
            سفارش شما ثبت شد
          </h1>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            شماره سفارش{' '}
            <strong className="text-slate-900">{order.orderNumber}</strong> است.
            وضعیت و کالاهای خریداری‌شده را در پروفایل ببینید.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Link
              href="/profile"
              className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white"
            >
              سفارش‌های من
            </Link>
            <Link
              href="/products"
              className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700"
            >
              بازگشت به فروشگاه
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const apiMessage = error instanceof ApiError ? error.message : error?.message;
  const normalShipping = subtotal >= 2_000_000 ? 0 : 85_000;
  const deliveryCharge =
    fields.shippingMethod === 'express' ? 85_000 : normalShipping;

  return (
    <main className="min-h-screen bg-[#f8faf8] px-4 pt-8 pb-20 sm:px-6">
      <PageRouter
        routes={[
          { title: 'سبد خرید', link: '/cart' },
          { title: 'تکمیل سفارش', link: '/checkout' },
        ]}
      />
      <div className="mx-auto max-w-6xl">
        <header className="mb-8">
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-emerald-700"
          >
            <ArrowRight size={17} /> بازگشت به سبد
          </Link>
          <p className="mt-7 text-sm font-medium text-emerald-700">
            تکمیل خرید
          </p>
          <h1 className="mt-1 text-3xl font-extrabold text-slate-900">
            اطلاعات ارسال و ثبت سفارش
          </h1>
        </header>
        {profileError ? (
          <div
            role="alert"
            className="rounded-2xl bg-amber-50 p-5 text-sm text-amber-900"
          >
            برای ثبت سفارش ابتدا وارد حساب کاربری شوید.{' '}
            <Link href="/auth" className="font-bold underline">
              ورود به حساب
            </Link>
          </div>
        ) : cart.items.length === 0 ? (
          <div className="rounded-2xl bg-white p-8 text-center text-slate-600">
            سبد خرید خالی است.{' '}
            <Link href="/products" className="font-bold text-emerald-700">
              مشاهده محصولات
            </Link>
          </div>
        ) : (
          <form
            onSubmit={(event: FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              placeOrder();
            }}
            className="grid items-start gap-6 lg:grid-cols-[1fr_350px]"
          >
            <div className="space-y-5">
              <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                <h2 className="flex items-center gap-2 text-lg font-extrabold text-slate-900">
                  <MapPin size={20} className="text-emerald-700" /> اطلاعات
                  گیرنده
                </h2>
                {profile && (
                  <p className="mt-2 text-xs text-slate-500">
                    نام و شماره تماس از اطلاعات حساب شما تکمیل شده است.
                  </p>
                )}
                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <Field
                    label="نام و نام خانوادگی"
                    required
                    value={fields.shippingName}
                    placeholder={
                      profile
                        ? [profile.name, profile.family]
                            .filter(Boolean)
                            .join(' ')
                        : 'نام و نام خانوادگی'
                    }
                    onChange={(value) => field('shippingName', value)}
                  />
                  <Field
                    label="شماره موبایل"
                    required
                    value={fields.shippingPhone}
                    type="tel"
                    placeholder={profile?.phone ?? '09123456789'}
                    pattern="09[0-9]{9}"
                    onChange={(value) => field('shippingPhone', value)}
                  />
                  <div className="sm:col-span-2">
                    <Field
                      label="آدرس کامل"
                      required
                      value={fields.shippingAddress}
                      placeholder="استان، شهر، خیابان، پلاک"
                      onChange={(value) => field('shippingAddress', value)}
                    />
                  </div>
                  <Field
                    label="کد پستی"
                    required
                    value={fields.postalCode}
                    placeholder="۱۰ رقم"
                    pattern="[0-9]{10}"
                    onChange={(value) => field('postalCode', value)}
                  />
                  <Field
                    label="واحد / توضیح تکمیلی"
                    value={fields.shippingUnit}
                    placeholder="اختیاری"
                    onChange={(value) => field('shippingUnit', value)}
                  />
                </div>
              </section>
              <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                <h2 className="flex items-center gap-2 text-lg font-extrabold text-slate-900">
                  <Truck size={20} className="text-emerald-700" /> روش ارسال
                </h2>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <ShippingOption
                    value="normal"
                    current={fields.shippingMethod}
                    onChange={(value) => field('shippingMethod', value)}
                    title="ارسال عادی"
                    detail="۲ تا ۵ روز کاری"
                    price={
                      normalShipping ? formatPrice(normalShipping) : 'رایگان'
                    }
                  />
                  <ShippingOption
                    value="express"
                    current={fields.shippingMethod}
                    onChange={(value) => field('shippingMethod', value)}
                    title="ارسال سریع"
                    detail="۱ تا ۲ روز کاری"
                    price={formatPrice(85_000)}
                  />
                </div>
              </section>
            </div>

            <aside className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:sticky lg:top-28">
              <h2 className="text-lg font-extrabold text-slate-900">
                خلاصه سفارش
              </h2>
              <div className="mt-5 space-y-4 text-sm">
                <Summary
                  label={`${cart.count} کالا`}
                  value={formatPrice(subtotal)}
                />
                <Summary
                  label="ارسال"
                  value={
                    deliveryCharge ? formatPrice(deliveryCharge) : 'رایگان'
                  }
                />
              </div>
              <div className="my-5 border-t border-slate-100" />
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">مبلغ نهایی</span>
                <strong className="text-lg text-emerald-700">
                  {formatPrice(subtotal + deliveryCharge)}
                </strong>
              </div>
              {apiMessage && (
                <p
                  role="alert"
                  className="mt-4 rounded-xl bg-rose-50 p-3 text-xs text-rose-700"
                >
                  {apiMessage}
                </p>
              )}
              <button
                type="submit"
                disabled={isPending || isProfileLoading}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-emerald-700 disabled:opacity-50"
              >
                <CreditCard size={18} />
                {isPending ? 'در حال ثبت سفارش...' : 'ثبت سفارش'}
                <ChevronLeft size={18} />
              </button>
              <p className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500">
                <ShieldCheck size={15} className="text-emerald-700" /> قیمت و
                مبلغ سفارش در سرور محاسبه می‌شود.
              </p>
            </aside>
          </form>
        )}
      </div>
    </main>
  );
}

function Field({
  label,
  value,
  placeholder,
  onChange,
  type = 'text',
  required = false,
  pattern,
}: {
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
  pattern?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-slate-800">
        {label}
      </span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        pattern={pattern}
        type={type}
        placeholder={placeholder}
        className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-emerald-600"
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
  value: CheckoutFields['shippingMethod'];
  current: CheckoutFields['shippingMethod'];
  onChange: (value: CheckoutFields['shippingMethod']) => void;
  title: string;
  detail: string;
  price: string;
}) {
  const checked = value === current;
  return (
    <label
      className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-4 transition ${checked ? 'border-emerald-500 bg-emerald-50/60' : 'border-slate-200 hover:border-emerald-200'}`}
    >
      <input
        type="radio"
        name="shipping"
        checked={checked}
        onChange={() => onChange(value)}
      />
      <span className="min-w-0 flex-1">
        <b className="block text-sm text-slate-900">{title}</b>
        <small className="mt-1 block text-xs text-slate-500">{detail}</small>
      </span>
      <b className="text-xs text-emerald-700">{price}</b>
    </label>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3">
      <span className="text-slate-500">{label}</span>
      <span className="font-bold text-slate-800">{value}</span>
    </div>
  );
}
