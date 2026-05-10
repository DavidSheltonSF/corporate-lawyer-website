import { Document, model, Schema, Types } from 'mongoose';
import { NotificationType } from '../types/NotificationType';
import { NotificationChannel } from '../types/NotificationChannel';

export interface INotificationModel {
  userId: Types.ObjectId;
  type: NotificationType;
  channels: NotificationChannel[];
  title: string;
  message: string;
  isRead?: boolean;
  createdAt: Date;
  readAt?: Date;
  metadata?: Record<string, any> | undefined;
}

interface NotificationMongoDocument extends Document, INotificationModel {}

const NotificationSchema = new Schema<NotificationMongoDocument>(
  {
    userId: { type: Types.ObjectId, ref: 'Users', index: true, required: true },
    type: { type: String, enum: Object.values(NotificationType), required: true },
    channels: [{ type: String, enum: Object.values(NotificationChannel), required: true }],
    title: { type: String, required: true },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    readAt: { type: Date },
    metadata: { type: Schema.Types.Mixed },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

export const NotificationModel = model<NotificationMongoDocument>(
  'Notifications',
  NotificationSchema
);
