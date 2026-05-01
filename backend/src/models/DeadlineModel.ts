import { Schema, model, Document, Types } from 'mongoose';
import { DeadlineType } from '../types/DeadLineType';
import { DeadlinePriority } from '../types/DeadLinePriority';
import { DeadlineStatus } from '../types/DeadLineStatus';
import { DeadlineCountingType } from '../types/DeadlineCountingType';

export interface IDeadlineModel {
  caseId: Types.ObjectId;
  lawyerId: Types.ObjectId;
  type: DeadlineType;
  countingType: DeadlineCountingType;
  intimationDate: Date;
  days: number;
  startDate: Date;
  dueDate: Date;
  priority: DeadlinePriority;
}

interface DeadlineMongoDocument extends IDeadlineModel, Document {}

const DeadlineSchema = new Schema<DeadlineMongoDocument>(
  {
    caseId: { type: Types.ObjectId, ref: 'Cases', index: true, required: true },
    lawyerId: { type: Types.ObjectId, ref: 'Users', index: true, required: true },
    type: {
      type: String,
      enum: Object.values(DeadlineType),
      required: true,
    },
    countingType: {
      type: String,
      enum: Object.values(DeadlineCountingType),
      required: true,
    },
    intimationDate: { type: Date, required: true },
    days: { type: Number, required: true },
    startDate: { type: Date, required: true },
    dueDate: { type: Date, required: true },
    priority: {
      type: String,
      enum: Object.values(DeadlinePriority),
      required: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

DeadlineSchema.virtual('status').get(function (this: DeadlineMongoDocument) {
  const today = new Date();
  if (today < this.startDate) {
    return DeadlineStatus.PENDENTE;
  }

  if (today > this.dueDate) {
    return DeadlineStatus.VENCIDO;
  }

  return DeadlineStatus.EM_ANDAMENTO;
});

export const DeadlineModel = model<DeadlineMongoDocument>('Deadlines', DeadlineSchema);
