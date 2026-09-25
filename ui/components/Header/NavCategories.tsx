'use client';

import { ChevronDown, ChevronLeft, LayoutGrid } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { categories } from './navigation';

export default function NavCategories() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLLIElement>(null);
  const pathname = usePathname();
  const isCategoryActive = pathname.startsWith('/category/');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <li className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
          isOpen || isCategoryActive
            ? 'bg-primary shadow-primary/20 text-white shadow-md'
            : 'text-text hover:bg-primary_light hover:text-primary'
        }`}
        aria-haspopup="menu"
        aria-expanded={isOpen}
      >
        <LayoutGrid size={16} />
        <span>دسته‌بندی‌ها</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      <div
        role="menu"
        className={`border-neutral_normal bg-bg shadow-text/10 absolute top-full right-0 z-50 mt-3 w-80 origin-top-right overflow-hidden rounded-2xl border p-2 shadow-2xl transition-all duration-200 ${
          isOpen
            ? 'scale-100 opacity-100'
            : 'pointer-events-none scale-95 opacity-0'
        }`}
      >
        <div className="border-neutral_normal flex items-center gap-3 border-b px-3 py-3">
          <span className="bg-primary_light text-primary flex h-9 w-9 items-center justify-center rounded-xl">
            <LayoutGrid size={18} />
          </span>
          <div>
            <p className="text-text text-sm font-bold">دسته‌بندی محصولات</p>
            <p className="text-neutral_dark mt-0.5 text-xs">
              محصول موردنظرتان را سریع‌تر پیدا کنید
            </p>
          </div>
        </div>

        <ul className="mt-1" aria-label="دسته‌بندی محصولات">
          {categories.map((category) => {
            const isActive = pathname === category.link;

            return (
              <li key={category.id}>
                <Link
                  href={category.link}
                  role="menuitem"
                  onClick={() => setIsOpen(false)}
                  className={`group flex items-center justify-between rounded-xl px-3 py-2.5 transition-colors ${
                    isActive ? 'bg-primary_light' : 'hover:bg-neutral_light'
                  }`}
                >
                  <span>
                    <span
                      className={`block text-sm font-semibold ${isActive ? 'text-primary' : 'text-text'}`}
                    >
                      {category.name}
                    </span>
                    <span className="text-neutral_dark mt-0.5 block text-xs">
                      {category.description}
                    </span>
                  </span>
                  <ChevronLeft
                    className="text-neutral_dark -rotate-90 transition-transform group-hover:-translate-x-1"
                    size={16}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </li>
  );
}
