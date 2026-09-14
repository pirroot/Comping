'use client';

import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import { usePathname } from 'next/navigation';

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname === '/admin' || pathname.startsWith('/admin/');

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main className="pt-32 ">{children}</main>
      <Footer />
    </>
  );
}
