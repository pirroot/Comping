import AdminResourcePage, { AdminRow } from '@/components/Admin/AdminResourcePage';

const brands: AdminRow[] = [
  {
    id: 'br1',
    title: 'Jack Wolfskin',
    subtitle: 'تصویر لوگو · ۲۴ محصول',
    status: 'فعال',
    meta: 'نمایش اول',
  },
  {
    id: 'br2',
    title: 'Naturehike',
    subtitle: 'تصویر لوگو · ۱۸ محصول',
    status: 'فعال',
    meta: 'نمایش دوم',
  },
  {
    id: 'br3',
    title: 'Coleman',
    subtitle: 'تصویر لوگو · ۱۲ محصول',
    status: 'فعال',
    meta: 'نمایش سوم',
  },
  {
    id: 'br4',
    title: 'Black Diamond',
    subtitle: 'تصویر لوگو · ۸ محصول',
    status: 'غیرفعال',
    meta: 'پنهان',
  },
];

export default function AdminBrands() {
  return (
    <AdminResourcePage
      eyebrow="هویت فروشگاه"
      title="برندها"
      description="برندهای قابل نمایش در فروشگاه را مدیریت کنید."
      addLabel="افزودن برند"
      searchPlaceholder="جست‌وجوی برند..."
      rows={brands}
      columns={['برند', 'محصولات', 'وضعیت', 'اولویت نمایش']}
    />
  );
}
