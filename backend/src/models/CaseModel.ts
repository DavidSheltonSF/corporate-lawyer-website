import { Schema, model, Document, Types } from 'mongoose';
import { CaseLocationDTO } from '../dtos/case/CaseLocationDTO.js';

export interface ICaseModel {
  client: Types.ObjectId;
  lawyers: Types.ObjectId[];
  caseNumber: string;
  title: string;
  description: string;
  court: string; //tribunal
  courtDivision: string; //vara
  status: string;
  location: CaseLocationDTO;
  createdAt?: Date;
  updatedAt?: Date;
}

interface CaseMongoDocument extends ICaseModel, Document {}

const CaseSchema = new Schema<CaseMongoDocument>(
  {
    client: { type: Types.ObjectId, ref: 'Users', index: true, required: true },
    lawyers: [{ type: Types.ObjectId, ref: 'Users', index: true, required: true }],
    caseNumber: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    court: { type: String, required: true },
    courtDivision: { type: String, required: true },
    status: {
      type: String,
      required: true,
    },
    location: {
      type: { state: { type: String, required: true }, city: { type: String, required: true } },
      required: true,
    },
  },
  { timestamps: true }
);

export const CaseModel = model<CaseMongoDocument>('Cases', CaseSchema);
