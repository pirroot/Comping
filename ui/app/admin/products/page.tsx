import AdminResourcePage, { AdminRow } from '@/components/Admin/AdminResourcePage';

const products: AdminRow[] = [
  {
    id: 'p1',
    title: 'کوله پشتی کوهنوردی ۶۰ لیتری',
    subtitle: 'تجهیزات سفر · موجودی ۲۴ عدد',
    status: 'فعال',
    meta: '۳,۲۰۰,۰۰۰ تومان',
  },
  {
    id: 'p2',
    title: 'چراغ قوه شارژی حرفه‌ای',
    subtitle: 'روشنایی · موجودی ۸۶ عدد',
    status: 'فعال',
    meta: '۶۲۰,۰۰۰ تومان',
  },
  {
    id: 'p3',
    title: 'چادر کمپ ۵ نفره',
    subtitle: 'کمپینگ · موجودی ۰ عدد',
    status: 'غیرفعال',
    meta: '۵,۰۰۰,۰۰۰ تومان',
  },
];

export default function AdminProducts() {
  return (
    <AdminResourcePage
      eyebrow="کاتالوگ فروشگاه"
      title="محصولات"
      description="محصولات، قیمت و وضعیت موجودی را مدیریت کنید."
      addLabel="افزودن محصول"
      searchPlaceholder="جست‌وجوی محصول..."
      rows={products}
      columns={['محصول', 'قیمت', 'وضعیت', 'به‌روزرسانی']}
    />
  );
}
