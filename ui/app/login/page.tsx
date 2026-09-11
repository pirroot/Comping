'use client';

import {
  ArrowLeft,
  Check,
  ChevronRight,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FormEvent, useState } from 'react';

export default function LoginPage() {
  const [step, setStep] = useState<'phone' | 'code'>('phone');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [verified, setVerified] = useState(false);

  function submitPhone(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (phone.trim()) setStep('code');
  }

  function submitCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (code.trim().length >= 4) setVerified(true);
  }

  return (
    <main className="min-h-[calc(100vh-8rem)]  px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto grid min-h-162.5 max-w-5xl overflow-hidden rounded-4xl border border-neutral_normal bg-white shadow-2xl shadow-[#123d34]/10 lg:grid-cols-2">
        <section className="relative min-h-64 overflow-hidden bg-[#123d34] lg:order-2 lg:min-h-full">
          <Image
            src="/images/Home/hero.webp"
            alt="تجهیزات کمپینگ کمپینک"
            fill
            priority
            className="object-cover opacity-75"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#092820] via-[#123d34]/40 to-[#123d34]/10" />
          <div className="absolute -left-20 -top-24 h-64 w-64 rounded-full border-24 border-primary/20" />
          <div className="absolute bottom-0 right-0 left-0 p-7 text-white sm:p-10">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold backdrop-blur">
              <Sparkles size={14} className="text-auxiliary" /> تجربه‌ای ساده‌تر برای سفر
            </span>
            <h1 className="mt-5 max-w-md text-2xl font-extrabold leading-relaxed sm:text-4xl">
              خوش آمدی به کمپینک
            </h1>
            <p className="mt-3 max-w-md text-sm leading-8 text-white/70">
              با ورود به حساب کاربری، سفارش‌ها، علاقه‌مندی‌ها و پیشنهادهای مخصوص خودت را یک‌جا ببین.
            </p>
          </div>
        </section>

        <section className="flex flex-col justify-center p-6 sm:p-10 lg:order-1 lg:p-14">
          <div className="mb-9">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary_light text-primary">
              <Phone size={22} />
            </div>
            <p className="mt-6 text-sm font-medium text-primary">ورود به حساب کاربری</p>
            <h2 className="mt-2 text-2xl font-extrabold text-text sm:text-3xl">
              {step === 'phone' ? 'شماره موبایلت را وارد کن' : 'کد تایید را وارد کن'}
            </h2>
            <p className="mt-3 text-sm leading-7 text-neutral_dark">
              {step === 'phone'
                ? 'برای ورود یا ساخت حساب، شماره موبایل خودت را وارد کن.'
                : `کد ارسال‌شده به ${phone} را وارد کن.`}
            </p>
          </div>

          {verified ? (
            <SuccessState />
          ) : step === 'phone' ? (
            <PhoneForm phone={phone} setPhone={setPhone} onSubmit={submitPhone} />
          ) : (
            <CodeForm
              code={code}
              setCode={setCode}
              onSubmit={submitCode}
              onBack={() => {
                setStep('phone');
                setCode('');
              }}
            />
          )}

          <div className="mt-8 flex items-start gap-3 border-t border-neutral_normal pt-5 text-xs leading-6 text-neutral_dark">
            <ShieldCheck size={17} className="mt-0.5 shrink-0 text-primary" />
            <span>ورود شما امن است و اطلاعات شماره موبایل نزد کمپینک محفوظ می‌ماند.</span>
          </div>
        </section>
      </div>
    </main>
  );
}

function PhoneForm({
  phone,
  setPhone,
  onSubmit,
}: {
  phone: string;
  setPhone: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <label className="block">
        <span className="mb-2 block text-sm font-bold text-text">شماره موبایل</span>
        <div className="flex items-center rounded-xl border border-neutral_normal bg-[#fbfcfb] px-4 transition focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10">
          <span className="border-l border-neutral_normal pl-3 text-sm text-neutral_dark">+۹۸</span>
          <input
            required
            dir="ltr"
            type="tel"
            inputMode="numeric"
            pattern="[0-9۰-۹]{10,11}"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="۹۱۲۱۲۳۴۵۶۷"
            className="h-13 min-w-0 flex-1 bg-transparent px-3 text-left text-base text-text outline-none placeholder:text-neutral_dark/45"
          />
        </div>
      </label>
      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#5a9a63] hover:shadow-lg"
      >
        دریافت کد تایید <ArrowLeft size={17} />
      </button>
      <p className="text-center text-xs text-neutral_dark">
        با ورود،{' '}
        <Link href="/contact" className="font-bold text-primary">
          قوانین و شرایط استفاده
        </Link>{' '}
        را می‌پذیری.
      </p>
    </form>
  );
}

function CodeForm({
  code,
  setCode,
  onSubmit,
  onBack,
}: {
  code: string;
  setCode: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onBack: () => void;
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <label className="block">
        <span className="mb-2 block text-sm font-bold text-text">کد چهار رقمی</span>
        <div className="relative">
          <MessageCircle size={18} className="absolute right-4 top-4 text-neutral_dark" />
          <input
            required
            autoFocus
            dir="ltr"
            inputMode="numeric"
            maxLength={6}
            value={code}
            onChange={(event) => setCode(event.target.value)}
            placeholder="_ _ _ _"
            className="h-13 w-full rounded-xl border border-neutral_normal bg-[#fbfcfb] px-12 text-center text-xl font-bold tracking-[0.6em] text-text outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
          />
        </div>
      </label>
      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#5a9a63] hover:shadow-lg"
      >
        تایید و ورود <Check size={17} />
      </button>
      <div className="flex items-center justify-between text-xs">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1 font-bold text-neutral_dark hover:text-primary"
        >
          <ChevronRight size={15} /> تغییر شماره
        </button>
        <button type="button" className="font-bold text-primary hover:text-[#5a9a63]">
          ارسال مجدد کد
        </button>
      </div>
    </form>
  );
}

function SuccessState() {
  return (
    <div className="rounded-2xl bg-primary_light/70 p-6 text-center">
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white">
        <Check size={28} />
      </span>
      <h3 className="mt-4 text-lg font-extrabold text-text">ورود با موفقیت انجام شد</h3>
      <p className="mt-2 text-sm leading-7 text-neutral_dark">
        حساب کاربری‌ات آماده است. می‌توانی خریدت را ادامه بدهی.
      </p>
      <Link
        href="/"
        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white"
      >
        رفتن به فروشگاه <ArrowLeft size={16} />
      </Link>
    </div>
  );
}
