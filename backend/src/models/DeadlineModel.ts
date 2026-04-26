import { Schema, model, Document, Types } from 'mongoose';
import { DeadlineType } from '../types/DeadLineType';
import { DeadlinePriority } from '../types/DeadLinePriority';
import { DeadlineStatus } from '../types/DeadLineStatus';

export interface IDeadlineModel {
  caseId: Types.ObjectId;
  lawyerId: Types.ObjectId;
  type: DeadlineType;
  startDate: Date;
  dueDate: Date;
  status: DeadlineStatus;
  priority: DeadlinePriority;
}

interface DeadlineMongoDocument extends IDeadlineModel, Document {}

const DeadlineSchema = new Schema<DeadlineMongoDocument>({
  caseId: { type: Types.ObjectId, ref: 'Cases', index: true, required: true },
  lawyerId: { type: Types.ObjectId, ref: 'Users', index: true, required: true },
  type: {
    type: String,
    enum: Object.values(DeadlineType),
    required: true,
  },
  startDate: { type: Date, required: true },
  dueDate: { type: Date, required: true },
  priority: {
    type: String,
    enum: Object.values(DeadlinePriority),
    required: true,
  },
});

export const DeadlineModel = model<DeadlineMongoDocument>('Deadlines', DeadlineSchema);
