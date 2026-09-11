'use client';

import PageRouter from '@/components/PageRouter/PageRouter';
import {
  Heart,
  PackageSearch,
  Search,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
  Star,
  X,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';

type SortOption = 'popular' | 'newest' | 'price-low' | 'price-high';
type Category = 'همه' | 'کمپینگ' | 'فروشگاهی' | 'اکسسوری';

type StoreProduct = {
  id: number;
  title: string;
  slug: string;
  category: Exclude<Category, 'همه'>;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
  description: string;
};

const categories: Category[] = ['همه', 'کمپینگ', 'فروشگاهی', 'اکسسوری'];

const products: StoreProduct[] = [
  {
    id: 1,
    title: 'چراغ کمپینگ شارژی مدل لایت',
    slug: 'camping-light',
    category: 'کمپینگ',
    price: 890000,
    oldPrice: 1090000,
    rating: 4.8,
    reviews: 24,
    image: '/images/Products/1.png',
    badge: 'پرفروش',
    description: 'نوردهی قدرتمند و شارژدهی طولانی برای شب‌های کمپ.',
  },
  {
    id: 2,
    title: 'صندلی تاشو سفری کمپینک',
    slug: 'folding-travel-chair',
    category: 'کمپینگ',
    price: 1450000,
    rating: 4.6,
    reviews: 18,
    image: '/images/Products/2.png',
    badge: 'جدید',
    description: 'سبک، مقاوم و جمع‌وجور برای سفر و طبیعت‌گردی.',
  },
  {
    id: 3,
    title: 'باکس نظم‌دهنده فروشگاهی',
    slug: 'store-organizer-box',
    category: 'فروشگاهی',
    price: 620000,
    rating: 4.7,
    reviews: 31,
    image: '/images/Products/3.png',
    description: 'راه‌حلی ساده برای چیدمان منظم و سریع کالاها.',
  },
  {
    id: 4,
    title: 'ترازو دیجیتال فروشگاهی',
    slug: 'digital-store-scale',
    category: 'فروشگاهی',
    price: 2380000,
    oldPrice: 2690000,
    rating: 4.9,
    reviews: 42,
    image: '/images/Products/4.png',
    badge: 'پیشنهاد ویژه',
    description: 'دقیق و سریع، مناسب استفاده روزمره در فروشگاه.',
  },
  {
    id: 5,
    title: 'کیف چندمنظوره ابزار',
    slug: 'multi-purpose-tool-bag',
    category: 'اکسسوری',
    price: 780000,
    rating: 4.5,
    reviews: 13,
    image: '/images/Products/5.png',
    description: 'فضای کافی برای ابزارهای ضروری، با بدنه‌ای مقاوم.',
  },
  {
    id: 6,
    title: 'قمقمه استیل سفری',
    slug: 'travel-steel-bottle',
    category: 'اکسسوری',
    price: 540000,
    rating: 4.4,
    reviews: 27,
    image: '/images/Products/6.png',
    description: 'بدنه استیل دوجداره برای حفظ دمای نوشیدنی.',
  },
  {
    id: 7,
    title: 'چراغ پیشخوان رومیزی',
    slug: 'counter-desk-light',
    category: 'فروشگاهی',
    price: 1120000,
    rating: 4.6,
    reviews: 9,
    image: '/images/Products/7.png',
    description: 'طراحی مینیمال برای نورپردازی کاربردی پیشخوان.',
  },
];

function formatPrice(price: number) {
  return `${price.toLocaleString('fa-IR')} تومان`;
}

export default function ProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get('search') ?? '';
  const [search, setSearch] = useState(initialSearch);
  const [activeCategory, setActiveCategory] = useState<Category>('همه');
  const [sort, setSort] = useState<SortOption>('popular');
  const [likedProducts, setLikedProducts] = useState<number[]>([]);

  const visibleProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase('fa');
    const filtered = products.filter((product) => {
      const matchesCategory = activeCategory === 'همه' || product.category === activeCategory;
      const matchesSearch =
        !normalizedSearch ||
        `${product.title} ${product.category} ${product.description}`
          .toLocaleLowerCase('fa')
          .includes(normalizedSearch);
      return matchesCategory && matchesSearch;
    });

    return [...filtered].sort((first, second) => {
      if (sort === 'price-low') return first.price - second.price;
      if (sort === 'price-high') return second.price - first.price;
      if (sort === 'newest') return second.id - first.id;
      return second.rating - first.rating;
    });
  }, [activeCategory, search, sort]);

  const updateSearch = (value: string) => {
    setSearch(value);
    const params = new URLSearchParams(searchParams.toString());
    if (value.trim()) params.set('search', value.trim());
    else params.delete('search');
    router.replace(`/products${params.toString() ? `?${params.toString()}` : ''}`, {
      scroll: false,
    });
  };

  const toggleLike = (id: number) => {
    setLikedProducts((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  };

  return (
    <main className="min-h-screen bg-bg pb-20 pt-6">
      <PageRouter routes={[{ title: 'محصولات', link: '/products' }]} />
      <section className="relative mx-auto max-w-7xl overflow-hidden rounded-4xl bg-text px-5 py-10 text-white sm:px-10 sm:py-14">
        <div className="relative z-10 max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-primary_light">
            <Sparkles size={14} />
            انتخاب‌های کاربردی برای کسب‌وکار و سفر
          </div>
          <h1 className="text-3xl font-black leading-tight sm:text-5xl">
            چیزی که لازم داری، همین‌جاست.
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-7 text-white/65 sm:text-base">
            محصولات منتخب کمپینک را با خیال راحت مقایسه کن و مناسب‌ترین گزینه را برای خودت پیدا کن.
          </p>
        </div>
        <div className="absolute -left-16 -top-28 h-72 w-72 rounded-full border-36 border-primary/20" />
        <div className="absolute -bottom-32 right-1/2 h-64 w-64 rounded-full border-28 border-auxiliary/15" />
      </section>

      <section className="mx-auto mt-8 max-w-7xl px-4 sm:px-0">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-black text-text">فروشگاه کمپینک</h2>
            <p className="mt-1 text-sm text-neutral_dark">
              {visibleProducts.length.toLocaleString('fa-IR')} محصول برای انتخاب شما
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="flex min-w-0 items-center gap-2 rounded-xl border border-neutral_normal bg-white px-3 py-2.5 sm:w-80">
              <Search className="shrink-0 text-neutral_dark" size={18} />
              <span className="sr-only">جستجوی محصولات</span>
              <input
                value={search}
                onChange={(event) => updateSearch(event.target.value)}
                placeholder="جستجوی محصول..."
                className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-neutral_dark"
              />
              {search && (
                <button type="button" onClick={() => updateSearch('')} aria-label="پاک کردن جستجو">
                  <X size={16} />
                </button>
              )}
            </label>
            <label className="flex items-center gap-2 rounded-xl border border-neutral_normal bg-white px-3 py-2.5 text-sm text-text">
              <SlidersHorizontal size={17} className="text-neutral_dark" />
              <span className="whitespace-nowrap">مرتب‌سازی</span>
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value as SortOption)}
                className="bg-transparent font-medium outline-none"
              >
                <option value="popular">محبوب‌ترین</option>
                <option value="newest">جدیدترین</option>
                <option value="price-low">ارزان‌ترین</option>
                <option value="price-high">گران‌ترین</option>
              </select>
            </label>
          </div>
        </div>

        <div className="mt-7 flex gap-2 overflow-x-auto pb-2 scrollbar-hidden">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition ${activeCategory === category ? 'bg-primary text-white shadow-md shadow-primary/20' : 'bg-white text-neutral_dark hover:bg-primary_light hover:text-primary'}`}
            >
              {category}
            </button>
          ))}
        </div>

        {visibleProducts.length ? (
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visibleProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isLiked={likedProducts.includes(product.id)}
                onLike={() => toggleLike(product.id)}
                onAdd={() => toast.success(`${product.title} به سبد خرید اضافه شد`)}
              />
            ))}
          </div>
        ) : (
          <div className="mt-5 flex min-h-80 flex-col items-center justify-center rounded-3xl border border-dashed border-neutral_normal bg-white px-6 text-center">
            <PackageSearch size={44} className="text-neutral_dark/50" />
            <h3 className="mt-4 text-lg font-bold text-text">محصولی پیدا نشد</h3>
            <p className="mt-2 max-w-sm text-sm leading-6 text-neutral_dark">
              فیلتر یا عبارت جستجو را تغییر بده تا گزینه‌های بیشتری ببینی.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearch('');
                setActiveCategory('همه');
                updateSearch('');
              }}
              className="mt-5 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-white"
            >
              پاک کردن فیلترها
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

function ProductCard({
  product,
  isLiked,
  onLike,
  onAdd,
}: {
  product: StoreProduct;
  isLiked: boolean;
  onLike: () => void;
  onAdd: () => void;
}) {
  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : null;

  return (
    <article className="group overflow-hidden rounded-2xl border border-neutral_normal bg-white transition duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-text/8">
      <div className="relative aspect-square overflow-hidden bg-neutral_light">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        {product.badge && (
          <span className="absolute right-3 top-3 rounded-full bg-text px-3 py-1 text-xs font-bold text-white">
            {product.badge}
          </span>
        )}
        {discount && (
          <span className="absolute left-3 top-3 rounded-full bg-auxiliary px-2.5 py-1 text-xs font-bold text-text">
            {discount.toLocaleString('fa-IR')}٪ تخفیف
          </span>
        )}
        <button
          type="button"
          onClick={onLike}
          aria-label={isLiked ? 'حذف از علاقه‌مندی‌ها' : 'افزودن به علاقه‌مندی‌ها'}
          className={`absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-xl backdrop-blur transition ${isLiked ? 'bg-red-500 text-white' : 'bg-white/90 text-text hover:text-red-500'}`}
        >
          <Heart size={18} fill={isLiked ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between gap-3 text-xs text-neutral_dark">
          <span>{product.category}</span>
          <span className="flex items-center gap-1 text-auxiliary">
            <Star size={13} fill="currentColor" />
            {product.rating.toLocaleString('fa-IR')}
          </span>
        </div>
        <Link href={`/products/${product.slug}`} className="mt-2 block">
          <h3 className="line-clamp-1 font-bold text-text transition group-hover:text-primary">
            {product.title}
          </h3>
        </Link>
        <p className="mt-2 line-clamp-2 min-h-10 text-xs leading-5 text-neutral_dark">
          {product.description}
        </p>
        <div className="mt-4 flex items-end justify-between gap-3 border-t border-neutral_light pt-4">
          <div>
            <p className="text-base font-black text-primary">{formatPrice(product.price)}</p>
            {product.oldPrice && (
              <p className="mt-1 text-xs text-neutral_dark line-through">
                {formatPrice(product.oldPrice)}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onAdd}
            aria-label={`افزودن ${product.title} به سبد`}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-white transition hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20"
          >
            <ShoppingBag size={18} />
          </button>
        </div>
      </div>
    </article>
  );
}
