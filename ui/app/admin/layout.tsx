import AdminActions from '@/components/Admin/AdminActions';
import AdminList from '@/components/Admin/AdminLIst';
import { QueryProvider } from '@/providers/QueryProvider';
import { LayoutGrid, MenuIcon } from 'lucide-react';

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <QueryProvider>
      <div
        dir="rtl"
        className="min-h-screen bg-gradient-to-b from-emerald-50/60 via-slate-50 to-slate-50"
      >
        <div className="mx-auto min-h-screen max-w-[1600px] px-4 py-4 lg:flex lg:gap-6 lg:px-8 lg:py-6">
          {/* منوی موبایل */}
          <div className="mb-4 w-full lg:hidden">
            <details className="group overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm shadow-emerald-900/5">
              <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 font-bold text-slate-900 marker:hidden transition-colors hover:bg-emerald-50/50">
                <span className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-sm shadow-emerald-500/30">
                    <LayoutGrid size={16} />
                  </span>
                  منوی مدیریت
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 transition group-open:rotate-90">
                  <MenuIcon size={18} />
                </span>
              </summary>

              <div className="border-t border-emerald-50 p-3">
                <AdminList />
              </div>
            </details>
          </div>

          {/* سایدبار دسکتاپ */}
          <aside className="hidden w-64 shrink-0 lg:block">
            <div className="sticky top-6 overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm shadow-emerald-900/5">
              <div className="relative overflow-hidden bg-gradient-to-br from-emerald-700 via-emerald-600 to-emerald-700 px-5 py-6 text-white">
                {/* دایره‌های دکوری */}
                <div className="absolute -left-6 -top-10 h-28 w-28 rounded-full bg-white/10" />
                <div className="absolute -bottom-12 -right-8 h-32 w-32 rounded-full bg-white/5" />

                <div className="relative">
                  <p className="text-xs font-medium text-emerald-100/90">کمپینک شاپ</p>
                  <h1 className="mt-1 text-xl font-bold tracking-tight">پنل مدیریت</h1>

                  {/* خط تزئینی */}
                  <div className="mt-4 h-1 w-10 rounded-full bg-emerald-300/60" />
                </div>
              </div>

              <div className="p-3">
                <AdminList />
              </div>
            </div>
          </aside>

          {/* محتوای اصلی */}
          <main className="min-w-0 flex-1">
            {/* هدر */}
            <div className="mb-6 flex items-center justify-between gap-3 rounded-2xl border border-emerald-100 bg-white px-4 py-4 shadow-sm shadow-emerald-900/5 sm:px-5">
              <div className="flex items-center gap-3">
                <span className="hidden h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-sm shadow-emerald-500/30 sm:flex">
                  <LayoutGrid size={18} />
                </span>
                <div>
                  <p className="text-xs font-medium text-emerald-600/80">خوش آمدید</p>
                  <h2 className="text-lg font-bold text-slate-900">مدیریت فروشگاه</h2>
                </div>
              </div>

              <AdminActions />
            </div>

            {/* محتوا */}
            <section className="rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm shadow-emerald-900/5 sm:p-6">
              {children}
            </section>
          </main>
        </div>
      </div>
    </QueryProvider>
  );
}
