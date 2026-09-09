'use client';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { FiSliders } from 'react-icons/fi';

const sortOptions = [
  { label: 'پیش‌فرض', value: 'default' },
  { label: 'جدیدترین', value: 'newest' },
  { label: 'ارزان‌ترین', value: 'cheapest' },
  { label: 'گران‌ترین', value: 'expensive' },
  { label: 'تخفیف‌دار', value: 'offer' },
  { label: 'پرفروش‌ترین', value: 'bestseller' },
];

export default function StoreSort() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current = searchParams.get('sort') ?? 'default';

  const setSort = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', value);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2 bg-white rounded-2xl border border-gray-100 shadow-sm px-4 py-3">
      <span className="flex items-center gap-1.5 text-sm text-gray-500 ml-2 shrink-0">
        <FiSliders size={15} />
        مرتب‌سازی:
      </span>
      <div className="flex gap-1 flex-wrap">
        {sortOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setSort(opt.value)}
            className={`px-3.5 py-1.5 rounded-xl text-sm font-medium transition-all duration-200 ${current === opt.value
              ? 'bg-[#c83b3b] text-white shadow-sm'
              : 'text-gray-600 hover:bg-gray-100'
              }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}