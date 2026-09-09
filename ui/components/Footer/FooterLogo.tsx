import Image from 'next/image';
import Link from 'next/link';
import logoImg from '@/public/images/logo.svg';

export default function FooterLogo() {
  return (
    <Link href={'/'} title="logo" className="flex gap-1 items-center justify-center">
      <span className="text-3xl font-bold">VENTURA</span>
      <Image src={logoImg} alt="logo site" height={33} width={33} />
    </Link>
  );
}
