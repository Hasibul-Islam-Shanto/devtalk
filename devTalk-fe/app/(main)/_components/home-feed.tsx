import BlogCard from '@/components/layout/blog-card';
import { ErrorMessage } from '@/components/Errors';
import JobCard from '@/components/layout/job-card';
import QuestionCard from '@/components/layout/question-card';
import { EmptyState } from '@/components/ui/empty-state';
import { Blog, BlogsResponse } from '@/types/blog';
import { Job, JobsResponse } from '@/types/job';
import { Question, QuestionsResponse } from '@/types/question';
import { get } from '@/utils/methods';
import { Inbox } from 'lucide-react';

const LIMIT = 6;

type FeedItem =
  | { type: 'question'; createdAt: string; question: Question }
  | { type: 'blog'; createdAt: string; blog: Blog }
  | { type: 'job'; createdAt: string; job: Job };

const HomeFeed = async () => {
  const [questionsResult, blogsResult, jobsResult] = await Promise.allSettled([
    get<QuestionsResponse>('/api/questions', {
      params: { limit: LIMIT, sortOrder: 'desc' },
      retry: 2,
      timeout: 5000,
    }),
    get<BlogsResponse>('/api/blogs', {
      params: { limit: LIMIT, sortOrder: 'desc' },
      retry: 2,
      timeout: 5000,
    }),
    get<JobsResponse>('/api/jobs', {
      params: { limit: LIMIT, sortOrder: 'desc' },
      retry: 2,
      timeout: 5000,
    }),
  ]);

  const failed =
    questionsResult.status === 'rejected' &&
    blogsResult.status === 'rejected' &&
    jobsResult.status === 'rejected';

  if (failed) {
    return (
      <ErrorMessage
        title="Could not load the feed"
        message="Questions, posts, and jobs failed to load. Try again in a moment."
      />
    );
  }

  const items: FeedItem[] = [];

  if (questionsResult.status === 'fulfilled') {
    for (const question of (questionsResult.value.questions ?? []).slice(
      0,
      LIMIT,
    )) {
      items.push({
        type: 'question',
        createdAt: question.createdAt,
        question,
      });
    }
  }

  if (blogsResult.status === 'fulfilled') {
    for (const blog of (blogsResult.value.blogs ?? []).slice(0, LIMIT)) {
      items.push({ type: 'blog', createdAt: blog.createdAt, blog });
    }
  }

  if (jobsResult.status === 'fulfilled') {
    for (const job of (jobsResult.value.jobs ?? []).slice(0, LIMIT)) {
      items.push({ type: 'job', createdAt: job.createdAt, job });
    }
  }

  items.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  if (items.length === 0) {
    return (
      <EmptyState
        icon={Inbox}
        title="Nothing here yet"
        description="Be the first to ask a question, write a post, or share a role."
        actionLabel="Ask a question"
        actionHref="/questions/create"
      />
    );
  }

  return (
    <div className="space-y-5">
      {items.map(item => {
        if (item.type === 'question') {
          return <QuestionCard key={item.question._id} question={item.question} />;
        }
        if (item.type === 'blog') {
          return <BlogCard key={item.blog._id} blog={item.blog} />;
        }
        return <JobCard key={item.job._id} job={item.job} />;
      })}
    </div>
  );
};

export default HomeFeed;
