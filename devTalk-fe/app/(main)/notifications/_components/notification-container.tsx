'use client';
import { useSocketStore } from '@/store/socket.store';
import { useEffect } from 'react';
import { INotification } from '@/types/notification.type';
import Notification from './notification';

const NotificationContainer = ({
  notifications,
}: {
  notifications: INotification[];
}) => {
  const { connect, disconnect } = useSocketStore();

  useEffect(() => {
    connect();
    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  return (
    <ul className="space-y-3">
      {notifications.map((notification: INotification) => (
        <Notification key={notification._id} notification={notification} />
      ))}
    </ul>
  );
};

export default NotificationContainer;
