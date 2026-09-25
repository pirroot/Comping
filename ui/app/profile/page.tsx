'use client';

import PageRouter from '@/components/PageRouter/PageRouter';
import {
  ArrowLeft,
  CalendarDays,
  Check,
  ChevronLeft,
  Clock3,
  Edit3,
  Heart,
  MapPin,
  MessageSquareText,
  Package,
  Pencil,
  Settings2,
  ShieldCheck,
  Star,
  UserRound,
} from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const tabs = [
  { id: 'overview', label: 'نمای کلی', icon: UserRound },
  { id: 'orders', label: 'سفارش‌های من', icon: Package },
  { id: 'reviews', label: 'نظرهای من', icon: MessageSquareText },
  { id: 'settings', label: 'ویرایش حساب', icon: Settings2 },
] as const;

type TabId = (typeof tabs)[number]['id'];
type Order = {
  id: string;
  date: string;
  items: string;
  amount: string;
  status: string;
  tone: 'green' | 'amber';
};

const orders: Order[] = [
  {
    id: 'CP-24819',
    date: '۲۴ شهریور ۱۴۰۵',
    items: 'ترازو فروشگاهی، رول حرارتی',
    amount: '۲,۸۵۰,۰۰۰ تومان',
    status: 'تحویل شده',
    tone: 'green',
  },
  {
    id: 'CP-24702',
    date: '۱۲ شهریور ۱۴۰۵',
    items: 'بارکدخوان بی‌سیم',
    amount: '۱,۹۸۰,۰۰۰ تومان',
    status: 'در حال ارسال',
    tone: 'amber',
  },
  {
    id: 'CP-24580',
    date: '۲۹ مرداد ۱۴۰۵',
    items: 'پرینتر حرارتی، ۵ رول کاغذ',
    amount: '۳,۴۲۰,۰۰۰ تومان',
    status: 'تحویل شده',
    tone: 'green',
  },
];

