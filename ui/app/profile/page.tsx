'use client';

import PageRouter from '@/components/PageRouter/PageRouter';
import { ApiError, apiFetch } from '@/services/api/ApiFetch';
import { apiGet } from '@/services/api/GetApi';
import { getAssetUrl } from '@/services/api/BaseApi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  CalendarDays,
  ChevronLeft,
  Package,
  Settings2,
  UserRound,
} from 'lucide-react';
import Link from 'next/link';
import { FormEvent, useEffect, useState } from 'react';

type Profile = {
  id: string;
  username: string;
  phone: string;
  name: string | null;
  family: string | null;
  avatar: string | null;
  role: string;
  createdAt: string;
};

type PurchasedProduct = {
  id: string;
  product: {
    id: string;
    title: string;
    slug: string;
    images: { url: string; alt: string | null }[];
  };
  quantity: number;
  price: string | number;
};

type Order = {
  id: string;
  orderNumber: string;
  status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  total: string | number;
  createdAt: string;
  shippingAddress: string | null;
  items: PurchasedProduct[];
};

type ProfileForm = Pick<Profile, 'name' | 'family' | 'username'>;
type Tab = 'overview' | 'orders' | 'settings';

const tabs: { id: Tab; label: string; icon: typeof UserRound }[] = [
  { id: 'overview', label: 'نمای کلی', icon: UserRound },
  { id: 'orders', label: 'سفارش‌های من', icon: Package },
  { id: 'settings', label: 'ویرایش حساب', icon: Settings2 },
];

const orderStatuses: Record<Order['status'], string> = {
  PENDING: 'در انتظار پرداخت',
  PROCESSING: 'در حال آماده‌سازی',
  SHIPPED: 'ارسال شده',
  DELIVERED: 'تحویل شده',
  CANCELLED: 'لغو شده',
};

const formatPrice = (value: string | number) =>
  `${new Intl.NumberFormat('fa-IR').format(Number(value))} تومان`;

const formatDate = (value: string) =>
  new Intl.DateTimeFormat('fa-IR', { dateStyle: 'long' }).format(
    new Date(value),
  );

