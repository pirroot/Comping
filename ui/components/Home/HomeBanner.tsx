import imageBanner from '@/public/images/Home/TaHome.png';
import { Check, MoveLeftIcon, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function HomeBanner() {
  return (
    <section className="container mx-auto px-4 py-10 md:py-16">
      <div className="relative overflow-hidden rounded-4xl bg-[#123d34] px-6 py-8 text-white shadow-xl shadow-[#123d34]/10 sm:px-10 md:px-14 md:py-10">
        <div className="border-primary/20 pointer-events-none absolute -bottom-28 -left-20 h-64 w-64 rounded-full border-24" />
        <div className="border-auxiliary/10 pointer-events-none absolute -top-24 -right-20 h-56 w-56 rounded-full border-20" />
        <div className="relative z-10 flex flex-col-reverse items-center justify-between gap-8 md:flex-row md:gap-12">
          <div className="max-w-lg text-center md:text-right">
            <span className="text-primary_light inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold">
              <Sparkles size={14} /> انتخاب ویژه کمپینک
            </span>
            <h2 className="mt-4 text-2xl leading-relaxed font-extrabold sm:text-3xl md:text-4xl">
              کوله پشتی های سری
              <br />
              <span className="text-primary_light">JACK WOLFSKIN</span>
            </h2>
            <p className="mt-4 text-sm leading-8 text-white/70 sm:text-base">
              طراحی ارگونومیک و پشتی طبی سری Jack Wolfskin مناسب حمل طولانی مدته
              و کمترین فشار رو به گردن و کمر شما وارد می‌کنه.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-white/70 md:justify-start">
              <span className="flex items-center gap-1.5">
                <Check size={15} className="text-primary_light" /> مناسب استفاده
                طولانی
              </span>
              <span className="flex items-center gap-1.5">
                <Check size={15} className="text-primary_light" /> طراحی سبک و
                مقاوم
              </span>
            </div>
            <Link
              href="/products"
              className="group hover:bg-primary_light mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-[#123d34] transition hover:shadow-lg sm:text-base"
            >
              مشاهده محصولات
              <MoveLeftIcon
                size={18}
                className="transition-transform group-hover:-translate-x-1"
              />
            </Link>
          </div>

          <div className="relative w-full max-w-xs shrink-0 sm:max-w-sm md:max-w-md">
            <div className="bg-primary/20 absolute inset-4 rounded-full blur-2xl" />
            <div className="relative rounded-3xl bg-white/10 p-4 ring-1 ring-white/10 backdrop-blur-sm sm:p-6">
              <Image
                src={imageBanner}
                alt="کوله پشتی سری Jack Wolfskin"
                priority
                className="h-auto w-full object-contain drop-shadow-2xl"
                sizes="(max-width: 768px) 70vw, 400px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
