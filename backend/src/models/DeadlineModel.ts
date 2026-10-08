import { Schema, model, Document, Types } from 'mongoose';
import { CaseLocationDTO } from '../dtos/case/CaseLocationDTO.js';

export interface IDeadlineModel {
  caseId: Types.ObjectId;
  lawyerId: Types.ObjectId;
  type: string;
  countingType: string;
  intimationDate: string;
  days: number;
  startDate: string;
  dueDate: string;
  priority: string;
  caseLocation: CaseLocationDTO;
}

interface DeadlineMongoDocument extends IDeadlineModel, Document {}

const DeadlineSchema = new Schema<DeadlineMongoDocument>(
  {
    caseId: { type: Types.ObjectId, ref: 'Cases', index: true, required: true },
    lawyerId: { type: Types.ObjectId, ref: 'Users', index: true, required: true },
    type: {
      type: String,
      required: true,
    },
    countingType: {
      type: String,
      required: true,
    },
    intimationDate: { type: String, required: true },
    days: { type: Number, required: true },
    startDate: { type: String, required: true },
    dueDate: { type: String, required: true },
    priority: {
      type: String,
      required: true,
    },
    caseLocation: {
      city: { type: String, required: true },
      state: { type: String, requied: true },
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export const DeadlineModel = model<DeadlineMongoDocument>('Deadlines', DeadlineSchema);
