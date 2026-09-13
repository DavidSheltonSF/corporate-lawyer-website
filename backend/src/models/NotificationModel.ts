import { Document, model, Schema, Types } from 'mongoose';

export interface INotificationModel {
  userId: Types.ObjectId;
  type: string;
  channels: string[];
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
    type: { type: String, required: true },
    channels: [{ type: String, required: true }],
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
