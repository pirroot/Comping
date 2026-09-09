import Image from 'next/image';
import brand1 from '@/public/images/Bands/1 (1).png';
import brand2 from '@/public/images/Bands/1 (2).png';
import brand3 from '@/public/images/Bands/1 (3).png';
import brand4 from '@/public/images/Bands/1 (4).png';
import brand5 from '@/public/images/Bands/1 (5).png';
import brand6 from '@/public/images/Bands/1 (6).png';
import brand7 from '@/public/images/Bands/1 (7).png';
import brand8 from '@/public/images/Bands/1 (8).png';

const brands = [brand1, brand2, brand3, brand4, brand5, brand6, brand7, brand8];

export default function HomeBrands() {
  return (
    <section className="bg-primary_light py-12 md:py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-2xl md:text-3xl text-text mb-8 md:mb-10 font-bold">
          برند ها
        </h2>
        <div className="grid gap-6 md:gap-10 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="bg-bg rounded-2xl md:rounded-3xl p-4 md:p-5 flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <Image
                src={brand}
                alt={`برند ${index + 1}`}
                width={120}
                height={120}
                className=" object-contain"
                priority={index < 4}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
