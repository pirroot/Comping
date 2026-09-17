'use client';

import { Eye, LogOut, RefreshCw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

export default function AdminActions() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);

    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });

    router.replace('/login');
    router.refresh();
  };

  const baseBtn =
    'inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';

  return (
    <div className="flex items-center gap-2">
      {/* Refresh */}
      <button
        type="button"
        onClick={() => startTransition(() => router.refresh())}
        disabled={isPending}
        aria-label="بروزرسانی"
        title="بروزرسانی"
        className={`${baseBtn} border border-emerald-200 bg-white text-emerald-700 hover:border-emerald-300 hover:bg-emerald-50 active:scale-95 shadow-sm`}
      >
        <RefreshCw size={16} className={isPending ? 'animate-spin' : ''} />
      </button>

      {/* View site */}
      <button
        type="button"
        onClick={() => router.push('/')}
        className={`${baseBtn} hidden border border-emerald-200 bg-white text-emerald-700 hover:border-emerald-300 hover:bg-emerald-50 active:scale-95 shadow-sm sm:inline-flex`}
      >
        <Eye size={16} />
        <span>مشاهده سایت</span>
      </button>

      {/* Logout */}
      <button
        type="button"
        onClick={handleLogout}
        disabled={isLoggingOut}
        className={`${baseBtn} bg-linear-to-b from-rose-500 to-rose-600 text-white shadow-sm shadow-rose-500/20 hover:from-rose-500 hover:to-rose-700 active:scale-95`}
      >
        <LogOut size={16} />
        <span>{isLoggingOut ? 'در حال خروج...' : 'خروج'}</span>
      </button>
    </div>
  );
}
