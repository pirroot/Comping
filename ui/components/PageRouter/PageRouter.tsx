'use client';

import Home from '@/app/(Pages)/(Home)/page';
import { BreadcrumbItemType } from '@/lib/types/Breadcrumb.type';
import { ArrowLeft } from 'lucide-react';
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
    <nav className="my-5 container mx-auto" aria-label="breadcrumb">
      <ol className="flex flex-wrap items-center gap-1 text-sm">
        {showHome && (
          <li className="flex items-center">
            <Link
              href="/"
              className="text-gray-500 hover:text-red-600 transition-colors"
              aria-label="خانه"
            >
              <Home />
            </Link>
          </li>
        )}

        {routes.map((route, index) => {
          const isLast = index === routes.length - 1;
          const href = normalizeLink(route.link);

          return (
            <li key={href} className="flex items-center gap-1">
              <ArrowLeft size={12} className="text-gray-300 mx-1" aria-hidden="true" />

              {isLast ? (
                <span className="text-red-700 font-medium" aria-current="page">
                  {route.title}
                </span>
              ) : (
                <Link href={href} className="text-gray-500 hover:text-red-600 transition-colors">
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