export default function ProfilePage() {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [form, setForm] = useState<ProfileForm>({
    name: '',
    family: '',
    username: '',
  });
  const [saved, setSaved] = useState(false);

  const {
    data: profile,
    isPending: profilePending,
    error: profileError,
  } = useQuery({
    queryKey: ['profile'],
    queryFn: () => apiGet<Profile>('profile'),
  });
  const {
    data: orders = [],
    isPending: ordersPending,
    error: ordersError,
  } = useQuery({
    queryKey: ['profile', 'orders'],
    queryFn: () => apiGet<Order[]>('profile/orders'),
  });

  useEffect(() => {
    if (!profile) return;
    setForm({
      name: profile.name ?? '',
      family: profile.family ?? '',
      username: profile.username,
    });
  }, [profile]);

  const {
    mutate: updateProfile,
    isPending: isSaving,
    error: saveError,
  } = useMutation({
    mutationFn: () =>
      apiFetch<{ updatedProfile: Profile; message: string }>('profile', {
        method: 'PATCH',
        body: form,
      }),
    onSuccess: ({ updatedProfile }) => {
      queryClient.setQueryData(['profile'], updatedProfile);
      setSaved(true);
    },
  });

  const customerName = [profile?.name, profile?.family]
    .filter(Boolean)
    .join(' ');
  const errorMessage =
    profileError instanceof ApiError
      ? profileError.message
      : profileError?.message;

  if (profilePending) {
    return (
      <ProfileShell>
        <p className="p-8 text-center text-slate-500">
          در حال دریافت اطلاعات حساب...
        </p>
      </ProfileShell>
    );
  }

  if (!profile) {
    return (
      <ProfileShell>
        <div
          role="alert"
          className="rounded-2xl bg-amber-50 p-6 text-center text-sm text-amber-900"
        >
          {errorMessage ?? 'برای مشاهده پروفایل وارد حساب کاربری شوید.'}
          <Link href="/auth" className="mr-2 font-bold underline">
            ورود به حساب
          </Link>
        </div>
      </ProfileShell>
    );
  }

  return (
    <ProfileShell>
      <div className="mx-auto max-w-6xl">
        <header className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-medium text-emerald-700">
              حساب کاربری
            </p>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              {customerName ? `سلام، ${customerName}` : 'پروفایل کاربری'}
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              سفارش‌ها و اطلاعات حساب خود را مدیریت کنید.
            </p>
          </div>
          <span className="rounded-full border border-emerald-100 bg-white px-4 py-2 text-xs font-medium text-slate-600">
            {profile.phone}
          </span>
        </header>

        <div className="grid gap-6 lg:grid-cols-[270px_1fr]">
          <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-4 shadow-sm lg:sticky lg:top-28">
            <div className="rounded-2xl bg-[#123d34] p-5 text-white">
              <div className="flex items-center gap-3">
                <img
                  src={
                    profile.avatar
                      ? getAssetUrl(profile.avatar)
                      : '/images/profile.jpg'
                  }
                  alt=""
                  className="h-14 w-14 rounded-2xl border-2 border-white/25 bg-white/10 object-cover"
                />
                <div className="min-w-0">
                  <p className="truncate font-bold">
                    {customerName || profile.username}
                  </p>
                  <p className="mt-1 truncate text-xs text-white/65">
                    {profile.phone}
                  </p>
                </div>
              </div>
              <div className="mt-5 flex items-center gap-2 border-t border-white/10 pt-4 text-xs text-white/70">
                <CalendarDays size={14} /> عضو از{' '}
                {formatDate(profile.createdAt)}
              </div>
            </div>
            <nav className="mt-4 space-y-1" aria-label="بخش‌های پروفایل">
              {tabs.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActiveTab(id)}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-right text-sm font-medium transition ${activeTab === id ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                  <Icon size={18} />
                  <span>{label}</span>
                  {activeTab === id && (
                    <ChevronLeft size={16} className="mr-auto" />
                  )}
                </button>
              ))}
            </nav>
          </aside>

          <main className="min-w-0">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <section className="grid gap-4 sm:grid-cols-2">
                  <Stat
                    value={orders.length.toLocaleString('fa-IR')}
                    label="سفارش ثبت‌شده"
                  />
                  <Stat
                    value={orders
                      .reduce((total, order) => total + order.items.length, 0)
                      .toLocaleString('fa-IR')}
                    label="قلم کالای خریداری‌شده"
                  />
                </section>
                <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <div>
                      <h2 className="text-lg font-bold text-slate-900">
                        آخرین سفارش‌ها
                      </h2>
                      <p className="mt-1 text-sm text-slate-500">
                        وضعیت و کالاهای خریداری‌شده
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveTab('orders')}
                      className="flex items-center gap-1 text-sm font-bold text-emerald-700"
                    >
                      همه سفارش‌ها <ChevronLeft size={16} />
                    </button>
                  </div>
                  <OrderList
                    orders={orders.slice(0, 3)}
                    pending={ordersPending}
                    error={ordersError}
                  />
                </section>
              </div>
            )}
            {activeTab === 'orders' && (
              <Panel
                title="سفارش‌های من"
                description="سوابق خرید، وضعیت ارسال و کالاهای هر سفارش"
              >
                <OrderList
                  orders={orders}
                  pending={ordersPending}
                  error={ordersError}
                />
              </Panel>
            )}
            {activeTab === 'settings' && (
              <Panel
                title="ویرایش اطلاعات حساب"
                description="اطلاعات شخصی خود را به‌روز کنید."
              >
                <form
                  onSubmit={(event: FormEvent<HTMLFormElement>) => {
                    event.preventDefault();
                    setSaved(false);
                    updateProfile();
                  }}
                  className="grid gap-5 sm:grid-cols-2"
                >
                  <Field
                    label="نام"
                    value={form.name ?? ''}
                    onChange={(value) =>
                      setForm((current) => ({ ...current, name: value }))
                    }
                  />
                  <Field
                    label="نام خانوادگی"
                    value={form.family ?? ''}
                    onChange={(value) =>
                      setForm((current) => ({ ...current, family: value }))
                    }
                  />
                  <Field
                    label="نام کاربری"
                    value={form.username}
                    onChange={(value) =>
                      setForm((current) => ({ ...current, username: value }))
                    }
                  />
                  <Field
                    label="شماره موبایل"
                    value={profile.phone}
                    disabled
                    onChange={() => undefined}
                  />
                  {saveError && (
                    <p
                      role="alert"
                      className="text-sm text-rose-600 sm:col-span-2"
                    >
                      {saveError.message}
                    </p>
                  )}
                  {saved && (
                    <p
                      role="status"
                      className="text-sm text-emerald-700 sm:col-span-2"
                    >
                      اطلاعات حساب با موفقیت ذخیره شد.
                    </p>
                  )}
                  <div className="flex justify-end sm:col-span-2">
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-emerald-700 disabled:opacity-50"
                    >
                      {isSaving ? 'در حال ذخیره...' : 'ذخیره تغییرات'}
                    </button>
                  </div>
                </form>
              </Panel>
            )}
          </main>
        </div>
      </div>
    </ProfileShell>
  );
}

function ProfileShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[calc(100vh-8rem)] bg-[#f7f9f7] px-4 pt-8 pb-20 sm:px-6 lg:px-8">
      <PageRouter routes={[{ title: 'پروفایل کاربری', link: '/profile' }]} />
      {children}
    </div>
  );
}

function OrderList({
  orders,
  pending,
  error,
}: {
  orders: Order[];
  pending: boolean;
  error: Error | null;
}) {
  if (pending)
    return (
      <p className="py-6 text-sm text-slate-500">در حال دریافت سفارش‌ها...</p>
    );
  if (error)
    return (
      <p role="alert" className="py-6 text-sm text-rose-600">
        {error.message}
      </p>
    );
  if (!orders.length)
    return (
      <p className="rounded-2xl bg-slate-50 p-6 text-center text-sm text-slate-500">
        هنوز سفارشی ثبت نکرده‌اید.{' '}
        <Link href="/products" className="font-bold text-emerald-700">
          مشاهده محصولات
        </Link>
      </p>
    );
  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
}

function OrderCard({ order }: { order: Order }) {
  return (
    <article className="rounded-2xl border border-slate-200 p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="font-bold text-slate-900">
            سفارش {order.orderNumber}
          </h3>
          <p className="mt-1 text-xs text-slate-500">
            {formatDate(order.createdAt)}
          </p>
        </div>
        <div className="text-left">
          <p className="text-sm font-bold text-slate-900">
            {formatPrice(order.total)}
          </p>
          <span className="mt-1 inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">
            {orderStatuses[order.status] ?? order.status}
          </span>
        </div>
      </div>
      <div className="mt-4 space-y-2 border-t border-slate-100 pt-4">
        {order.items.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            <img
              src={getAssetUrl(item.product.images[0]?.url)}
              alt={item.product.images[0]?.alt ?? item.product.title}
              className="h-12 w-12 rounded-xl bg-slate-50 object-contain p-1"
            />
            <Link
              href={`/products/${item.product.slug}`}
              className="min-w-0 flex-1 truncate text-sm font-medium text-slate-800 hover:text-emerald-700"
            >
              {item.product.title}
            </Link>
            <span className="text-xs whitespace-nowrap text-slate-500">
              {item.quantity.toLocaleString('fa-IR')} عدد
            </span>
          </div>
        ))}
      </div>
      {order.shippingAddress && (
        <p className="mt-4 border-t border-slate-100 pt-3 text-xs text-slate-500">
          آدرس ارسال: {order.shippingAddress}
        </p>
      )}
    </article>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
        <Package size={20} />
      </span>
      <p className="mt-4 text-2xl font-extrabold text-slate-900">{value}</p>
      <p className="mt-1 text-sm text-slate-500">{label}</p>
    </div>
  );
}

function Panel({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
      <div className="mb-6 border-b border-slate-100 pb-5">
        <h2 className="text-xl font-bold text-slate-900">{title}</h2>
        <p className="mt-2 text-sm text-slate-500">{description}</p>
      </div>
      {children}
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  disabled = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-slate-800">
        {label}
      </span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        disabled={disabled}
        className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-emerald-600 disabled:bg-slate-50 disabled:text-slate-500"
      />
    </label>
  );
}
