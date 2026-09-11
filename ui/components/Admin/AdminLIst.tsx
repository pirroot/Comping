'use client';

import {
  BarChart3,
  BookOpen,
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
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? 'bg-green-600 text-white shadow-md shadow-green-200'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-green-600'
                }`}
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/20 text-base">
                  {item.icon}
                </span>
                <span>{item.title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
