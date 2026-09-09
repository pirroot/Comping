import type { Metadata } from 'next';
import { Toaster } from 'sonner';
import ThemeProvider from '@/components/ThemeProvider';
import '../styles/globals.css';
import Header from '@/components/Header/Header';
import raviFont from '@/utils/font';
import Footer from '@/components/Footer/Footer';

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
          <Header />
          <main className="pt-42">{children}</main>
          <Footer />
          <Toaster
            position="top-center"
            toastOptions={{
              classNames: {
                toast: 'font-sans',
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
