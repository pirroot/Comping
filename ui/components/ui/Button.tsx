import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from 'cn';

const buttonVariants = cva(
  'inline-flex flex-1 h-10 px-3 items-center justify-center gap-1.5 rounded-xl py-2.5 text-sm font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*="size-"])]:size-4',
  {
    variants: {
      color: {
        green:
          'bg-gradient-to-b from-emerald-500 to-emerald-600 text-white shadow-sm shadow-emerald-500/30 hover:from-emerald-500 hover:to-emerald-700 focus-visible:ring-emerald-500/40',
        white:
          'border border-emerald-100 bg-white text-slate-600 shadow-sm shadow-emerald-900/5 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 focus-visible:ring-emerald-500/30',
        red: 'border border-rose-100 bg-rose-50 text-rose-600 hover:border-rose-200 hover:bg-rose-100 focus-visible:ring-rose-500/30',
      },
    },
    defaultVariants: {
      color: 'green',
    },
  },
);

interface ButtonProps
  extends ButtonPrimitive.Props, VariantProps<typeof buttonVariants> {}

export function Button({ className, color, ...props }: ButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ color }), className)}
      {...props}
    />
  );
}

export { buttonVariants };
