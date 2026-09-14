import AdminResourcePage, { AdminRow } from '@/components/Admin/AdminResourcePage';

const categories: AdminRow[] = [
  { id: 'c1', title: 'کمپینگ', subtitle: '۳۸ محصول · دسته اصلی', status: 'فعال', meta: 'اولویت ۱' },
  {
    id: 'c2',
    title: 'کوهنوردی',
    subtitle: '۲۴ محصول · دسته اصلی',
    status: 'فعال',
    meta: 'اولویت ۲',
  },
  {
    id: 'c3',
    title: 'روشنایی و چراغ',
    subtitle: '۱۲ محصول · زیرمجموعه کمپینگ',
    status: 'فعال',
    meta: 'اولویت ۳',
  },
  {
    id: 'c4',
    title: 'لوازم آشپزی',
    subtitle: '۰ محصول · زیرمجموعه کمپینگ',
    status: 'پیش‌نویس',
    meta: 'اولویت ۴',
  },
];

export default function AdminCategories() {
  return (
    <AdminResourcePage
      eyebrow="ساختار کاتالوگ"
      title="دسته‌بندی‌ها"
      description="دسته‌بندی محصولات و ترتیب نمایش آن‌ها را مدیریت کنید."
      addLabel="افزودن دسته‌بندی"
      searchPlaceholder="جست‌وجوی دسته‌بندی..."
      rows={categories}
      columns={['دسته‌بندی', 'محتوا', 'وضعیت', 'اولویت']}
    />
  );
}
