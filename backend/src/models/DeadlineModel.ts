import { Schema, model, Document, Types } from 'mongoose';
import { DeadlineType } from '../types/DeadLineType';
import { DeadlinePriority } from '../types/DeadLinePriority';
import { DeadlineStatus } from '../types/DeadLineStatus';

export interface IDeadlineModel {
  processId: Types.ObjectId;
  clientId: Types.ObjectId;
  type: DeadlineType;
  startDate: Date;
  dueDate: Date;
  status: DeadlineStatus;
  priority: DeadlinePriority;
}

interface DeadlineMongoDocument extends IDeadlineModel, Document {}

const DeadlineSchema = new Schema<DeadlineMongoDocument>({
  processId: { type: Types.ObjectId, ref: 'Cases', index: true, required: true },
  clientId: { type: Types.ObjectId, ref: 'Users', index: true, required: true },
  type: {
    type: String,
    enum: Object.values(DeadlineType),
    required: true,
  },
  startDate: { type: Date, required: true },
  dueDate: { type: Date, required: true },
  status: {
    type: String,
    enum: Object.values(DeadlineStatus),
    required: true,
  },
  priority: {
    type: String,
    enum: Object.values(DeadlinePriority),
    required: true,
  },
});

export const DeadlineModel = model<DeadlineMongoDocument>('Deadlines', DeadlineSchema);
