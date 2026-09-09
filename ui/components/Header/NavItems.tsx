import { NavItem } from "@/lib/types/Nav.type"
import NavCategories from "./NavCategories"
import Link from "next/link"

const navItems: NavItem[] = [
  { title: 'صفحه اصلی', link: '/' },
  { title: 'همه محصولات', link: '/products' },
  { title: 'بلاگ', link: '/blog' },
  { title: 'درباره ما', link: '/about' },
  { title: 'تماس با ما', link: '/contact' },
]

export default function NavItems() {
  return (
    <nav className="hidden lg:block">
      <ul className="flex items-center gap-1">
        <NavCategories />
        {navItems.map((item) => (
          <li key={item.link}>
            <Link
              href={item.link}
              className="relative block rounded-full px-4 py-2 text-sm font-medium text-text transition-all hover:bg-primary hover:text-primary_light"
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
