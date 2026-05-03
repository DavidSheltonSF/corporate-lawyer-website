export interface CreateNotificationDTO {
  userId: string;
  type: string;
  channels: string[];
  title: string;
  message: string;
  isRead: boolean;
  readAt: string;
  metadata?: Record<string, any> | undefined;
}
