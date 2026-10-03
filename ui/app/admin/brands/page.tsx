'use client';

import AdminCrudResourcePage, {
  CrudAdminRow,
} from '@/components/Admin/AdminCrudResourcePage';
import { apiFetch } from '@/services/api/ApiFetch';
import { apiGet } from '@/services/api/GetApi';
import { apiAdd } from '@/services/api/PostApi';
import { apiRemove } from '@/services/api/RemoveApi';
import { useQuery, useQueryClient } from '@tanstack/react-query';

type Brand = {
  id: string;
  title: string;
  slug: string;
  logo: string | null;
  sort: number;
  isActive: boolean;
  _count: { products: number };
};

const toRow = (brand: Brand): CrudAdminRow => ({
  id: brand.id,
  title: brand.title,
  subtitle: brand.logo || 'لوگو ثبت نشده',
  status: brand.isActive ? 'فعال' : 'غیرفعال',
  meta: `${brand._count.products} محصول`,
  values: {
    title: brand.title,
    slug: brand.slug,
    logo: brand.logo ?? '',
    sort: String(brand.sort),
    isActive: String(brand.isActive),
  },
});

export default function AdminBrands() {
  const queryClient = useQueryClient();
  const { data = [], isLoading, isError } = useQuery({
    queryKey: ['admin-brands'],
    queryFn: () => apiGet<Brand[]>('admin/brands'),
  });

  const save = async (values: Record<string, string>, id?: string) => {
    const payload = {
      title: values.title,
      slug: values.slug,
      logo: values.logo || undefined,
      sort: Number(values.sort || 0),
      isActive: values.isActive === 'true',
    };
    const brand = id
      ? await apiFetch<Brand>(`admin/brands/${id}`, {
          method: 'PATCH',
          body: payload,
        })
      : await apiAdd<Brand, typeof payload>('admin/brands', payload);
    await queryClient.invalidateQueries({ queryKey: ['admin-brands'] });
    return toRow(brand);
  };

  const remove = async (id: string) => {
    await apiRemove(`admin/brands/${id}`);
    await queryClient.invalidateQueries({ queryKey: ['admin-brands'] });
  };

  return (
    <AdminCrudResourcePage
      title="برندها"
      description="برندهای قابل نمایش در فروشگاه را مدیریت کنید."
      addLabel="افزودن برند"
      rows={data.map(toRow)}
      loading={isLoading}
      loadError={isError ? 'دریافت برندها انجام نشد.' : undefined}
      fields={[
        { name: 'title', label: 'نام برند', required: true },
        { name: 'slug', label: 'شناسه انگلیسی', required: true },
        { name: 'logo', label: 'نشانی تصویر لوگو', type: 'url' },
        { name: 'sort', label: 'ترتیب نمایش', type: 'number' },
        { name: 'isActive', label: 'وضعیت', type: 'boolean', required: true },
      ]}
      onSave={save}
      onDelete={remove}
    />
  );
}
