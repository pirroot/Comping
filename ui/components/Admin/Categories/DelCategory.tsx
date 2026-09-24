'use client';

import { apiRemove } from '@/services/api/RemoveApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader2, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export default function DelCategory({ id, title }: { id: string; title?: string }) {
  const queryClient = useQueryClient();

  const { mutate: del, isPending } = useMutation({
    mutationFn: (id: string) => apiRemove(`admin/categories/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('دسته بندی با موفقیت حذف شد.');
    },
  });

  const handleDelete = () => {
    if (confirm(`«${title ?? 'این دسته'}» حذف شود؟`)) {
      del(id);
    }
  };

  return (
    <button
      onClick={handleDelete}
      type="button"
      disabled={isPending}
      aria-label="حذف"
      className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-500 active:scale-95 disabled:opacity-50"
    >
      {isPending ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
    </button>
  );
}
