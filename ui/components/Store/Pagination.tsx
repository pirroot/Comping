'use client';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { toNumberFa } from '@/src/utils/toNumberFa';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';

interface Props {
  totalPages: number;
}

export default function Pagination({ totalPages = 5 }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page') ?? '1');

  const goTo = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));
    router.push(`${pathname}?${params.toString()}`);
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center items-center gap-2 my-12">
      {/* Next (RTL: goes to lower page) */}
      <button
        onClick={() => goTo(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 text-gray-500 hover:border-[#c83b3b] hover:text-[#c83b3b] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
      >
        <FiChevronLeft size={18} />
      </button>

      {pages.map((page) => {
        const isActive = page === currentPage;
        const isEdge =
          page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1;

        if (!isEdge) {
          if (page === currentPage - 2 || page === currentPage + 2)
            return (
              <span key={page} className="text-gray-400 px-1 text-sm">
                ...
              </span>
            );
          return null;
        }

        return (
          <button
            key={page}
            onClick={() => goTo(page)}
            className={`w-10 h-10 flex items-center justify-center rounded-xl text-sm font-semibold transition-all duration-200 ${isActive
              ? 'bg-[#c83b3b] text-white shadow-md scale-105'
              : 'border border-gray-200 text-gray-600 hover:border-[#c83b3b] hover:text-[#c83b3b]'
              }`}
          >
            {toNumberFa(page)}
          </button>
        );
      })}

      {/* Prev */}
      <button
        onClick={() => goTo(currentPage - 1)}
        disabled={currentPage <= 1}
        className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 text-gray-500 hover:border-[#c83b3b] hover:text-[#c83b3b] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
      >
        <FiChevronRight size={18} />
      </button>
    </div>
  );
}