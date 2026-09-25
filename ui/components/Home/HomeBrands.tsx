import brand1 from '@/public/images/Bands/1 (1).png';
import brand2 from '@/public/images/Bands/1 (2).png';
import brand3 from '@/public/images/Bands/1 (3).png';
import brand4 from '@/public/images/Bands/1 (4).png';
import brand5 from '@/public/images/Bands/1 (5).png';
import brand6 from '@/public/images/Bands/1 (6).png';
import brand7 from '@/public/images/Bands/1 (7).png';
import brand8 from '@/public/images/Bands/1 (8).png';
import Image from 'next/image';

const brands = [brand1, brand2, brand3, brand4, brand5, brand6, brand7, brand8];

export default function HomeBrands() {
  return (
    <section className="bg-bg px-4 py-10 md:py-14">
      <div className="container mx-auto">
        <div className="border-neutral_normal rounded-3xl border bg-white p-5 shadow-sm sm:p-7">
          <div className="border-neutral_normal mb-6 flex flex-wrap items-end justify-between gap-3 border-b pb-5">
            <div>
              <p className="text-primary mb-1 text-xs font-medium">
                انتخاب مطمئن
              </p>
              <h2 className="text-text text-lg font-extrabold sm:text-xl">
                برندهایی که به آن‌ها اعتماد داریم
              </h2>
            </div>
            <p className="text-neutral_dark max-w-xs text-xs leading-6">
              کیفیت را از برندهایی انتخاب کرده‌ایم که امتحانشان را پس داده‌اند.
            </p>
          </div>
          <div className="grid grid-cols-2 items-center gap-3 sm:grid-cols-4 lg:grid-cols-8 lg:gap-4">
            {brands.map((brand, index) => (
              <div
                key={index}
                className="border-neutral_normal hover:border-primary/30 hover:bg-primary_light/30 flex h-16 items-center justify-center rounded-2xl border bg-[#fbfcfb] px-3 opacity-75 transition duration-300 hover:opacity-100 sm:h-20"
              >
                <Image
                  src={brand}
                  alt={`برند ${index + 1}`}
                  width={90}
                  height={90}
                  className="h-10 w-full object-contain sm:h-12"
                  priority={index < 2}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
