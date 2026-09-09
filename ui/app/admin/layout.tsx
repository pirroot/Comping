import AdminList from '@/components/Admin/AdminLIst';
import { QueryProvider } from '@/providers/QueryProvider';

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <QueryProvider>
      <section className="container mx-auto my-10 flex gap-10 ">
        <AdminList />
        {children}
      </section>
    </QueryProvider>
  );
}
