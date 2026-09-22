import { Application } from '@/types/application';
import { cn } from '@/lib/utils';

export function applicationStatusBadgeClass(status: Application['status']) {
  switch (status) {
    case 'pending':
      return 'bg-yellow-500/20 text-yellow-500 border-transparent';
    case 'accepted':
      return 'bg-green-500/20 text-green-500 border-transparent';
    case 'rejected':
      return 'bg-red-500/20 text-red-400 border-transparent';
    default:
      return 'bg-muted text-muted-foreground border-transparent';
  }
}

export function applicationStatusBadgeClassCn(status: Application['status']) {
  return cn('capitalize', applicationStatusBadgeClass(status));
}
