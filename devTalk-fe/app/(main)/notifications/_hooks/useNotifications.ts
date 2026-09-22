'use client';

import { useEffect } from 'react';
import { useSocketStore } from '@/store/socket.store';
import { useAuthStore } from '@/store/auth.store';
import { toast } from 'sonner';
import { del, get, patch } from '@/utils/methods';
import { useNotificationStore, Notification } from '@/store/notification.store';
import { getCookie } from 'cookies-next';
import { refreshToken } from '@/utils/refreshToken';

export function useNotifications() {
  const { socket, isConnected, connect, disconnect } = useSocketStore();
  const { user, isLoggedIn } = useAuthStore();
  const {
    notifications,
    unreadCount,
    isLoading,
    setNotifications,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    setLoading,
  } = useNotificationStore();

  useEffect(() => {
    if (isLoggedIn && user?._id) {
      connect();
    } else {
      disconnect();
    }

    return () => {
      disconnect();
    };
  }, [isLoggedIn, user?._id, connect, disconnect]);

  useEffect(() => {
    if (!isLoggedIn || !user?._id) return;

    const fetchNotifications = async () => {
      try {
        const accessToken = await refreshToken();

        setLoading(true);
        const response = await get<{ notifications: Notification[] }>(
          '/api/notifications',
          {
            params: { limit: 10 },
            isAuthenticated: true,
            token: accessToken as string,
          },
        );
        setNotifications(response.notifications);
      } catch (error) {
        console.error('❌ Failed to fetch notifications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [isLoggedIn, user?._id, setLoading, setNotifications]);

  useEffect(() => {
    if (!socket || !isConnected) {
      console.log('⏸️ Socket not ready yet');
      return;
    }

    const handleNotification = (notification: Notification) => {
      addNotification(notification);
      toast.info(notification.message, {
        description: `From ${notification.senderId.name}`,
        duration: 5000,
      });
    };

    const handleNotificationRead = (notificationId: string) => {
      markAsRead(notificationId);
    };

    const handleNotificationsReadAll = () => {
      markAllAsRead();
      markAllAsRead();
    };

    socket.on('notification', handleNotification);
    socket.on('notification:read', handleNotificationRead);
    socket.on('notifications:read-all', handleNotificationsReadAll);

    return () => {
      socket.off('notification', handleNotification);
      socket.off('notification:read', handleNotificationRead);
      socket.off('notifications:read-all', handleNotificationsReadAll);
    };
  }, [socket, isConnected, addNotification, markAsRead, markAllAsRead]);

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      const accessToken = getCookie('accessToken');
      await patch(
        `/api/notifications/${notificationId}/read`,
        {},
        {
          isAuthenticated: true,
          token: accessToken as string,
        },
      );
      markAsRead(notificationId);
      socket?.emit('notification:read', notificationId);
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      const accessToken = getCookie('accessToken');
      await patch(
        '/api/notifications/read-all',
        {},
        {
          isAuthenticated: true,
          token: accessToken as string,
        },
      );
      markAllAsRead();
      socket?.emit('notifications:read-all');
    } catch (error) {
      console.error('Failed to mark all as read:', error);
    }
  };

  const handleDeleteNotification = async (notificationId: string) => {
    try {
      const accessToken = await refreshToken();
      await del(`/api/notifications/${notificationId}`, {
        isAuthenticated: true,
        token: accessToken as string,
      });
      removeNotification(notificationId);
    } catch (error) {
      console.error('Failed to delete notification:', error);
    }
  };

  return {
    notifications,
    unreadCount,
    isLoading,
    isConnected,
    markAsRead: handleMarkAsRead,
    markAllAsRead: handleMarkAllAsRead,
    deleteNotification: handleDeleteNotification,
  };
}
