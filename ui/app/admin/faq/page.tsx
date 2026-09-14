'use client';

import { Button } from '@/components/ui/Button';
import { Faq } from '@/lib/types/Faq.type';
import { ApiResponse } from '@/lib/types/Response.type';
import { apiAdd } from '@/services/api/ApiAdd';
import { apiGet } from '@/services/api/ApiGet';
import { apiRemove } from '@/services/api/ApiRemove';
import { Dialog, Input } from '@base-ui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CircleHelp, Plus, Trash } from 'lucide-react';
import { useForm } from 'react-hook-form';

export default function AdminFaq() {
  const queryClient = useQueryClient();

  // Fetch FAQs
  const { data, isLoading } = useQuery<ApiResponse<Faq[]>>({
    queryKey: ['faqs'],
    queryFn: () => apiGet('admin/faq'),
  });

  // Delete FAQ
  const { mutate: deleteFaq } = useMutation({
    mutationFn: (id: string) => apiRemove(`admin/faq/${id}`),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['faqs'],
      });
    },
  });

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-green-600">راهنمای مشتریان</p>
          <h2 className="mt-1 text-2xl font-extrabold text-slate-950">سوالات متداول</h2>
          <p className="mt-2 text-sm text-slate-500">
            {data?.data?.length ?? 0} سوال ثبت شده برای پاسخ‌گویی سریع‌تر
          </p>
        </div>
        <AddFaqDialog />
      </div>

      {/* FAQ List */}
      {isLoading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-28 animate-pulse rounded-2xl bg-slate-100" />
          ))}
        </div>
      ) : data?.data?.length ? (
        <div className="grid gap-4 md:grid-cols-2">
          {data.data.map((faq) => (
            <div
              key={faq.id}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-green-200 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 flex-1 gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600">
                    <CircleHelp size={18} />
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{faq.question}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-500">{faq.answer}</p>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => {
                      if (confirm('این سوال حذف شود؟')) deleteFaq(faq.id);
                    }}
                  >
                    <Trash className="text-red-600" size={18} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center">
          <CircleHelp className="mx-auto text-slate-300" size={28} />
          <p className="mt-3 text-sm text-slate-500">هنوز سوالی ثبت نشده</p>
        </div>
      )}
    </section>
  );
}

function AddFaqDialog() {
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
      <Dialog.Trigger className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-green-200 transition hover:bg-green-700">
        <Plus size={17} /> افزودن سوال
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 bg-black/50" />

        <Dialog.Popup className="fixed left-1/2 top-1/2 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
          <Dialog.Title className="text-xl font-extrabold text-slate-950">
            افزودن سوال جدید
          </Dialog.Title>
          <p className="mt-2 text-sm text-slate-500">
            پاسخ‌های کوتاه و روشن، تجربه مشتری را بهتر می‌کنند.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              {...register('question', {
                required: true,
                validate: (value) => value.trim() !== '' || 'سوال نمی‌تواند خالی باشد',
              })}
              className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-green-500"
              placeholder="سوال"
            />

            <textarea
              {...register('answer', {
                required: true,
                validate: (value) => value.trim() !== '' || 'پاسخ نمی‌تواند خالی باشد',
              })}
              className="min-h-28 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-green-500"
              placeholder="پاسخ"
            />

            <div className="flex justify-end gap-2">
              <Dialog.Close className="rounded-xl px-4 py-2.5 text-sm font-bold text-slate-500 hover:bg-slate-100">
                انصراف
              </Dialog.Close>

              <Button type="submit" className={'text-white'} disabled={isPending}>
                {isPending ? 'در حال افزودن...' : 'افزودن'}
              </Button>
            </div>
          </form>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
