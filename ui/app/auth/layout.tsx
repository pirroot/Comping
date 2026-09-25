import { Phone, ShieldCheck, Sparkles } from 'lucide-react';
import Image from 'next/image';

export default function LoginLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="min-h-[calc(100vh-8rem)] px-4 py-8 sm:px-6 sm:py-12">
      <div className="border-neutral_normal mx-auto grid min-h-162.5 max-w-5xl overflow-hidden rounded-4xl border bg-white shadow-2xl shadow-[#123d34]/10 lg:grid-cols-2">
        <section className="relative min-h-64 overflow-hidden bg-[#123d34] lg:order-2 lg:min-h-full">
          <Image
            src="/images/Home/hero.webp"
            alt="تجهیزات کمپینگ کمپینک"
            fill
            priority
            className="object-cover opacity-75"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#092820] via-[#123d34]/40 to-[#123d34]/10" />
          <div className="border-primary/20 absolute -top-24 -left-20 h-64 w-64 rounded-full border-24" />
          <div className="absolute right-0 bottom-0 left-0 p-7 text-white sm:p-10">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold backdrop-blur">
              <Sparkles size={14} className="text-auxiliary" /> تجربه‌ای ساده‌تر
              برای سفر
            </span>
            <h1 className="mt-5 max-w-md text-2xl leading-relaxed font-extrabold sm:text-4xl">
              خوش آمدی به کمپینک
            </h1>
            <p className="mt-3 max-w-md text-sm leading-8 text-white/70">
              با ورود به حساب کاربری، سفارش‌ها، علاقه‌مندی‌ها و پیشنهادهای مخصوص
              خودت را یک‌جا ببین.
            </p>
          </div>
        </section>

        <section className="flex flex-col justify-center p-6 sm:p-10 lg:order-1 lg:p-14">
          <div className="mb-9">
            <div className="bg-primary_light text-primary flex h-12 w-12 items-center justify-center rounded-2xl">
              <Phone size={22} />
            </div>
            <p className="text-primary mt-6 text-sm font-medium">
              ورود به حساب کاربری
            </p>
          </div>
          {children}
          <div className="border-neutral_normal text-neutral_dark mt-8 flex items-start gap-3 border-t pt-5 text-xs leading-6">
            <ShieldCheck size={17} className="text-primary mt-0.5 shrink-0" />
            <span>
              ورود شما امن است و اطلاعات شماره موبایل نزد کمپینک محفوظ می‌ماند.
            </span>
          </div>
        </section>
      </div>
    </main>
  );
}
