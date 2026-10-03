'use client';

import AdminCrudResourcePage, {
  CrudAdminRow,
} from '@/components/Admin/AdminCrudResourcePage';
import { apiFetch } from '@/services/api/ApiFetch';
import { apiGet } from '@/services/api/GetApi';
import { apiRemove } from '@/services/api/RemoveApi';
import { useQuery, useQueryClient } from '@tanstack/react-query';

type User = {
  id: string;
  username: string;
  phone: string;
  name: string | null;
  family: string | null;
  role: 'USER' | 'ADMIN' | 'MODERATOR';
  isActive: boolean;
};

const toRow = (user: User): CrudAdminRow => ({
  id: user.id,
  title: [user.name, user.family].filter(Boolean).join(' ') || user.username,
  subtitle: `${user.phone} · ${user.username}`,
  status: user.isActive ? 'فعال' : 'غیرفعال',
  meta: user.role,
  values: {
    name: user.name ?? '',
    family: user.family ?? '',
    role: user.role,
    isActive: String(user.isActive),
  },
});

export default function AdminUsers() {
  const queryClient = useQueryClient();
  const { data = [], isLoading, isError } = useQuery({
    queryKey: ['admin-users'],
    queryFn: () => apiGet<User[]>('admin/users'),
  });

  const save = async (values: Record<string, string>, id?: string) => {
    if (!id) throw new Error('کاربر فقط از مسیر ثبت‌نام امن ایجاد می‌شود.');
    const row = data.find((user) => user.id === id);
    if (!row) throw new Error('کاربر پیدا نشد.');
    const user = await apiFetch<User>(`admin/users/${encodeURIComponent(row.username)}`, {
      method: 'PATCH',
      body: {
        name: values.name,
        family: values.family,
        role: values.role,
        isActive: values.isActive === 'true',
      },
    });
    await queryClient.invalidateQueries({ queryKey: ['admin-users'] });
    return toRow(user);
  };

  const remove = async (id: string) => {
    await apiRemove(`admin/users/${id}`);
    await queryClient.invalidateQueries({ queryKey: ['admin-users'] });
  };

  return (
    <AdminCrudResourcePage
      title="کاربران"
      description="حساب‌های کاربری، نقش‌ها و وضعیت فعال بودن را مدیریت کنید. ایجاد حساب از مسیر تأیید شماره همراه انجام می‌شود."
      addLabel="افزودن کاربر"
      rows={data.map(toRow)}
      loading={isLoading}
      loadError={isError ? 'دریافت کاربران انجام نشد.' : undefined}
      allowCreate={false}
      fields={[
        { name: 'name', label: 'نام' },
        { name: 'family', label: 'نام خانوادگی' },
        {
          name: 'role',
          label: 'نقش',
          required: true,
          options: [
            { value: 'USER', label: 'کاربر' },
            { value: 'MODERATOR', label: 'ناظر' },
            { value: 'ADMIN', label: 'مدیر' },
          ],
        },
        { name: 'isActive', label: 'وضعیت', type: 'boolean', required: true },
      ]}
      onSave={save}
      onDelete={remove}
    />
  );
}
