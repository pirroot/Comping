
import Image from 'next/image';
import Link from 'next/link';
import { FaCheckCircle, FaClock, FaShieldAlt, FaHeadset, FaHiking } from 'react-icons/fa';
import { FaMountain, FaCampground } from 'react-icons/fa6';

export const metadata = {
  title: 'درباره ما | تجهیزات حرفه‌ای ماجراجویی',
  description:
    'با تیم ما آشنا شوید. ما بهترین تجهیزات ماجراجویی و کمپینگ را با بالاترین کیفیت ارائه می‌دهیم.',
};

const features = [
  {
    icon: FaCheckCircle,
    title: 'کیفیت تضمینی',
    description: 'همه محصولات ما با بهترین برندهای جهانی و با ضمانت اصالت کالا عرضه می‌شوند.',
  },
  {
    icon: FaShieldAlt,
    title: 'امنیت خرید',
    description: 'خرید امن با گارانتی بازگشت وجه و پشتیبانی ۲۴ ساعته.',
  },
  {
    icon: FaClock,
    title: 'ارسال سریع',
    description: 'ارسال فوری سفارشات در کمترین زمان ممکن به سراسر کشور.',
  },
  {
    icon: FaHeadset,
    title: 'پشتیبانی حرفه‌ای',
    description: 'تیم پشتیبانی ما همیشه آماده پاسخگویی به سوالات شماست.',
  },
];

const values = [
  {
    icon: FaMountain,
    title: 'عشق به طبیعت',
    description: 'ما به طبیعت عشق می‌ورزیم و سعی می‌کنیم با محصولات خود تجربه‌ای پایدار ایجاد کنیم',
  },
  {
    icon: FaCampground,
    title: 'کیفیت برتر',
    description:
      'ما فقط محصولاتی را ارائه می‌دهیم که خودمان به آنها اعتماد داریم و از آنها استفاده می‌کنیم',
  },
  {
    icon: FaHiking,
    title: 'ماجراجویی پایدار',
    description: 'ما به دنبال ایجاد تجربه‌های ماندگار و پایدار برای همه ماجراجویان هستیم',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative bg-bg">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            درباره <span className="text-auxiliary">ما</span>
          </h1>
          <p className="text-xl max-w-2xl mx-auto opacity-90">
            داستان ما از عشق به طبیعت و ماجراجویی آغاز شد
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                داستان <span className="text-primary">ما</span>
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  <span className="font-bold text-primary">تجهیزات حرفه‌ای ماجراجویی</span> در سال
                  ۱۳۹۸ با هدف ارائه بهترین و باکیفیت‌ترین تجهیزات کمپینگ، کوهنوردی و ماجراجویی تأسیس
                  شد.
                </p>
                <p>
                  ما معتقدیم هر سفر و ماجراجویی شایسته بهترین تجهیزات است. به همین دلیل، محصولات خود
                  را از معتبرترین برندهای جهانی انتخاب کرده و با تضمین کیفیت به شما ارائه می‌دهیم.
                </p>
                <p>
                  تیم ما متشکل از علاقه‌مندان به طبیعت و حرفه‌ای‌های با تجربه است که خودشان از
                  محصولات استفاده کرده و بهترین‌ها را برای شما انتخاب می‌کنند.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/products"
                  className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-secondary hover:shadow-lg transition-all duration-300"
                >
                  مشاهده محصولات
                </Link>
                <Link
                  href="/contact"
                  className="border-2 border-primary text-primary px-6 py-3 rounded-lg font-medium hover:bg-primary hover:text-white transition-all duration-300"
                >
                  تماس با ما
                </Link>
              </div>
            </div>
            <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <Image
                src="/images/about/story.jpg"
                alt="داستان تجهیزات حرفه‌ای ماجراجویی"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-neutral_light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">
              چرا <span className="text-primary">ما</span> را انتخاب کنید؟
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              ما به کیفیت، امنیت و رضایت شما متعهد هستیم
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center group"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <f.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{f.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">
              ارزش‌های <span className="text-primary">ما</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {values.map((v, i) => (
              <div key={i} className="text-center group">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  <v.icon className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{v.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">آماده شروع ماجراجویی جدید هستید؟</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            با ما همراه شوید و بهترین تجهیزات را برای سفرهای خود تهیه کنید
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="bg-white text-primary px-8 py-3 rounded-lg font-bold hover:bg-neutral_light hover:shadow-lg transition-all duration-300"
            >
              مشاهده محصولات
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-primary transition-all duration-300"
            >
              تماس با ما
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
