import { ProductType } from '@/lib/types/Product.type';
import Image from 'next/image';
import { Suspense } from 'react';
import { FaShoppingCart, FaStar, FaFilter } from 'react-icons/fa';

export const metadata = {
  title: 'محصولات | تجهیزات حرفه‌ای ماجراجویی',
  description: 'مشاهده و خرید بهترین تجهیزات کمپینگ، کوهنوردی و ماجراجویی با قیمت مناسب.',
};

const products: ProductType[] = [];

const categories = ['همه', 'چادر', 'کوله پشتی', 'کیسه خواب', 'پوشاک', 'ابزار', 'آشپزی'];

function formatPrice(price: number) {
  return price.toLocaleString('fa-IR') + ' تومان';
}

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-bg py-20 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            محصولات <span className="text-auxiliary">ما</span>
          </h1>
          <p className="text-xl max-w-2xl mx-auto opacity-90">
            بهترین تجهیزات ماجراجویی با ضمانت اصالت
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center gap-3 mb-10">
            <FaFilter className="w-5 h-5 text-gray-500" />
            {categories.map((cat, i) => (
              <button
                key={i}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  i === 0
                    ? 'bg-primary text-white'
                    : 'bg-neutral_light text-gray-700 hover:bg-primary hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Suspense fallback={'loading...'}>
              {products.map((product: ProductType) => (
                <div
                  key={product.id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {product.badge && (
                      <span
                        className={`absolute top-3 right-3 text-white text-xs px-3 py-1 rounded-full font-medium ${
                          product.badge === 'تخفیف'
                            ? 'bg-red-500'
                            : product.badge === 'جدید'
                              ? 'bg-green-500'
                              : 'bg-primary'
                        }`}
                      >
                        {product.badge}
                      </span>
                    )}
                    {product.oldPrice && (
                      <span className="absolute top-3 left-3 bg-gray-900/80 text-white text-xs px-2 py-1 rounded">
                        {Math.round((1 - product.price / product.oldPrice) * 100)}% تخفیف
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <span className="text-xs text-gray-500">{product.category}</span>
                    <h3 className="font-bold text-lg mt-1 mb-2 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-1 mb-3">
                      <FaStar className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm text-gray-600">{product.rating}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-bold text-primary text-lg">
                          {formatPrice(product.price)}
                        </span>
                        {product.oldPrice && (
                          <span className="text-gray-400 text-sm line-through mr-2">
                            {formatPrice(product.oldPrice)}
                          </span>
                        )}
                      </div>
                      <button className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center hover:bg-secondary hover:shadow-lg transition-all duration-300">
                        <FaShoppingCart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </Suspense>
          </div>
        </div>
      </section>
    </div>
  );
}
