export interface CreateNotificationDTO {
  userId: string;
  type: string;
  channels: string[];
  title: string;
  message: string;
  metadata?: Record<string, any> | undefined;
}
