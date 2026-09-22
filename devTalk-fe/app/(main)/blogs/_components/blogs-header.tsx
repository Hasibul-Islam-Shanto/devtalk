import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockTags } from '@/utils/mockdata';
import { Search } from 'lucide-react';
import Link from 'next/link';

const BlogsHeader = () => {
  return (
    <>
      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-foreground text-2xl font-semibold">Blogs</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Stories and notes from the developer community
          </p>
        </div>
        <Button asChild>
          <Link href="/blogs/create">Write a blog</Link>
        </Button>
      </header>

      <div className="relative mb-6">
        <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        <Input placeholder="Search posts..." className="pl-10" />
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {mockTags.slice(0, 8).map(tag => (
          <button
            key={tag.name}
            className="border-border bg-card text-muted-foreground hover:text-foreground rounded-md border px-2.5 py-1 font-mono text-xs transition-colors duration-150"
          >
            {tag.name}
          </button>
        ))}
      </div>
    </>
  );
};

export default BlogsHeader;
