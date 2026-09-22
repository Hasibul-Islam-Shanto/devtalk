import { EmptyState } from '@/components/ui/empty-state';
import { BellOff } from 'lucide-react';

export function NotificationEmptyState() {
  return (
    <EmptyState
      icon={BellOff}
      title="You're all caught up"
      description="When someone likes, comments, replies, or applies, it will show up here."
    />
  );
}
