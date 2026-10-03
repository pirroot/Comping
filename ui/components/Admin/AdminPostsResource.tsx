'use client';

import AdminCrudResourcePage, {
  CrudAdminRow,
} from '@/components/Admin/AdminCrudResourcePage';
import { apiFetch } from '@/services/api/ApiFetch';
import { apiGet } from '@/services/api/GetApi';
import { apiAdd } from '@/services/api/PostApi';
import { apiRemove } from '@/services/api/RemoveApi';
import { useQuery, useQueryClient } from '@tanstack/react-query';

type Post = {
  id: string;
  slug: string;
  title: string;
  content: string;
  excerpt: string | null;
  image: string;
  isActive: boolean;
  createdAt: string;
};

const toRow = (post: Post): CrudAdminRow => ({
  id: post.id,
  title: post.title,
  subtitle: post.excerpt || post.slug,
  status: post.isActive ? 'فعال' : 'پیش‌نویس',
  meta: new Date(post.createdAt).toLocaleDateString('fa-IR'),
  values: {
    slug: post.slug,
    title: post.title,
    content: post.content,
    excerpt: post.excerpt ?? '',
    image: post.image,
    isActive: String(post.isActive),
  },
});

export default function AdminPostsResource() {
  const queryClient = useQueryClient();
  const { data = [], isLoading, isError } = useQuery({
    queryKey: ['admin-posts'],
    queryFn: () => apiGet<Post[]>('admin/posts'),
  });

  const save = async (values: Record<string, string>, id?: string) => {
    const payload = {
      slug: values.slug,
      title: values.title,
      content: values.content,
      excerpt: values.excerpt || undefined,
      image: values.image,
      isActive: values.isActive === 'true',
    };
    const post = id
      ? await apiFetch<Post>(`admin/posts/${id}`, {
          method: 'PATCH',
          body: payload,
        })
      : await apiAdd<Post, typeof payload>('admin/posts', payload);
    await queryClient.invalidateQueries({ queryKey: ['admin-posts'] });
    return toRow(post);
  };

  const remove = async (id: string) => {
    await apiRemove(`admin/posts/${id}`);
    await queryClient.invalidateQueries({ queryKey: ['admin-posts'] });
  };

  return (
    <AdminCrudResourcePage
      title="مقالات"
      description="مقالات وبلاگ و راهنماهای مشتریان را مدیریت کنید."
      addLabel="نوشتن مقاله"
      rows={data.map(toRow)}
      loading={isLoading}
      loadError={isError ? 'دریافت مقاله‌ها انجام نشد.' : undefined}
      fields={[
        { name: 'title', label: 'عنوان مقاله', required: true },
        { name: 'slug', label: 'شناسه انگلیسی', required: true },
        { name: 'excerpt', label: 'خلاصه' },
        { name: 'content', label: 'متن مقاله', type: 'textarea', required: true },
        { name: 'image', label: 'نشانی تصویر', type: 'url', required: true },
        { name: 'isActive', label: 'وضعیت انتشار', type: 'boolean', required: true },
      ]}
      onSave={save}
      onDelete={remove}
    />
  );
}
