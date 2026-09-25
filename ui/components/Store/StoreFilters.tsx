'use client';
import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

interface FilterSection {
  title: string;
  options: string[];
}

const filters: FilterSection[] = [
  {
    title: 'دسته‌بندی',
    options: ['همه', 'کیف بچگانه', 'کفش', 'پوشاک', 'اسباب‌بازی'],
  },
  {
    title: 'برند',
    options: ['همه برندها', 'بریتاکس', 'چیکو', 'فیشر پرایس', 'لِگو'],
  },
  {
    title: 'بازه قیمت',
    options: [
      'زیر ۵۰۰ هزار',
      '۵۰۰ تا ۱ میلیون',
      '۱ تا ۲ میلیون',
      'بالای ۲ میلیون',
    ],
  },
];

function FilterAccordion({ title, options }: FilterSection) {
  const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState<string>(options[0]);

  return (
    <div className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-3 text-sm font-semibold text-gray-700 transition-colors hover:text-[#c83b3b]"
      >
        {title}
        <FiChevronDown
          size={16}
          className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div className="mt-1 flex flex-col gap-2">
          {options.map((opt) => (
            <label
              key={opt}
              className="group flex cursor-pointer items-center gap-2.5"
            >
              <span
                onClick={() => setSelected(opt)}
                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200 ${
                  selected === opt
                    ? 'border-[#c83b3b] bg-[#c83b3b]'
                    : 'border-gray-300 group-hover:border-[#c83b3b]'
                }`}
              >
                {selected === opt && (
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                )}
              </span>
              <span
                onClick={() => setSelected(opt)}
                className={`text-sm transition-colors ${
                  selected === opt
                    ? 'font-medium text-[#c83b3b]'
                    : 'text-gray-600'
                }`}
              >
                {opt}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export default function StoreFilters() {
  return (
    <div className="col-span-3">
      <div className="sticky top-5 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <h2 className="mb-5 border-b border-gray-100 pb-3 text-base font-bold text-gray-800">
          فیلترها
        </h2>
        <div className="flex flex-col gap-1">
          {filters.map((f) => (
            <FilterAccordion key={f.title} {...f} />
          ))}
        </div>
        <button className="mt-5 w-full rounded-xl bg-[#c83b3b] py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#a82f2f]">
          اعمال فیلتر
        </button>
        <button className="mt-2 w-full rounded-xl py-2 text-sm text-gray-500 transition-colors hover:text-[#c83b3b]">
          حذف فیلترها
        </button>
      </div>
    </div>
  );
}
