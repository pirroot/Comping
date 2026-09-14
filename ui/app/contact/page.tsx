'use client';

import FAQSection from '@/components/Contact/FAQSection';
import { Check, Clock3, Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react';
import { FormEvent, useState } from 'react';

const contactInfo = [
  {
    icon: MapPin,
    title: 'آدرس فروشگاه',
    value: 'تهران، خیابان ولیعصر، پلاک ۱۲۳',
    detail: 'شنبه تا پنجشنبه، ۹ صبح تا ۶ عصر',
  },
  { icon: Phone, title: 'تلفن پشتیبانی', value: '۰۲۱-۱۲۳۴۵۶۷۸', detail: 'پاسخ‌گویی در ساعات کاری' },
  { icon: Mail, title: 'ایمیل', value: 'info@comping.ir', detail: 'پاسخ‌گویی حداکثر تا ۲۴ ساعت' },
];

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
    event.currentTarget.reset();
  }

  return (
    <div className="min-h-screen bg-[#f8faf8] pb-20">
      <PageRouter routes={[{ title: 'تماس با ما', link: '/contact' }]} />
      <section className="relative overflow-hidden bg-[#123d34] px-4 pb-16 pt-12 text-white sm:pb-20 sm:pt-16">
        <div className="absolute -left-24 -top-32 h-72 w-72 rounded-full border-28 border-primary/25" />
        <div className="absolute -bottom-40 right-1/3 h-80 w-80 rounded-full border-34 border-auxiliary/10" />
        <div className="relative mx-auto max-w-6xl">
          <p className="mb-3 text-sm font-medium text-primary_light">ارتباط با کمپینک</p>
          <h1 className="text-3xl font-extrabold sm:text-5xl">بیایید با هم صحبت کنیم</h1>
          <p className="mt-5 max-w-xl text-sm leading-8 text-white/70 sm:text-base">
            سوالی درباره محصولات، سفارش یا انتخاب تجهیزات داری؟ تیم ما اینجاست تا سریع و دقیق
            راهنمایی‌ات کند.
          </p>
          <div className="mt-7 flex flex-wrap gap-3 text-xs text-white/75">
            <span className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2">
              <Clock3 size={15} /> پاسخ‌گویی سریع
            </span>
            <span className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2">
              <MessageCircle size={15} /> پشتیبانی واقعی
            </span>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-4 sm:px-6">
        <section className="-mt-8 grid gap-6 lg:grid-cols-[1fr_1.15fr]">
          <div className="rounded-3xl bg-[#123d34] p-6 text-white shadow-xl shadow-[#123d34]/15 sm:p-8">
            <p className="text-sm font-medium text-primary_light">راه‌های ارتباطی</p>
            <h2 className="mt-2 text-2xl font-extrabold">هر طور راحت‌تری با ما در تماس باش</h2>
            <p className="mt-3 text-sm leading-7 text-white/65">
              برای پیگیری سفارش یا دریافت مشاوره خرید، یکی از راه‌های زیر را انتخاب کن.
            </p>
            <div className="mt-7 space-y-3">
              {contactInfo.map(({ icon: Icon, title, value, detail }) => (
                <div
                  key={title}
                  className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-white">
                    <Icon size={20} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs text-white/55">{title}</p>
                    <p className="mt-1 truncate text-sm font-bold">{value}</p>
                    <p className="mt-1 text-xs text-white/50">{detail}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-7 rounded-2xl bg-auxiliary p-4 text-sm font-bold leading-7 text-text">
              <span className="block text-xs font-medium opacity-70">پشتیبانی سفارش‌ها</span>اگر
              درباره سفارش فعلی‌ات سوال داری، شماره سفارش را در پیام خودت بنویس.
            </div>
          </div>

          <div className="rounded-3xl border border-neutral_normal bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-7">
              <p className="text-sm font-medium text-primary">پیام جدید</p>
              <h2 className="mt-2 text-2xl font-extrabold text-text">چطور می‌توانیم کمکت کنیم؟</h2>
              <p className="mt-2 text-sm text-neutral_dark">
                فرم زیر را پر کن، در اولین فرصت با تو تماس می‌گیریم.
              </p>
            </div>
            {sent ? (
              <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl bg-primary_light/60 px-5 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white">
                  <Check size={28} />
                </span>
                <h3 className="mt-5 text-lg font-extrabold text-text">پیامت با موفقیت ارسال شد</h3>
                <p className="mt-2 text-sm leading-7 text-neutral_dark">
                  ممنون که با ما در تماس هستی. تیم پشتیبانی تا ۲۴ ساعت آینده پاسخ می‌دهد.
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="mt-5 text-sm font-bold text-primary"
                >
                  ارسال پیام جدید
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
                <Field label="نام و نام خانوادگی" name="name" placeholder="مثلاً مهدی رضایی" />
                <Field label="ایمیل" name="email" type="email" placeholder="you@example.com" />
                <div className="sm:col-span-2">
                  <Field label="موضوع" name="subject" placeholder="موضوع پیام را بنویسید" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block">
                    <span className="mb-2 block text-sm font-bold text-text">پیام شما</span>
                    <textarea
                      required
                      name="message"
                      placeholder="چطور می‌توانیم کمک کنیم؟"
                      className="min-h-36 w-full resize-y rounded-xl border border-neutral_normal bg-[#fbfcfb] px-4 py-3 text-sm leading-7 text-text outline-none transition placeholder:text-neutral_dark/60 focus:border-primary focus:ring-4 focus:ring-primary/10"
                    />
                  </label>
                </div>
                <div className="flex items-center justify-between gap-4 sm:col-span-2">
                  <p className="text-xs leading-6 text-neutral_dark">
                    اطلاعات شما فقط برای پاسخ‌گویی به همین پیام استفاده می‌شود.
                  </p>
                  <button
                    type="submit"
                    className="flex shrink-0 items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white transition hover:bg-[#5a9a63]"
                  >
                    <Send size={17} /> ارسال پیام
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>

        <section className="mt-8 grid gap-6 md:grid-cols-[1.15fr_1fr]">
          <div className="relative min-h-64 overflow-hidden rounded-3xl border border-neutral_normal bg-[#e7f2e9] p-7">
            <div className="absolute -left-12 -top-12 h-44 w-44 rounded-full border-18 border-primary/15" />
            <div className="relative">
              <p className="text-sm font-medium text-primary">ما اینجاییم</p>
              <h2 className="mt-2 text-2xl font-extrabold text-text">به فروشگاه کمپینک سر بزن</h2>
              <p className="mt-3 max-w-md text-sm leading-7 text-neutral_dark">
                برای مشاوره نزدیک‌تر می‌توانی به فروشگاه ما در تهران مراجعه کنی.
              </p>
              <div className="mt-6 flex items-center gap-2 text-sm font-bold text-text">
                <MapPin size={18} className="text-primary" /> خیابان ولیعصر، پلاک ۱۲۳
              </div>
            </div>
          </div>
          <div className="rounded-3xl border border-neutral_normal bg-white p-7 shadow-sm">
            <h2 className="text-xl font-extrabold text-text">قبل از پیام، این‌ها را ببین</h2>
            <p className="mt-2 text-sm leading-7 text-neutral_dark">
              شاید پاسخ سوالت را در سوالات متداول پیدا کنی.
            </p>
            <div className="mt-5 space-y-3">
              <QuickAnswer title="مدت زمان ارسال سفارش چقدر است؟" />
              <QuickAnswer title="چطور سفارش خودم را پیگیری کنم؟" />
              <QuickAnswer title="شرایط بازگشت کالا چیست؟" />
            </div>
          </div>
        </section>
      </main>
      <div className="mx-auto mt-12 max-w-6xl px-4 sm:px-6">
        <FAQSection />
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  placeholder,
  type = 'text',
}: {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-text">{label}</span>
      <input
        required
        type={type}
        name={name}
        placeholder={placeholder}
        className="h-12 w-full rounded-xl border border-neutral_normal bg-[#fbfcfb] px-4 text-sm text-text outline-none transition placeholder:text-neutral_dark/60 focus:border-primary focus:ring-4 focus:ring-primary/10"
      />
    </label>
  );
}
function QuickAnswer({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl bg-neutral_light px-4 py-3 text-sm font-medium text-text">
      <span>{title}</span>
      <span className="text-primary">+</span>
    </div>
  );
}
