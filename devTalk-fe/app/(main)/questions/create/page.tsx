import Link from 'next/link';
import { ArrowLeft, Lightbulb } from 'lucide-react';
import QuestionForm from './_components/question-form';

export default function QuestionCreatePage() {
  return (
    <div className="mx-auto max-w-4xl p-4 pb-10 lg:p-6 lg:pb-12">
      <nav className="mb-6" aria-label="Breadcrumb">
        <Link
          href="/questions"
          className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200"
        >
          <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden />
          Back to questions
        </Link>
      </nav>

      <header className="mb-6">
        <h1 className="text-foreground text-2xl font-semibold tracking-tight">
          Ask a question
        </h1>
        <p className="text-muted-foreground mt-1 max-w-2xl text-sm">
          Describe your problem clearly so developers can help you faster.
        </p>
      </header>

      <section
        className="border-border bg-surface/60 mb-7 rounded-xl border p-4"
        aria-labelledby="question-tips-heading"
      >
        <div className="flex gap-3 sm:gap-4">
          <div className="bg-primary/10 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg">
            <Lightbulb className="text-primary h-5 w-5" aria-hidden />
          </div>
          <div className="min-w-0">
            <h2
              id="question-tips-heading"
              className="text-foreground text-sm font-medium"
            >
              Before you post
            </h2>
            <ul className="text-muted-foreground mt-2 list-inside list-disc space-y-1.5 text-sm leading-relaxed">
              <li>Explain what you tried and what went wrong</li>
              <li>Include code snippets or error messages when relevant</li>
              <li>Use tags so the right people can find your question</li>
            </ul>
          </div>
        </div>
      </section>

      <QuestionForm />
    </div>
  );
}
