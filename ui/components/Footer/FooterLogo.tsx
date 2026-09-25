import logoImg from '@/public/images/logo.svg';
import Image from 'next/image';
import Link from 'next/link';

export default function FooterLogo() {
  return (
    <Link href="/" title="صفحه اصلی" className="flex items-center gap-2">
      <Image src={logoImg} alt="لوگوی کمپینک شاپ" height={38} width={38} />
      <span className="text-2xl font-black tracking-tight">کمپینک شاپ</span>
    </Link>
  );
}
