export interface NotificationDTO {
  userId: string;
  type: string;
  channels: string[];
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  readAt: string;
  metadata?: Record<string, any> | undefined;
}
