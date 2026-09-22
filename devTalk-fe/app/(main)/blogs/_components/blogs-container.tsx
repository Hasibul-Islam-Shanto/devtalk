import { Blog, BlogsResponse } from '@/types/blog';
import BlogCard from './blog-card';
import { get } from '@/utils/methods';
import { SectionError } from '@/components/Errors';
import { EmptyState } from '@/components/ui/empty-state';
import { BookOpen } from 'lucide-react';

const BlogsContainer = async () => {
  let blogs: Blog[] = [];
  let error = null;

  try {
    const response = await get<BlogsResponse>('/api/blogs', {
      retry: 2,
      timeout: 5000,
    });
    blogs = response.blogs;
  } catch (err) {
    error = err;
  }

  if (error) {
    return (
      <SectionError
        title=" Blogs"
        message="Unable to load blogs right now. Please check back later."
      />
    );
  }

  if (!blogs || blogs.length === 0) {
    return (
      <EmptyState
        icon={BookOpen}
        title="No posts yet"
        description="Write the first note for the community."
        actionLabel="Write a blog"
        actionHref="/blogs/create"
      />
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {blogs.map(blog => (
        <BlogCard key={blog._id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogsContainer;
