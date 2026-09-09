import { MoveLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const blogPosts = [
  {
    id: 1,
    title: '۱۰ نکته ضروری برای کمپینگ در طبیعت',
    excerpt: 'راهنمای کامل برای یک تجربه کمپینگ امن و لذت‌بخش در دل طبیعت',
    image: '/images/blog/camping-tips.jpg',
    date: '۲۸ تیر ۱۴۰۵',
    category: 'راهنمای کمپینگ',
  },
  {
    id: 2,
    title: 'بهترین تجهیزات کمپینگ برای مبتدیان',
    excerpt: 'آشنایی با وسایل ضروری که هر کمپر مبتدی باید داشته باشد',
    image: '/images/blog/equipment.jpg',
    date: '۲۰ تیر ۱۴۰۵',
    category: 'تجهیزات',
  },
  {
    id: 3,
    title: '۵ اشتباه رایج در کمپینگ',
    excerpt: 'با این اشتباهات آشنا شوید تا کمپینگ بهتری داشته باشید',
    image: '/images/blog/mistakes.jpg',
    date: '۱۵ تیر ۱۴۰۵',
    category: 'راهنمای کمپینگ',
  },
  {
    id: 4,
    title: 'غذاهای ساده برای کمپینگ',
    excerpt: 'آموزش تهیه غذاهای خوشمزه و ساده در طبیعت',
    image: '/images/blog/food.jpg',
    date: '۱۰ تیر ۱۴۰۵',
    category: 'تغذیه',
  },
  {
    id: 5,
    title: 'غذاهای ساده برای کمپینگ',
    excerpt: 'آموزش تهیه غذاهای خوشمزه و ساده در طبیعت',
    image: '/images/blog/food.jpg',
    date: '۱۰ تیر ۱۴۰۵',
    category: 'تغذیه',
  },
];

export default function HomeBlog() {
  const mainPost = blogPosts[0];
  const otherPosts = blogPosts.slice(1, 4);

  return (
    <section className="container mx-auto px-4 py-20 space-y-10">
      <div className="flex justify-center items-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">لایف هک و نکات کمپینگ</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mx-20">
        <div className="lg:col-span-1">
          <Link href={`/blog/${mainPost.id}`}>
            <div className="flex flex-col ring-1 ring-neutral-200 bg-white rounded-4xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
              <div className="relative h-64 w-full bg-gray-200">
                <Image src={mainPost.image} alt={mainPost.title} fill className="object-cover" />
              </div>
              <div className="p-6 flex-1">
                <span className="bg-primary text-white text-xs px-3 py-1 rounded-full inline-block mb-3">
                  {mainPost.category}
                </span>
                <h3 className="text-xl font-bold mb-3 line-clamp-2 text-gray-800">
                  {mainPost.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{mainPost.excerpt}</p>
                <p className="text-xs text-gray-400">{mainPost.date}</p>
              </div>
            </div>
          </Link>
        </div>

        <div className="lg:col-span-1 grid gap-10">
          {otherPosts.map((post) => (
            <Link href={`/blog/${post.id}`} key={post.id}>
              <div className="flex items-center justify-between p-5 ring-1 ring-neutral-200 bg-white rounded-4xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex-1 min-w-0">
                  <span className="bg-primary text-white text-xs px-3 py-1 rounded-full inline-block mb-2">
                    {post.category}
                  </span>
                  <h3 className="text-base font-bold mb-2 line-clamp-2 text-gray-800">
                    {post.title}
                  </h3>
                  <p className="text-xs text-gray-400">{post.date}</p>
                </div>
                <MoveLeft
                  size={34}
                  className="p-1.5 rounded-2xl ring-1 ring-neutral-200 shrink-0 mr-4 text-gray-600 hover:text-primary transition-colors"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
