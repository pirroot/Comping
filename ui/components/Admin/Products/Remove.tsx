'use client';

import { apiRemove } from '@/services/api/RemoveApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader2, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export default function RemoveProduct({ id, title }: { id: string; title: string }) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: () => apiRemove(`admin/products/${id}`),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('محصول حذف شد.');
    },
    onError: () => toast.error('حذف محصول انجام نشد.'),
  });

  return (
    <button
      type="button"
      disabled={isPending}
      aria-label={`حذف ${title}`}
      onClick={() => {
        if (window.confirm(`محصول «${title}» حذف شود؟`)) mutate();
      }}
      className="rounded-lg p-2 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600 disabled:opacity-50"
    >
      {isPending ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
    </button>
  );
}