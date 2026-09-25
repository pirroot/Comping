'use client';

import { toNumberFa } from '@/src/utils/toNumberFa';
import { useState } from 'react';
import { BsCart3 } from 'react-icons/bs';

export default function BtnAddProduct() {
  const [count, setCount] = useState<number>(1);

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-1 rounded border border-gray-200 bg-white px-2 py-2 shadow">
        <button
          onClick={() => setCount((c) => c + 1)}
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded text-xl transition-colors hover:text-red-600"
        >
          +
        </button>

        <span className="text-md min-w-[2] px-3 text-center">
          {toNumberFa(count)}
        </span>

        <button
          onClick={() => setCount((c) => c - 1)}
          disabled={count <= 1}
          className="flex h-8 w-8 items-center justify-center rounded text-xl transition-colors enabled:cursor-pointer enabled:hover:text-red-600 disabled:cursor-not-allowed disabled:text-gray-300"
        >
          -
        </button>
      </div>

      <button className="flex cursor-pointer items-center gap-2 rounded-xl bg-[#c83b3b] p-3 px-4 text-sm text-white transition-all duration-200 hover:bg-[#b03030] active:scale-95">
        <BsCart3 size={22} />
        افزودن به سبد خرید
      </button>
    </div>
  );
}
