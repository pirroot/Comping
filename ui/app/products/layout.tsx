import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'محصولات | کمپینک شاپ',
  description: 'مشاهده و خرید محصولات فروشگاه کمپینک.',
};

export default function ProductsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
