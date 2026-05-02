export interface CreateNotificationDTO {
  userId: string;
  type: string;
  channel: string[];
  title: string;
  message: string;
  isRead: boolean;
  readAt: string;
  metadata?: Record<string, any> | undefined;
}
