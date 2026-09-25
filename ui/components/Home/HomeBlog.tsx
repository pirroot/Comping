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
          <p className="text-primary mb-2 text-sm font-medium">مجله کمپینک</p>
          <h2 className="text-text text-2xl font-extrabold md:text-3xl">
            لایف‌هک و نکات کمپینگ
          </h2>
        </div>
        <Link
          href="/blog"
          className="border-neutral_normal text-primary hover:border-primary/40 hidden items-center gap-2 rounded-xl border bg-white px-4 py-2.5 text-sm font-bold transition sm:inline-flex"
        >
          همه مقاله‌ها <ArrowLeft size={16} />
        </Link>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <Link href={`/blog/${mainPost.id}`} className="group block h-full">
            <div className="border-neutral_normal flex h-full flex-col overflow-hidden rounded-3xl border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="bg-neutral_light relative h-64 w-full overflow-hidden sm:h-72">
                <Image
                  src={mainPost.image}
                  alt={mainPost.title}
                  fill
                  className="object-cover"
                />
                <span className="text-primary absolute top-5 right-5 rounded-lg bg-white/90 px-3 py-1.5 text-xs font-bold">
                  {mainPost.category}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-text group-hover:text-primary text-xl leading-8 font-extrabold transition">
                  {mainPost.title}
                </h3>
                <p className="text-neutral_dark mt-2 line-clamp-2 text-sm leading-7">
                  {mainPost.excerpt}
                </p>
                <div className="border-neutral_normal mt-auto flex items-center justify-between border-t pt-4">
                  <span className="text-neutral_dark flex items-center gap-1 text-xs">
                    <CalendarDays size={13} /> {mainPost.date}
                  </span>
                  <span className="text-primary flex items-center gap-1 text-sm font-bold">
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
              className="group border-neutral_normal hover:border-primary/30 flex min-h-30 items-center gap-4 rounded-2xl border bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="bg-neutral_light relative h-24 w-28 shrink-0 overflow-hidden rounded-xl">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-primary text-xs font-bold">
                  {post.category}
                </span>
                <h3 className="text-text group-hover:text-primary mt-1 line-clamp-2 text-sm leading-6 font-extrabold transition">
                  {post.title}
                </h3>
                <p className="text-neutral_dark mt-1 flex items-center gap-1 text-xs">
                  <Clock3 size={12} /> ۵ دقیقه مطالعه
                </p>
              </div>
              <ArrowLeft
                size={18}
                className="text-neutral_dark group-hover:text-primary shrink-0 transition group-hover:-translate-x-1"
              />
            </Link>
          ))}
        </div>
      </div>
      <Link
        href="/blog"
        className="text-primary flex items-center justify-center gap-2 text-sm font-bold sm:hidden"
      >
        مشاهده همه مقاله‌ها <ArrowLeft size={16} />
      </Link>
    </section>
  );
}
