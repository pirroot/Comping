'use client';

import { useAuth } from '@/hooks/useAuth';
import profile from '@/public/images/profile.jpg';
import { ShoppingCart, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function NavActionBtn() {
  const status = useAuth();
  const [isUserImage] = useState(true);

  if (status === 'loading') {
    return (
      <div className="bg-neutral_normal h-11 w-32 animate-pulse rounded-full" />
    );
  }

  return (
    <div className="flex items-center gap-2">
      {status === 'out' ? (
        <Link
          href="/auth"
          className="bg-primary rounded-full px-6 py-2.5 text-sm font-medium text-white transition hover:bg-[#5a9a63] hover:shadow-md"
        >
          ورود / ثبت نام
        </Link>
      ) : (
        <>
          <Link
            href="/profile"
            className="bg-neutral_normal text-text hover:bg-primary_light hover:text-primary relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl p-1 transition"
            title="پروفایل"
            aria-label="پروفایل"
          >
            {isUserImage ? (
              <Image
                src={profile}
                alt="User Profile"
                width={40}
                height={40}
                className="h-full w-full rounded-[0.65rem] object-cover"
              />
            ) : (
              <User />
            )}
          </Link>

          <Link
            href="/cart"
            className="bg-neutral_normal text-text hover:bg-primary_light hover:text-primary relative flex h-11 w-11 items-center justify-center rounded-xl transition"
            title="سبد خرید"
            aria-label="سبد خرید"
          >
            <ShoppingCart size={20} />

            <span className="bg-auxiliary absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-2xl text-xs font-bold text-white dark:text-black">
              3
            </span>
          </Link>
        </>
      )}
    </div>
  );
}
