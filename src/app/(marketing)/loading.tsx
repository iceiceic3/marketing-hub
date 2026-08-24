export default function MarketingLoading() {
  return (
    <div
      className="animate-pulse space-y-6 p-6"
      role="status"
      aria-label="Loading marketing content"
      aria-busy="true"
    >
      <span className="sr-only">Loading...</span>

      {/* Page title skeleton */}
      <div className="space-y-3">
        <div className="h-8 w-48 rounded-md border-2 border-border bg-muted shadow-[2px_2px_0px_1px_var(--color-brutal-shadow)]" />
        <div className="h-4 w-72 rounded-md border-2 border-border bg-muted shadow-[2px_2px_0px_1px_var(--color-brutal-shadow)]" />
      </div>

      {/* Card row skeleton */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="card-brutal rounded-lg border-2 border-border bg-card p-5"
          >
            <div className="mb-3 h-5 w-28 rounded-md border-2 border-border bg-muted shadow-[2px_2px_0px_1px_var(--color-brutal-shadow)]" />
            <div className="mb-2 h-4 w-full rounded-md border-2 border-border bg-muted shadow-[1px_1px_0px_1px_var(--color-brutal-shadow)]" />
            <div className="mb-2 h-4 w-3/4 rounded-md border-2 border-border bg-muted shadow-[1px_1px_0px_1px_var(--color-brutal-shadow)]" />
            <div className="mt-4 h-8 w-24 rounded-md border-2 border-border bg-muted shadow-[2px_2px_0px_1px_var(--color-brutal-shadow)]" />
          </div>
        ))}
      </div>

      {/* Content area skeleton */}
      <div className="card-brutal rounded-lg border-2 border-border bg-card p-6">
        <div className="mb-4 h-5 w-36 rounded-md border-2 border-border bg-muted shadow-[2px_2px_0px_1px_var(--color-brutal-shadow)]" />
        <div className="space-y-2">
          <div className="h-3 w-full rounded-md border border-border bg-muted" />
          <div className="h-3 w-full rounded-md border border-border bg-muted" />
          <div className="h-3 w-5/6 rounded-md border border-border bg-muted" />
          <div className="h-3 w-2/3 rounded-md border border-border bg-muted" />
        </div>
      </div>
    </div>
  );
}
