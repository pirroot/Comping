import { AlertCircle, ImagePlus, RefreshCw, X } from 'lucide-react';
import { ChangeEvent, useEffect, useId, useRef, useState } from 'react';
import { cn } from 'cn';

interface ImageInputProps {
  name?: string;
  label?: string;
  onChange?: (file: File | null) => void;
  maxSizeMB?: number;
  disabled?: boolean;
  previewImage?: string;
  className?: string;
}

export function ImageInput({
  name = 'image',
  label = 'تصویر دسته‌بندی',
  onChange,
  maxSizeMB = 2,
  disabled = false,
  previewImage,
  className,
}: ImageInputProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(previewImage || null);
  const [error, setError] = useState<string | null>(null);

  // پاک کردن blob URL موقع unmount کامپوننت
  useEffect(() => {
    return () => {
      if (preview?.startsWith('blob:')) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const rejectFile = (message: string) => {
    setError(message);
    setPreview(null);
    if (inputRef.current) inputRef.current.value = '';
    onChange?.(null);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setError(null);

    if (!file) {
      setPreview(null);
      onChange?.(null);
      return;
    }

    if (!file.type.startsWith('image/')) {
      rejectFile('فقط فایل تصویری مجاز است');
      return;
    }

    if (file.size > maxSizeMB * 1024 * 1024) {
      rejectFile(`حجم تصویر نباید بیشتر از ${maxSizeMB} مگابایت باشد`);
      return;
    }

    setPreview((prev) => {
      if (prev?.startsWith('blob:')) URL.revokeObjectURL(prev);
      return URL.createObjectURL(file);
    });
    onChange?.(file);
  };

  const handleRemove = () => {
    setPreview((prev) => {
      if (prev?.startsWith('blob:')) URL.revokeObjectURL(prev);
      return null;
    });
    setError(null);
    if (inputRef.current) inputRef.current.value = '';
    onChange?.(null);
  };

  const handleReselect = () => inputRef.current?.click();

  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={inputId}
          className="mb-1.5 flex items-center gap-1.5 text-xs font-bold text-slate-600"
        >
          {label}
        </label>
      )}

      <div>
        {preview || previewImage ? (
          <div className="group relative h-36 w-36 overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm shadow-emerald-900/5 transition-all duration-200 hover:border-emerald-300 hover:shadow-md hover:shadow-emerald-900/10">
            <img
              src={
                preview?.startsWith('blob:')
                  ? preview
                  : `${previewImage || preview}`
              }
              alt="پیش‌نمایش تصویر"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            d{/* لایه تیره روی هاور */}
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-slate-900/60 via-transparent to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
            {/* اکشن‌ها */}
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-1.5 p-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              <button
                type="button"
                aria-label="تغییر تصویر"
                title="تغییر تصویر"
                onClick={handleReselect}
                disabled={disabled}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/90 text-emerald-600 shadow-sm transition hover:bg-white hover:text-emerald-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <RefreshCw size={14} />
              </button>

              <button
                type="button"
                aria-label="حذف تصویر"
                title="حذف تصویر"
                onClick={handleRemove}
                disabled={disabled}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/90 text-rose-500 shadow-sm transition hover:bg-white hover:text-rose-600 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <X size={14} />
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={disabled}
            aria-describedby={error ? `${inputId}-error` : undefined}
            className={cn(
              'group flex h-36 w-36 flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed bg-white transition-all duration-200',
              'active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100',
              error
                ? 'border-rose-300 text-rose-400 hover:border-rose-400 hover:bg-rose-50/50 hover:text-rose-500'
                : 'border-emerald-200 text-emerald-500 hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-600'
            )}
          >
            <span
              className={cn(
                'flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-200',
                error
                  ? 'bg-rose-50 group-hover:bg-rose-100'
                  : 'bg-emerald-50 group-hover:bg-emerald-100'
              )}
            >
              <ImagePlus size={20} />
            </span>
            <span className="text-[11px] font-bold">انتخاب تصویر</span>
            <span className="text-[10px] font-medium text-slate-400">
              حداکثر {maxSizeMB} مگابایت
            </span>
          </button>
        )}

        <input
          ref={inputRef}
          id={inputId}
          type="file"
          name={name}
          accept="image/*"
          onChange={handleChange}
          disabled={disabled}
          className="hidden"
        />
      </div>

      {/* خطا */}
      {error && (
        <span
          id={`${inputId}-error`}
          role="alert"
          className="mt-1.5 flex items-center gap-1 text-xs font-medium text-rose-500"
        >
          <AlertCircle size={12} className="shrink-0" />
          {error}
        </span>
      )}
    </div>
  );
}
