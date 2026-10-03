'use client';

import AdminCrudResourcePage, {
  CrudAdminRow,
} from '@/components/Admin/AdminCrudResourcePage';
import { apiFetch } from '@/services/api/ApiFetch';
import { apiGet } from '@/services/api/GetApi';
import { apiAdd } from '@/services/api/PostApi';
import { apiRemove } from '@/services/api/RemoveApi';
import { useQuery, useQueryClient } from '@tanstack/react-query';

type Banner = {
  id: string;
  title: string;
  image: string;
  link: string | null;
  placement: string;
  sort: number;
  isActive: boolean;
  startsAt: string | null;
  endsAt: string | null;
};

const dateInput = (value: string | null) =>
  value ? new Date(value).toISOString().slice(0, 10) : '';

const toRow = (banner: Banner): CrudAdminRow => ({
  id: banner.id,
  title: banner.title,
  subtitle: `${banner.placement} · ${banner.image}`,
  status: banner.isActive ? 'فعال' : 'غیرفعال',
  meta: banner.endsAt ? `تا ${dateInput(banner.endsAt)}` : 'بدون تاریخ پایان',
  values: {
    title: banner.title,
    image: banner.image,
    link: banner.link ?? '',
    placement: banner.placement,
    sort: String(banner.sort),
    isActive: String(banner.isActive),
    startsAt: dateInput(banner.startsAt),
    endsAt: dateInput(banner.endsAt),
  },
});

export default function AdminBanners() {
  const queryClient = useQueryClient();
  const { data = [], isLoading, isError } = useQuery({
    queryKey: ['admin-banners'],
    queryFn: () => apiGet<Banner[]>('admin/banners'),
  });

  const save = async (values: Record<string, string>, id?: string) => {
    const payload = {
      title: values.title,
      image: values.image,
      link: values.link || undefined,
      placement: values.placement || 'home',
      sort: Number(values.sort || 0),
      isActive: values.isActive === 'true',
      startsAt: values.startsAt || undefined,
      endsAt: values.endsAt || undefined,
    };
    const banner = id
      ? await apiFetch<Banner>(`admin/banners/${id}`, {
          method: 'PATCH',
          body: payload,
        })
      : await apiAdd<Banner, typeof payload>('admin/banners', payload);
    await queryClient.invalidateQueries({ queryKey: ['admin-banners'] });
    return toRow(banner);
  };

  const remove = async (id: string) => {
    await apiRemove(`admin/banners/${id}`);
    await queryClient.invalidateQueries({ queryKey: ['admin-banners'] });
  };

  return (
    <AdminCrudResourcePage
      title="بنرها"
      description="بنرهای صفحه اصلی و کمپین‌های تبلیغاتی را مدیریت کنید."
      addLabel="افزودن بنر"
      rows={data.map(toRow)}
      loading={isLoading}
      loadError={isError ? 'دریافت بنرها انجام نشد.' : undefined}
      fields={[
        { name: 'title', label: 'عنوان بنر', required: true },
        { name: 'image', label: 'نشانی تصویر', type: 'url', required: true },
        { name: 'link', label: 'پیوند مقصد', type: 'url' },
        { name: 'placement', label: 'جایگاه نمایش' },
        { name: 'sort', label: 'ترتیب نمایش', type: 'number' },
        { name: 'isActive', label: 'وضعیت', type: 'boolean', required: true },
        { name: 'startsAt', label: 'شروع نمایش', type: 'date' },
        { name: 'endsAt', label: 'پایان نمایش', type: 'date' },
      ]}
      onSave={save}
      onDelete={remove}
    />
  );
}
