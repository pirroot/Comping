import Link from 'next/link';
import { FaTelegramPlane } from 'react-icons/fa';
import { FaInstagram, FaLinkedin, FaSquareXTwitter } from 'react-icons/fa6';
import FooterLogo from './FooterLogo';

const productLinks = [
  { label: 'همه محصولات', href: '/products' },
  { label: 'الکترونیک', href: '/category/electronics' },
  { label: 'مد و پوشاک', href: '/category/fashion' },
  { label: 'خانه و آشپزخانه', href: '/category/home' },
];

const usefulLinks = [
  { label: 'درباره ما', href: '/about' },
  { label: 'تماس با ما', href: '/contact' },
  { label: 'وبلاگ', href: '/blog' },
  { label: 'سبد خرید', href: '/cart' },
];

export default function Footer() {
  const socialLinks = [
    { icon: FaTelegramPlane, href: 'https://t.me/', label: 'تلگرام' },
    { icon: FaInstagram, href: 'https://instagram.com/', label: 'اینستاگرام' },
    { icon: FaSquareXTwitter, href: 'https://x.com/', label: 'ایکس' },
    { icon: FaLinkedin, href: 'https://linkedin.com/', label: 'لینکدین' },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-neutral_normal bg-neutral_light px-4 pb-6 pt-14 text-text sm:pt-16">
      <div className="pointer-events-none absolute -bottom-32 -left-20 h-64 w-64 rounded-full border-36 border-primary/10" />
      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-10 border-b border-neutral_normal pb-12 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <FooterLogo />
            <p className="mt-5 max-w-xs text-sm leading-7 text-neutral_dark">
              تجهیزات کاربردی و مطمئن برای فروشگاهی که قرار است تجربه‌ای بهتر بسازد.
            </p>
            <div className="mt-6 flex items-center gap-2">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-neutral_dark shadow-sm transition hover:-translate-y-1 hover:bg-primary hover:text-white"
                >
                  <Icon size={18} />
                </Link>
              ))}
            </div>
          </div>

          <FooterLinkGroup title="محصولات" links={productLinks} />
          <FooterLinkGroup title="دسترسی سریع" links={usefulLinks} />

          <div>
            <h2 className="text-base font-bold">با ما در تماس باشید</h2>
            <div className="mt-5 space-y-4 text-sm text-neutral_dark">
              <p>تهران، خیابان ولیعصر، پلاک ۱۲۳</p>
              <a href="tel:02112345678" className="block transition hover:text-primary">
                ۰۲۱-۱۲۳۴۵۶۷۸
              </a>
              <a href="mailto:info@comping.ir" className="block transition hover:text-primary">
                info@comping.ir
              </a>
              <p>شنبه تا پنجشنبه، ۹ صبح تا ۶ عصر</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-5 text-xs text-neutral_dark sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} کمپینک شاپ. تمام حقوق محفوظ است.</p>
          <p>ساخته‌شده برای تجربه‌ای بهتر در خرید</p>
        </div>
      </div>
    </footer>
  );
}

function FooterLinkGroup({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h2 className="text-base font-bold">{title}</h2>
      <ul className="mt-5 space-y-3 text-sm text-neutral_dark">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="transition hover:text-primary">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
