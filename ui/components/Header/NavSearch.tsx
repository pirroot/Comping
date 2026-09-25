'use client';

import { Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

type SearchForm = {
  search: string;
};

export default function NavSearch() {
  const [searchOpen, setSearchOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SearchForm>();
  const searchField = register('search', {
    required: 'لطفاً عبارت جستجو را وارد کنید',
    minLength: {
      value: 2,
      message: 'حداقل ۲ کاراکتر وارد کنید',
    },
  });

  const closeSearch = () => {
    setSearchOpen(false);
    reset();
  };

  useEffect(() => {
    if (!searchOpen) return;

    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 80);
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeSearch();
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [searchOpen]);

  const searchHandler: SubmitHandler<SearchForm> = ({ search }) => {
    const query = search.trim();

    if (!query) {
      toast.error('لطفاً عبارت جستجو را وارد کنید');
      return;
    }

    closeSearch();
    router.push(`/products?search=${encodeURIComponent(query)}`);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setSearchOpen(true)}
        className="bg-neutral_normal text-text hover:bg-primary_light hover:text-primary flex h-11 w-11 items-center justify-center rounded-xl transition"
        aria-label="جستجو در محصولات"
        aria-haspopup="dialog"
        aria-expanded={searchOpen}
      >
        <Search size={20} />
      </button>

      {searchOpen && (
        <div
          className="fixed inset-0 z-60 flex items-start justify-center px-4 pt-[18vh] sm:pt-[22vh]"
          role="presentation"
        >
          <button
            type="button"
            onClick={closeSearch}
            className="absolute inset-0 cursor-default"
            aria-label="بستن جستجو"
          />

          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="search-title"
            className="bg-bg shadow-text/20 animate-in fade-in zoom-in-95 relative w-full max-w-xl overflow-hidden rounded-3xl border border-white/70 shadow-2xl duration-200"
          >
            <div className="border-neutral_normal flex items-start justify-between border-b px-5 py-4 sm:px-6">
              <div>
                <p className="text-primary text-xs font-semibold">
                  فروشگاه کمپینک
                </p>
                <h2
                  id="search-title"
                  className="text-text mt-1 text-lg font-bold"
                >
                  جستجوی محصول
                </h2>
              </div>
              <button
                type="button"
                onClick={closeSearch}
                className="text-neutral_dark hover:bg-neutral_light hover:text-text flex h-9 w-9 items-center justify-center rounded-xl transition"
                aria-label="بستن پنجره جستجو"
              >
                <X size={19} />
              </button>
            </div>

            <form onSubmit={handleSubmit(searchHandler)} className="p-5 sm:p-6">
              <label
                htmlFor="product-search"
                className="text-text mb-2 block text-sm font-medium"
              >
                دنبال چه محصولی هستید؟
              </label>
              <div className="border-neutral_normal bg-neutral_light/60 focus-within:border-primary focus-within:bg-bg focus-within:ring-primary/10 flex items-center gap-2 rounded-2xl border p-1.5 transition focus-within:ring-4">
                <Search className="text-neutral_dark mr-2 shrink-0" size={19} />
                <input
                  {...searchField}
                  id="product-search"
                  ref={(element) => {
                    searchField.ref(element);
                    inputRef.current = element;
                  }}
                  type="search"
                  placeholder="مثلاً: چادر کمپینگ"
                  autoComplete="off"
                  className="text-text placeholder:text-neutral_dark min-w-0 flex-1 bg-transparent px-1 py-3 text-sm outline-none"
                />
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary/90 shrink-0 rounded-xl px-4 py-2.5 text-sm font-bold text-white transition"
                >
                  جستجو
                </button>
              </div>
              {errors.search && (
                <p className="mt-2 px-2 text-xs text-red-500">
                  {errors.search.message}
                </p>
              )}
              <p className="text-neutral_dark mt-4 text-xs">
                برای بستن، کلید Escape را فشار دهید.
              </p>
            </form>
          </section>
        </div>
      )}
    </>
  );
}
