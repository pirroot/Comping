'use client';

import { Faq } from '@/lib/types/Faq.type';
import { apiRemove } from '@/services/api/ApiRemove';
import { apiGet } from '@/services/api/ApiGet';
import { apiAdd } from '@/services/api/ApiAdd';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { Button, Dialog, Input } from '@base-ui/react';
import { useForm } from 'react-hook-form';

export default function AdminFaq() {
  const queryClient = useQueryClient();

  // Fetch FAQs
  const { data } = useQuery<Faq[]>({
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
    <section>
      {/* Add FAQ */}
      <AddFaqDialog />

      {/* FAQ List */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        {data?.map((faq) => (
          <div key={faq.id} className="flex items-center justify-between rounded-lg border p-4">
            <h3 className="text-lg font-semibold">{faq.question}</h3>

            <Button onClick={() => deleteFaq(faq.id)}>حذف</Button>
          </div>
        ))}
      </div>
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
      <Dialog.Trigger>افزودن سوال</Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 bg-black/50" />

        <Dialog.Popup className="fixed left-1/2 top-1/2 w-100 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 shadow-xl">
          <Dialog.Title className="mb-4 text-xl font-bold">افزودن سوال جدید</Dialog.Title>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              {...register('question', {
                required: true,
                validate: (value) => value.trim() !== '' || 'سوال نمی‌تواند خالی باشد',
              })}
              placeholder="سوال"
            />

            <Input
              {...register('answer', {
                required: true,
                validate: (value) => value.trim() !== '' || 'پاسخ نمی‌تواند خالی باشد',
              })}
              placeholder="پاسخ"
            />

            <div className="flex justify-end gap-2">
              <Dialog.Close>انصراف</Dialog.Close>

              <Button type="submit" disabled={isPending}>
                {isPending ? 'در حال افزودن...' : 'افزودن'}
              </Button>
            </div>
          </form>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
