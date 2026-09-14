'use client';

import { Bell, Check, Globe2, Save, ShieldCheck, Store } from 'lucide-react';
import { useState } from 'react';

export default function AdminSettings() {
  const [saved, setSaved] = useState(false);
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-green-600">کنترل پنل</p>
        <h1 className="mt-1 text-2xl font-extrabold text-slate-950">تنظیمات</h1>
        <p className="mt-2 text-sm text-slate-500">اطلاعات فروشگاه و ترجیحات پنل را مدیریت کنید.</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="نام فروشگاه" value="کمپینک شاپ" />
            <Field label="ایمیل پشتیبانی" value="info@comping.ir" type="email" />
            <Field label="شماره تماس" value="۰۲۱-۱۲۳۴۵۶۷۸" />
            <Field label="آدرس کوتاه" value="تهران، خیابان ولیعصر" />
            <div className="sm:col-span-2">
              <label className="block">
                <span className="mb-2 block text-sm font-bold text-slate-800">توضیحات فروشگاه</span>
                <textarea
                  defaultValue="تجهیزات کاربردی و مطمئن برای سفر و کمپینگ."
                  className="min-h-28 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm leading-7 outline-none focus:border-green-500"
                />
              </label>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={() => setSaved(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-bold text-white hover:bg-green-700"
            >
              {saved ? <Check size={17} /> : <Save size={17} />}{' '}
              {saved ? 'ذخیره شد' : 'ذخیره تغییرات'}
            </button>
          </div>
        </section>
        <aside className="space-y-3">
          <SettingCard
            icon={<Store size={18} />}
            title="اطلاعات فروشگاه"
            detail="نام و راه‌های ارتباطی"
          />
          <SettingCard icon={<Bell size={18} />} title="اعلان‌ها" detail="ایمیل و پیام‌های سیستم" />
          <SettingCard icon={<ShieldCheck size={18} />} title="امنیت" detail="نقش‌ها و دسترسی‌ها" />
          <SettingCard icon={<Globe2 size={18} />} title="زبان و منطقه" detail="فارسی · ایران" />
        </aside>
      </div>
    </div>
  );
}
function Field({ label, value, type = 'text' }: { label: string; value: string; type?: string }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-slate-800">{label}</span>
      <input
        type={type}
        defaultValue={value}
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
