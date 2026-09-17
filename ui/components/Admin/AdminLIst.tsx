'use client';

import {
  BarChart3,
  BookOpen,
  FolderTree,
  Image,
  Package,
  Settings,
  ShieldCheck,
  Tags,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

interface AdminLink {
  title: string;
  link: string;
  icon: ReactNode;
}

const list: AdminLink[] = [
  { link: '/admin', title: 'داشبورد', icon: <BarChart3 size={17} /> },
  { link: '/admin/products', title: 'محصولات', icon: <Package size={17} /> },
  { link: '/admin/categories', title: 'دسته‌بندی‌ها', icon: <FolderTree size={17} /> },
  { link: '/admin/articles', title: 'مقالات', icon: <BookOpen size={17} /> },
  { link: '/admin/banners', title: 'بنرها', icon: <Image size={17} /> },
  { link: '/admin/brands', title: 'برندها', icon: <Tags size={17} /> },
  { link: '/admin/users', title: 'کاربران', icon: <Users size={17} /> },
  { link: '/admin/settings', title: 'تنظیمات', icon: <Settings size={17} /> },
  { link: '/admin/faq', title: 'سوالات متداول', icon: <ShieldCheck size={17} /> },
];

export default function AdminList() {
  const pathname = usePathname();

  return (
    <nav aria-label="منوی مدیریت">
      <ul className="space-y-1">
        {list.map((item) => {
          const isActive =
            item.link === '/admin' ? pathname === '/admin' : pathname.startsWith(item.link);

          return (
            <li key={item.link}>
              <Link
                href={item.link}
                title={item.title}
                aria-current={isActive ? 'page' : undefined}
                className={`group relative flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-l from-emerald-600 to-emerald-500 text-white shadow-sm shadow-emerald-500/30'
                    : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-700'
                }`}
              >
                {/* نوار کناری برای آیتم فعال */}
                {isActive && (
                  <span className="absolute right-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-l-full bg-white/70" />
                )}

                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-100 text-slate-500 group-hover:bg-emerald-100 group-hover:text-emerald-600'
                  }`}
                >
                  {item.icon}
                </span>

                <span className="flex-1">{item.title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
