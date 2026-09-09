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
    options: ['زیر ۵۰۰ هزار', '۵۰۰ تا ۱ میلیون', '۱ تا ۲ میلیون', 'بالای ۲ میلیون'],
  },
];

function FilterAccordion({ title, options }: FilterSection) {
  const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState<string>(options[0]);

  return (
    <div className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-3 text-sm font-semibold text-gray-700 hover:text-[#c83b3b] transition-colors"
      >
        {title}
        <FiChevronDown
          size={16}
          className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div className="flex flex-col gap-2 mt-1">
          {options.map((opt) => (
            <label
              key={opt}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <span
                onClick={() => setSelected(opt)}
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-200 ${selected === opt
                  ? 'border-[#c83b3b] bg-[#c83b3b]'
                  : 'border-gray-300 group-hover:border-[#c83b3b]'
                  }`}
              >
                {selected === opt && (
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                )}
              </span>
              <span
                onClick={() => setSelected(opt)}
                className={`text-sm transition-colors ${selected === opt ? 'text-[#c83b3b] font-medium' : 'text-gray-600'
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
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sticky top-5">
        <h2 className="text-base font-bold text-gray-800 mb-5 pb-3 border-b border-gray-100">
          فیلترها
        </h2>
        <div className="flex flex-col gap-1">
          {filters.map((f) => (
            <FilterAccordion key={f.title} {...f} />
          ))}
        </div>
        <button className="mt-5 w-full py-2.5 rounded-xl bg-[#c83b3b] text-white text-sm font-semibold hover:bg-[#a82f2f] transition-colors">
          اعمال فیلتر
        </button>
        <button className="mt-2 w-full py-2 rounded-xl text-gray-500 text-sm hover:text-[#c83b3b] transition-colors">
          حذف فیلترها
        </button>
      </div>
    </div>
  );
}