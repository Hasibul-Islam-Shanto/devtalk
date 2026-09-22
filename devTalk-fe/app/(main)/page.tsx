import { APP_NAME } from '@/constants/brand';
import { Suspense } from 'react';
import HomeFeed from './_components/home-feed';
import { FeedSkeleton } from '@/components/feed-skeleton';

const HomePage = () => {
  return (
    <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-16 lg:px-10">
      <header className="mb-10 sm:mb-12">
        <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.16em] uppercase">
          {APP_NAME}
        </p>
        <h1 className="text-foreground text-3xl font-semibold tracking-tight sm:text-4xl">
          Latest
        </h1>
        <p className="text-muted-foreground mt-3 max-w-xl text-base leading-relaxed">
          Questions, posts, and roles from the community, newest first.
        </p>
      </header>
      <Suspense fallback={<FeedSkeleton />}>
        <HomeFeed />
      </Suspense>
    </div>
  );
};

export default HomePage;
