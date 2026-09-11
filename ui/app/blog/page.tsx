'use client';

import PageRouter from '@/components/PageRouter/PageRouter';
import { ArrowLeft, CalendarDays, Clock3, Search, UserRound } from 'lucide-react';
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
    excerpt: 'کمپینگ در زمستان چالش‌های خاص خود را دارد. با این نکات سفر گرم و ایمنی داشته باشید.',
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
        const matchesCategory = activeCategory === 'همه' || post.category === activeCategory;
        const searchText = `${post.title} ${post.excerpt} ${post.category}`;
        return matchesCategory && searchText.includes(query.trim());
      }),
    [activeCategory, query]
  );

  return (
    <div className="min-h-screen bg-bg pb-20">
      <PageRouter routes={[{ title: 'وبلاگ', link: '/blog' }]} />
      <section className="relative overflow-hidden bg-[#123d34] px-4 pb-16 pt-12 text-white sm:pb-20 sm:pt-16">
        <div className="absolute -left-20 -top-32 h-72 w-72 rounded-full border-28 border-primary/25" />
        <div className="absolute -bottom-40 right-1/3 h-80 w-80 rounded-full border-34 border-auxiliary/10" />
        <div className="relative mx-auto max-w-6xl">
          <p className="mb-3 text-sm font-medium text-primary_light">مجله کمپینک</p>
          <h1 className="max-w-2xl text-3xl font-extrabold leading-tight sm:text-5xl">
            ایده‌هایی برای سفرهای بهتر و سبک‌تر
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-8 text-white/70 sm:text-base">
            راهنمای خرید تجهیزات، تجربه‌های سفر و نکته‌هایی که قبل از هر ماجراجویی به آن‌ها نیاز
            داری.
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
        <section className="-mt-8 grid overflow-hidden rounded-3xl border border-neutral_normal bg-white shadow-xl shadow-[#123d34]/10 lg:grid-cols-[1.05fr_1fr]">
          <div className="relative min-h-64 overflow-hidden lg:min-h-80">
            <Image
              src={featuredPost.image}
              alt={featuredPost.title}
              fill
              priority
              className="object-cover transition duration-700 hover:scale-105"
            />
            <span className="absolute right-5 top-5 rounded-full bg-auxiliary px-3 py-1.5 text-xs font-bold text-text">
              پیشنهاد سردبیر
            </span>
          </div>
          <div className="flex flex-col justify-center p-6 sm:p-9">
            <div className="mb-4 flex items-center gap-2 text-xs font-bold text-primary">
              <span>{featuredPost.category}</span>
              <span className="h-1 w-1 rounded-full bg-neutral_dark" />
              <span>خواندنی‌ترین مطلب</span>
            </div>
            <h2 className="text-2xl font-extrabold leading-relaxed text-text sm:text-3xl">
              {featuredPost.title}
            </h2>
            <p className="mt-3 text-sm leading-7 text-neutral_dark">{featuredPost.excerpt}</p>
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="mt-6 inline-flex w-fit items-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-white transition hover:bg-[#5a9a63]"
            >
              مطالعه مقاله <ArrowLeft size={17} />
            </Link>
          </div>
        </section>

        <section className="mt-12">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-1 text-sm font-medium text-primary">مطالب جدید</p>
              <h2 className="text-2xl font-extrabold text-text">چیزی برای خواندن پیدا کن</h2>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`shrink-0 rounded-xl px-4 py-2 text-sm font-bold transition ${activeCategory === category ? 'bg-primary text-white shadow-sm' : 'border border-neutral_normal bg-white text-neutral_dark hover:border-primary/40 hover:text-primary'}`}
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
            <div className="rounded-3xl border border-dashed border-neutral_normal bg-white px-6 py-14 text-center">
              <Search className="mx-auto text-neutral_dark/50" size={28} />
              <p className="mt-4 font-bold text-text">مقاله‌ای با این مشخصات پیدا نشد</p>
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setActiveCategory('همه');
                }}
                className="mt-3 text-sm font-bold text-primary"
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
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-neutral_normal bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-[#123d34]/10"
    >
      <div className="relative h-52 overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute right-4 top-4 rounded-lg bg-white/90 px-3 py-1.5 text-xs font-bold text-primary backdrop-blur">
          {post.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-center gap-3 text-xs text-neutral_dark">
          <span className="flex items-center gap-1">
            <UserRound size={13} /> {post.author}
          </span>
          <span className="flex items-center gap-1">
            <Clock3 size={13} /> {post.readTime}
          </span>
        </div>
        <h3 className="line-clamp-2 text-lg font-extrabold leading-8 text-text transition group-hover:text-primary">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-7 text-neutral_dark">{post.excerpt}</p>
        <div className="mt-auto flex items-center justify-between border-t border-neutral_normal pt-4">
          <span className="flex items-center gap-1 text-xs text-neutral_dark">
            <CalendarDays size={13} /> {post.date}
          </span>
          <span className="flex items-center gap-1 text-sm font-bold text-primary">
            بخوانید <ArrowLeft size={15} className="transition group-hover:-translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}
