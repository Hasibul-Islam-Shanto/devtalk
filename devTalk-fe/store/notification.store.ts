import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Notification {
  _id: string;
  recipientId: string;
  senderId: {
    _id: string;
    name: string;
    username: string;
    avatar?: string;
  };
  type: 'COMMENT' | 'LIKE' | 'FOLLOW' | 'MESSAGE' | 'APPLICATION' | 'REPLY';
  resourceType: 'BLOG' | 'QUESTION' | 'JOB' | 'COMMENT' | 'APPLICATION';
  resourceId: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  setNotifications: (notifications: Notification[]) => void;
  addNotification: (notification: Notification) => void;
  markAsRead: (notificationId: string) => void;
  markAllAsRead: () => void;
  removeNotification: (notificationId: string) => void;
  clearNotifications: () => void;
  setLoading: (loading: boolean) => void;
}

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set, get) => ({
      notifications: [],
      unreadCount: 0,
      isLoading: false,

      setNotifications: notifications => {
        const unreadCount = notifications.filter(n => !n.isRead).length;
        set({ notifications, unreadCount });
      },

      addNotification: notification => {
        set(state => ({
          notifications: [notification, ...state.notifications],
          unreadCount: notification.isRead
            ? state.unreadCount
            : state.unreadCount + 1,
        }));
      },

      markAsRead: notificationId => {
        set(state => {
          const notifications = state.notifications.map(n =>
            n._id === notificationId ? { ...n, isRead: true } : n,
          );
          const unreadCount = notifications.filter(n => !n.isRead).length;
          return { notifications, unreadCount };
        });
      },

      markAllAsRead: () => {
        set(state => ({
          notifications: state.notifications.map(n => ({
            ...n,
            isRead: true,
          })),
          unreadCount: 0,
        }));
      },

      removeNotification: notificationId => {
        set(state => {
          const notifications = state.notifications.filter(
            n => n._id !== notificationId,
          );
          const unreadCount = notifications.filter(n => !n.isRead).length;
          return { notifications, unreadCount };
        });
      },

      clearNotifications: () => {
        set({ notifications: [], unreadCount: 0 });
      },

      setLoading: loading => set({ isLoading: loading }),
    }),
    {
      name: 'notification-storage',
      partialize: state => ({
        notifications: state.notifications.slice(0, 50), // Keep only 50 latest
        unreadCount: state.unreadCount,
      }),
    },
  ),
);
