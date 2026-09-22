import { Skeleton } from '@/components/ui/skeleton';

export function FeedSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="border-border bg-card rounded-lg border p-4">
          <Skeleton className="mb-3 h-5 w-24" />
          <Skeleton className="mb-2 h-5 w-3/4" />
          <Skeleton className="mb-4 h-4 w-full" />
          <div className="flex gap-2">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-16" />
          </div>
        </div>
      ))}
    </div>
  );
}
