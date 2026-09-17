import SiteChrome from '@/components/layout/SiteChrome';
import ThemeProvider from '@/components/ThemeProvider';
import raviFont from '@/utils/font';
import type { Metadata } from 'next';
import { Toaster } from 'sonner';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'کمپینک شاپ',
  description: 'مرجعه خرید تخصصی لوازم فروشگاهی',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className={`scroll-smooth ${raviFont.variable}`}>
      <body className="bg-bg text-text min-h-screen">
        <ThemeProvider>
          <SiteChrome>{children}</SiteChrome>
          <Toaster position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
