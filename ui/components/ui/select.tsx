import * as React from 'react';
import { cn } from 'cn';
import { AlertCircle, ChevronDown } from 'lucide-react';

type OptionKey<T> = keyof T;

interface SelectProps<T> extends Omit<React.ComponentProps<'select'>, 'children'> {
  label?: string;
  error?: string;
  hint?: string;
  data: T[];
  /** تعیین دستی کلید مقدار (اختیاری) */
  valueKey?: OptionKey<T>;
  /** تعیین دستی کلید متن (اختیاری) */
  labelKey?: OptionKey<T>;
  /** تابع سفارشی برای گرفتن مقدار (اولویت بالاتر از valueKey) */
  getOptionValue?: (item: T) => string | number;
  /** تابع سفارشی برای گرفتن متن (اولویت بالاتر از labelKey) */
  getOptionLabel?: (item: T) => string;
  /** متن پیش‌فرض گزینه خالی */
  placeholder?: string;
}

export function Select<T extends Record<string, any>>({
  label,
  error,
  hint,
  data,
  valueKey,
  labelKey,
  getOptionValue,
  getOptionLabel,
  placeholder = 'انتخاب کنید',
  className,
  id,
  ...props
}: SelectProps<T>) {
  const generatedId = React.useId();
  const selectId = id ?? generatedId;
  const errorId = error ? `${selectId}-error` : undefined;
  const hintId = hint ? `${selectId}-hint` : undefined;

  const resolveValue = (item: T): string | number => {
    if (getOptionValue) return getOptionValue(item);
    if (valueKey) return item[valueKey];
    return (item as any).id;
  };

  const resolveLabel = (item: T): string => {
    if (getOptionLabel) return getOptionLabel(item);
    if (labelKey) return String(item[labelKey]);
    return (
      (item as any).title ?? (item as any).name ?? (item as any).label ?? String(resolveValue(item))
    );
  };

  return (
    <div>
      {label && (
        <label
          htmlFor={selectId}
          className="mb-1.5 flex items-center gap-1.5 text-xs font-bold text-slate-600"
        >
          {label}
        </label>
      )}

      <div className="relative">
        <select
          id={selectId}
          aria-invalid={!!error}
          aria-describedby={cn(errorId, hintId) || undefined}
          className={cn(
            'w-full appearance-none rounded-xl border border-emerald-100 bg-white py-2.5 pl-3.5 pr-10 text-sm text-slate-800 shadow-sm shadow-emerald-900/5 outline-none transition-all duration-200',
            'hover:border-emerald-200',
            'focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20',
            'disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400',
            error &&
              'border-rose-300 hover:border-rose-300 focus:border-rose-500 focus:ring-rose-500/20',
            className
          )}
          {...props}
        >
          <option value="">{placeholder}</option>
          {data?.map((item) => {
            const value = resolveValue(item);
            return (
              <option key={value} value={value}>
                {resolveLabel(item)}
              </option>
            );
          })}
        </select>

        <ChevronDown
          size={16}
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 transition-colors',
            error ? 'text-rose-400' : 'text-emerald-500'
          )}
        />
      </div>

      {/* خطا */}
      {error && (
        <span
          id={errorId}
          role="alert"
          className="mt-1.5 flex items-center gap-1 text-xs font-medium text-rose-500"
        >
          <AlertCircle size={12} className="shrink-0" />
          {error}
        </span>
      )}

      {/* راهنما */}
      {!error && hint && (
        <span id={hintId} className="mt-1.5 block text-xs text-slate-400">
          {hint}
        </span>
      )}
    </div>
  );
}
