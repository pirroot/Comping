export default function Loading() {
  return (
    <main className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-neutral_light px-4 py-12">
      <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full border-36 border-primary/10" />
      <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full border-36 border-auxiliary/10" />

      <section
        className="relative w-full max-w-2xl text-center"
        aria-live="polite"
        aria-busy="true"
      >
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[1.75rem] bg-primary shadow-xl shadow-primary/20">
          <div className="h-11 w-11 animate-spin rounded-full border-4 border-white/30 border-t-white" />
        </div>

        <h1 className="mt-6 text-xl font-bold text-text sm:text-2xl">در حال آماده‌سازی فروشگاه</h1>
        <p className="mt-2 text-sm text-neutral_dark">لطفاً چند لحظه صبر کنید...</p>

        <div className="mt-10 space-y-4 text-right">
          <div className="h-24 animate-pulse rounded-2xl bg-white/80 shadow-card" />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-28 animate-pulse rounded-2xl bg-white/80 shadow-card" />
            ))}
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="h-36 animate-pulse rounded-2xl bg-white/80 shadow-card" />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
