import { Skeleton } from "@/components/ui/skeleton";

export default function AcademyLoading() {
  return (
    <div className="space-y-6 py-6">
      <div className="space-y-2">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-4 w-64" />
      </div>

      {/* Course cards */}
      {Array.from({ length: 2 }).map((_, i) => (
        <Skeleton key={i} className="h-36 rounded-xl" />
      ))}
    </div>
  );
}
