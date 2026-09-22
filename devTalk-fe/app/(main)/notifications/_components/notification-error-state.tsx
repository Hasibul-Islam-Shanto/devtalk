import { ErrorMessage } from '@/components/Errors';

export function NotificationErrorState() {
  return (
    <ErrorMessage
      title="Couldn't load notifications"
      message="Something went wrong. Try again in a moment."
    />
  );
}
