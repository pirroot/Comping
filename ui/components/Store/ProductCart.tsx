import TomanSvg from '@/public/svg/toman.svg';
import { IProductDto } from '@/src/types/IProductDto';
import { setProductOffer } from '@/src/utils/setProductOffer';
import { toNumberFa } from '@/src/utils/toNumberFa';
import Image from 'next/image';
import Link from 'next/link';
import { FiShoppingCart } from 'react-icons/fi';

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
      href={`/products/${slug}`}
      title={name}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        {is_offer && offer_percent && (
          <span className="absolute top-3 right-3 z-10 rounded-full bg-[#c83b3b] px-2.5 py-1 text-xs font-bold text-white shadow-md">
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

      <div className="flex flex-1 flex-col gap-2 p-4 text-right">
        <span className="w-fit self-end rounded-full bg-red-50 px-2 py-0.5 text-xs font-medium text-[#c83b3b]">
          {category.name}
        </span>

        <h3 className="line-clamp-2 text-sm leading-6 font-semibold text-gray-800">
          {name}
        </h3>

        <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-3">
          <div className="flex flex-col items-end">
            {is_offer && (
              <span className="mb-0.5 text-xs text-gray-400 line-through">
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
            className="flex items-center gap-1.5 rounded-xl bg-[#c83b3b] px-3 py-2 text-xs font-medium text-white transition-colors duration-200 hover:bg-[#a82f2f]"
          >
            <FiShoppingCart size={14} />
            افزودن
          </button>
        </div>
      </div>
    </Link>
  );
}
