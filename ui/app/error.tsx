// 'use client';

// import { Home, RefreshCw, TriangleAlert } from 'lucide-react';
// import Link from 'next/link';
// import { useEffect } from 'react';

// export default function Error({
//   error,
//   reset,
// }: {
//   error: Error & { digest?: string };
//   reset: () => void;
// }) {
//   useEffect(() => {
//     console.error(error);
//   }, [error]);

//   return (
//     <main className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-neutral_light px-4 py-12">
//       <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full border-36 border-auxiliary/10" />
//       <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full border-36 border-primary/10" />

//       <section className="relative w-full max-w-lg text-center">
//         <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[1.75rem] bg-auxiliary_light text-auxiliary shadow-xl shadow-auxiliary/10">
//           <TriangleAlert size={38} strokeWidth={1.8} />
//         </div>

//         <p className="mt-7 text-sm font-semibold text-auxiliary">خطای موقت</p>
//         <h1 className="mt-2 text-2xl font-bold text-text sm:text-3xl">مشکلی پیش آمد</h1>
//         <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-neutral_dark">
//           در بارگذاری این بخش مشکلی رخ داد. دوباره تلاش کنید یا به صفحه اصلی برگردید.
//         </p>

//         <div className="mt-8 flex flex-wrap justify-center gap-3">
//           <button
//             type="button"
//             onClick={() => reset()}
//             className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white shadow-lg shadow-primary/20 transition hover:-translate-y-0.5 hover:bg-primary/90"
//           >
//             <RefreshCw size={17} />
//             تلاش مجدد
//           </button>
//           <Link
//             href="/"
//             className="inline-flex items-center gap-2 rounded-xl border border-neutral_normal bg-white px-5 py-3 text-sm font-bold text-text transition hover:-translate-y-0.5 hover:border-primary hover:text-primary"
//           >
//             <Home size={17} />
//             صفحه اصلی
//           </Link>
//         </div>
//       </section>
//     </main>
//   );
// }
