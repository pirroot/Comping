'use client';

import { useEffect, useState } from 'react';
import { Edit3, Plus, Trash2 } from 'lucide-react';

export type CrudAdminRow = {
  id: string;
  title: string;
  subtitle: string;
  status: 'فعال' | 'پیش‌نویس' | 'غیرفعال';
  meta: string;
  values: Record<string, string>;
};

export type CrudAdminField = {
  name: string;
  label: string;
  type?: 'text' | 'url' | 'number' | 'date' | 'boolean' | 'textarea';
  required?: boolean;
  options?: { value: string; label: string }[];
};

type Props = {
  title: string;
  description: string;
  addLabel: string;
  fields: CrudAdminField[];
  rows: CrudAdminRow[];
  loading?: boolean;
  loadError?: string;
  onSave: (values: Record<string, string>, id?: string) => Promise<CrudAdminRow>;
  onDelete: (id: string) => Promise<void>;
  allowCreate?: boolean;
};

export default function AdminCrudResourcePage({
  title,
  description,
  addLabel,
  fields,
  rows,
  loading = false,
  loadError,
  onSave,
  onDelete,
  allowCreate = true,
}: Props) {
  const [items, setItems] = useState(rows);
  const [editing, setEditing] = useState<CrudAdminRow | null>(null);
  const [values, setValues] = useState<Record<string, string>>({});
  const [formOpen, setFormOpen] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => setItems(rows), [rows]);

  const openCreate = () => {
    setEditing(null);
    setFormOpen(true);
    setValues(Object.fromEntries(fields.map((field) => [field.name, ''])));
    setError('');
  };

  const openEdit = (row: CrudAdminRow) => {
    setEditing(row);
    setFormOpen(true);
    setValues({ ...row.values });
    setError('');
  };

  const save = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBusy(true);
    setError('');
    try {
      const saved = await onSave(values, editing?.id);
      setItems((current) =>
        editing
          ? current.map((row) => (row.id === editing.id ? saved : row))
          : [saved, ...current],
      );
      setFormOpen(false);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'ذخیره انجام نشد.');
    } finally {
      setBusy(false);
    }
  };

  const remove = async (row: CrudAdminRow) => {
    if (!window.confirm(`«${row.title}» حذف شود؟`)) return;
    setError('');
    try {
      await onDelete(row.id);
      setItems((current) => current.filter((item) => item.id !== row.id));
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'حذف انجام نشد.');
    }
  };

  return (
    <section className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-green-600">کنترل پنل</p>
          <h1 className="mt-1 text-2xl font-extrabold text-slate-950">
            {title}
          </h1>
          <p className="mt-2 text-sm text-slate-500">{description}</p>
        </div>
        {allowCreate && (
          <button
            type="button"
            onClick={openCreate}
            className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-sm font-bold text-white hover:bg-green-700"
          >
            <Plus size={17} /> {addLabel}
          </button>
        )}
      </header>

      {error && !editing && (
        <p role="alert" className="rounded-xl bg-rose-50 p-3 text-sm text-rose-700">
          {error}
        </p>
      )}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="grid grid-cols-[1.5fr_1fr_0.7fr_0.8fr_100px] gap-4 border-b border-slate-100 bg-slate-50 px-5 py-3 text-xs font-bold text-slate-500">
          <span>عنوان</span><span>جزئیات</span><span>وضعیت</span><span>ترتیب/مکان</span><span>عملیات</span>
        </div>
        {loading ? (
          <p className="px-5 py-12 text-center text-sm text-slate-500">در حال دریافت اطلاعات...</p>
        ) : loadError ? (
          <p role="alert" className="px-5 py-12 text-center text-sm text-rose-600">{loadError}</p>
        ) : items.length ? items.map((row) => (
          <div key={row.id} className="grid grid-cols-[1.5fr_1fr_0.7fr_0.8fr_100px] items-center gap-4 border-b border-slate-100 px-5 py-4 last:border-0">
            <div><p className="font-bold text-slate-800">{row.title}</p><p className="mt-1 text-xs text-slate-500">{row.subtitle}</p></div>
            <span className="truncate text-sm text-slate-600">{row.meta}</span>
            <span className="text-sm text-slate-600">{row.status}</span>
            <span className="text-xs text-slate-500">{row.values.sort || row.values.placement || '—'}</span>
            <div className="flex items-center gap-1">
              <button type="button" aria-label="ویرایش" onClick={() => openEdit(row)} className="rounded-lg p-2 text-slate-400 hover:bg-green-50 hover:text-green-600"><Edit3 size={16} /></button>
              <button type="button" aria-label="حذف" onClick={() => void remove(row)} className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-500"><Trash2 size={16} /></button>
            </div>
          </div>
        )) : <p className="px-5 py-12 text-center text-sm text-slate-500">هنوز موردی ثبت نشده است.</p>}
      </div>

      {formOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
          <form onSubmit={save} className="max-h-[90vh] w-full max-w-xl space-y-4 overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
            <h2 className="text-lg font-extrabold">{editing ? 'ویرایش مورد' : addLabel}</h2>
            {fields.map((field) => (
              <label key={field.name} className="block">
                <span className="mb-1.5 block text-sm font-bold text-slate-700">{field.label}</span>
                {field.options ? (
                  <select
                    required={field.required}
                    value={values[field.name] ?? ''}
                    onChange={(event) => setValues({ ...values, [field.name]: event.target.value })}
                    className="h-11 w-full rounded-xl border border-slate-200 px-3"
                  >
                    <option value="">انتخاب کنید</option>
                    {field.options.map((option) => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                ) : field.type === 'boolean' ? (
                  <select
                    value={values[field.name] ?? ''}
                    onChange={(event) => setValues({ ...values, [field.name]: event.target.value })}
                    className="h-11 w-full rounded-xl border border-slate-200 px-3"
                  >
                    <option value="">انتخاب کنید</option><option value="true">فعال</option><option value="false">غیرفعال</option>
                  </select>
                ) : field.type === 'textarea' ? (
                  <textarea
                    required={field.required}
                    value={values[field.name] ?? ''}
                    onChange={(event) => setValues({ ...values, [field.name]: event.target.value })}
                    className="min-h-32 w-full rounded-xl border border-slate-200 px-3 py-2"
                  />
                ) : (
                  <input
                    type={field.type ?? 'text'}
                    required={field.required}
                    value={values[field.name] ?? ''}
                    onChange={(event) => setValues({ ...values, [field.name]: event.target.value })}
                    className="h-11 w-full rounded-xl border border-slate-200 px-3"
                  />
                )}
              </label>
            ))}
            {error && <p role="alert" className="text-sm text-rose-600">{error}</p>}
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setFormOpen(false)} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-600">انصراف</button>
              <button type="submit" disabled={busy} className="rounded-xl bg-green-600 px-4 py-2 text-sm font-bold text-white disabled:opacity-60">{busy ? 'در حال ذخیره...' : 'ذخیره'}</button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
}
