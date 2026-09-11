import Link from 'next/link';
import { usePathname } from 'next/navigation';
import NavCategories from './NavCategories';
import { navItems } from './navigation';

export { navItems } from './navigation';

export default function NavItems() {
  const pathname = usePathname();

  return (
    <nav className="hidden lg:block" aria-label="ناوبری اصلی">
      <ul className="flex items-center gap-1">
        <NavCategories />
        {navItems.map((item) => (
          <li key={item.link}>
            <Link
              href={item.link}
              aria-current={pathname === item.link ? 'page' : undefined}
              className={`relative block rounded-full px-4 py-2 text-sm font-medium transition-all ${
                pathname === item.link
                  ? 'bg-primary text-white shadow-md shadow-primary/20'
                  : 'text-text hover:bg-primary_light hover:text-primary'
              }`}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
