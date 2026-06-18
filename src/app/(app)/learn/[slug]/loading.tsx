import { Skeleton } from "@/components/ui/skeleton";

export default function LessonLoading() {
  return (
    <div className="mx-auto max-w-3xl space-y-6 py-6">
      {/* Back link */}
      <Skeleton className="h-4 w-24" />

      {/* Title */}
      <div className="space-y-2">
        <Skeleton className="h-9 w-3/4" />
        <Skeleton className="h-4 w-48" />
      </div>

      {/* Content blocks */}
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-20 rounded-lg" />
        ))}
      </div>

      {/* Chart placeholder */}
      <Skeleton className="h-64 rounded-xl" />

      {/* More content */}
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-16 rounded-lg" />
        ))}
      </div>
    </div>
  );
}
