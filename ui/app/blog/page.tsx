'use client';

import PageRouter from '@/components/PageRouter/PageRouter';
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  Search,
  UserRound,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';

const posts = [
  {
    slug: 'camping-essentials',
    title: '۱۰ وسیله ضروری برای کمپینگ',
    excerpt:
      'برای یک سفر کمپینگ موفق، داشتن تجهیزات مناسب حیاتی است. در این مقاله بهترین وسایل را معرفی می‌کنیم.',
    image: '/images/Home/hero.webp',
    author: 'علی محمدی',
    date: '۱۴۰۳/۰۵/۱۲',
    category: 'کمپینگ',
    readTime: '۶ دقیقه',
  },
  {
    slug: 'hiking-tips',
    title: 'راهنمای کامل کوهنوردی برای مبتدی‌ها',
    excerpt:
      'اگر تازه به دنیای کوهنوردی وارد شده‌اید، این راهنما به شما کمک می‌کند تا سفرهای امن‌تری داشته باشید.',
    image: '/images/Home/TaHome.png',
    author: 'سارا رضایی',
    date: '۱۴۰۳/۰۴/۲۸',
    category: 'کوهنوردی',
    readTime: '۸ دقیقه',
  },
  {
    slug: 'best-tents',
    title: 'راهنمای خرید چادر مسافرتی',
    excerpt:
      'چادر مناسب باید سبک، ضد آب و بادوام باشد. در این مقاله بهترین گزینه‌ها را بررسی می‌کنیم.',
    image: '/images/Products/2.png',
    author: 'محمد کریمی',
    date: '۱۴۰۳/۰۴/۱۵',
    category: 'تجهیزات',
    readTime: '۵ دقیقه',
  },
  {
    slug: 'winter-camping',
    title: 'نکات طلایی کمپینگ در زمستان',
    excerpt:
      'کمپینگ در زمستان چالش‌های خاص خود را دارد. با این نکات سفر گرم و ایمنی داشته باشید.',
    image: '/images/Home/hero.webp',
    author: 'علی محمدی',
    date: '۱۴۰۳/۰۳/۲۰',
    category: 'کمپینگ',
    readTime: '۷ دقیقه',
  },
  {
    slug: 'backpack-guide',
    title: 'چگونه کوله پشتی مناسب انتخاب کنیم؟',
    excerpt: 'کوله پشتی خوب باید راحت، بادوام و متناسب با نیازهای شما باشد.',
    image: '/images/Home/TaHome.png',
    author: 'سارا رضایی',
    date: '۱۴۰۳/۰۳/۰۵',
    category: 'تجهیزات',
    readTime: '۴ دقیقه',
  },
  {
    slug: 'desert-hiking',
    title: 'کوهنوردی در کویر: چه ببریم؟',
    excerpt: 'کویر محیطی خاص است که نیاز به تجهیزات و آمادگی متفاوتی دارد.',
    image: '/images/Products/5.png',
    author: 'محمد کریمی',
    date: '۱۴۰۳/۰۲/۱۸',
    category: 'کوهنوردی',
    readTime: '۶ دقیقه',
  },
];

