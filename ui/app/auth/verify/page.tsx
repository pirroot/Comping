'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Check, ChevronRight, Loader2, MessageCircle } from 'lucide-react';
import { authApi, getErrorMessage, tokens } from '@/services/api/Auth';

const OTP_LENGTH = 6;
const RESEND_SECONDS = 60;

type OtpForm = { code: string };

const toEn = (s: string) =>
  s.replace(/[۰-۹]/g, (d) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)));

export default function OtpPage() {
  const router = useRouter();
  const phone = useSearchParams().get('phone') ?? '';
  const [seconds, setSeconds] = useState(RESEND_SECONDS);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<OtpForm>({ defaultValues: { code: '' } });

  const code = watch('code');

  useEffect(() => {
    if (!phone) router.replace('/login');
  }, [phone, router]);

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  const verify = useMutation({
    mutationFn: ({ code }: OtpForm) => authApi.verify(phone, code),
    onSuccess: (data) => {
      tokens.save(data);
      router.replace('/');
    },
    onError: (err) =>
      setError('code', {
        message: getErrorMessage(err, 'تایید کد ناموفق بود'),
      }),
  });

  const resend = useMutation({
    mutationFn: () => authApi.login(phone),
    onSuccess: () => {
      setSeconds(RESEND_SECONDS);
      clearErrors('code');
    },
    onError: (err) =>
      setError('code', {
        message: getErrorMessage(err, 'ارسال مجدد ناموفق بود'),
      }),
  });

  return (
    <form
      onSubmit={handleSubmit((v) => verify.mutate(v))}
      className="space-y-5"
    >
      <label className="block">
        <span className="text-text mb-2 block text-sm font-bold">
          کد {OTP_LENGTH} رقمی
        </span>
        <div className="relative">
          <MessageCircle
            size={18}
            className="text-neutral_dark absolute top-4 right-4"
          />
          <input
            autoFocus
            dir="ltr"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={OTP_LENGTH}
            placeholder="_ _ _ _ _ _"
            {...register('code', {
              required: 'کد را وارد کنید',
              pattern: {
                value: new RegExp(`^\\d{${OTP_LENGTH}}$`),
                message: `کد باید ${OTP_LENGTH} رقم باشد`,
              },
              onChange: (e) => {
                e.target.value = toEn(e.target.value).replace(/\D/g, '');
                clearErrors('code');
              },
            })}
            className="border-neutral_normal text-text focus:border-primary focus:ring-primary/10 h-13 w-full rounded-xl border bg-[#fbfcfb] px-12 text-center text-xl font-bold tracking-[0.6em] transition outline-none focus:ring-4"
          />
        </div>
        {errors.code && (
          <p className="mt-2 text-xs font-bold text-red-500">
            {errors.code.message}
          </p>
        )}
      </label>

      <button
        type="submit"
        disabled={verify.isPending || code.length !== OTP_LENGTH}
        className="bg-primary flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#5a9a63] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
      >
        {verify.isPending ? (
          <Loader2 size={17} className="animate-spin" />
        ) : (
          <>
            تایید و ورود <Check size={17} />
          </>
        )}
      </button>

      <div className="flex items-center justify-between text-xs">
        <button
          type="button"
          onClick={() => router.back()}
          className="text-neutral_dark hover:text-primary flex items-center gap-1 font-bold"
        >
          <ChevronRight size={15} /> تغییر شماره
        </button>

        <button
          type="button"
          disabled={seconds > 0 || resend.isPending}
          onClick={() => resend.mutate()}
          className="text-primary disabled:text-neutral_dark font-bold hover:text-[#5a9a63] disabled:cursor-not-allowed"
        >
          {seconds > 0 ? `ارسال مجدد (${seconds})` : 'ارسال مجدد کد'}
        </button>
      </div>
    </form>
  );
}
