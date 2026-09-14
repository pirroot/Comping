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
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            سوالات <span className="text-auxiliary">متداول</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            پاسخ سوالات رایج شما درباره خرید، ارسال و خدمات ما
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqData.map((item, index) => (
            <div
              key={item.id}
              className="border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-md"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between px-6 py-5 text-right bg-white hover:bg-gray-50 transition-colors duration-200"
              >
                <span className="text-base md:text-lg font-semibold text-gray-800 flex-1 ml-4">
                  {item.question}
                </span>
                <span className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary transition-transform duration-300">
                  {openIndex === index ? <FaChevronUp size={16} /> : <FaChevronDown size={16} />}
                </span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-5 pt-2 text-gray-600 leading-relaxed border-t border-gray-100">
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