const categories = ['همه', 'کمپینگ', 'کوهنوردی', 'تجهیزات'];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('همه');
  const [query, setQuery] = useState('');
  const featuredPost = posts[0];
  const filteredPosts = useMemo(
    () =>
      posts.filter((post) => {
        const matchesCategory =
          activeCategory === 'همه' || post.category === activeCategory;
        const searchText = `${post.title} ${post.excerpt} ${post.category}`;
        return matchesCategory && searchText.includes(query.trim());
      }),
    [activeCategory, query],
  );

  return (
    <div className="bg-bg min-h-screen pb-20">
      <PageRouter routes={[{ title: 'وبلاگ', link: '/blog' }]} />
      <section className="relative overflow-hidden bg-[#123d34] px-4 pt-12 pb-16 text-white sm:pt-16 sm:pb-20">
        <div className="border-primary/25 absolute -top-32 -left-20 h-72 w-72 rounded-full border-28" />
        <div className="border-auxiliary/10 absolute right-1/3 -bottom-40 h-80 w-80 rounded-full border-34" />
        <div className="relative mx-auto max-w-6xl">
          <p className="text-primary_light mb-3 text-sm font-medium">
            مجله کمپینک
          </p>
          <h1 className="max-w-2xl text-3xl leading-tight font-extrabold sm:text-5xl">
            ایده‌هایی برای سفرهای بهتر و سبک‌تر
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-8 text-white/70 sm:text-base">
            راهنمای خرید تجهیزات، تجربه‌های سفر و نکته‌هایی که قبل از هر
            ماجراجویی به آن‌ها نیاز داری.
          </p>
          <div className="mt-8 flex max-w-xl items-center gap-3 rounded-2xl border border-white/15 bg-white/10 p-2 backdrop-blur-sm">
            <Search size={19} className="mr-2 shrink-0 text-white/60" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="جست‌وجو در مقاله‌ها"
              className="min-w-0 flex-1 bg-transparent px-1 py-2 text-sm text-white outline-none placeholder:text-white/45"
              aria-label="جست‌وجو در مقاله‌ها"
            />
            <span className="hidden rounded-xl bg-white px-3 py-2 text-xs font-bold text-[#123d34] sm:block">
              {posts.length} مقاله
            </span>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-4">
        <section className="border-neutral_normal -mt-8 grid overflow-hidden rounded-3xl border bg-white shadow-xl shadow-[#123d34]/10 lg:grid-cols-[1.05fr_1fr]">
          <div className="relative min-h-64 overflow-hidden lg:min-h-80">
            <Image
              src={featuredPost.image}
              alt={featuredPost.title}
              fill
              priority
              className="object-cover transition duration-700 hover:scale-105"
            />
            <span className="bg-auxiliary text-text absolute top-5 right-5 rounded-full px-3 py-1.5 text-xs font-bold">
              پیشنهاد سردبیر
            </span>
          </div>
          <div className="flex flex-col justify-center p-6 sm:p-9">
            <div className="text-primary mb-4 flex items-center gap-2 text-xs font-bold">
              <span>{featuredPost.category}</span>
              <span className="bg-neutral_dark h-1 w-1 rounded-full" />
              <span>خواندنی‌ترین مطلب</span>
            </div>
            <h2 className="text-text text-2xl leading-relaxed font-extrabold sm:text-3xl">
              {featuredPost.title}
            </h2>
            <p className="text-neutral_dark mt-3 text-sm leading-7">
              {featuredPost.excerpt}
            </p>
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="bg-primary mt-6 inline-flex w-fit items-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-white transition hover:bg-[#5a9a63]"
            >
              مطالعه مقاله <ArrowLeft size={17} />
            </Link>
          </div>
        </section>

        <section className="mt-12">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-primary mb-1 text-sm font-medium">
                مطالب جدید
              </p>
              <h2 className="text-text text-2xl font-extrabold">
                چیزی برای خواندن پیدا کن
              </h2>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`shrink-0 rounded-xl px-4 py-2 text-sm font-bold transition ${activeCategory === category ? 'bg-primary text-white shadow-sm' : 'border-neutral_normal text-neutral_dark hover:border-primary/40 hover:text-primary border bg-white'}`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          {filteredPosts.length ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <ArticleCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="border-neutral_normal rounded-3xl border border-dashed bg-white px-6 py-14 text-center">
              <Search className="text-neutral_dark/50 mx-auto" size={28} />
              <p className="text-text mt-4 font-bold">
                مقاله‌ای با این مشخصات پیدا نشد
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setActiveCategory('همه');
                }}
                className="text-primary mt-3 text-sm font-bold"
              >
                پاک کردن فیلترها
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

function ArticleCard({ post }: { post: (typeof posts)[number] }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group border-neutral_normal hover:border-primary/30 flex h-full flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#123d34]/10"
    >
      <div className="relative h-52 overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="text-primary absolute top-4 right-4 rounded-lg bg-white/90 px-3 py-1.5 text-xs font-bold backdrop-blur">
          {post.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="text-neutral_dark mb-3 flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1">
            <UserRound size={13} /> {post.author}
          </span>
          <span className="flex items-center gap-1">
            <Clock3 size={13} /> {post.readTime}
          </span>
        </div>
        <h3 className="text-text group-hover:text-primary line-clamp-2 text-lg leading-8 font-extrabold transition">
          {post.title}
        </h3>
        <p className="text-neutral_dark mt-2 line-clamp-2 text-sm leading-7">
          {post.excerpt}
        </p>
        <div className="border-neutral_normal mt-auto flex items-center justify-between border-t pt-4">
          <span className="text-neutral_dark flex items-center gap-1 text-xs">
            <CalendarDays size={13} /> {post.date}
          </span>
          <span className="text-primary flex items-center gap-1 text-sm font-bold">
            بخوانید{' '}
            <ArrowLeft
              size={15}
              className="transition group-hover:-translate-x-1"
            />
          </span>
        </div>
      </div>
    </Link>
  );
}
