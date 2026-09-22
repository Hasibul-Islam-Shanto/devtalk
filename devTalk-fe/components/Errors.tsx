import { ErrorState } from '@/components/ui/error-state';
import { RetryButton } from '@/components/retry-button';

interface ErrorMessageProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage = ({
  title = 'Something went wrong',
  message,
  onRetry,
}: ErrorMessageProps) => {
  if (onRetry) {
    return <ErrorState title={title} message={message} onRetry={onRetry} />;
  }

  return (
    <div className="border-border bg-card flex flex-col items-start gap-3 rounded-lg border px-5 py-6">
      <div>
        <h3 className="text-foreground text-sm font-medium">{title}</h3>
        <p className="text-muted-foreground mt-1 text-sm">{message}</p>
      </div>
      <RetryButton />
    </div>
  );
};

export const SectionError = ({
  title,
  message,
}: {
  title: string;
  message: string;
}) => {
  return (
    <section>
      <ErrorMessage title={title} message={message} />
    </section>
  );
};
