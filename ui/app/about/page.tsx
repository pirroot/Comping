import PageRouter from '@/components/PageRouter/PageRouter';
import {
  Check,
  Clock3,
  Compass,
  Headphones,
  Heart,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  Truck,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'درباره ما | کمپینک شاپ',
  description: 'با داستان و ارزش‌های کمپینک شاپ آشنا شوید.',
};

const promises = [
  {
    icon: ShieldCheck,
    title: 'خرید مطمئن',
    text: 'اصالت و کیفیت محصولات را قبل از ارسال بررسی می‌کنیم.',
  },
  {
    icon: Truck,
    title: 'ارسال سریع',
    text: 'سفارش‌ها را در کوتاه‌ترین زمان به سراسر کشور می‌رسانیم.',
  },
  {
    icon: Headphones,
    title: 'پشتیبانی واقعی',
    text: 'برای انتخاب بهتر، قبل و بعد از خرید کنار شما هستیم.',
  },
  {
    icon: PackageCheck,
    title: 'انتخاب کاربردی',
    text: 'فقط محصولاتی را پیشنهاد می‌کنیم که واقعاً به کارتان بیایند.',
  },
];

const values = [
  {
    icon: Compass,
    title: 'ماجراجویی آگاهانه',
    text: 'تجهیزات خوب باید آزادی کشف کردن را بیشتر کنند، نه اینکه سفر را سخت‌تر کنند.',
  },
  {
    icon: Heart,
    title: 'انسان‌محوری',
    text: 'تجربه خرید را ساده، صادقانه و متناسب با نیاز هر مشتری می‌سازیم.',
  },
  {
    icon: Sparkles,
    title: 'استاندارد بالاتر',
    text: 'همیشه دنبال راهی هستیم که کیفیت محصولات و خدماتمان را بهتر کنیم.',
  },
];

