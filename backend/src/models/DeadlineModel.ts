import { Schema, model, Document, Types } from 'mongoose';
import { DeadlineType } from '../types/DeadLineType';
import { DeadlinePriority } from '../types/DeadLinePriority';
import { DeadlineStatus } from '../types/DeadLineStatus';
import { DeadlineCountingType } from '../types/DeadlineCountingType';
import { CaseLocation } from '../types/CaseLocation';
import { City } from '../types/City';
import { BrazilState } from '../types/BrazilState';
import { normalizeDate } from '../utils/normalizeDate';

export interface IDeadlineModel {
  caseId: Types.ObjectId;
  lawyerId: Types.ObjectId;
  type: DeadlineType;
  countingType: DeadlineCountingType;
  intimationDate: string;
  days: number;
  startDate: string;
  dueDate: string;
  priority: DeadlinePriority;
  caseLocation: CaseLocation;
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
    intimationDate: { type: String, required: true },
    days: { type: Number, required: true },
    startDate: { type: String, required: true },
    dueDate: { type: String, required: true },
    priority: {
      type: String,
      enum: Object.values(DeadlinePriority),
      required: true,
    },
    caseLocation: {
      city: { type: String, enum: Object.values(City), required: true },
      state: { type: String, enum: Object.values(BrazilState), requied: true },
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

DeadlineSchema.virtual('status').get(function (this: DeadlineMongoDocument) {
  const today = normalizeDate(new Date());
  if (today < new Date(this.startDate)) {
    return DeadlineStatus.PENDENTE;
  }

  const duedate = normalizeDate(new Date(this.dueDate));
  if (today > duedate) {
    return DeadlineStatus.VENCIDO;
  }
  
  return DeadlineStatus.EM_ANDAMENTO;
});

export const DeadlineModel = model<DeadlineMongoDocument>('Deadlines', DeadlineSchema);
