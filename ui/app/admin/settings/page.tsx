'use client';

import { apiFetch } from '@/services/api/ApiFetch';
import { apiGet } from '@/services/api/GetApi';
import { apiAdd } from '@/services/api/PostApi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Bell, Check, Globe2, Save, ShieldCheck, Store } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

type Setting = { id: string; key: string; value: string; group: string };
type StoreValues = {
  storeName: string;
  supportEmail: string;
  phone: string;
  address: string;
  description: string;
};

const defaults: StoreValues = {
  storeName: '',
  supportEmail: '',
  phone: '',
  address: '',
  description: '',
};

const labels: Record<keyof StoreValues, string> = {
  storeName: 'نام فروشگاه',
  supportEmail: 'ایمیل پشتیبانی',
  phone: 'شماره تماس',
  address: 'آدرس کوتاه',
  description: 'توضیحات فروشگاه',
};

export default function AdminSettings() {
  const queryClient = useQueryClient();
  const [values, setValues] = useState<StoreValues>(defaults);
  const { data = [] } = useQuery({
    queryKey: ['admin-settings'],
    queryFn: () => apiGet<Setting[]>('admin/settings'),
  });

  useEffect(() => {
    setValues((current) => {
      const next = { ...current };
      data
        .filter((setting) => setting.group === 'store')
        .forEach((setting) => {
          if (setting.key in next) {
            next[setting.key as keyof StoreValues] = setting.value;
          }
        });
      return next;
    });
  }, [data]);

  const { mutate: save, isPending, isSuccess } = useMutation({
    mutationFn: async (submitted: StoreValues) => {
      const stored = new Map(data.map((setting) => [setting.key, setting]));
      await Promise.all(
        Object.entries(submitted).map(([key, value]) => {
          const setting = stored.get(key);
          return setting
            ? apiFetch(`admin/settings/${encodeURIComponent(key)}`, {
                method: 'PATCH',
                body: { value },
              })
            : apiAdd('admin/settings', { key, value, group: 'store' });
        }),
      );
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['admin-settings'] });
      toast.success('تنظیمات فروشگاه ذخیره شد.');
    },
    onError: () => toast.error('ذخیره تنظیمات انجام نشد. دوباره تلاش کنید.'),
  });

  const setField = (key: keyof StoreValues, value: string) =>
    setValues((current) => ({ ...current, [key]: value }));

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-green-600">کنترل پنل</p>
        <h1 className="mt-1 text-2xl font-extrabold text-slate-950">تنظیمات</h1>
        <p className="mt-2 text-sm text-slate-500">
          اطلاعات فروشگاه و ترجیحات پنل را مدیریت کنید.
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            save(values);
          }}
          className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            {(Object.keys(labels) as (keyof StoreValues)[])
              .filter((key) => key !== 'description')
              .map((key) => (
                <Field
                  key={key}
                  label={labels[key]}
                  value={values[key]}
                  type={key === 'supportEmail' ? 'email' : 'text'}
                  onChange={(value) => setField(key, value)}
                />
              ))}
            <div className="sm:col-span-2">
              <label className="block">
                <span className="mb-2 block text-sm font-bold text-slate-800">
                  {labels.description}
                </span>
                <textarea
                  value={values.description}
                  onChange={(event) => setField('description', event.target.value)}
                  className="min-h-28 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm leading-7 outline-none focus:border-green-500"
                />
              </label>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-bold text-white hover:bg-green-700 disabled:opacity-60"
            >
              {isSuccess ? <Check size={17} /> : <Save size={17} />}{' '}
              {isPending ? 'در حال ذخیره...' : 'ذخیره تغییرات'}
            </button>
          </div>
        </form>
        <aside className="space-y-3">
          <SettingCard icon={<Store size={18} />} title="اطلاعات فروشگاه" detail="نام و راه‌های ارتباطی" />
          <SettingCard icon={<Bell size={18} />} title="اعلان‌ها" detail="ایمیل و پیام‌های سیستم" />
          <SettingCard icon={<ShieldCheck size={18} />} title="امنیت" detail="نقش‌ها و دسترسی‌ها" />
          <SettingCard icon={<Globe2 size={18} />} title="زبان و منطقه" detail="فارسی · ایران" />
        </aside>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  type,
  onChange,
}: {
  label: string;
  value: string;
  type: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-slate-800">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-green-500"
      />
    </label>
  );
}

function SettingCard({
  icon,
  title,
  detail,
}: {
  icon: React.ReactNode;
  title: string;
  detail: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
        {icon}
      </span>
      <span>
        <b className="block text-sm text-slate-800">{title}</b>
        <small className="mt-1 block text-xs text-slate-500">{detail}</small>
      </span>
    </div>
  );
}
