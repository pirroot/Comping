import Link from 'next/link';
import Image from 'next/image';
import { IProductDto } from '@/src/types/IProductDto';
import { setProductOffer } from '@/src/utils/setProductOffer';
import { toNumberFa } from '@/src/utils/toNumberFa';
import TomanSvg from '@/public/svg/toman.svg';
import { FiShoppingCart } from 'react-icons/fi';
import { title } from 'process';

export default function ProductCart({
  name,
  slug,
  price,
  images,
  offer_percent,
  is_offer,
  category,
}: IProductDto) {
  const finalPrice = is_offer
    ? setProductOffer(price, offer_percent as number)
    : price;

  return (
    <Link
      href={`/store/${slug}`}
      title={title}
      className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
    >
      <div className="relative bg-gray-50 overflow-hidden aspect-square">
        {is_offer && offer_percent && (
          <span className="absolute top-3 right-3 z-10 bg-[#c83b3b] text-white text-xs font-bold rounded-full px-2.5 py-1 shadow-md">
            {toNumberFa(offer_percent, false)}٪
          </span>
        )}
        <Image
          src={images[0]}
          alt={name}
          width={300}
          height={300}
          quality={90}
          className="rounded-2xl transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-col flex-1 p-4 gap-2 text-right">
        <span className="text-xs text-[#c83b3b] bg-red-50 rounded-full px-2 py-0.5 w-fit self-end font-medium">
          {category.name}
        </span>

        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 leading-6">
          {name}
        </h3>

        <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
          <div className="flex flex-col items-end">
            {is_offer && (
              <span className="text-xs line-through text-gray-400 mb-0.5">
                {toNumberFa(price)}
              </span>
            )}
            <span className="flex items-center gap-1 text-base font-bold text-gray-900">
              {toNumberFa(finalPrice)}
              <Image src={TomanSvg} alt="تومان" width={15} height={15} />
            </span>
          </div>

          <button
            // onClick={(e) => e.preventDefault()}
            className="flex items-center gap-1.5 bg-[#c83b3b] hover:bg-[#a82f2f] text-white text-xs font-medium px-3 py-2 rounded-xl transition-colors duration-200"
          >
            <FiShoppingCart size={14} />
            افزودن
          </button>
        </div>
      </div>
    </Link>
  );
}