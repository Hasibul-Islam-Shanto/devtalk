'use client';

import { Bell } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '../ui/button';
import { useNotifications } from '@/app/(main)/notifications/_hooks/useNotifications';
import NotificationDropDown from '@/app/(main)/notifications/_components/notification-dropdown';

const NotificationButton = () => {
  const { unreadCount, isConnected } = useNotifications();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="bg-primary text-primary-foreground absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-medium">
              {unreadCount}
            </span>
          )}
          {isConnected && (
            <span className="bg-success absolute right-0.5 bottom-0.5 h-2 w-2 rounded-full" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <NotificationDropDown />
    </DropdownMenu>
  );
};

export default NotificationButton;
