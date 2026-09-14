import Hero from '@/components/Home/Hero';
import HomeBanner from '@/components/Home/HomeBanner';
import HomeBlog from '@/components/Home/HomeBlog';
import HomeBrands from '@/components/Home/HomeBrands';
import HomeCategory from '@/components/Home/HomeCategories';
import HomeOffers from '@/components/Home/HomeOffers';
import HomeProducts from '@/components/Home/HomeProducts';

export default function Home() {
  return (
    <>
      <Hero />
      <HomeCategory />
      <HomeOffers />
      <HomeProducts />
      <HomeBanner />
      <HomeBlog />
      <HomeBrands />
    </>
  );
}
