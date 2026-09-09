import { AiOutlineHistory } from 'react-icons/ai';
import { FiShield } from 'react-icons/fi';
import { BsTruck } from 'react-icons/bs';
import { HiOutlineCreditCard } from 'react-icons/hi2';
import { ElementType } from 'react';

type FeatureItem = {
  icon: ElementType;
  title: string;
  description: string;
};

const features: FeatureItem[] = [
  {
    icon: HiOutlineCreditCard,
    title: 'پرداخت آنلاین',
    description: 'پرداخت امن توسط درگاه به پرداخت ملت، زرین پال و آسان پرداخت',
  },
  {
    icon: BsTruck,
    title: 'ارسال سریع و رایگان',
    description: 'ارسال رایگان توسط پست در سریعترین زمان ممکن به سراسر ایران',
  },
  {
    icon: FiShield,
    title: 'تضمین کیفیت محصول',
    description: 'با افتخار ساخته شده با هنر دست بچه‌های ایران',
  },
  {
    icon: AiOutlineHistory,
    title: 'ضمانت بازگشت وجه',
    description: 'در صورت عدم رضایت از محصول تا ۲۴ ساعت پس از تحویل',
  },
];

export default function ProductOrderTracking() {
  return (
    <div className="container mx-auto grid grid-cols-4 gap-6 max-lg:grid-cols-2 max-md:grid-cols-1">
      {features.map(({ icon: Icon, title, description }) => (
        <div
          key={title}
          className="bg-white col-span-1 shadow-sm p-6 border border-gray-100 rounded-xl flex gap-4 items-center hover:border-red-400 hover:shadow-md cursor-pointer transition-all duration-300"
        >
          <span className="p-4 rounded-xl bg-red-50 shrink-0">
            <Icon size={32} className="text-red-700" />
          </span>
          <div className="text-right space-y-1">
            <h5 className="text-base font-semibold text-gray-800">{title}</h5>
            <p className="text-xs text-gray-500 leading-relaxed">{description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}