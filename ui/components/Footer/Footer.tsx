import Link from 'next/link';
import { FaInstagram, FaLinkedin, FaSquareXTwitter } from 'react-icons/fa6';
import { FaTelegramPlane } from 'react-icons/fa';
import FooterLogo from './FooterLogo';

export default function Footer() {
  const socialLinks = [
    { icon: FaTelegramPlane, href: 'https://t.me/yourchannel', label: 'Telegram' },
    { icon: FaInstagram, href: 'https://instagram.com/yourpage', label: 'Instagram' },
    { icon: FaSquareXTwitter, href: 'https://twitter.com/yourpage', label: 'Twitter' },
    { icon: FaLinkedin, href: 'https://linkedin.com/company/yourpage', label: 'LinkedIn' },
  ];

  return (
    <footer className="px-4 py-16 bg-neutral_light">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <ul className="justify-self-center">
          <h2 className="text-lg font-bold mb-4">
            دسته بندی <span className="text-primary">محصولات</span>
          </h2>
          <li className="mb-2">
            <Link href="/products" className="hover:text-primary transition-colors">
              محصولات
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/categories" className="hover:text-primary transition-colors">
              دسته‌بندی‌ها
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/brands" className="hover:text-primary transition-colors">
              برندها
            </Link>
          </li>
        </ul>

        <div className="text-center">
          <FooterLogo />
          <p className="mt-2 text-sm text-gray-600">
            &ldquo;تجهیزات حرفه‌ای، ماجراجویی‌های فراموش‌نشدنی!&rdquo;
          </p>

          <ul className="flex justify-center gap-3 mt-4">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <li key={label}>
                <Link
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="block hover:scale-110 transition-transform"
                >
                  <Icon className="w-10 h-10 text-white bg-primary p-2 rounded-2xl hover:bg-auxiliary transition-colors" />
                </Link>
              </li>
            ))}
          </ul>
          <br />
          <p>© {new Date().getFullYear()} تمام حقوق محفوظ است.</p>
        </div>
        <div className="justify-self-center">
          <ul className="text-start">
            <h2 className="text-lg font-bold mb-4">
              لینک هـای <span className="text-primary">مهم</span>
            </h2>
            <li className="mb-2">
              <Link href="/about" className="hover:text-primary transition-colors">
                درباره ما
              </Link>
            </li>
            <li className="mb-2">
              <Link href="/contact" className="hover:text-primary transition-colors">
                تماس با ما
              </Link>
            </li>
            <li className="mb-2">
              <Link href="/faq" className="hover:text-primary transition-colors">
                سوالات متداول
              </Link>
            </li>
            <li className="mb-2">
              <Link href="/terms" className="hover:text-primary transition-colors">
                قوانین و مقررات
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