export default function AboutPage() {
  return (
    <div className="bg-bg min-h-screen pb-20">
      <PageRouter routes={[{ title: 'درباره ما', link: '/about' }]} />
      <section className="relative overflow-hidden bg-[#123d34] px-4 pt-12 pb-16 text-white sm:pt-16 sm:pb-20">
        <div className="border-primary/25 absolute -top-32 -left-24 h-72 w-72 rounded-full border-28" />
        <div className="border-auxiliary/10 absolute right-1/3 -bottom-40 h-80 w-80 rounded-full border-34" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <p className="text-primary_light mb-3 text-sm font-medium">
              داستان کمپینک
            </p>
            <h1 className="max-w-xl text-3xl leading-normal font-extrabold sm:text-5xl">
              برای سفرهایی که قرار است یادت بمانند
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-8 text-white/70 sm:text-base">
              کمپینک از یک علاقه ساده شروع شد: پیدا کردن تجهیزاتی که خیال آدم را
              در دل طبیعت راحت‌تر می‌کنند.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/products"
                className="hover:bg-primary_light rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#123d34] transition"
              >
                دیدن محصولات
              </Link>
              <Link
                href="/contact"
                className="rounded-xl border border-white/20 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
              >
                با ما صحبت کن
              </Link>
            </div>
          </div>
          <div className="relative h-64 overflow-hidden rounded-3xl border border-white/15 shadow-2xl sm:h-80">
            <Image
              src="/images/Home/hero.webp"
              alt="تجهیزات و تجربه سفر کمپینک"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#092820]/65 to-transparent" />
            <div className="absolute right-5 bottom-5 flex items-center gap-2 text-sm font-bold">
              <span className="bg-auxiliary text-text flex h-9 w-9 items-center justify-center rounded-full">
                <Compass size={18} />
              </span>{' '}
              ساخته‌شده برای کشف کردن
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-4 sm:px-6">
        <section className="-mt-8 grid gap-4 sm:grid-cols-3">
          <TrustStat number="۲۰۰+" label="محصول کاربردی" />
          <TrustStat number="۹۹۹+" label="مشتری راضی" />
          <TrustStat number="۵ سال" label="تجربه در کنار شما" />
        </section>

        <section className="grid items-center gap-10 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:py-24">
          <div className="relative overflow-hidden rounded-3xl bg-[#e7f2e9] p-8 sm:p-10">
            <div className="border-primary/15 absolute -bottom-16 -left-12 h-48 w-48 rounded-full border-20" />
            <div className="relative">
              <p className="text-primary text-sm font-medium">چرا کمپینک؟</p>
              <h2 className="text-text mt-3 text-3xl leading-relaxed font-extrabold">
                تجهیزات بیشتر، دغدغه کمتر
              </h2>
              <p className="text-neutral_dark mt-4 text-sm leading-8">
                ما محصولات را فقط براساس ظاهر انتخاب نمی‌کنیم. دوام، کاربرد،
                تجربه استفاده و ارزش خرید، معیارهایی هستند که هر روز با آن‌ها
                تصمیم می‌گیریم.
              </p>
              <div className="text-text mt-6 space-y-3 text-sm font-bold">
                <p className="flex items-center gap-2">
                  <Check size={17} className="text-primary" /> انتخاب از بین
                  برندهای قابل اعتماد
                </p>
                <p className="flex items-center gap-2">
                  <Check size={17} className="text-primary" /> توضیحات ساده و
                  مشاوره صادقانه
                </p>
                <p className="flex items-center gap-2">
                  <Check size={17} className="text-primary" /> همراهی تا بعد از
                  رسیدن سفارش
                </p>
              </div>
            </div>
          </div>
          <div>
            <p className="text-primary text-sm font-medium">از ۱۳۹۸ تا امروز</p>
            <h2 className="text-text mt-3 text-3xl leading-relaxed font-extrabold">
              ما باور داریم هر کسی باید بتواند با خیال راحت راهی شود.
            </h2>
            <div className="text-neutral_dark mt-5 space-y-4 text-sm leading-8">
              <p>
                کمپینک را با هدف ساده‌کردن خرید تجهیزات کمپینگ، کوهنوردی و
                طبیعت‌گردی راه انداختیم. در شروع، مهم‌ترین سوال ما این بود: «اگر
                خودمان قرار باشد به این سفر برویم، چه چیزی انتخاب می‌کنیم؟»
              </p>
              <p>
                امروز هم همین سوال مسیر ما را مشخص می‌کند. تیم ما ترکیبی از
                علاقه‌مندان طبیعت و آدم‌های دقیق و پیگیر است؛ آدم‌هایی که محصول
                را می‌شناسند و می‌خواهند انتخاب بهتری پیش روی شما بگذارند.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl bg-white p-6 shadow-sm sm:p-9">
          <div className="mb-8 max-w-xl">
            <p className="text-primary text-sm font-medium">قول ما به شما</p>
            <h2 className="text-text mt-2 text-2xl font-extrabold">
              تجربه‌ای که روی آن حساب می‌کنی
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {promises.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="border-neutral_normal hover:border-primary/30 rounded-2xl border p-5 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="bg-primary_light text-primary flex h-11 w-11 items-center justify-center rounded-xl">
                  <Icon size={21} />
                </span>
                <h3 className="text-text mt-4 font-extrabold">{title}</h3>
                <p className="text-neutral_dark mt-2 text-sm leading-7">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-16 text-center sm:py-24">
          <p className="text-primary text-sm font-medium">
            چیزهایی که برایمان مهم‌اند
          </p>
          <h2 className="text-text mt-2 text-3xl font-extrabold">
            ارزش‌های کمپینک
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {values.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="border-neutral_normal rounded-3xl border bg-white p-7 text-right shadow-sm"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff4dc] text-[#bd7e17]">
                  <Icon size={23} />
                </span>
                <h3 className="text-text mt-5 text-lg font-extrabold">
                  {title}
                </h3>
                <p className="text-neutral_dark mt-2 text-sm leading-8">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-primary relative overflow-hidden rounded-3xl px-6 py-10 text-center text-white sm:px-10">
          <div className="relative">
            <Clock3 className="mx-auto mb-4 opacity-80" size={25} />
            <h2 className="text-2xl font-extrabold">
              آماده شروع ماجراجویی جدیدی؟
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-white/80">
              تجهیزات مناسب را پیدا کن و با خیال راحت راهی تجربه بعدی شو.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/products"
                className="text-primary hover:bg-primary_light rounded-xl bg-white px-5 py-3 text-sm font-bold transition"
              >
                مشاهده محصولات
              </Link>
              <Link
                href="/contact"
                className="rounded-xl border border-white/30 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
              >
                تماس با ما
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function TrustStat({ number, label }: { number: string; label: string }) {
  return (
    <div className="border-neutral_normal rounded-2xl border bg-white p-5 text-center shadow-sm">
      <p className="text-primary text-2xl font-extrabold">{number}</p>
      <p className="text-neutral_dark mt-1 text-sm">{label}</p>
    </div>
  );
}
