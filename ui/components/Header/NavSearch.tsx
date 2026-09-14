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
        className="flex h-11 w-11 items-center justify-center rounded-xl bg-neutral_normal text-text transition hover:bg-primary_light hover:text-primary"
        aria-label="جستجو در محصولات"
        aria-haspopup="dialog"
        aria-expanded={searchOpen}
      >
        <Search size={20} />
      </button>

      {searchOpen && (
        <div
          className="fixed inset-0 z-60 flex items-start justify-center px-4 pt-[18vh]  sm:pt-[22vh]"
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
            className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-white/70 bg-bg shadow-2xl shadow-text/20 animate-in fade-in zoom-in-95 duration-200"
          >
            <div className="flex items-start justify-between border-b border-neutral_normal px-5 py-4 sm:px-6">
              <div>
                <p className="text-xs font-semibold text-primary">فروشگاه کمپینک</p>
                <h2 id="search-title" className="mt-1 text-lg font-bold text-text">
                  جستجوی محصول
                </h2>
              </div>
              <button
                type="button"
                onClick={closeSearch}
                className="flex h-9 w-9 items-center justify-center rounded-xl text-neutral_dark transition hover:bg-neutral_light hover:text-text"
                aria-label="بستن پنجره جستجو"
              >
                <X size={19} />
              </button>
            </div>

            <form onSubmit={handleSubmit(searchHandler)} className="p-5 sm:p-6">
              <label htmlFor="product-search" className="mb-2 block text-sm font-medium text-text">
                دنبال چه محصولی هستید؟
              </label>
              <div className="flex items-center gap-2 rounded-2xl border border-neutral_normal bg-neutral_light/60 p-1.5 transition focus-within:border-primary focus-within:bg-bg focus-within:ring-4 focus-within:ring-primary/10">
                <Search className="mr-2 shrink-0 text-neutral_dark" size={19} />
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
                  className="min-w-0 flex-1 bg-transparent px-1 py-3 text-sm text-text outline-none placeholder:text-neutral_dark"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-white transition hover:bg-primary/90"
                >
                  جستجو
                </button>
              </div>
              {errors.search && (
                <p className="mt-2 px-2 text-xs text-red-500">{errors.search.message}</p>
              )}
              <p className="mt-4 text-xs text-neutral_dark">برای بستن، کلید Escape را فشار دهید.</p>
            </form>
          </section>
        </div>
      )}
    </>
  );
}
