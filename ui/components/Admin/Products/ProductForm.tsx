'use client';

import { apiGet } from '@/services/api/GetApi';
import { useQuery } from '@tanstack/react-query';
import { Plus, Trash2, Upload, X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

export type ProductFormValues = {
  title: string;
  slug: string;
  price: number;
  description: string;
  categoryId: string;
  brandId: string;
  isActive: boolean;
  features: { key: string; value: string }[];
  image: FileList;
};

export type EditableProduct = {
  id: string;
  title: string;
  slug: string;
  price: string | number;
  description: string;
  categoryId: string;
  brandId: string | null;
  isActive: boolean;
  features: { id: string; key: string; value: string }[];
  images: { id: string; url: string; main: boolean }[];
};

type CategoryOption = { id: string; title: string; children?: CategoryOption[] };
type BrandOption = { id: string; title: string };

const inputClass =
  'h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15';

export default function ProductForm({
  product,
  onSubmit,
}: {
  product?: EditableProduct;
  onSubmit: (values: ProductFormValues) => Promise<void>;
}) {
  const { data: categories = [] } = useQuery({
    queryKey: ['admin-product-categories'],
    queryFn: () => apiGet<CategoryOption[]>('admin/categories'),
  });
  const { data: brands = [] } = useQuery({
    queryKey: ['admin-product-brands'],
    queryFn: () => apiGet<BrandOption[]>('admin/brands'),
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormValues>({
    defaultValues: {
      title: product?.title ?? '',
      slug: product?.slug ?? '',
      price: Number(product?.price ?? 0),
      description: product?.description ?? '',
      categoryId: product?.categoryId ?? '',
      brandId: product?.brandId ?? '',
      isActive: product?.isActive ?? true,
      features: product?.features.map(({ key, value }) => ({ key, value })) ?? [
        { key: '', value: '' },
      ],
    },
  });
  const features = useFieldArray({ control, name: 'features' });

  useEffect(() => {
    reset({
      title: product?.title ?? '',
      slug: product?.slug ?? '',
      price: Number(product?.price ?? 0),
      description: product?.description ?? '',
      categoryId: product?.categoryId ?? '',
      brandId: product?.brandId ?? '',
      isActive: product?.isActive ?? true,
      features: product?.features.map(({ key, value }) => ({ key, value })) ?? [
        { key: '', value: '' },
      ],
    });
    setImagePreview(null);
  }, [product, reset]);

  const imageRegistration = register('image', {
    onChange: (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      setImagePreview(file ? URL.createObjectURL(file) : null);
    },
    validate: (files) =>
      Boolean(product?.images.length || files?.length) ||
      'برای محصول تصویر انتخاب کنید.',
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
      encType="multipart/form-data"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm font-bold text-slate-700">عنوان محصول</span>
          <input className={inputClass} {...register('title', { required: 'عنوان محصول الزامی است.', maxLength: 256 })} />
          {errors.title && <small className="mt-1 block text-rose-600">{errors.title.message}</small>}
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-bold text-slate-700">شناسه انگلیسی (slug)</span>
          <input dir="ltr" className={inputClass} {...register('slug', { required: 'شناسه محصول الزامی است.', pattern: { value: /^[a-z0-9]+(?:-[a-z0-9]+)*$/, message: 'فقط حروف کوچک انگلیسی، عدد و خط تیره.' } })} />
          {errors.slug && <small className="mt-1 block text-rose-600">{errors.slug.message}</small>}
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-bold text-slate-700">قیمت (تومان)</span>
          <input type="number" min="0" step="1" className={inputClass} {...register('price', { valueAsNumber: true, required: 'قیمت الزامی است.', min: { value: 0, message: 'قیمت منفی نمی‌شود.' } })} />
          {errors.price && <small className="mt-1 block text-rose-600">{errors.price.message}</small>}
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-bold text-slate-700">دسته‌بندی</span>
          <select className={inputClass} {...register('categoryId', { required: 'دسته‌بندی محصول را انتخاب کنید.' })}>
            <option value="">انتخاب دسته‌بندی</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>{category.title}</option>
            ))}
            {categories.flatMap((category) =>
              (category.children ?? []).map((child) => (
                <option key={child.id} value={child.id}>{category.title} / {child.title}</option>
              )),
            )}
          </select>
          {errors.categoryId && <small className="mt-1 block text-rose-600">{errors.categoryId.message}</small>}
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-bold text-slate-700">برند (اختیاری)</span>
          <select className={inputClass} {...register('brandId')}>
            <option value="">بدون برند</option>
            {brands.map((brand) => <option key={brand.id} value={brand.id}>{brand.title}</option>)}
          </select>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-bold text-slate-700">وضعیت</span>
          <select className={inputClass} {...register('isActive', { setValueAs: (value) => value === 'true' })}>
            <option value="true">فعال و قابل فروش</option>
            <option value="false">غیرفعال</option>
          </select>
        </label>
      </div>

      <label className="block">
        <span className="mb-1.5 block text-sm font-bold text-slate-700">توضیحات</span>
        <textarea rows={5} className="w-full rounded-xl border border-slate-200 p-3 text-sm leading-7 outline-none focus:border-emerald-500" {...register('description', { required: 'توضیحات محصول را وارد کنید.', minLength: { value: 20, message: 'توضیحات خیلی کوتاه است.' } })} />
        {errors.description && <small className="mt-1 block text-rose-600">{errors.description.message}</small>}
      </label>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-800">ویژگی‌های محصول</h3>
          <button type="button" onClick={() => features.append({ key: '', value: '' })} className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700"><Plus size={14} /> افزودن ویژگی</button>
        </div>
        <div className="space-y-2">
          {features.fields.map((field, index) => (
            <div key={field.id} className="grid grid-cols-[1fr_1fr_auto] gap-2">
              <input aria-label="عنوان ویژگی" placeholder="ویژگی، مثل رنگ" className={inputClass} {...register(`features.${index}.key`, { required: 'عنوان ویژگی الزامی است.' })} />
              <input aria-label="مقدار ویژگی" placeholder="مقدار" className={inputClass} {...register(`features.${index}.value`, { required: 'مقدار ویژگی الزامی است.' })} />
              <button type="button" disabled={features.fields.length === 1} onClick={() => features.remove(index)} aria-label="حذف ویژگی" className="rounded-lg p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600 disabled:opacity-30"><X size={17} /></button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-emerald-200 bg-emerald-50/50 p-4 text-sm font-bold text-emerald-800">
          <Upload size={18} />
          {product?.images.length ? 'تغییر تصویر اصلی محصول' : 'انتخاب تصویر اصلی محصول'}
          <input type="file" accept="image/*" className="sr-only" {...imageRegistration} />
        </label>
        {imagePreview ? (
          <div className="relative mt-3 h-28 w-28 overflow-hidden rounded-xl">
            <img src={imagePreview} alt="پیش‌نمایش تصویر" className="h-full w-full object-cover" />
            <button type="button" onClick={() => setImagePreview(null)} className="absolute left-1 top-1 rounded-full bg-white p-1 text-rose-600" aria-label="پاک کردن پیش‌نمایش"><Trash2 size={14} /></button>
          </div>
        ) : product?.images[0] ? (
          <div className="relative mt-3 h-28 w-28 overflow-hidden rounded-xl bg-slate-50">
            <Image src={product.images.find((image) => image.main)?.url ?? product.images[0].url} alt={product.title} fill className="object-cover" unoptimized />
          </div>
        ) : null}
        {errors.image && <small className="mt-1 block text-rose-600">{errors.image.message}</small>}
      </div>

      <div className="flex justify-end border-t border-slate-100 pt-4">
        <button type="submit" disabled={isSubmitting} className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-700 disabled:opacity-50">
          {isSubmitting ? 'در حال ذخیره...' : product ? 'ذخیره تغییرات' : 'ثبت محصول'}
        </button>
      </div>
    </form>
  );
}
