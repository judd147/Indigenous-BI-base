import { Skeleton } from "@/components/ui/skeleton";

export function DataTableSkeleton() {
  return (
    <div className="container mx-auto py-10">
      {/* Table header */}
      <div className="mb-4 flex items-center justify-between">
        <Skeleton className="h-8 w-64" /> {/* Search bar skeleton */}
        <Skeleton className="h-8 w-32" /> {/* Filter button skeleton */}
      </div>

      {/* Table header row */}
      <div className="mb-4 flex gap-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={`header-${i}`} className="h-8 flex-1" />
        ))}
      </div>

      {/* Table rows */}
      {Array.from({ length: 10 }).map((_, rowIndex) => (
        <div key={`row-${rowIndex}`} className="mb-4 flex gap-3">
          {Array.from({ length: 5 }).map((_, colIndex) => (
            <Skeleton
              key={`cell-${rowIndex}-${colIndex}`}
              className="h-12 flex-1"
            />
          ))}
        </div>
      ))}

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between">
        <Skeleton className="h-8 w-32" /> {/* Page size selector */}
        <div className="flex gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={`page-${i}`} className="h-8 w-8" />
          ))}
        </div>
      </div>
    </div>
  );
}

export function InsightSkeleton() {
  const ChartSkeleton = () => (
    <div className="flex flex-col space-y-4 rounded-xl border p-6">
      <div className="space-y-2">
        <Skeleton className="h-6 w-3/4" /> {/* Chart title */}
        <Skeleton className="h-4 w-1/2" /> {/* Chart description */}
      </div>
      <Skeleton className="h-[300px] w-full rounded-lg" /> {/* Chart area */}
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-3/4" /> {/* Footer content */}
      </div>
    </div>
  );

  return (
    <div className="container mx-auto grid grid-cols-1 gap-4 py-10 sm:grid-cols-2 lg:grid-cols-3">
      {/* Generate 12 chart skeletons */}
      {Array.from({ length: 12 }).map((_, index) => (
        <ChartSkeleton key={`chart-${index}`} />
      ))}
    </div>
  );
}
