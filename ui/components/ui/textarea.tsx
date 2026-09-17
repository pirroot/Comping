import * as React from 'react';
import { cn } from 'cn';
import { AlertCircle } from 'lucide-react';

interface TextareaProps extends React.ComponentProps<'textarea'> {
  label?: string;
  error?: string;
  hint?: string;
}

export function Textarea({ label, error, hint, className, id, rows = 4, ...props }: TextareaProps) {
  const generatedId = React.useId();
  const textareaId = id ?? generatedId;
  const errorId = error ? `${textareaId}-error` : undefined;
  const hintId = hint ? `${textareaId}-hint` : undefined;

  return (
    <div>
      {label && (
        <label
          htmlFor={textareaId}
          className="mb-1.5 flex items-center gap-1.5 text-xs font-bold text-slate-600"
        >
          {label}
        </label>
      )}

      <textarea
        id={textareaId}
        data-slot="textarea"
        rows={rows}
        aria-invalid={!!error}
        aria-describedby={cn(errorId, hintId) || undefined}
        className={cn(
          'w-full resize-none rounded-xl border border-emerald-100 bg-white px-3.5 py-2.5 text-sm leading-6 text-slate-800 shadow-sm shadow-emerald-900/5 outline-none transition-all duration-200',
          'placeholder:text-slate-400',
          'hover:border-emerald-200',
          'focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20',
          'disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400',
          error &&
            'border-rose-300 hover:border-rose-300 focus:border-rose-500 focus:ring-rose-500/20',
          className
        )}
        {...props}
      />

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

      {/* راهنما (اختیاری) */}
      {!error && hint && (
        <span id={hintId} className="mt-1.5 block text-xs text-slate-400">
          {hint}
        </span>
      )}
    </div>
  );
}
