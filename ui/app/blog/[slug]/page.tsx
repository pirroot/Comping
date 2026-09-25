'use client';

import PageRouter from '@/components/PageRouter/PageRouter';
import {
  ArrowRight,
  Bookmark,
  CalendarDays,
  Check,
  Clock3,
  MessageCircle,
  Share2,
  Star,
  UserRound,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const relatedPosts = [
  {
    title: 'راهنمای خرید چادر مسافرتی',
    category: 'تجهیزات',
    slug: 'best-tents',
  },
  {
    title: 'نکات طلایی کمپینگ در زمستان',
    category: 'کمپینگ',
    slug: 'winter-camping',
  },
  {
    title: 'چگونه کوله پشتی مناسب انتخاب کنیم؟',
    category: 'تجهیزات',
    slug: 'backpack-guide',
  },
];

export default function BlogDetail() {
  const [saved, setSaved] = useState(false);
  const [commentSent, setCommentSent] = useState(false);

  return (
    <div className="bg-bg min-h-screen pb-20">
      <PageRouter
        routes={[
          { title: 'وبلاگ', link: '/blog' },
          { title: 'مقاله', link: '#' },
        ]}
      />
      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6">
        <Link
          href="/blog"
          className="text-neutral_dark hover:text-primary inline-flex items-center gap-2 rounded-xl px-2 py-2 text-sm font-bold transition hover:bg-white"
        >
          <ArrowRight size={17} /> بازگشت به وبلاگ
        </Link>
      </div>

      <main className="mx-auto mt-5 max-w-6xl px-4 sm:px-6">
        <article className="border-neutral_normal overflow-hidden rounded-3xl border bg-white shadow-sm">
          <div className="relative min-h-82.5 overflow-hidden bg-[#123d34] sm:min-h-110">
            <Image
              src="/images/Home/hero.webp"
              alt="تصویر مقاله کمپینگ"
              fill
              priority
              className="object-cover opacity-75"
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#092820] via-[#092820]/35 to-transparent" />
            <div className="absolute right-0 bottom-0 max-w-3xl p-6 text-white sm:p-10 lg:p-14">
              <span className="bg-auxiliary text-text inline-flex rounded-full px-3 py-1.5 text-xs font-bold">
                کمپینگ
              </span>
              <h1 className="mt-4 text-3xl leading-normal font-extrabold sm:text-5xl">
                ۱۰ وسیله ضروری برای کمپینگ
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-8 text-white/75 sm:text-base">
                برای یک سفر کمپینگ موفق، داشتن تجهیزات مناسب حیاتی است. در این
                مقاله بهترین وسایل را معرفی می‌کنیم.
              </p>
            </div>
          </div>

          <div className="border-neutral_normal text-neutral_dark flex flex-wrap items-center gap-x-6 gap-y-3 border-b px-6 py-5 text-xs sm:px-10">
            <span className="flex items-center gap-2 font-medium">
              <UserRound size={16} className="text-primary" /> علی محمدی
            </span>
            <span className="flex items-center gap-2">
              <CalendarDays size={16} className="text-primary" /> ۱۲ مرداد ۱۴۰۳
            </span>
            <span className="flex items-center gap-2">
              <Clock3 size={16} className="text-primary" /> ۶ دقیقه مطالعه
            </span>
            <div className="mr-auto flex gap-2">
              <button
                type="button"
                onClick={() => setSaved(!saved)}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 font-bold transition ${saved ? 'bg-primary_light text-primary' : 'hover:bg-neutral_light'}`}
              >
                <Bookmark size={16} className={saved ? 'fill-current' : ''} />{' '}
                {saved ? 'ذخیره شد' : 'ذخیره مقاله'}
              </button>
              <button
                type="button"
                className="hover:bg-neutral_light flex items-center gap-2 rounded-lg px-3 py-2 font-bold transition"
              >
                <Share2 size={16} /> اشتراک‌گذاری
              </button>
            </div>
          </div>

          <div className="grid gap-10 p-6 sm:p-10 lg:grid-cols-[1fr_260px] lg:p-14">
            <div className="text-text min-w-0">
              <p className="border-primary text-neutral_dark mb-8 border-r-4 pr-4 text-base leading-9 font-medium">
                یک کمپ خوب از انتخاب درست تجهیزات شروع می‌شود. وسایلی که همراه
                خود می‌برید باید سبک، کاربردی و متناسب با مقصدتان باشند.
              </p>
              <div className="text-neutral_dark space-y-8 text-[15px] leading-9">
                <section>
                  <h2 className="text-text mb-3 text-2xl font-extrabold">
                    قبل از حرکت، سبک سفر کن
                  </h2>
                  <p>
                    قرار نیست تمام وسایل خانه را با خودتان به طبیعت ببرید. پیش
                    از بستن کوله، مسیر، آب‌وهوا و تعداد روزهای سفر را بررسی کنید
                    و فقط چیزهایی را انتخاب کنید که واقعاً به کارتان می‌آیند.
                  </p>
                </section>
                <section>
                  <h2 className="text-text mb-3 text-2xl font-extrabold">
                    ۱. چادر مناسب
                  </h2>
                  <p>
                    چادر خانه شما در طبیعت است. مدلی انتخاب کنید که در برابر باد
                    و باران مقاوم باشد و فضای کافی برای افراد و تجهیزات داشته
                    باشد. وزن کم و نصب سریع دو ویژگی مهم برای سفرهای چندروزه
                    هستند.
                  </p>
                  <div className="bg-primary_light/60 my-6 rounded-2xl p-5">
                    <p className="flex gap-3 font-bold text-[#356c3e]">
                      <Check className="mt-1 shrink-0" size={19} /> نکته
                      کاربردی: پیش از سفر یک بار چادر را در خانه باز و بسته کنید
                      تا در مقصد زمان کمتری از شما بگیرد.
                    </p>
                  </div>
                </section>
                <section>
                  <h2 className="text-text mb-3 text-2xl font-extrabold">
                    ۲. کیسه خواب و زیرانداز
                  </h2>
                  <p>
                    انتخاب کیسه خواب باید براساس دمای شب و فصل سفر انجام شود. یک
                    زیرانداز خوب هم علاوه بر راحتی، عایق مناسبی در برابر سرمای
                    زمین ایجاد می‌کند و خواب شبانه را بهتر می‌سازد.
                  </p>
                </section>
                <section>
                  <h2 className="text-text mb-3 text-2xl font-extrabold">
                    ۳. چراغ پیشانی و ابزار چندکاره
                  </h2>
                  <p>
                    دست‌های آزاد در زمان برپا کردن کمپ یا پیدا کردن وسایل داخل
                    کوله بسیار مهم‌اند. چراغ پیشانی، چاقوی چندکاره، فندک ضدآب و
                    یک پاوربانک کوچک از وسایلی هستند که حضورشان را در تاریکی قدر
                    می‌دانید.
                  </p>
                </section>
                <section>
                  <h2 className="text-text mb-3 text-2xl font-extrabold">
                    جمع‌بندی
                  </h2>
                  <p>
                    تجهیزات خوب قرار نیست سفر را پیچیده‌تر کنند؛ آن‌ها باید خیال
                    شما را راحت‌تر کنند. با یک فهرست ساده شروع کنید، وسایل را
                    چند بار استفاده کنید و برای هر سفر براساس نیاز واقعی‌تان آن
                    را به‌روزرسانی کنید.
                  </p>
                </section>
              </div>
              <div className="border-neutral_normal mt-10 flex flex-wrap items-center gap-2 border-t pt-6">
                <span className="text-text ml-2 text-sm font-bold">
                  برچسب‌ها:
                </span>
                {['تجهیزات کمپینگ', 'طبیعت‌گردی', 'راهنمای سفر'].map((tag) => (
                  <span
                    key={tag}
                    className="bg-neutral_light text-neutral_dark rounded-lg px-3 py-1.5 text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <aside className="order-first h-fit space-y-5 lg:sticky lg:top-28 lg:order-0">
              <div className="border-neutral_normal bg-bg rounded-2xl border p-5">
                <p className="text-text mb-4 text-sm font-extrabold">
                  در این مقاله می‌خوانید
                </p>
                <ol className="text-neutral_dark space-y-3 text-sm">
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">۰۱</span> چطور سبک
                    سفر کنیم؟
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">۰۲</span> انتخاب
                    چادر مناسب
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">۰۳</span> کیسه خواب
                    و زیرانداز
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">۰۴</span> ابزارهای
                    ضروری
                  </li>
                </ol>
              </div>
              <div className="rounded-2xl bg-[#123d34] p-5 text-white">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                  <UserRound size={21} />
                </div>
                <p className="font-bold">درباره نویسنده</p>
                <p className="mt-2 text-xs leading-6 text-white/65">
                  علی، عاشق طبیعت‌گردی و تجربه کردن مسیرهای تازه است.
                </p>
              </div>
            </aside>
          </div>
        </article>

        <section className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="border-neutral_normal rounded-3xl border bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-text text-xl font-extrabold">نظرها</h2>
                <p className="text-neutral_dark mt-1 text-sm">
                  تجربه‌ات از این مقاله را با ما به اشتراک بگذار.
                </p>
              </div>
              <span className="flex items-center gap-1 text-sm font-bold text-[#d99518]">
                <Star size={16} className="fill-current" /> ۴.۸
              </span>
            </div>
            {commentSent ? (
              <div className="bg-primary_light rounded-2xl p-5 text-sm font-bold text-[#356c3e]">
                نظر شما با موفقیت ثبت شد. ممنون که تجربه‌ات را به اشتراک گذاشتی.
              </div>
            ) : (
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  setCommentSent(true);
                }}
                className="space-y-4"
              >
                <textarea
                  required
                  placeholder="نظر خودت را درباره این مقاله بنویس..."
                  className="border-neutral_normal text-text focus:border-primary focus:ring-primary/10 min-h-32 w-full resize-y rounded-2xl border bg-[#fbfcfb] p-4 text-sm leading-7 transition outline-none focus:ring-4"
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-primary rounded-xl px-5 py-3 text-sm font-bold text-white transition hover:bg-[#5a9a63]"
                  >
                    ارسال نظر
                  </button>
                </div>
              </form>
            )}
          </div>
          <div className="border-neutral_normal rounded-3xl border bg-white p-6 shadow-sm">
            <h2 className="text-text text-lg font-extrabold">
              مقاله‌های مرتبط
            </h2>
            <div className="divide-neutral_normal mt-5 divide-y">
              {relatedPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex items-start gap-3 py-4 first:pt-0 last:pb-0"
                >
                  <span className="bg-primary_light text-primary mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg">
                    <MessageCircle size={16} />
                  </span>
                  <span>
                    <span className="text-text group-hover:text-primary block text-sm leading-6 font-bold transition">
                      {post.title}
                    </span>
                    <span className="text-neutral_dark mt-1 block text-xs">
                      {post.category}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
