import { CategoryType } from '@/lib/types/Product.type';
import { ApiResponse } from '@/lib/types/Response.type';
import { apiAdd } from '@/services/api/ApiAdd';
import { apiGet } from '@/services/api/ApiGet';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ImagePlus, Plus, X } from 'lucide-react';
import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';

type CategoryFormValues = {
  title: string;
  slug: string;
  description: string;
  image: string;
  parentId: string | null;
};

// -------------------- API --------------------
function ImageInput({ name = 'image', onChange, maxSizeMB = 2 }: any) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setError(null);

    if (!file) {
      setPreview(null);
      onChange?.(null);
      return;
    }

    if (!file.type.startsWith('image/')) {
      setError('فقط فایل تصویری مجاز است');
      return;
    }

    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`حجم تصویر نباید بیشتر از ${maxSizeMB} مگابایت باشد`);
      return;
    }

    if (preview?.startsWith('blob:')) URL.revokeObjectURL(preview);
    setPreview(URL.createObjectURL(file));
    onChange?.(file);
  };

  const handleRemove = () => {
    if (preview?.startsWith('blob:')) URL.revokeObjectURL(preview);
    setPreview(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = '';
    onChange?.(null);
  };

  return (
    <div className="block text-xs font-bold text-slate-500">
      تصویر دسته‌بندی
      <div className="mt-1.5">
        {preview ? (
          <div className="relative h-32 w-32 overflow-hidden rounded-xl border border-slate-200">
            <img src={preview} alt="preview" className="h-full w-full object-cover" />
            <button
              type="button"
              aria-label="حذف تصویر"
              onClick={handleRemove}
              className="absolute right-1 top-1 rounded-lg bg-slate-900/60 p-1 text-white hover:bg-slate-900/80"
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex h-32 w-32 flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-200 text-slate-400 transition hover:border-green-500 hover:text-green-600"
          >
            <ImagePlus size={22} />
            <span className="text-[10px] font-bold">انتخاب تصویر</span>
          </button>
        )}

        <input
          ref={inputRef}
          type="file"
          name={name}
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />
      </div>
      {error && <span className="mt-1 block text-[10px] text-red-500">{error}</span>}
    </div>
  );
}

// -------------------- Modal --------------------
type AddCategoryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  categories: ApiResponse<CategoryType[]>;
};

// -------------------- Main --------------------
export default function AddCategory() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: categories = [], isLoading } = useQuery<ApiResponse<CategoryType[]>>({
    queryKey: ['categories'],
    queryFn: () => apiGet('/admin/categories'),
  });

  return (
    <>
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        disabled={isLoading}
        className="flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Plus size={16} />
        افزودن دسته‌بندی
      </button>

      <AddCategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        categories={categories}
      />
    </>
  );
}

function AddCategoryModal({ isOpen, onClose, categories }: AddCategoryModalProps) {
  const queryClient = useQueryClient();
  const [imageFile, setImageFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormValues>({
    defaultValues: { title: '', image: '', slug: '', description: '', parentId: '' },
  });

  const { mutate: addCategorie, isPending } = useMutation({
    mutationFn: (data: CategoryFormValues) => apiAdd('admin/categories', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      reset();
      setImageFile(null);
      onClose();
    },
  });

  useEffect(() => {
    if (!isOpen) {
      reset();
      setImageFile(null);
    }
  }, [isOpen, reset]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-base font-extrabold text-slate-900">دسته‌بندی جدید</h2>
          <button
            type="button"
            aria-label="بستن"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit((data: CategoryFormValues) => addCategorie(data))} className="mt-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <label className="block text-xs font-bold text-slate-500">
              نام دسته‌بندی
              <input
                {...register('title', { required: 'نام دسته‌بندی الزامی است' })}
                placeholder="مثلاً: مردانه"
                className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
              />
              {errors.title && (
                <span className="mt-1 block text-[10px] text-red-500">{errors.title.message}</span>
              )}
            </label>

            <label className="block text-xs font-bold text-slate-500">
              اسلاگ دسته‌بندی
              <input
                {...register('slug', {
                  required: 'اسلاگ الزامی است',
                  pattern: { value: /^[a-z0-9-]+$/, message: 'فقط حروف کوچک، اعداد و -' },
                })}
                placeholder="مثال: man-category"
                dir="ltr"
                className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
              />
              {errors.slug && (
                <span className="mt-1 block text-[10px] text-red-500">{errors.slug.message}</span>
              )}
            </label>
          </div>

          <label className="block text-xs font-bold text-slate-500">
            توضیحات دسته‌بندی
            <textarea
              {...register('description')}
              rows={3}
              placeholder="مثلاً: این محصولات برای گردشگری و غیره مناسب هستند"
              className="mt-1.5 w-full resize-none rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
            />
          </label>

          <label className="block text-xs font-bold text-slate-500">
            انتخاب دسته‌بندی پدر
            <select
              {...register('parentId')}
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
            >
              <option value="">بدون دستهٔ پدر</option>
              {/* {categories?.data.map((parent_cat) => (
                <option key={parent_cat.id} value={parent_cat.id}>
                  {parent_cat.title}
                </option>
              ))} */}
            </select>
          </label>

          {/* Image Uploader */}
          <ImageInput onChange={setImageFile} />

          {/* Actions */}
          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50"
            >
              انصراف
            </button>
            <button
              type="submit"
              disabled={isPending || isSubmitting}
              className="flex-1 rounded-xl bg-green-600 py-2.5 text-sm font-bold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending ? 'در حال ثبت...' : 'ثبت'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
