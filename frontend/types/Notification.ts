export interface Notification {
  userId: string;
  type: string;
  channels: string[];
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  readAt?: string | null;
  metadata?: Record<string, any> | undefined;
}
