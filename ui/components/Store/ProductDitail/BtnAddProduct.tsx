'use client';

import { toNumberFa } from '@/src/utils/toNumberFa';
import { useState } from 'react';
import { BsCart3 } from 'react-icons/bs';

export default function BtnAddProduct() {
  const [count, setCount] = useState<number>(1);

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="bg-white border border-gray-200 shadow flex items-center gap-1 rounded px-2 py-2">
        <button
          onClick={() => setCount((c) => c + 1)}
          className="text-xl w-8 h-8 flex items-center justify-center cursor-pointer hover:text-red-600 transition-colors rounded"
        >
          +
        </button>

        <span className="text-md px-3 min-w-[2] text-center">
          {toNumberFa(count)}
        </span>

        <button
          onClick={() => setCount((c) => c - 1)}
          disabled={count <= 1}
          className="text-xl w-8 h-8 flex items-center justify-center rounded transition-colors
            disabled:text-gray-300 disabled:cursor-not-allowed
            enabled:cursor-pointer enabled:hover:text-red-600"
        >
          -
        </button>
      </div>

      <button className="bg-[#c83b3b] text-white text-sm hover:bg-[#b03030] active:scale-95 transition-all duration-200 cursor-pointer p-3 px-4 rounded-xl flex items-center gap-2">
        <BsCart3 size={22} />
        افزودن به سبد خرید
      </button>
    </div>
  );
}