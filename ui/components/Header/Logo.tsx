import logoImg from '@/public/images/logo.svg';
import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" title="صفحه اصلی" className="mr-1 flex shrink-0 items-center gap-2 px-2">
      <Image src={logoImg} alt="لوگوی کمپینک شاپ" height={34} width={34} priority />
      <span className="hidden text-lg font-black tracking-tight text-text sm:block">
        کمپینک شاپ
      </span>
    </Link>
  );
}
