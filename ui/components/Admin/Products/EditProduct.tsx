'use client';

import { apiFetch } from '@/services/api/ApiFetch';
import { apiGet } from '@/services/api/GetApi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Edit3, X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import ProductForm, { EditableProduct, ProductFormValues } from './ProductForm';

export default function EditProduct({ id }: { id: string }) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['admin-product', id],
    queryFn: () => apiGet<EditableProduct>(`admin/products/${id}`),
    enabled: open,
  });

  const { mutateAsync: updateProduct } = useMutation({
    mutationFn: (values: ProductFormValues) => {
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
      return apiFetch(`admin/products/${id}`, { method: 'PATCH', body });
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['products'] }),
        queryClient.invalidateQueries({ queryKey: ['admin-product', id] }),
      ]);
      toast.success('محصول ویرایش شد.');
      setOpen(false);
    },
    onError: () => toast.error('ویرایش محصول انجام نشد.'),
  });

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="ویرایش محصول"
        className="rounded-lg p-2 text-slate-400 hover:bg-emerald-50 hover:text-emerald-700"
      >
        <Edit3 size={16} />
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-3 backdrop-blur-sm sm:p-6">
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-product-title"
            className="max-h-[94vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl sm:p-7"
          >
            <header className="mb-5 flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2
                  id="edit-product-title"
                  className="text-xl font-extrabold text-slate-900"
                >
                  ویرایش محصول
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  اطلاعات اصلی، وضعیت، دسته‌بندی و ویژگی‌ها
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="بستن"
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={19} />
              </button>
            </header>
            {isLoading ? (
              <p className="py-12 text-center text-sm text-slate-500">
                در حال دریافت محصول...
              </p>
            ) : isError || !product ? (
              <p
                role="alert"
                className="py-12 text-center text-sm text-rose-600"
              >
                دریافت اطلاعات محصول ناموفق بود.
              </p>
            ) : (
              <ProductForm
                product={product}
                onSubmit={async (values) => {
                  await updateProduct(values).catch(() => undefined);
                }}
              />
            )}
          </section>
        </div>
      )}
    </>
  );
}
