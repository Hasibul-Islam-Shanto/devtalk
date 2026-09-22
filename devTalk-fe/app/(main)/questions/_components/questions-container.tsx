import { Question, QuestionsResponse } from '@/types/question';
import QuestionCard from './question-card';
import { logError } from '@/utils/apiError';
import { SectionError } from '@/components/Errors';
import { EmptyState } from '@/components/ui/empty-state';
import { get } from '@/utils/methods';
import { MessageSquare } from 'lucide-react';

const QuestionsContainer = async () => {
  let questions: Question[] = [];
  let error = null;

  try {
    const response = await get<QuestionsResponse>('/api/questions', {
      params: { limit: 10, sortOrder: 'desc' },
      retry: 2,
      timeout: 5000,
    });
    questions = response.questions;
  } catch (err) {
    logError(err, 'QuestionsContainer');
    error = err;
  }

  if (error) {
    return (
      <SectionError
        title="Recent Questions"
        message="Unable to load questions right now. Please check back later."
      />
    );
  }

  if (!questions || questions.length === 0) {
    return (
      <EmptyState
        icon={MessageSquare}
        title="No questions yet"
        description="Ask the first one and get help from other developers."
        actionLabel="Ask a question"
        actionHref="/questions/create"
      />
    );
  }

  return (
    <section>
      <div className="space-y-4">
        {questions.map(question => (
          <QuestionCard key={question._id} question={question} />
        ))}
      </div>
    </section>
  );
};

export default QuestionsContainer;
