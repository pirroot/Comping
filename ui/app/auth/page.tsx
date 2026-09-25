'use client';

import { postApi } from '@/services/api/PostApi';
import { useMutation } from '@tanstack/react-query';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

type FormValues = { phone: string };

const toEnglishDigits = (s: string) =>
  s.replace(/[۰-۹]/g, (d) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)));

export default function LoginPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const { mutate, isPending, isError } = useMutation({
    mutationFn: (phone: string) => postApi('auth/login', { phone }),
    onSuccess: (_, phone) => router.push(`/auth/verify?phone=${phone}`),
  });

  const onSubmit = ({ phone }: FormValues) => {
    let normalized = toEnglishDigits(phone.trim());
    if (!normalized.startsWith('0')) normalized = '0' + normalized; // 912... -> 0912...
    mutate(normalized);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <label className="block">
        <span className="text-text mb-2 block text-sm font-bold">
          شماره موبایل
        </span>
        <div
          className={`flex items-center rounded-xl border bg-[#fbfcfb] px-4 transition focus-within:ring-4 ${
            errors.phone
              ? 'border-red-400 focus-within:border-red-400 focus-within:ring-red-100'
              : 'border-neutral_normal focus-within:border-primary focus-within:ring-primary/10'
          }`}
        >
          <span className="border-neutral_normal text-neutral_dark border-l pl-3 text-sm">
            +۹۸
          </span>
          <input
            {...register('phone', {
              required: 'شماره موبایل را وارد کنید',
              validate: (v) =>
                /^0?9\d{9}$/.test(toEnglishDigits(v.trim())) ||
                'شماره موبایل معتبر نیست (مثال: ۰۹۱۲۱۲۳۴۵۶۷)',
            })}
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            dir="ltr"
            placeholder="۰۹۱۲۱۲۳۴۵۶۷"
            className="text-text placeholder:text-neutral_dark/45 h-13 min-w-0 flex-1 bg-transparent px-3 text-left text-base outline-none"
          />
        </div>
        {errors.phone && (
          <span className="mt-2 block text-xs text-red-500">
            {errors.phone.message}
          </span>
        )}
      </label>

      {isError && (
        <p className="text-xs text-red-500">
          ارسال کد ناموفق بود، دوباره تلاش کنید.
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="bg-primary flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#5a9a63] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? 'در حال ارسال...' : 'دریافت کد تایید'}{' '}
        <ArrowLeft size={17} />
      </button>

      <p className="text-neutral_dark text-center text-xs">
        با ورود،{' '}
        <Link href="/contact" className="text-primary font-bold">
          قوانین و شرایط استفاده
        </Link>{' '}
        را می‌پذیری.
      </p>
    </form>
  );
}
