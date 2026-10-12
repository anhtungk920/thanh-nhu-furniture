export default function Loading() {
  return (
    <div className="min-h-screen bg-[#faf9f7] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-4 h-8 w-48 animate-pulse rounded bg-stone-200" />
        <div className="mb-10 h-12 w-96 max-w-full animate-pulse rounded bg-stone-200" />
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i}>
              <div className="mb-3 aspect-[3/4] animate-pulse rounded-xl bg-stone-200" />
              <div className="mb-2 h-4 w-3/4 animate-pulse rounded bg-stone-200" />
              <div className="h-4 w-1/2 animate-pulse rounded bg-stone-200" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}