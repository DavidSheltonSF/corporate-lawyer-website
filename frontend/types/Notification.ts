import { NotificationMetadata } from './NotificationMetadata';

export interface Notification {
  userId: string;
  type: string;
  channels: string[];
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  readAt?: string | null;
  metadata?: NotificationMetadata | undefined;
}
