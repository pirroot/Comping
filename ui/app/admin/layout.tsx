import AdminActions from '@/components/Admin/AdminActions';
import AdminList from '@/components/Admin/AdminLIst';
import { QueryProvider } from '@/providers/QueryProvider';

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <QueryProvider>
      <div dir="rtl" className="min-h-screen bg-[#f8fafc]">
        <div className="mx-auto min-h-screen max-w-[1600px] px-4 py-4 lg:flex lg:gap-6 lg:px-8 lg:py-6">
          <div className="mb-4 w-full lg:hidden">
            <details className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 font-bold text-slate-900 marker:hidden">
                <span>منوی مدیریت</span>
                <span className="text-green-600">⌄</span>
              </summary>

              <div className="border-t border-slate-100 p-3">
                <AdminList />
              </div>
            </details>
          </div>

          <aside className="hidden w-64 shrink-0 lg:block">
            <div className="sticky top-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 bg-slate-950 px-5 py-6 text-white">
                <p className="text-sm text-slate-400">کمپینک شاپ</p>
                <h1 className="mt-1 text-xl font-bold">پنل مدیریت</h1>
              </div>

              <div className="p-3">
                <AdminList />
              </div>
            </div>
          </aside>

          <main className="min-w-0 flex-1">
            <div className="mb-6 flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm sm:px-5">
              <div>
                <p className="text-sm text-slate-500">خوش آمدید</p>
                <h2 className="text-lg font-bold text-slate-900">مدیریت فروشگاه</h2>
              </div>

              <AdminActions />
            </div>

            <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
              {children}
            </section>
          </main>
        </div>
      </div>
    </QueryProvider>
  );
}
