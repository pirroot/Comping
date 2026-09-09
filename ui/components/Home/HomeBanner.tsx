import Image from 'next/image';
import imageBanner from '@/public/images/Home/TaHome.png';
import Link from 'next/link';
import { MoveLeftIcon } from 'lucide-react';

export default function HomeBanner() {
  return (
    <section className="container mx-auto flex flex-col-reverse items-center justify-between gap-10 lg:px-40 py-10 md:flex-row md:gap-16 md:py-16">
      <div className="max-w-md space-y-5 text-center md:text-start">
        <h2 className="text-2xl font-bold leading-relaxed sm:text-3xl">
          کوله پشتی های سری
          <br />
          <span className="text-primary">JACK WOLFSKIN</span>
        </h2>
        <p className="text-sm leading-8 text-text sm:text-base md:text-justify">
          طراحی ارگونومیک و پشتی طبی سری Jack Wolfskin مناسب حمل طولانی مدته و
          کمترین فشار رو به گردن و کمر شما وارد میکنه !!
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 rounded-2xl bg-black px-6 py-3 text-sm font-medium text-white transition hover:opacity-90 sm:text-base"
        >
          مشاهده محصولات
          <MoveLeftIcon size={18} />
        </Link>
      </div>

      <div className="relative w-full max-w-xs shrink-0 sm:max-w-sm md:max-w-md">
        <Image
          src={imageBanner}
          alt="کوله پشتی سری Jack Wolfskin"
          priority
          className="h-auto w-full object-contain"
          sizes="(max-width: 768px) 70vw, 400px"
        />
      </div>
    </section>
  );
}
