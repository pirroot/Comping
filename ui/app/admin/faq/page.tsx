'use client';

import { AddFaqDialog } from '@/components/Admin/Faq/AddFaq';
import { Button } from '@/components/ui/Button';
import { Faq } from '@/lib/types/Faq.type';
import { ApiResponse } from '@/lib/types/Response.type';
import { apiGet } from '@/services/api/ApiGet';
import { apiRemove } from '@/services/api/ApiRemove';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CircleHelp, MessageCircleQuestion, Trash } from 'lucide-react';

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

  const faqCount = data?.data?.length ?? 0;

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
            <MessageCircleQuestion size={13} />
            راهنمای مشتریان
          </span>
          <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-950">
            سوالات متداول
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            {faqCount > 0 ? (
              <>
                <span className="font-semibold text-emerald-600">{faqCount}</span> سوال ثبت شده برای
                پاسخ‌گویی سریع‌تر
              </>
            ) : (
              'هنوز سوالی ثبت نشده است'
            )}
          </p>
        </div>
        <AddFaqDialog />
      </div>

      {/* FAQ List */}
      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-28 animate-pulse rounded-2xl border border-emerald-50 bg-gradient-to-br from-emerald-50/60 to-white"
            />
          ))}
        </div>
      ) : faqCount > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {data!.data.map((faq) => (
            <div
              key={faq.id}
              className="group relative overflow-hidden rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm shadow-emerald-900/5 transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md hover:shadow-emerald-900/10"
            >
              {/* نوار سبز سمت راست روی هاور */}
              <span className="absolute inset-y-0 right-0 w-1 origin-bottom scale-y-0 bg-gradient-to-b from-emerald-500 to-emerald-600 transition-transform duration-300 group-hover:scale-y-100" />

              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 flex-1 gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-sm shadow-emerald-500/30">
                    <CircleHelp size={18} />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold leading-6 text-slate-900">{faq.question}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-500">{faq.answer}</p>
                  </div>
                </div>

                {/* دکمه حذف */}
                <button
                  type="button"
                  aria-label="حذف سوال"
                  title="حذف سوال"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-rose-100 bg-rose-50 text-rose-500 opacity-70 transition-all duration-200 hover:border-rose-200 hover:bg-rose-100 hover:text-rose-600 hover:opacity-100 active:scale-95 group-hover:opacity-100"
                  onClick={() => {
                    if (confirm('این سوال حذف شود؟')) deleteFaq(faq.id);
                  }}
                >
                  <Trash size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-emerald-200 bg-gradient-to-br from-emerald-50/50 to-white p-10 text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
            <CircleHelp size={28} />
          </span>
          <p className="mt-4 text-sm font-semibold text-slate-700">هنوز سوالی ثبت نشده</p>
          <p className="mt-1 text-xs text-slate-500">
            از دکمه «افزودن» بالای صفحه اولین سوال رو اضافه کن
          </p>
        </div>
      )}
    </section>
  );
}