const reviews = [
  {
    product: 'پرینتر حرارتی مدل XP-Q200',
    date: '۱۸ شهریور ۱۴۰۵',
    text: 'کیفیت چاپ خیلی خوبه و ارسال هم سریع انجام شد. برای فروشگاه کوچک کاملاً مناسبه.',
    stars: 5,
  },
  {
    product: 'بارکدخوان بی‌سیم ZK-220',
    date: '۱۴ مرداد ۱۴۰۵',
    text: 'نصب راحت و عملکرد روانی داره، فقط ای کاش دفترچه راهنما فارسی هم داشت.',
    stars: 4,
  },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [saved, setSaved] = useState(false);

  return (
    <div className="min-h-[calc(100vh-8rem)] bg-[#f7f9f7] px-4 pt-8 pb-20 sm:px-6 lg:px-8">
      <PageRouter routes={[{ title: 'پروفایل کاربری', link: '/profile' }]} />
      <div className="mx-auto max-w-6xl">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-primary mb-2 text-sm font-medium">حساب کاربری</p>
            <h1 className="text-text text-3xl font-extrabold tracking-tight sm:text-4xl">
              سلام، مهدی جان
            </h1>
            <p className="text-neutral_dark mt-2 text-sm">
              اینجا می‌توانی سفارش‌ها و فعالیت‌های خودت را مدیریت کنی.
            </p>
          </div>
          <div className="border-primary/15 text-neutral_dark flex items-center gap-2 rounded-full border bg-white px-3 py-2 text-xs font-medium shadow-sm">
            <ShieldCheck size={16} className="text-primary" /> حساب شما تایید
            شده است
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-[270px_1fr]">
          <aside className="border-neutral_normal h-fit rounded-3xl border bg-white p-4 shadow-sm lg:sticky lg:top-28">
            <div className="relative overflow-hidden rounded-2xl bg-[#123d34] p-5 text-white">
              <div className="border-primary/30 absolute -top-12 -left-8 h-28 w-28 rounded-full border-18" />
              <div className="relative flex items-center gap-3">
                <div className="relative h-14 w-14 overflow-hidden rounded-2xl border-2 border-white/25">
                  <Image
                    src="/images/profile.jpg"
                    alt="تصویر مهدی رضایی"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="truncate font-bold">مهدی رضایی</p>
                  <p className="mt-1 truncate text-xs text-white/65">
                    mehdi@example.com
                  </p>
                </div>
              </div>
              <div className="relative mt-5 flex items-center gap-2 border-t border-white/10 pt-4 text-xs text-white/70">
                <CalendarDays size={14} /> عضو از شهریور ۱۴۰۴
              </div>
            </div>
            <nav className="mt-4 space-y-1" aria-label="بخش‌های پروفایل">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-right text-sm font-medium transition ${isActive ? 'bg-primary_light text-primary' : 'text-neutral_dark hover:bg-neutral_light hover:text-text'}`}
                  >
                    <Icon size={18} />
                    <span>{tab.label}</span>
                    {isActive && <ChevronLeft size={16} className="mr-auto" />}
                  </button>
                );
              })}
            </nav>
            <div className="mt-5 rounded-2xl bg-[#fff8eb] p-4 text-xs leading-6 text-[#8a641d]">
              <div className="mb-1 flex items-center gap-2 font-bold">
                <Heart size={15} className="fill-[#f0ad35] text-[#f0ad35]" />{' '}
                باشگاه مشتریان
              </div>
              با هر خرید امتیاز بگیر و از تخفیف‌های ویژه استفاده کن.
              <button
                type="button"
                className="mt-2 flex items-center gap-1 font-bold text-[#b77c16]"
              >
                مشاهده امتیازها <ArrowLeft size={13} />
              </button>
            </div>
          </aside>
          <main className="min-w-0">
            {activeTab === 'overview' && <Overview onNavigate={setActiveTab} />}
            {activeTab === 'orders' && <Orders />}
            {activeTab === 'reviews' && <Reviews />}
            {activeTab === 'settings' && (
              <Settings saved={saved} onSave={() => setSaved(true)} />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

function Overview({ onNavigate }: { onNavigate: (tab: TabId) => void }) {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 sm:grid-cols-3">
        <Stat icon={<Package />} value="۳" label="سفارش ثبت‌شده" />
        <Stat icon={<MessageSquareText />} value="۲" label="نظر ثبت‌شده" />
        <Stat icon={<Heart />} value="۱۲" label="محصول موردعلاقه" />
      </section>
      <section className="border-neutral_normal rounded-3xl border bg-white p-5 shadow-sm sm:p-7">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-text text-lg font-bold">آخرین سفارش‌ها</h2>
            <p className="text-neutral_dark mt-1 text-sm">
              وضعیت سفارش‌های اخیرت را پیگیری کن.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('orders')}
            className="text-primary flex items-center gap-1 text-sm font-bold"
          >
            همه سفارش‌ها <ArrowLeft size={16} />
          </button>
        </div>
        <div className="space-y-3">
          {orders.slice(0, 2).map((order) => (
            <OrderRow key={order.id} order={order} />
          ))}
        </div>
      </section>
      <section className="grid gap-6 md:grid-cols-2">
        <div className="border-neutral_normal rounded-3xl border bg-white p-6 shadow-sm">
          <SectionTitle
            icon={<MapPin />}
            title="آدرس پیش‌فرض"
            action="ویرایش"
          />
          <p className="text-text mt-5 text-sm font-bold">
            تهران، خیابان ولیعصر
          </p>
          <p className="text-neutral_dark mt-2 text-sm leading-7">
            بالاتر از میدان ونک، کوچه دوازدهم، پلاک ۲۴
          </p>
        </div>
        <div className="border-neutral_normal rounded-3xl border bg-white p-6 shadow-sm">
          <SectionTitle
            icon={<Clock3 />}
            title="فعالیت اخیر"
            action="مشاهده همه"
          />
          <div className="mt-5 space-y-4 text-sm">
            <Activity
              icon={<Check />}
              text="سفارش CP-24819 تحویل داده شد"
              time="۲ روز پیش"
            />
            <Activity
              icon={<MessageSquareText />}
              text="نظر شما برای پرینتر ثبت شد"
              time="۵ روز پیش"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function Orders() {
  return (
    <Panel title="سفارش‌های من" description="سوابق خرید و وضعیت ارسال سفارش‌ها">
      <div className="space-y-3">
        {orders.map((order) => (
          <OrderRow key={order.id} order={order} detailed />
        ))}
      </div>
    </Panel>
  );
}
function Reviews() {
  return (
    <Panel
      title="نظرهای من"
      description="بازخوردهایی که درباره محصولات ثبت کرده‌ای"
    >
      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review.product}
            className="border-neutral_normal rounded-2xl border p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-text font-bold">{review.product}</p>
                <p className="text-neutral_dark mt-1 text-xs">
                  ثبت شده در {review.date}
                </p>
              </div>
              <div className="flex gap-0.5 text-[#f2ad28]">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    size={15}
                    className={
                      index < review.stars
                        ? 'fill-current'
                        : 'text-neutral_normal'
                    }
                  />
                ))}
              </div>
            </div>
            <p className="bg-neutral_light text-neutral_dark mt-4 rounded-xl px-4 py-3 text-sm leading-7">
              {review.text}
            </p>
            <button
              type="button"
              className="text-primary mt-4 flex items-center gap-2 text-xs font-bold"
            >
              <Pencil size={14} /> ویرایش نظر
            </button>
          </div>
        ))}
      </div>
    </Panel>
  );
}
function Settings({ saved, onSave }: { saved: boolean; onSave: () => void }) {
  return (
    <Panel
      title="ویرایش اطلاعات حساب"
      description="اطلاعات شخصی‌ات را به‌روز نگه دار"
    >
      <div className="bg-primary_light/60 mb-7 flex items-center gap-4 rounded-2xl p-4">
        <div className="relative h-16 w-16 overflow-hidden rounded-2xl">
          <Image
            src="/images/profile.jpg"
            alt="تصویر پروفایل"
            fill
            className="object-cover"
          />
        </div>
        <div>
          <p className="text-text font-bold">تصویر پروفایل</p>
          <button type="button" className="text-primary mt-1 text-sm font-bold">
            تغییر تصویر
          </button>
        </div>
        <Edit3 size={18} className="text-primary mr-auto" />
      </div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSave();
        }}
        className="grid gap-5 sm:grid-cols-2"
      >
        <Field label="نام" value="مهدی" />
        <Field label="نام خانوادگی" value="رضایی" />
        <Field label="نام کاربری" value="mehdi.rezaei" />
        <Field label="شماره موبایل" value="۰۹۱۲۱۲۳۴۵۶۷" />
        <div className="sm:col-span-2">
          <Field label="ایمیل" value="mehdi@example.com" type="email" />
        </div>
        <div className="flex items-center justify-end gap-3 sm:col-span-2">
          <button
            type="button"
            className="text-neutral_dark hover:bg-neutral_light rounded-xl px-5 py-3 text-sm font-bold"
          >
            انصراف
          </button>
          <button
            type="submit"
            className="bg-primary rounded-xl px-6 py-3 text-sm font-bold text-white transition hover:bg-[#5a9a63]"
          >
            {saved ? 'ذخیره شد ✓' : 'ذخیره تغییرات'}
          </button>
        </div>
      </form>
    </Panel>
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
    <section className="border-neutral_normal rounded-3xl border bg-white p-5 shadow-sm sm:p-7">
      <div className="border-neutral_normal mb-6 border-b pb-5">
        <h2 className="text-text text-xl font-bold">{title}</h2>
        <p className="text-neutral_dark mt-2 text-sm">{description}</p>
      </div>
      {children}
    </section>
  );
}
function Stat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="border-neutral_normal rounded-2xl border bg-white p-5 shadow-sm">
      <span className="bg-primary_light text-primary flex h-10 w-10 items-center justify-center rounded-xl">
        {icon}
      </span>
      <p className="text-text mt-4 text-2xl font-extrabold">{value}</p>
      <p className="text-neutral_dark mt-1 text-sm">{label}</p>
    </div>
  );
}
function SectionTitle({
  icon,
  title,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  action: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-text flex items-center gap-2 font-bold">
        <span className="text-primary">{icon}</span>
        {title}
      </h2>
      <button type="button" className="text-primary text-xs font-bold">
        {action}
      </button>
    </div>
  );
}
function Activity({
  icon,
  text,
  time,
}: {
  icon: React.ReactNode;
  text: string;
  time: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="bg-primary_light text-primary flex h-8 w-8 items-center justify-center rounded-full">
        {icon}
      </span>
      <span className="text-text flex-1 font-medium">{text}</span>
      <span className="text-neutral_dark text-xs">{time}</span>
    </div>
  );
}
function OrderRow({
  order,
  detailed = false,
}: {
  order: Order;
  detailed?: boolean;
}) {
  return (
    <div className="border-neutral_normal hover:border-primary/40 hover:bg-primary_light/20 flex flex-wrap items-center gap-4 rounded-2xl border p-4 transition">
      <span className="bg-neutral_light text-primary flex h-11 w-11 items-center justify-center rounded-xl">
        <Package size={21} />
      </span>
      <div className="min-w-37.5 flex-1">
        <p className="text-text font-bold">سفارش {order.id}</p>
        <p className="text-neutral_dark mt-1 text-xs">
          {order.date}
          {detailed && ` · ${order.items}`}
        </p>
      </div>
      <div className="text-left">
        <p className="text-text text-sm font-bold">{order.amount}</p>
        <span
          className={`mt-1 inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${order.tone === 'green' ? 'bg-primary_light text-primary' : 'bg-[#fff4dc] text-[#bd7e17]'}`}
        >
          {order.status}
        </span>
      </div>
      <ChevronLeft size={18} className="text-neutral_dark" />
    </div>
  );
}
function Field({
  label,
  value,
  type = 'text',
}: {
  label: string;
  value: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="text-text mb-2 block text-sm font-bold">{label}</span>
      <input
        type={type}
        defaultValue={value}
        className="border-neutral_normal text-text focus:border-primary focus:ring-primary/10 h-12 w-full rounded-xl border bg-white px-4 text-sm transition outline-none focus:ring-4"
      />
    </label>
  );
}
