'use client';

import { apiAdd } from '@/services/api/PostApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import ProductForm, { ProductFormValues } from './ProductForm';

export default function AddProduct() {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const { mutateAsync: createProduct, isPending } = useMutation({
    mutationFn: async (values: ProductFormValues) => {
      const body = new FormData();
      body.append('title', values.title);
      body.append('slug', values.slug);
      body.append('price', String(values.price));
      body.append('description', values.description);
      body.append('categoryId', values.categoryId);
      if (values.brandId) body.append('brandId', values.brandId);
      body.append('isActive', String(values.isActive));
      body.append('features', JSON.stringify(values.features));
      if (values.image?.[0]) body.append('image', values.image[0]);
      return apiAdd('admin/products', body);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('محصول با موفقیت ثبت شد.');
      setIsOpen(false);
    },
    onError: () =>
      toast.error('ثبت محصول انجام نشد؛ اطلاعات و دسترسی ادمین را بررسی کنید.'),
  });

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700"
      >
        <Plus size={17} /> افزودن محصول
      </button>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-3 backdrop-blur-sm sm:p-6"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget && !isPending)
              setIsOpen(false);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-product-title"
            className="max-h-[94vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl sm:p-7"
          >
            <header className="mb-5 flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2
                  id="add-product-title"
                  className="text-xl font-extrabold text-slate-900"
                >
                  افزودن محصول
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  اطلاعات محصول، دسته‌بندی، ویژگی‌ها و تصویر اصلی را وارد کنید.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                disabled={isPending}
                aria-label="بستن"
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={19} />
              </button>
            </header>
            <ProductForm
              onSubmit={async (values) => {
                await createProduct(values).catch(() => undefined);
              }}
            />
          </section>
        </div>
      )}
    </>
  );
}
