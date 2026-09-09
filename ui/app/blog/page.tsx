import Image from 'next/image';
import Link from 'next/link';
import { FaCalendar, FaUser, FaArrowLeft } from 'react-icons/fa';

export const metadata = {
  title: 'وبلاگ | تجهیزات حرفه‌ای ماجراجویی',
  description: 'مقالات و راهنمایی‌های کاربردی درباره کمپینگ، کوهنوردی و ماجراجویی.',
};

const posts = [
  {
    slug: 'camping-essentials',
    title: '۱۰ وسیله ضروری برای کمپینگ',
    excerpt:
      'برای یک سفر کمپینگ موفق، داشتن تجهیزات مناسب حیاتی است. در این مقاله بهترین وسایل را معرفی می‌کنیم.',
    image: '/images/blog/camping.jpg',
    author: 'علی محمدی',
    date: '۱۴۰۳/۰۵/۱۲',
    category: 'کمپینگ',
  },
  {
    slug: 'hiking-tips',
    title: 'راهنمای کامل کوهنوردی برای مبتدی‌ها',
    excerpt:
      'اگر تازه به دنیای کوهنوردی وارد شدید، این راهنما به شما کمک می‌کند تا سفرهای امن‌تری داشته باشید.',
    image: '/images/blog/hiking.jpg',
    author: 'سارا رضایی',
    date: '۱۴۰۳/۰۴/۲۸',
    category: 'کوهنوردی',
  },
  {
    slug: 'best-tents',
    title: 'راهنمای خرید چادر مسافرتی',
    excerpt:
      'چادر مناسب باید سبک، ضد آب و بادوام باشد. در این مقاله بهترین گزینه‌ها را بررسی می‌کنیم.',
    image: '/images/blog/tent.jpg',
    author: 'محمد کریمی',
    date: '۱۴۰۳/۰۴/۱۵',
    category: 'تجهیزات',
  },
  {
    slug: 'winter-camping',
    title: 'نکات طلایی کمپینگ در زمستان',
    excerpt: 'کمپینگ در زمستان چالش‌های خاص خود را دارد. با این نکات سفر گرم و ایمنی داشته باشید.',
    image: '/images/blog/winter.jpg',
    author: 'علی محمدی',
    date: '۱۴۰۳/۰۳/۲۰',
    category: 'کمپینگ',
  },
  {
    slug: 'backpack-guide',
    title: 'چگونه کوله پشتی مناسب انتخاب کنیم؟',
    excerpt: 'کوله پشتی خوب باید راحت، بادوام و متناسب با نیازهای شما باشد.',
    image: '/images/blog/backpack.jpg',
    author: 'سارا رضایی',
    date: '۱۴۰۳/۰۳/۰۵',
    category: 'تجهیزات',
  },
  {
    slug: 'desert-hiking',
    title: 'کوهنوردی در کویر: چه ببریم؟',
    excerpt: 'کویر محیطی خاص است که نیاز به تجهیزات و آمادگی متفاوتی دارد.',
    image: '/images/blog/desert.jpg',
    author: 'محمد کریمی',
    date: '۱۴۰۳/۰۲/۱۸',
    category: 'کوهنوردی',
  },
];

const categories = ['همه', 'کمپینگ', 'کوهنوردی', 'تجهیزات'];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-bg py-20 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            وبلاگ <span className="text-auxiliary">ماجراجویی</span>
          </h1>
          <p className="text-xl max-w-2xl mx-auto opacity-90">
            مقالات و راهنمایی‌های کاربردی برای سفرهای شما
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {categories.map((cat, i) => (
              <button
                key={i}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  i === 0
                    ? 'bg-primary text-white'
                    : 'bg-neutral_light text-gray-700 hover:bg-primary hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, i) => (
              <Link key={i} href={`/blog/${post.slug}`} className="group block">
                <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-4 right-4 bg-primary text-white text-xs px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <FaUser className="w-3 h-3" /> {post.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaCalendar className="w-3 h-3" /> {post.date}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{post.excerpt}</p>
                    <span className="inline-flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all">
                      ادامه مطلب <FaArrowLeft className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
