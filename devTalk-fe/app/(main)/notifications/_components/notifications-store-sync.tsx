'use client';

import { useNotificationStore } from '@/store/notification.store';
import { INotification } from '@/types/notification.type';
import { useEffect } from 'react';

export function NotificationsStoreSync({
  notifications,
}: {
  notifications: INotification[];
}) {
  const setNotifications = useNotificationStore(s => s.setNotifications);

  useEffect(() => {
    setNotifications(notifications);
  }, [notifications, setNotifications]);

  return null;
}
