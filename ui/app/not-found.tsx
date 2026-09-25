import {
  ArrowLeft,
  Compass,
  Home,
  MessageCircle,
  PackageSearch,
  SearchX,
} from 'lucide-react';
import Link from 'next/link';

const quickLinks = [
  { href: '/', label: 'صفحه اصلی', detail: 'شروع دوباره از خانه', icon: Home },
  {
    href: '/products',
    label: 'محصولات',
    detail: 'تجهیزات سفر و کمپینگ',
    icon: PackageSearch,
  },
  {
    href: '/blog',
    label: 'مجله کمپینک',
    detail: 'راهنما و نکات سفر',
    icon: Compass,
  },
  {
    href: '/contact',
    label: 'تماس با ما',
    detail: 'کمک می‌خواهی؟',
    icon: MessageCircle,
  },
];

export default function NotFound() {
  return (
    <main className="relative flex min-h-[calc(100vh-8rem)] items-center overflow-hidden bg-[#f8faf8] px-4 py-12 sm:px-6">
      <div className="border-primary/10 pointer-events-none absolute -top-28 -left-28 h-72 w-72 rounded-full border-28" />
      <div className="border-auxiliary/10 pointer-events-none absolute right-1/3 -bottom-40 h-80 w-80 rounded-full border-34" />

      <div className="relative mx-auto grid w-full max-w-5xl items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="relative overflow-hidden rounded-4xl bg-[#123d34] p-7 text-white shadow-2xl shadow-[#123d34]/15 sm:p-10">
          <div className="border-primary/20 absolute -bottom-20 -left-20 h-52 w-52 rounded-full border-20" />
          <div className="relative">
            <div className="text-primary_light flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/10">
              <SearchX size={28} />
            </div>
            <p className="mt-8 text-7xl font-black tracking-tight text-white/10 sm:text-8xl">
              ۴۰۴
            </p>
            <h1 className="-mt-3 text-2xl font-extrabold sm:text-3xl">
              مسیرت کمی گم شده
            </h1>
            <p className="mt-4 max-w-md text-sm leading-8 text-white/65">
              این صفحه وجود ندارد یا ممکن است جابه‌جا شده باشد. نگران نباش،
              مسیرهای خوب دیگری برای ادامه دادن داریم.
            </p>
            <Link
              href="/"
              className="hover:bg-primary_light mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#123d34] transition"
            >
              <Home size={17} /> بازگشت به خانه <ArrowLeft size={16} />
            </Link>
          </div>
        </section>

        <section className="border-neutral_normal rounded-4xl border bg-white p-5 shadow-sm sm:p-8">
          <div className="mb-6">
            <p className="text-primary text-sm font-medium">مسیرهای پیشنهادی</p>
            <h2 className="text-text mt-2 text-2xl font-extrabold">
              از اینجا ادامه بده
            </h2>
            <p className="text-neutral_dark mt-2 text-sm leading-7">
              شاید چیزی که دنبالش هستی در یکی از بخش‌های زیر منتظرت باشد.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {quickLinks.map(({ href, label, detail, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="group border-neutral_normal hover:border-primary/30 hover:bg-primary_light/40 flex items-center gap-3 rounded-2xl border p-4 transition hover:-translate-y-0.5"
              >
                <span className="bg-primary_light text-primary group-hover:bg-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition group-hover:text-white">
                  <Icon size={19} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="text-text block text-sm font-bold">
                    {label}
                  </span>
                  <span className="text-neutral_dark mt-1 block truncate text-xs">
                    {detail}
                  </span>
                </span>
                <ArrowLeft
                  size={16}
                  className="text-neutral_dark group-hover:text-primary transition group-hover:-translate-x-1"
                />
              </Link>
            ))}
          </div>
          <div className="mt-6 flex items-center gap-3 rounded-2xl bg-[#fff8eb] p-4 text-sm leading-7 text-[#8a641d]">
            <Compass size={20} className="shrink-0" /> اگر فکر می‌کنی لینک
            اشتباه است، از منوی اصلی وارد بخش موردنظرت شو.
          </div>
        </section>
      </div>
    </main>
  );
}
