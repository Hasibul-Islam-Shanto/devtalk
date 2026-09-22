import { FeedSkeleton } from '@/components/feed-skeleton';

export default function MainLoading() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <div className="mb-6 space-y-2">
        <div className="bg-muted h-3 w-16 animate-pulse rounded" />
        <div className="bg-muted h-7 w-32 animate-pulse rounded" />
      </div>
      <FeedSkeleton />
    </div>
  );
}
