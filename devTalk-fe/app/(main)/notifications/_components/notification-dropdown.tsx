import { Check, Trash2 } from 'lucide-react';
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { useNotifications } from '@/app/(main)/notifications/_hooks/useNotifications';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { INotification } from '@/types/notification.type';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const NotificationDropDown = () => {
  const {
    notifications,
    unreadCount,
    isLoading,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  } = useNotifications();

  const getNotificationLink = (notification: INotification) => {
    const { resourceType, resourceId } = notification;
    switch (resourceType) {
      case 'QUESTION':
        return `/questions/${resourceId}`;
      case 'BLOG':
        return `/blogs/${resourceId}`;
      case 'JOB':
        return `/jobs/${resourceId}`;
      case 'COMMENT':
        return `/questions/${resourceId}`;
      default:
        return '#';
    }
  };

  return (
    <DropdownMenuContent align="end" className="bg-popover border-border w-80 sm:w-96">
      <div className="border-border flex items-center justify-between border-b p-3">
        <h4 className="text-foreground font-semibold">Notifications</h4>
        {unreadCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={e => {
              e.preventDefault();
              markAllAsRead();
            }}
            className="h-auto p-1 text-xs"
          >
            <Check className="mr-1 h-3 w-3" />
            Mark all read
          </Button>
        )}
      </div>

      {isLoading ? (
        <div className="text-muted-foreground p-8 text-center text-sm">
          Loading notifications...
        </div>
      ) : notifications.length === 0 ? (
        <div className="text-muted-foreground p-8 text-center text-sm">
          No notifications yet
        </div>
      ) : (
        notifications.map(notification => (
          <DropdownMenuItem
            key={notification._id}
            className="cursor-pointer p-0"
            onClick={() => {
              if (!notification.isRead) {
                markAsRead(notification._id);
              }
            }}
          >
            <Link
              href={getNotificationLink(notification)}
              className="hover:bg-muted/50 flex w-full items-start gap-3 p-3"
            >
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p
                    className={`text-sm ${
                      notification.isRead
                        ? 'text-muted-foreground'
                        : 'text-foreground font-medium'
                    }`}
                  >
                    {notification.message}
                  </p>
                  {!notification.isRead && (
                    <Badge
                      variant="default"
                      className="h-2 w-2 rounded-full p-0"
                    />
                  )}
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-muted-foreground text-xs">
                    {formatDistanceToNow(new Date(notification.createdAt), {
                      addSuffix: true,
                    })}
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {notification.type}
                  </Badge>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 shrink-0"
                onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  deleteNotification(notification._id);
                }}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </Link>
          </DropdownMenuItem>
        ))
      )}

      <DropdownMenuSeparator />
      <DropdownMenuItem asChild>
        <Link
          href="/notifications"
          className="text-primary cursor-pointer justify-center p-3"
        >
          View all notifications
        </Link>
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
};

export default NotificationDropDown;
