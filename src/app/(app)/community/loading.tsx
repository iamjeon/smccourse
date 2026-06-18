import { Skeleton } from "@/components/ui/skeleton";

export default function CommunityLoading() {
  return (
    <div className="flex h-[calc(100dvh-4rem)] flex-col py-4">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between px-1">
        <Skeleton className="h-7 w-36" />
        <Skeleton className="h-5 w-20 rounded-full" />
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-4 overflow-hidden px-1">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex gap-3">
            <Skeleton className="size-8 shrink-0 rounded-full" />
            <div className="flex-1 space-y-1.5">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-4 w-full max-w-xs" />
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <Skeleton className="mt-4 h-11 rounded-lg" />
    </div>
  );
}
