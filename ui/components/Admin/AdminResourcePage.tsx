'use client';

import { Check, Edit3, MoreHorizontal, Plus, Search, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';

export type AdminRow = {
  id: string;
  title: string;
  subtitle: string;
  status: 'فعال' | 'پیش‌نویس' | 'غیرفعال';
  meta: string;
};

type Props = {
  eyebrow: string;
  title: string;
  description: string;
  addLabel: string;
  searchPlaceholder: string;
  rows: AdminRow[];
  columns: string[];
};

export default function AdminResourcePage({
  eyebrow,
  title,
  description,
  addLabel,
  searchPlaceholder,
  rows,
  columns,
}: Props) {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'همه' | AdminRow['status']>('همه');
  const [items, setItems] = useState(rows);
  const filteredRows = useMemo(
    () =>
      items.filter(
        (row) =>
          (activeFilter === 'همه' || row.status === activeFilter) &&
          `${row.title} ${row.subtitle} ${row.meta}`.includes(query.trim())
      ),
    [activeFilter, items, query]
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-green-600">{eyebrow}</p>
          <h1 className="mt-1 text-2xl font-extrabold text-slate-950">{title}</h1>
          <p className="mt-2 text-sm text-slate-500">{description}</p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-green-200 transition hover:bg-green-700"
        >
          <Plus size={17} /> {addLabel}
        </button>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3">
        <label className="flex min-w-60 flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-500">
          <Search size={17} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={searchPlaceholder}
            className="min-w-0 flex-1 bg-transparent outline-none"
          />
        </label>
        <div className="flex gap-1 rounded-xl bg-white p-1">
          {(['همه', 'فعال', 'پیش‌نویس', 'غیرفعال'] as const).map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`rounded-lg px-3 py-2 text-xs font-bold transition ${activeFilter === filter ? 'bg-green-600 text-white' : 'text-slate-500 hover:bg-slate-100'}`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="hidden grid-cols-[1.5fr_1fr_0.7fr_0.8fr_90px] gap-4 border-b border-slate-100 bg-slate-50 px-5 py-3 text-xs font-bold text-slate-500 md:grid">
          {columns.map((column) => (
            <span key={column}>{column}</span>
          ))}
          <span>عملیات</span>
        </div>
        <div className="divide-y divide-slate-100">
          {filteredRows.length ? (
            filteredRows.map((row) => (
              <div
                key={row.id}
                className="grid gap-3 px-5 py-4 transition hover:bg-slate-50 md:grid-cols-[1.5fr_1fr_0.7fr_0.8fr_90px] md:items-center md:gap-4"
              >
                <div>
                  <p className="font-bold text-slate-800">{row.title}</p>
                  <p className="mt-1 text-xs text-slate-500">{row.subtitle}</p>
                </div>
                <span className="text-sm text-slate-600">{row.meta}</span>
                <span
                  className={`w-fit rounded-full px-2.5 py-1 text-xs font-bold ${row.status === 'فعال' ? 'bg-emerald-50 text-emerald-600' : row.status === 'پیش‌نویس' ? 'bg-amber-50 text-amber-600' : 'bg-slate-100 text-slate-500'}`}
                >
                  {row.status}
                </span>
                <span className="text-xs text-slate-400">آخرین تغییر امروز</span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    aria-label="ویرایش"
                    className="rounded-lg p-2 text-slate-400 transition hover:bg-green-50 hover:text-green-600"
                  >
                    <Edit3 size={16} />
                  </button>
                  <button
                    type="button"
                    aria-label="حذف"
                    onClick={() =>
                      setItems((current) => current.filter((item) => item.id !== row.id))
                    }
                    className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                  <button
                    type="button"
                    aria-label="بیشتر"
                    className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
                  >
                    <MoreHorizontal size={16} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="px-5 py-16 text-center">
              <Check className="mx-auto text-slate-300" size={28} />
              <p className="mt-3 text-sm font-bold text-slate-600">موردی با این فیلتر پیدا نشد.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
