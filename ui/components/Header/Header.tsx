'use client';

import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import Logo from './Logo';
import NavActionBtn from './NavActionBtn';
import NavItems from './NavItems';
import NavSearch from './NavSearch';
import { categories, navItems } from './navigation';
import NavTheme from './NavTheme';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-4 z-50 mx-auto w-[calc(100%-1.5rem)] max-w-7xl">
      <div className="relative flex items-center justify-between gap-3 rounded-3xl border border-white/70 bg-neutral_light/95 p-2.5 shadow-xl shadow-text/5 backdrop-blur-md lg:rounded-full lg:px-4">
        <Logo />

        <NavItems />

        <div className="flex items-center gap-2">
          <NavSearch />
          {/* <NavTheme /> */}
          <NavActionBtn />
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            aria-label={isMobileMenuOpen ? 'بستن منو' : 'باز کردن منو'}
            aria-expanded={isMobileMenuOpen}
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-neutral_normal text-text transition hover:bg-primary hover:text-white lg:hidden"
          >
            {isMobileMenuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <nav className="absolute inset-x-0 top-[calc(100%+0.65rem)] rounded-2xl border border-neutral_normal bg-bg p-2 shadow-xl lg:hidden">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.link}>
                  <Link
                    href={item.link}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block rounded-xl px-4 py-3 text-sm font-medium text-text transition hover:bg-primary_light hover:text-primary"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    href={category.link}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block rounded-xl px-4 py-3 text-sm font-medium text-text transition hover:bg-primary_light hover:text-primary"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
