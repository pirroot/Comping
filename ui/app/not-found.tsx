import image404 from '@/public/images/404.png';
import Image from 'next/image';
import Link from 'next/link';
import PageRouter from '../components/PageRouter/PageRouter';
import { Home } from 'lucide-react';

export default function NotFound() {
  // const routes: IPageRouterDto[] = [{ link: '404', title: 'صفحه یافت نشد' }];

  return (
    <>
      {/* <PageRouter routs={routes} /> */}
      <section className="space-y-8 container mx-auto my-20 text-center items-center px-4">
        {/* <Image
          src={image404}
          alt="not found page - image"
          className="mx-auto max-w-100 w-full"
          priority
        /> */}

        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          اوه! صفحه مورد نظر یافت نشد
        </h1>

        <p className="text-gray-500 text-base max-w-md mx-auto">
          ممکن است این صفحه وجود نداشته باشد، حذف شده باشد یا آدرس اشتباه وارد کرده‌اید.
        </p>

        <div className="pt-8 text-md text-gray-400">
          <span>خطای 404 صفحه پیدا نشد</span>
        </div>
        <div className="flex flex-wrap gap-4 justify-center pt-4">
          <Link
            href="/"
            className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-lg font-bold border transition-colors"
          >
            <Home size={18} />
            بازگشت به خانه
          </Link>
        </div>
      </section>
    </>
  );
}
