import AdminResourcePage, { AdminRow } from '@/components/Admin/AdminResourcePage';

const banners: AdminRow[] = [
  {
    id: 'b1',
    title: 'کمپین کوله‌پشتی Jack Wolfskin',
    subtitle: 'صفحه اصلی · جایگاه اصلی',
    status: 'فعال',
    meta: 'تا ۳۰ شهریور',
  },
  {
    id: 'b2',
    title: 'پیشنهاد ویژه تابستان',
    subtitle: 'صفحه محصولات · نوار بالایی',
    status: 'فعال',
    meta: 'تا ۲۵ شهریور',
  },
  {
    id: 'b3',
    title: 'ارسال رایگان سفارش‌ها',
    subtitle: 'صفحه اصلی · جایگاه دوم',
    status: 'پیش‌نویس',
    meta: 'بدون تاریخ',
  },
];

export default function AdminBanners() {
  return (
    <AdminResourcePage
      eyebrow="نمایش و تبلیغات"
      title="بنرها"
      description="بنرهای صفحه اصلی و کمپین‌های تبلیغاتی را مدیریت کنید."
      addLabel="افزودن بنر"
      searchPlaceholder="جست‌وجوی بنر..."
      rows={banners}
      columns={['عنوان بنر', 'جایگاه', 'وضعیت', 'زمان نمایش']}
    />
  );
}
