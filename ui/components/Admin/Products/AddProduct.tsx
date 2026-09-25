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
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ImageInput } from '@/components/ui/ImageInput';
import {
  CircleDollarSign,
  Hash,
  ImagePlus,
  Package,
  PackagePlus,
  Plus,
  Sparkles,
  X,
} from 'lucide-react';
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

  const descriptionLength = watch('description')?.length ?? 0;

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
            className="inline-flex items-center gap-2 rounded-xl bg-linear-to-b from-emerald-500 to-emerald-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm shadow-emerald-500/30 transition-all duration-200 hover:from-emerald-500 hover:to-emerald-700 focus-visible:ring-2 focus-visible:ring-emerald-500/40 focus-visible:ring-offset-2 focus-visible:outline-none active:scale-[0.97]"
          >
            <Plus size={16} />
            افزودن محصول
          </button>
        }
      />

      <DialogContent className="max-h-[92vh] overflow-y-auto border-emerald-100 bg-white sm:max-w-2xl">
        <DialogHeader className="border-b border-emerald-50 pb-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-emerald-500 to-emerald-600 text-white shadow-sm shadow-emerald-500/30">
              <PackagePlus size={18} />
            </span>
            <div>
              <DialogTitle className="text-lg font-extrabold tracking-tight text-slate-900">
                افزودن محصول جدید
              </DialogTitle>
              <DialogDescription className="mt-0.5 text-xs text-slate-500">
                اطلاعات محصول رو کامل وارد کن
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5 pt-2"
        >
          {/* تصویر محصول */}
          <div className="flex flex-col gap-1.5">
            <span className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
              <Package size={13} className="text-emerald-500" />
              تصویر محصول
            </span>

            {preview ? (
              <div className="group relative h-36 w-36 overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm shadow-emerald-900/5 transition-all duration-200 hover:border-emerald-300 hover:shadow-md">
                <img
                  src={preview}
                  alt="پیش‌نمایش محصول"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  aria-label="حذف تصویر"
                  className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white/90 text-rose-500 shadow-sm transition hover:bg-white hover:text-rose-600 active:scale-95"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <label className="group flex h-36 w-36 cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-emerald-200 bg-white text-emerald-500 transition-all duration-200 hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-600">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 transition-all duration-200 group-hover:bg-emerald-100">
                  <ImagePlus size={20} />
                </span>
                <span className="text-[11px] font-bold">انتخاب تصویر</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  {...imageField}
                />
              </label>
            )}

            {errors.image && (
              <span className="mt-1 flex items-center gap-1 text-xs font-medium text-rose-500">
                {errors.image.message}
              </span>
            )}
          </div>

          {/* عنوان */}
          <Input
            label="عنوان محصول"
            placeholder="مثلاً کفش ورزشی مردانه"
            {...register('title', {
              required: 'عنوان محصول باید خالی نباشد.',
              maxLength: {
                value: 256,
                message: 'باید کمتر از 256 کاراکتر باشد',
              },
            })}
            error={errors.title?.message}
          />

          {/* اسلاگ و قیمت */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              label="اسلاگ"
              dir="ltr"
              placeholder="product-slug"
              {...register('slug', {
                required: 'باید محصول، اسلاگ داشته باشد.',
                pattern: {
                  value: /^[a-z0-9-]+$/,
                  message: 'فقط حروف کوچک، اعداد و خط تیره',
                },
              })}
              error={errors.slug?.message}
            />

            <Input
              label="قیمت (تومان)"
              type="number"
              placeholder="0"
              icon={<CircleDollarSign size={14} />}
              {...register('price', {
                required: 'قیمت محصول نباید خالی باشد',
                valueAsNumber: true,
                validate: (value) => !Number.isNaN(value) || 'باید عدد باشد.',
                min: { value: 0, message: 'قیمت نمی‌تواند منفی باشد' },
              })}
              error={errors.price?.message}
            />
          </div>

          {/* توضیحات */}
          <div>
            <Textarea
              label="توضیحات"
              rows={4}
              placeholder="توضیحات کامل محصول رو بنویس (حداقل ۱۰۰ کاراکتر)..."
              {...register('description', {
                required: 'توضیحات محصول خالی است',
                minLength: {
                  value: 100,
                  message: 'توضیحات باید بیشتر از 100 کاراکتر باشد.',
                },
              })}
              error={errors.description?.message}
            />
            {!errors.description && (
              <div className="mt-1.5 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  حداقل ۱۰۰ کاراکتر
                </span>
                <span
                  className={`text-xs font-medium ${
                    descriptionLength >= 100
                      ? 'text-emerald-600'
                      : 'text-slate-400'
                  }`}
                >
                  {descriptionLength} کاراکتر
                </span>
              </div>
            )}
          </div>

          {/* دسته‌بندی */}
          <Input
            label="شناسه دسته‌بندی"
            dir="ltr"
            placeholder="00000000-0000-4000-8000-000000000000"
            icon={<Hash size={14} />}
            {...register('categoryId', {
              required: 'محصول باید یک دسته بندی مشخص داشته باشد.',
              pattern: {
                value:
                  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
                message: 'شناسه دسته بندی معتبر نیست',
              },
            })}
            error={errors.categoryId?.message}
          />

          {/* ویژگی محصول */}
          <div className="flex flex-col gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/40 p-4">
            <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
              <Sparkles size={13} className="text-emerald-500" />
              ویژگی محصول
            </span>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Input
                placeholder="کلید (مثلاً رنگ)"
                {...register('featureKey', {
                  required: 'کلید ویژگی نباید خالی باشد',
                })}
                error={errors.featureKey?.message}
              />
              <Input
                placeholder="مقدار (مثلاً قرمز)"
                {...register('featureValue', {
                  required: 'مقدار ویژگی نباید خالی باشد',
                })}
                error={errors.featureValue?.message}
              />
            </div>
          </div>

          <DialogFooter className="mt-2 gap-2 border-t border-emerald-50 pt-4 sm:justify-end">
            <DialogClose
              render={
                <button
                  type="button"
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-500 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 active:scale-[0.97]"
                >
                  انصراف
                </button>
              }
            />
            <Button
              type="submit"
              className="flex-none! bg-linear-to-b from-emerald-500 to-emerald-600 px-5 text-white shadow-sm shadow-emerald-500/30 transition-all duration-200 hover:from-emerald-500 hover:to-emerald-700 active:scale-[0.97]"
            >
              ذخیره محصول
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
