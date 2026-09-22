import { ErrorMessage } from '@/components/Errors';
import { EmptyState } from '@/components/ui/empty-state';
import { Question, QuestionsResponse } from '@/types/question';
import { get } from '@/utils/methods';
import { MessageSquare } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';
import { cookies } from 'next/headers';

const ProfileQuestions = async () => {
  let questions: Question[] | null = null;
  let error = null;

  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value || '';
    const response = await get<QuestionsResponse>(
      '/api/questions/users/questions',
      {
        isAuthenticated: true,
        token: accessToken,
      },
    );
    questions = response.questions;
  } catch (err) {
    error = err;
  }

  if (error) {
    return (
      <ErrorMessage
        title="Could not load questions"
        message="Please try again in a moment."
      />
    );
  }

  if (!questions || questions.length === 0) {
    return (
      <EmptyState
        icon={MessageSquare}
        title="No questions yet"
        description="Questions you ask will show up here."
        actionLabel="Ask a question"
        actionHref="/questions/create"
      />
    );
  }

  return (
    <div className="space-y-4">
      {questions.map(question => (
        <Link
          key={question._id}
          href={`/questions/${question._id}`}
          className="border-border bg-card hover:border-primary/40 block rounded-lg border p-4 transition-colors duration-150"
        >
          <h3 className="text-foreground hover:text-primary font-semibold">
            {question.title}
          </h3>
          <div className="text-muted-foreground mt-2 flex items-center gap-4 text-sm">
            <span>{0} votes</span>
            <span>{0} answers</span>
            <span>
              {formatDistanceToNow(new Date(question.createdAt), {
                addSuffix: true,
              })}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProfileQuestions;
