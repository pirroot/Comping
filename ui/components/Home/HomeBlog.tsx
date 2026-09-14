import { ArrowLeft, CalendarDays, Clock3 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const blogPosts = [
  {
    id: 'camping-essentials',
    title: '۱۰ نکته ضروری برای کمپینگ در طبیعت',
    excerpt: 'راهنمای کامل برای یک تجربه کمپینگ امن و لذت‌بخش در دل طبیعت',
    image: '/images/Home/hero.webp',
    date: '۲۸ تیر ۱۴۰۵',
    category: 'راهنمای کمپینگ',
  },
  {
    id: 'camping-equipment',
    title: 'بهترین تجهیزات کمپینگ برای مبتدیان',
    excerpt: 'آشنایی با وسایل ضروری که هر کمپر مبتدی باید داشته باشد',
    image: '/images/Home/TaHome.png',
    date: '۲۰ تیر ۱۴۰۵',
    category: 'تجهیزات',
  },
  {
    id: 'camping-mistakes',
    title: '۵ اشتباه رایج در کمپینگ',
    excerpt: 'با این اشتباهات آشنا شوید تا کمپینگ بهتری داشته باشید',
    image: '/images/Home/hero.webp',
    date: '۱۵ تیر ۱۴۰۵',
    category: 'راهنمای کمپینگ',
  },
  {
    id: 'camping-food',
    title: 'غذاهای ساده برای کمپینگ',
    excerpt: 'آموزش تهیه غذاهای خوشمزه و ساده در طبیعت',
    image: '/images/Home/TaHome.png',
    date: '۱۰ تیر ۱۴۰۵',
    category: 'تغذیه',
  },
  {
    id: 'camping-food-guide',
    title: 'غذاهای ساده برای کمپینگ',
    excerpt: 'آموزش تهیه غذاهای خوشمزه و ساده در طبیعت',
    image: '/images/Home/hero.webp',
    date: '۱۰ تیر ۱۴۰۵',
    category: 'تغذیه',
  },
];

export default function HomeBlog() {
  const mainPost = blogPosts[0];
  const otherPosts = blogPosts.slice(1, 4);

  return (
    <section className="container mx-auto space-y-8 px-4 py-14 md:py-20">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-sm font-medium text-primary">مجله کمپینک</p>
          <h2 className="text-2xl font-extrabold text-text md:text-3xl">لایف‌هک و نکات کمپینگ</h2>
        </div>
        <Link
          href="/blog"
          className="hidden items-center gap-2 rounded-xl border border-neutral_normal bg-white px-4 py-2.5 text-sm font-bold text-primary transition hover:border-primary/40 sm:inline-flex"
        >
          همه مقاله‌ها <ArrowLeft size={16} />
        </Link>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <Link href={`/blog/${mainPost.id}`} className="group block h-full">
            <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-neutral_normal bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="relative h-64 w-full overflow-hidden bg-neutral_light sm:h-72">
                <Image src={mainPost.image} alt={mainPost.title} fill className="object-cover" />
                <span className="absolute right-5 top-5 rounded-lg bg-white/90 px-3 py-1.5 text-xs font-bold text-primary">
                  {mainPost.category}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-extrabold leading-8 text-text transition group-hover:text-primary">
                  {mainPost.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm leading-7 text-neutral_dark">
                  {mainPost.excerpt}
                </p>
                <div className="mt-auto flex items-center justify-between border-t border-neutral_normal pt-4">
                  <span className="flex items-center gap-1 text-xs text-neutral_dark">
                    <CalendarDays size={13} /> {mainPost.date}
                  </span>
                  <span className="flex items-center gap-1 text-sm font-bold text-primary">
                    ادامه مطلب <ArrowLeft size={15} />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div className="grid gap-4">
          {otherPosts.map((post) => (
            <Link
              href={`/blog/${post.id}`}
              key={post.id}
              className="group flex min-h-30 items-center gap-4 rounded-2xl border border-neutral_normal bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
            >
              <div className="relative h-24 w-28 shrink-0 overflow-hidden rounded-xl bg-neutral_light">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-xs font-bold text-primary">{post.category}</span>
                <h3 className="mt-1 line-clamp-2 text-sm font-extrabold leading-6 text-text transition group-hover:text-primary">
                  {post.title}
                </h3>
                <p className="mt-1 flex items-center gap-1 text-xs text-neutral_dark">
                  <Clock3 size={12} /> ۵ دقیقه مطالعه
                </p>
              </div>
              <ArrowLeft
                size={18}
                className="shrink-0 text-neutral_dark transition group-hover:-translate-x-1 group-hover:text-primary"
              />
            </Link>
          ))}
        </div>
      </div>
      <Link
        href="/blog"
        className="flex items-center justify-center gap-2 text-sm font-bold text-primary sm:hidden"
      >
        مشاهده همه مقاله‌ها <ArrowLeft size={16} />
      </Link>
    </section>
  );
}
