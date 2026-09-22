import { Pagination } from './common';

export interface INotification {
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

export interface INotificationResponse {
  success: boolean;
  message: string;
  data: INotification;
}
export interface INotificationsResponse {
  success: boolean;
  notifications: INotification[];
  pagiantion: Pagination;
}
