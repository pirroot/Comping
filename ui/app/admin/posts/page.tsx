import AdminResourcePage, { AdminRow } from '@/components/Admin/AdminResourcePage';

const articles: AdminRow[] = [
  {
    id: 'a1',
    title: '۱۰ وسیله ضروری برای کمپینگ',
    subtitle: 'راهنمای کمپینگ · ۶ دقیقه مطالعه',
    status: 'فعال',
    meta: '۲۸ تیر ۱۴۰۵',
  },
  {
    id: 'a2',
    title: 'بهترین تجهیزات کمپینگ برای مبتدیان',
    subtitle: 'تجهیزات · ۵ دقیقه مطالعه',
    status: 'پیش‌نویس',
    meta: '۲۰ تیر ۱۴۰۵',
  },
  {
    id: 'a3',
    title: '۵ اشتباه رایج در کمپینگ',
    subtitle: 'راهنمای سفر · ۴ دقیقه مطالعه',
    status: 'فعال',
    meta: '۱۵ تیر ۱۴۰۵',
  },
];

export default function AdminPosts() {
  return (
    <AdminResourcePage
      eyebrow="محتوای فروشگاه"
      title="مقالات"
      description="مقالات وبلاگ و راهنماهای مشتریان را مدیریت کنید."
      addLabel="نوشتن مقاله"
      searchPlaceholder="جست‌وجوی مقاله..."
      rows={articles}
      columns={['عنوان مقاله', 'تاریخ انتشار', 'وضعیت', 'آخرین تغییر']}
    />
  );
}
