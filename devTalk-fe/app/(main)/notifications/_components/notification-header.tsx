'use client';

import { useNotificationStore } from '@/store/notification.store';
import { CheckCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NotificationHeader = () => {
  const { notifications, unreadCount, markAllAsRead } = useNotificationStore();

  const unreadLabel =
    unreadCount === 0
      ? 'No unread notifications'
      : `${unreadCount} unread notification${unreadCount === 1 ? '' : 's'}`;

  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0">
        <h1 className="text-foreground text-2xl font-semibold tracking-tight">
          Notifications
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">{unreadLabel}</p>
      </div>

      {notifications.length > 0 && (
        <Button
          type="button"
          variant="secondary"
          onClick={markAllAsRead}
          className="shrink-0"
        >
          <CheckCheck className="h-4 w-4" aria-hidden />
          Mark all as read
        </Button>
      )}
    </header>
  );
};

export default NotificationHeader;
