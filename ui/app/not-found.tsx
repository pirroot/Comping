import { ArrowLeft, Compass, Home, MessageCircle, PackageSearch, SearchX } from 'lucide-react';
import Link from 'next/link';

const quickLinks = [
  { href: '/', label: 'صفحه اصلی', detail: 'شروع دوباره از خانه', icon: Home },
  { href: '/products', label: 'محصولات', detail: 'تجهیزات سفر و کمپینگ', icon: PackageSearch },
  { href: '/blog', label: 'مجله کمپینک', detail: 'راهنما و نکات سفر', icon: Compass },
  { href: '/contact', label: 'تماس با ما', detail: 'کمک می‌خواهی؟', icon: MessageCircle },
];

export default function NotFound() {
  return (
    <main className="relative flex min-h-[calc(100vh-8rem)] items-center overflow-hidden bg-[#f8faf8] px-4 py-12 sm:px-6">
      <div className="pointer-events-none absolute -left-28 -top-28 h-72 w-72 rounded-full border-28 border-primary/10" />
      <div className="pointer-events-none absolute -bottom-40 right-1/3 h-80 w-80 rounded-full border-34 border-auxiliary/10" />

      <div className="relative mx-auto grid w-full max-w-5xl items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="relative overflow-hidden rounded-4xl bg-[#123d34] p-7 text-white shadow-2xl shadow-[#123d34]/15 sm:p-10">
          <div className="absolute -bottom-20 -left-20 h-52 w-52 rounded-full border-20 border-primary/20" />
          <div className="relative">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-primary_light ring-1 ring-white/10">
              <SearchX size={28} />
            </div>
            <p className="mt-8 text-7xl font-black tracking-tight text-white/10 sm:text-8xl">۴۰۴</p>
            <h1 className="-mt-3 text-2xl font-extrabold sm:text-3xl">مسیرت کمی گم شده</h1>
            <p className="mt-4 max-w-md text-sm leading-8 text-white/65">
              این صفحه وجود ندارد یا ممکن است جابه‌جا شده باشد. نگران نباش، مسیرهای خوب دیگری برای
              ادامه دادن داریم.
            </p>
            <Link
              href="/"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#123d34] transition hover:bg-primary_light"
            >
              <Home size={17} /> بازگشت به خانه <ArrowLeft size={16} />
            </Link>
          </div>
        </section>

        <section className="rounded-4xl border border-neutral_normal bg-white p-5 shadow-sm sm:p-8">
          <div className="mb-6">
            <p className="text-sm font-medium text-primary">مسیرهای پیشنهادی</p>
            <h2 className="mt-2 text-2xl font-extrabold text-text">از اینجا ادامه بده</h2>
            <p className="mt-2 text-sm leading-7 text-neutral_dark">
              شاید چیزی که دنبالش هستی در یکی از بخش‌های زیر منتظرت باشد.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {quickLinks.map(({ href, label, detail, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="group flex items-center gap-3 rounded-2xl border border-neutral_normal p-4 transition hover:-translate-y-0.5 hover:border-primary/30 hover:bg-primary_light/40"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary_light text-primary transition group-hover:bg-primary group-hover:text-white">
                  <Icon size={19} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-bold text-text">{label}</span>
                  <span className="mt-1 block truncate text-xs text-neutral_dark">{detail}</span>
                </span>
                <ArrowLeft
                  size={16}
                  className="text-neutral_dark transition group-hover:-translate-x-1 group-hover:text-primary"
                />
              </Link>
            ))}
          </div>
          <div className="mt-6 flex items-center gap-3 rounded-2xl bg-[#fff8eb] p-4 text-sm leading-7 text-[#8a641d]">
            <Compass size={20} className="shrink-0" /> اگر فکر می‌کنی لینک اشتباه است، از منوی اصلی
            وارد بخش موردنظرت شو.
          </div>
        </section>
      </div>
    </main>
  );
}
