'use client';

import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const faqData = [
  {
    id: 1,
    question: 'آیا امکان ارسال کالا به تمام نقاط ایران وجود دارد؟',
    answer:
      'بله، ما با استفاده از معتبرترین شرکت‌های حمل و نقل، کالاها را به تمام نقاط ایران ارسال می‌کنیم. هزینه ارسال بر اساس وزن و مقصد محاسبه می‌شود.',
  },
  {
    id: 2,
    question: 'مدت زمان تحویل سفارش چقدر است؟',
    answer:
      'سفارش‌های تهران معمولاً در ۲۴ ساعت و سایر شهرستان‌ها بین ۲ تا ۵ روز کاری تحویل داده می‌شوند.',
  },
  {
    id: 3,
    question: 'آیا محصولات دارای گارانتی هستند؟',
    answer:
      'تمامی محصولات ما دارای گارانتی اصالت و ضمانت بازگشت کالا تا ۷ روز می‌باشند. در صورت وجود هرگونه مشکل، تیم پشتیبانی ما در خدمت شماست.',
  },
  {
    id: 4,
    question: 'روش‌های پرداخت چیست؟',
    answer:
      'شما می‌توانید از طریق کارت‌های بانکی عضو شتاب، درگاه پرداخت امن، و یا پرداخت در محل (برای تهران) سفارش خود را ثبت کنید.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            سوالات <span className="text-auxiliary">متداول</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            پاسخ سوالات رایج شما درباره خرید، ارسال و خدمات ما
          </p>
        </div>

        <div className="mx-auto max-w-4xl space-y-4">
          {faqData.map((item, index) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-2xl border border-gray-200 transition-all duration-300 hover:shadow-md"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex w-full items-center justify-between bg-white px-6 py-5 text-right transition-colors duration-200 hover:bg-gray-50"
              >
                <span className="ml-4 flex-1 text-base font-semibold text-gray-800 md:text-lg">
                  {item.question}
                </span>
                <span className="bg-primary/10 text-primary flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full transition-transform duration-300">
                  {openIndex === index ? (
                    <FaChevronUp size={16} />
                  ) : (
                    <FaChevronDown size={16} />
                  )}
                </span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index
                    ? 'max-h-96 opacity-100'
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className="border-t border-gray-100 px-6 pt-2 pb-5 leading-relaxed text-gray-600">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
