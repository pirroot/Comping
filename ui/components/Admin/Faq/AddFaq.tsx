'use client';

import { Faq } from '@/lib/types/Faq.type';
import { apiAdd } from '@/services/api/ApiAdd';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Button, Dialog, Input } from '@base-ui/react';
import { MessageCircleQuestion, Plus, Sparkles, X } from 'lucide-react';

export function AddFaqDialog() {
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset } = useForm<Pick<Faq, 'question' | 'answer'>>();

  // Add FAQ
  const { mutate: addFaq, isPending } = useMutation({
    mutationFn: (data: Pick<Faq, 'question' | 'answer'>) => apiAdd('admin/faq', data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['faqs'],
      });

      reset();
    },
  });

  const onSubmit = (data: Pick<Faq, 'question' | 'answer'>) => {
    addFaq(data);
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-b from-emerald-500 to-emerald-600 px-4 py-3 text-sm font-bold text-white shadow-sm shadow-emerald-500/30 transition-all duration-200 hover:from-emerald-500 hover:to-emerald-700 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40 focus-visible:ring-offset-2">
        <Plus size={17} /> افزودن سوال
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm transition-opacity duration-200" />

        <Dialog.Popup className="fixed left-1/2 top-1/2 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-2xl shadow-emerald-900/20">
          {/* هدر با گرادیانت سبز */}
          <div className="relative overflow-hidden bg-gradient-to-br from-emerald-700 via-emerald-600 to-emerald-700 px-6 py-5 text-white">
            {/* دایره دکوری */}
            <div className="absolute -left-6 -top-10 h-28 w-28 rounded-full bg-white/10" />
            <div className="absolute -bottom-12 -right-8 h-32 w-32 rounded-full bg-white/5" />

            <Dialog.Close
              aria-label="بستن"
              className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg text-white/80 transition hover:bg-white/15 hover:text-white"
            >
              <X size={16} />
            </Dialog.Close>

            <div className="relative flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white">
                <MessageCircleQuestion size={18} />
              </span>
              <div>
                <Dialog.Title className="text-lg font-extrabold tracking-tight">
                  افزودن سوال جدید
                </Dialog.Title>
                <p className="mt-0.5 text-xs text-emerald-100/90">
                  پاسخ‌های کوتاه و روشن، تجربه مشتری را بهتر می‌کنند.
                </p>
              </div>
            </div>
          </div>

          {/* بدنه فرم */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6">
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                <Sparkles size={12} className="text-emerald-500" />
                سوال
              </label>
              <Input
                {...register('question', {
                  required: true,
                  validate: (value) => value.trim() !== '' || 'سوال نمی‌تواند خالی باشد',
                })}
                className="h-12 w-full rounded-xl border border-emerald-100 bg-white px-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                placeholder="مثلاً: چطور می‌توانم سفارشم را پیگیری کنم؟"
              />
            </div>

            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                <Sparkles size={12} className="text-emerald-500" />
                پاسخ
              </label>
              <textarea
                {...register('answer', {
                  required: true,
                  validate: (value) => value.trim() !== '' || 'پاسخ نمی‌تواند خالی باشد',
                })}
                className="min-h-28 w-full resize-none rounded-xl border border-emerald-100 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                placeholder="پاسخ کوتاه و شفاف بنویسید..."
              />
            </div>

            {/* فوتر */}
            <div className="flex justify-end gap-2 border-t border-emerald-50 pt-4">
              <Dialog.Close className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-500 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 active:scale-[0.97]">
                انصراف
              </Dialog.Close>

              <Button
                type="submit"
                disabled={isPending}
                className="flex-none! bg-linear-to-b from-emerald-500 to-emerald-600 px-5 text-white shadow-sm shadow-emerald-500/30 transition-all duration-200 hover:from-emerald-500 hover:to-emerald-700 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100"
              >
                {isPending ? 'در حال افزودن...' : 'افزودن'}
              </Button>
            </div>
          </form>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
