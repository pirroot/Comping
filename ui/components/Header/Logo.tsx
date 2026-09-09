import Image from "next/image";
import Link from "next/link";
import logoImg from "@/public/images/logo.svg"

export default function Logo() {
  return (
    <Link href={'/'} title="logo" className="mr-2 flex gap-1 items-start">
      <span className="text-3xl font-bold">VENTURA</span>
      <Image src={logoImg} alt="logo site" height={33} width={33} />
    </Link>
  )
}
