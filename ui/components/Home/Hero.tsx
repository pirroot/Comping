import hero_img from '@/public/images/Home/hero.webp';
import { MoveLeft, Package, Sparkles, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="container mx-auto px-4 py-4">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full px-4 text-xs font-medium text-primary">
            <Sparkles className="h-3 w-3" />
            بهترین انتخاب برای سفر
          </span>
        </div>

        {/* عنوان */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-text lg:text-4xl xl:text-5xl ">
            سفرت رو بچین،
            <span className="relative inline-block">
              <span className="text-primary"> وسایلش</span>
            </span>
            رو داریم!
          </h1>
          <p className="mx-auto my-8 max-w-md text-sm text-neutral_dark lg:text-base">
            از چادر و کیسه خواب تا لوازم الکترونیک،
            <span className="text-primary font-medium"> همه چیز </span>
            برای یه سفر عالی
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/products"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-white shadow-md transition-all hover:bg-[#5a9a63] hover:shadow-lg hover:shadow-primary/30 active:scale-95 lg:px-8 lg:py-3.5"
          >
            مشاهده محصولات ضروری
            <MoveLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
          </Link>
        </div>

        <div className="relative mx-auto max-w-4xl pt-4">
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full border-4 border-primary_light opacity-40 lg:h-48 lg:w-48" />
          <div className="absolute -bottom-8 -left-8 h-24 w-24 rounded-full border-4 border-auxiliary_light opacity-40 lg:h-36 lg:w-36" />

          <Image
            src={hero_img}
            alt="Hero image - سفر و وسایل"
            width={900}
            height={500}
            className="relative w-full"
            priority
          />

          <div className="absolute -bottom-4 right-4 flex items-center gap-3 rounded-2xl bg-bg px-4 py-2.5 shadow-xl ring-1 ring-black/5 transition hover:scale-105 hover:shadow-2xl lg:bottom-20 lg:right-8 lg:px-5 lg:py-3">
            <div className="rounded-full bg-primary_light p-1.5 lg:p-2">
              <Star className="h-3 w-3 text-primary fill-primary lg:h-4 lg:w-4" />
            </div>
            <div className="text-right">
              <p className="text-[10px] text-neutral_dark lg:text-xs">مشتری راضی</p>
              <p className="text-sm font-bold text-text lg:text-base">۹۹۹+</p>
            </div>
          </div>

          <div className="absolute -bottom-4 left-4 flex items-center gap-3 rounded-2xl bg-bg px-4 py-2.5 shadow-xl ring-1 ring-black/5 transition hover:scale-105 hover:shadow-2xl lg:bottom-80 lg:left-8 lg:px-5 lg:py-3">
            <div className="rounded-full bg-auxiliary_light p-1.5 lg:p-2">
              <Package className="h-3 w-3 text-auxiliary lg:h-4 lg:w-4" />
            </div>
            <div className="text-right">
              <p className="text-[10px] text-neutral_dark lg:text-xs">محصول متنوع</p>
              <p className="text-sm font-bold text-text lg:text-base">۲۰۰+</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
