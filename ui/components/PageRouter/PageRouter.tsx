import { BreadcrumbItemType } from '@/lib/types/Breadcrumb.type';
import { ChevronLeft, House } from 'lucide-react';
import Link from 'next/link';

interface PageRouterProps {
  routes: BreadcrumbItemType[];
  showHome?: boolean;
}

const normalizeLink = (link: string) => (link.startsWith('/') ? link : `/${link}`);

const Separator = () => (
  <li aria-hidden="true" className="flex items-center text-neutral_dark/40">
    <ChevronLeft size={14} className="rtl:rotate-0 ltr:rotate-180" />
  </li>
);

export default function PageRouter({ routes, showHome = true }: PageRouterProps) {
  if (!routes || routes.length === 0) return null;

  const items = routes.map((route, index) => {
    const isLast = index === routes.length - 1;
    const hasLink = !!route.link && route.link !== '#';
    return {
      ...route,
      isLast,
      href: hasLink && !isLast ? normalizeLink(route.link) : undefined,
    };
  });

  // Schema برای گوگل
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.title,
    })),
  };

  const linkBase =
    'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-neutral_dark transition-colors duration-200 hover:bg-primary_light hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40';

  return (
    <nav className="mx-auto my-5 w-full max-w-7xl px-4 sm:px-0" aria-label="مسیر صفحه">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ol className="flex flex-wrap items-center gap-x-1 gap-y-2 text-xs sm:text-sm">
        {showHome && (
          <>
            <li>
              <Link href="/" className={linkBase} aria-label="خانه">
                <House size={15} aria-hidden="true" />
                <span className="hidden sm:inline">خانه</span>
              </Link>
            </li>
            <Separator />
          </>
        )}

        {items.map((item, index) => (
          <li key={`${item.title}-${index}`} className="flex min-w-0 items-center gap-1">
            {item.href ? (
              <Link
                href={item.href}
                title={item.title}
                className={`${linkBase} max-w-40 sm:max-w-56`}
              >
                <span className="truncate">{item.title}</span>
              </Link>
            ) : (
              <span
                title={item.title}
                aria-current={item.isLast ? 'page' : undefined}
                className={
                  item.isLast
                    ? 'max-w-52 truncate rounded-full bg-primary_light px-3 py-1.5 font-bold text-primary sm:max-w-80'
                    : 'max-w-40 truncate px-3 py-1.5 text-neutral_dark sm:max-w-56'
                }
              >
                {item.title}
              </span>
            )}

            {index < items.length - 1 && <Separator />}
          </li>
        ))}
      </ol>
    </nav>
  );
}
