'use client';

import { Button } from '@/components/ui/Button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ImagePlus, Plus, X } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface ProductFormValues {
  slug: string;
  title: string;
  price: number;
  description: string;
  categoryId: string;
  featureKey: string;
  featureValue: string;
  image: FileList;
}

const UUID_V4_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const inputClass =
  'w-full rounded-xl border border-gray-300 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-100';

const errorClass = 'text-xs font-medium text-red-600';

export default function AddProduct() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProductFormValues>();

  const [preview, setPreview] = useState<string | null>(null);

  const imageField = register('image', {
    required: 'باید برای محصول یک تصویر انتخاب کنی',
    onChange: (e) => {
      const file = e.target.files?.[0];
      if (file) setPreview(URL.createObjectURL(file));
    },
  });

  const removeImage = () => {
    setPreview(null);
    setValue('image', undefined as unknown as FileList);
  };

  const onSubmit = (data: ProductFormValues) => {
    const payload = {
      slug: data.slug,
      title: data.title,
      price: Number(data.price),
      description: data.description,
      categoryId: data.categoryId,
      features: {
        key: data.featureKey,
        value: data.featureValue,
      },
      image: data.image?.[0],
    };
    console.log(payload);
  };

  return (
    <Dialog>
      <DialogTrigger
        render={
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-green-200 transition hover:bg-green-700"
          >
            <Plus size={17} />
            افزودن محصول
          </button>
        }
      />

      <DialogContent className="bg-white sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>افزودن محصول جدید</DialogTitle>
          <DialogDescription>اطلاعات محصول رو کامل وارد کن</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* تصویر محصول */}
          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-gray-700">تصویر محصول</span>

            {preview ? (
              <div className="relative w-fit">
                <img
                  src={preview}
                  alt="پیش‌نمایش محصول"
                  className="h-32 w-32 rounded-xl border border-gray-200 object-cover"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute -top-2 -left-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-white shadow"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <label className="flex h-32 w-32 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 text-gray-400 transition hover:border-green-500 hover:text-green-600">
                <ImagePlus size={22} />
                <span className="text-[11px] font-medium">انتخاب تصویر</span>
                <input type="file" accept="image/*" className="hidden" {...imageField} />
              </label>
            )}

            {errors.image && <span className={errorClass}>{errors.image.message}</span>}
          </div>

          {/* عنوان */}
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-gray-700">عنوان محصول</span>
            <input
              type="text"
              className={inputClass}
              placeholder="مثلاً کفش ورزشی مردانه"
              {...register('title', {
                required: 'عنوان محصول باید خالی نباشد.',
                maxLength: { value: 256, message: 'باید کمتر از 256 کاراکتر باشد' },
              })}
            />
            {errors.title && <span className={errorClass}>{errors.title.message}</span>}
          </label>

          {/* اسلاگ و قیمت */}
          <div className="grid grid-cols-2 gap-3">
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-gray-700">اسلاگ</span>
              <input
                type="text"
                dir="ltr"
                className={inputClass}
                placeholder="product-slug"
                {...register('slug', {
                  required: 'باید محصول، اسلاگ داشته باشد.',
                  pattern: {
                    value: /^[a-z0-9-]+$/,
                    message: 'فقط حروف کوچک، اعداد و خط تیره',
                  },
                })}
              />
              {errors.slug && <span className={errorClass}>{errors.slug.message}</span>}
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-gray-700">قیمت (تومان)</span>
              <input
                type="number"
                className={inputClass}
                placeholder="0"
                {...register('price', {
                  required: 'قیمت محصول نباید خالی باشد',
                  valueAsNumber: true,
                  validate: (value) => !Number.isNaN(value) || 'باید عدد باشد.',
                  min: { value: 0, message: 'قیمت نمی‌تواند منفی باشد' },
                })}
              />
              {errors.price && <span className={errorClass}>{errors.price.message}</span>}
            </label>
          </div>

          {/* توضیحات */}
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-gray-700">توضیحات</span>
            <textarea
              rows={4}
              className={`${inputClass} resize-none`}
              placeholder="توضیحات کامل محصول رو بنویس (حداقل ۱۰۰ کاراکتر)..."
              {...register('description', {
                required: 'توضیحات محصول خالی است',
                minLength: {
                  value: 100,
                  message: 'توضیحات باید بیشتر از 100 کاراکتر باشد.',
                },
              })}
            />
            <div className="flex items-center justify-between">
              {errors.description ? (
                <span className={errorClass}>{errors.description.message}</span>
              ) : (
                <span className="text-xs text-gray-400">حداقل ۱۰۰ کاراکتر</span>
              )}
              <span className="text-xs text-gray-400">
                {watch('description')?.length ?? 0} کاراکتر
              </span>
            </div>
          </label>

          {/* دسته‌بندی */}
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-gray-700">شناسه دسته‌بندی</span>
            <input
              type="text"
              dir="ltr"
              className={inputClass}
              placeholder="00000000-0000-4000-8000-000000000000"
              {...register('categoryId', {
                required: 'محصول باید یک دسته بندی مشخص داشته باشد.',
                pattern: { value: UUID_V4_REGEX, message: 'شناسه دسته بندی معتبر نیست' },
              })}
            />
            {errors.categoryId && <span className={errorClass}>{errors.categoryId.message}</span>}
          </label>

          {/* ویژگی محصول */}
          <div className="flex flex-col gap-1.5 rounded-xl bg-gray-50 p-3">
            <span className="text-sm font-medium text-gray-700">ویژگی محصول</span>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <input
                  type="text"
                  placeholder="کلید (مثلاً رنگ)"
                  className={inputClass}
                  {...register('featureKey', {
                    required: 'کلید ویژگی نباید خالی باشد',
                  })}
                />
                {errors.featureKey && (
                  <span className={errorClass}>{errors.featureKey.message}</span>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <input
                  type="text"
                  placeholder="مقدار (مثلاً قرمز)"
                  className={inputClass}
                  {...register('featureValue', {
                    required: 'مقدار ویژگی نباید خالی باشد',
                  })}
                />
                {errors.featureValue && (
                  <span className={errorClass}>{errors.featureValue.message}</span>
                )}
              </div>
            </div>
          </div>

          <DialogFooter className="mt-2">
            <DialogClose render={<Button variant="outline">انصراف</Button>} />
            <Button type="submit">ذخیره محصول</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
