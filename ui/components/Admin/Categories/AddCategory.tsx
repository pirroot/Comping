'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { FolderPlus, Plus, X } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/Button';
import { ImageInput } from '@/components/ui/ImageInput';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { CategoryType } from '@/lib/types/Product.type';
import { ApiResponse } from '@/lib/types/Response.type';
import { apiAdd } from '@/services/api/ApiAdd';
import { apiGet } from '@/services/api/ApiGet';
import { toast } from 'sonner';

type CategoryFormValues = {
  title: string;
  slug: string;
  description: string;
  image: string;
  parentId: string | null;
};

export default function AddCategory() {
  const queryClient = useQueryClient();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: response, isLoading } = useQuery<ApiResponse<CategoryType[]>>({
    queryKey: ['categories'],
    queryFn: () => apiGet('admin/categories'),
  });

  const categories = response?.data ?? [];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormValues>();

  const { mutate: addCategorie, isPending } = useMutation({
    mutationFn: (data: CategoryFormValues) => {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('slug', data.slug);
      if (data.description) formData.append('description', data.description);
      if (data.parentId) formData.append('parentId', data.parentId);
      if (imageFile) formData.append('image', imageFile);

      return apiAdd('admin/categories', formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('دسته‌بندی با موفقیت اضافه شد');
      reset();
      setImageFile(null);
      setIsModalOpen(false);
    },
  });

  const onSubmit = (data: CategoryFormValues) => {
    addCategorie(data);
  };

  const handleClose = () => setIsModalOpen(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        disabled={isLoading}
        className="inline-flex items-center gap-2 rounded-xl bg-linear-to-b from-emerald-500 to-emerald-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm shadow-emerald-500/30 transition-all duration-200 hover:from-emerald-500 hover:to-emerald-700 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100"
      >
        <Plus size={16} />
        افزودن دسته‌بندی
      </button>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
          onClick={handleClose}
          role="presentation"
        >
          <div
            className="w-full max-w-lg overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-2xl shadow-emerald-900/20"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-category-title"
          >
            {/* هدر با گرادیانت سبز */}
            <div className="relative overflow-hidden bg-linear-to-br from-emerald-700 via-emerald-600 to-emerald-700 px-5 py-5 text-white">
              {/* دایره‌های دکوری */}
              <div className="absolute -left-6 -top-10 h-28 w-28 rounded-full bg-white/10" />
              <div className="absolute -bottom-12 -right-8 h-32 w-32 rounded-full bg-white/5" />

              <button
                type="button"
                aria-label="بستن"
                onClick={handleClose}
                className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg text-white/80 transition hover:bg-white/15 hover:text-white active:scale-95"
              >
                <X size={16} />
              </button>

              <div className="relative flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white">
                  <FolderPlus size={18} />
                </span>
                <div>
                  <h2 id="add-category-title" className="text-lg font-extrabold tracking-tight">
                    دسته‌بندی جدید
                  </h2>
                  <p className="mt-0.5 text-xs text-emerald-100/90">
                    اطلاعات دسته‌بندی رو کامل کن و ثبت کن
                  </p>
                </div>
              </div>
            </div>

            {/* فرم */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input
                  label="نام دسته‌بندی"
                  placeholder="مثلاً: مردانه"
                  {...register('title', { required: 'نام دسته‌بندی الزامی است' })}
                  error={errors.title?.message}
                />
                <Input
                  label="اسلاگ"
                  {...register('slug', {
                    required: 'اسلاگ الزامی است',
                    pattern: { value: /^[a-z0-9-]+$/, message: 'فقط حروف کوچک، اعداد و -' },
                  })}
                  placeholder="مثال: man-category"
                  dir="ltr"
                  error={errors.slug?.message}
                />
              </div>

              <Textarea
                label="توضیحات دسته‌بندی"
                {...register('description')}
                rows={3}
                placeholder="مثلاً: این محصولات برای گردشگری و غیره مناسب هستند"
              />

              <Select
                label="دسته والد"
                {...register('parentId')}
                data={categories as CategoryType[]}
              />

              {/* آپلود تصویر */}
              <ImageInput onChange={setImageFile} label="تصویر دسته‌بندی" />

              {/* اکشن‌ها */}
              <div className="flex justify-end gap-2 border-t border-emerald-50 pt-4">
                <button
                  type="button"
                  onClick={handleClose}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-500 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 active:scale-[0.97]"
                >
                  انصراف
                </button>
                <Button
                  type="submit"
                  disabled={isPending || isSubmitting}
                  className="flex-none! bg-linear-to-b from-emerald-500 to-emerald-600 px-5 text-white shadow-sm shadow-emerald-500/30 transition-all duration-200 hover:from-emerald-500 hover:to-emerald-700 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100"
                >
                  {isPending ? 'در حال ثبت...' : 'ثبت'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
