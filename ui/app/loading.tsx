export default function Loading() {
  return (
    <main className="bg-neutral_light relative flex min-h-[70vh] items-center justify-center overflow-hidden px-4 py-12">
      <div className="border-primary/10 absolute -top-24 -right-24 h-64 w-64 rounded-full border-36" />
      <div className="border-auxiliary/10 absolute -bottom-32 -left-20 h-72 w-72 rounded-full border-36" />

      <section
        className="relative w-full max-w-2xl text-center"
        aria-live="polite"
        aria-busy="true"
      >
        <div className="bg-primary shadow-primary/20 mx-auto flex h-20 w-20 items-center justify-center rounded-[1.75rem] shadow-xl">
          <div className="h-11 w-11 animate-spin rounded-full border-4 border-white/30 border-t-white" />
        </div>

        <h1 className="text-text mt-6 text-xl font-bold sm:text-2xl">
          در حال آماده‌سازی فروشگاه
        </h1>
        <p className="text-neutral_dark mt-2 text-sm">
          لطفاً چند لحظه صبر کنید...
        </p>

        <div className="mt-10 space-y-4 text-right">
          <div className="shadow-card h-24 animate-pulse rounded-2xl bg-white/80" />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="shadow-card h-28 animate-pulse rounded-2xl bg-white/80"
              />
            ))}
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="shadow-card h-36 animate-pulse rounded-2xl bg-white/80"
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
