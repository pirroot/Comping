'use client';

import FAQSection from '@/components/Contact/FAQSection';
import { useState } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';

// export const metadata = {
//   title: 'تماس با ما | تجهیزات حرفه‌ای ماجراجویی',
//   description: 'با ما در تماس باشید. تیم پشتیبانی ما آماده پاسخگویی به سوالات شماست.',
// };

const contactInfo = [
  { icon: FaMapMarkerAlt, title: 'آدرس', value: 'تهران، خیابان ولیعصر، پلاک ۱۲۳' },
  { icon: FaPhone, title: 'تلفن', value: '۰۲۱-۱۲۳۴۵۶۷۸' },
  { icon: FaEnvelope, title: 'ایمیل', value: 'info@adventure.ir' },
  { icon: FaClock, title: 'ساعات کاری', value: 'شنبه تا پنجشنبه ۹ صبح تا ۶ عصر' },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-bg  text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            تماس با <span className="text-auxiliary">ما</span>
          </h1>
          <p className="text-xl max-w-2xl mx-auto opacity-90">هر سوالی دارید بپرسید، ما اینجاییم</p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-8">فرم تماس</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    نام و نام خانوادگی
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ایمیل</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">موضوع</label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">پیام</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-secondary hover:shadow-lg transition-all duration-300"
                >
                  {sent ? 'پیام شما ارسال شد ✓' : 'ارسال پیام'}
                </button>
              </form>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-8">راه‌های ارتباطی</h2>
              <div className="space-y-6">
                {contactInfo.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-4 bg-neutral_light rounded-xl hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">{item.title}</h3>
                      <p className="text-gray-600 mt-1">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-primary/5 rounded-xl">
                <h3 className="font-bold text-lg mb-2">پشتیبانی سریع</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  تیم پشتیبانی ما در کمتر از ۲۴ ساعت به پیام‌های شما پاسخ می‌دهد. برای سوالات فوری
                  می‌توانید با شماره تلفن ما تماس بگیرید.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQSection />

    </div>
  );
}
