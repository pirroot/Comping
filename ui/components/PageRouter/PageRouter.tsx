'use client';

import { BreadcrumbItemType } from '@/lib/types/Breadcrumb.type';
import { ChevronLeft, House } from 'lucide-react';
import Link from 'next/link';

interface PageRouterProps {
  routes: BreadcrumbItemType[];
  showHome?: boolean;
}

function normalizeLink(link: string) {
  return link.startsWith('/') ? link : `/${link}`;
}

export default function PageRouter({ routes, showHome = true }: PageRouterProps) {
  if (!routes || routes.length === 0) return null;

  return (
    <nav className="mx-auto my-5 w-full max-w-7xl px-4 sm:px-0" aria-label="مسیر صفحه">
      <ol className="flex flex-wrap items-center gap-1.5 rounded-2xl border border-neutral_normal bg-neutral_light/70 px-3 py-2.5 text-xs sm:px-4 sm:text-sm">
        {showHome && (
          <li className="flex items-center gap-1.5">
            <Link
              href="/"
              className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-neutral_dark transition hover:bg-white hover:text-primary"
              aria-label="خانه"
            >
              <House size={15} aria-hidden="true" />
              <span className="hidden sm:inline">خانه</span>
            </Link>
            <ChevronLeft size={14} className="text-neutral_dark/50" aria-hidden="true" />
          </li>
        )}

        {routes.map((route, index) => {
          const isLast = index === routes.length - 1;
          const hasLink = route.link && route.link !== '#';
          const href = hasLink ? normalizeLink(route.link) : undefined;

          return (
            <li key={`${route.title}-${index}`} className="flex min-w-0 items-center gap-1.5">
              {index > 0 && (
                <ChevronLeft size={14} className="text-neutral_dark/50" aria-hidden="true" />
              )}

              {isLast || !href ? (
                <span
                  className="max-w-48 truncate rounded-lg px-2 py-1.5 font-semibold text-text sm:max-w-none"
                  aria-current={isLast ? 'page' : undefined}
                >
                  {route.title}
                </span>
              ) : (
                <Link
                  href={href}
                  className="max-w-40 truncate rounded-lg px-2 py-1.5 text-neutral_dark transition hover:bg-white hover:text-primary sm:max-w-none"
                >
                  {route.title}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
