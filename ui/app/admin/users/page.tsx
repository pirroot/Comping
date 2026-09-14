import AdminResourcePage, { AdminRow } from '@/components/Admin/AdminResourcePage';

const users: AdminRow[] = [
  {
    id: 'u1',
    title: 'مهدی رضایی',
    subtitle: 'mehdi@example.com · ۳ سفارش',
    status: 'فعال',
    meta: 'مشتری',
  },
  {
    id: 'u2',
    title: 'سارا احمدی',
    subtitle: 'sara@example.com · ۱ سفارش',
    status: 'فعال',
    meta: 'مشتری',
  },
  {
    id: 'u3',
    title: 'علی محمدی',
    subtitle: 'ali@example.com · بدون سفارش',
    status: 'غیرفعال',
    meta: 'مشتری',
  },
];

export default function AdminUsers() {
  return (
    <AdminResourcePage
      eyebrow="مدیریت دسترسی"
      title="کاربران"
      description="حساب‌های کاربری، نقش‌ها و وضعیت فعال بودن را مدیریت کنید."
      addLabel="افزودن کاربر"
      searchPlaceholder="جست‌وجوی نام یا ایمیل..."
      rows={users}
      columns={['کاربر', 'نقش', 'وضعیت', 'آخرین تغییر']}
    />
  );
}
