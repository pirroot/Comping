import type { NavItem } from '@/lib/types/Nav.type';

export const navItems: NavItem[] = [
  { title: 'صفحه اصلی', link: '/' },
  { title: 'همه محصولات', link: '/products' },
  { title: 'بلاگ', link: '/blog' },
  { title: 'درباره ما', link: '/about' },
  { title: 'تماس با ما', link: '/contact' },
];

export const categories = [
  { id: 1, name: 'الکترونیک', description: 'لوازم و تجهیزات دیجیتال', link: '/category/electronics' },
  { id: 2, name: 'مد و پوشاک', description: 'استایل و پوشاک روزمره', link: '/category/fashion' },
  { id: 3, name: 'کتاب و فرهنگ', description: 'کتاب و محصولات فرهنگی', link: '/category/books' },
  { id: 4, name: 'خانه و آشپزخانه', description: 'لوازم کاربردی خانه', link: '/category/home' },
  { id: 5, name: 'ورزشی', description: 'تجهیزات و لوازم ورزشی', link: '/category/sports' },
];
