export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="h-10 w-72 animate-pulse rounded bg-slate-800/70" />
      <div className="mt-4 h-20 animate-pulse rounded-xl bg-slate-800/50" />
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="h-52 animate-pulse rounded-xl border border-slate-700/70 bg-slate-800/50" />
        ))}
      </div>
    </div>
  );
}
