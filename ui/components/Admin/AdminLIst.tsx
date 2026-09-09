import Link from 'next/link';

interface adminLinkType {
  title: string;
  link: string;
}

const list: adminLinkType[] = [
  {
    link: 'admin/products',
    title: 'محصولات',
  },
  {
    link: 'admin/products',
    title: 'محصولات',
  },
  {
    link: 'admin/products',
    title: 'محصولات',
  },
  {
    link: 'admin/faq',
    title: 'سوالات متداول',
  },
  {
    link: 'admin/products',
    title: 'محصولات',
  },
];

export default function AdminList() {
  return (
    <ul className="bg-gray-100 rounded-2xl text-sm  p-5 space-y-6">
      {list.map((item: adminLinkType, i) => (
        <li key={i}>
          <Link href={item.link} title={item.title}>
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
