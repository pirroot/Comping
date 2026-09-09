'use client';

import { ShoppingCart, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import profile from '@/public/images/profile.jpg';

export default function NavActionBtn() {
  const [isLogin] = useState(true);
  const [isUserImage] = useState(true);

  return (
    <div className="flex items-center gap-2">
      {!isLogin ? (
        <Link
          href="/auth"
          className="rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-white transition hover:bg-[#5a9a63] hover:shadow-md"
        >
          ورود / ثبت نام
        </Link>
      ) : (
        <>
          <Link
            href="/profile"
            className="relative rounded-2xl bg-neutral_normal p-1.5 text-text transition hover:bg-neutral_light "
            title="پروفایل"
          >
            {isUserImage ? (
              <Image
                src={profile}
                alt="User Profile"
                width={40}
                height={40}
                className="rounded-2xl"
              />
            ) : (
              <User />
            )}
          </Link>

          <Link
            href="/cart"
            className="relative rounded-2xl  bg-neutral_normal p-3 text-text transition hover:bg-neutral_light "
            title="سبد خرید"
          >
            <ShoppingCart />

            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-2xl bg-auxiliary text-xs font-bold text-white dark:text-black">
              3
            </span>
          </Link>
        </>
      )}
    </div>
  );
}
