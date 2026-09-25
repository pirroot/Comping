import * as React from 'react';
import { Input as InputPrimitive } from '@base-ui/react/input';
import { cn } from 'cn';
import { AlertCircle } from 'lucide-react';

interface InputProps extends React.ComponentProps<'input'> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: React.ReactNode;
}

export function Input({
  label,
  icon,
  error,
  hint,
  className,
  id,
  type,
  ...props
}: InputProps) {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;
  const errorId = error ? `${inputId}-error` : undefined;
  const hintId = hint ? `${inputId}-hint` : undefined;

  return (
    <div>
      {label && (
        <label
          htmlFor={inputId}
          className="mb-1.5 flex items-center gap-1.5 text-xs font-bold text-slate-600"
        >
          {icon && (
            <span className="text-emerald-500 [&_svg]:size-3.5">{icon}</span>
          )}
          {label}
        </label>
      )}

      <InputPrimitive
        id={inputId}
        type={type}
        data-slot="input"
        aria-invalid={!!error}
        aria-describedby={cn(errorId, hintId) || undefined}
        className={cn(
          'w-full rounded-xl border border-emerald-100 bg-white px-3.5 py-2.5 text-sm text-slate-800 shadow-sm shadow-emerald-900/5 transition-all duration-200 outline-none',
          'placeholder:text-slate-400',
          'hover:border-emerald-200',
          'focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20',
          'disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400',
          error &&
            'border-rose-300 hover:border-rose-300 focus:border-rose-500 focus:ring-rose-500/20',
          className,
        )}
        {...props}
      />

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

      {!error && hint && (
        <span id={hintId} className="mt-1.5 block text-xs text-slate-400">
          {hint}
        </span>
      )}
    </div>
  );
}
