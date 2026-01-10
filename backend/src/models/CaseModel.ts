import { Schema, model, Document, Types } from 'mongoose';
import { CaseStatusEnum } from '../types/CaseStatusEnum';

export interface ICaseModel {
  client: Types.ObjectId;
  lawyers: Types.ObjectId[];
  processNumber: string;
  title: string;
  description: string;
  court: string; //tribunal
  courtDivision: string; //vara
  documents?: Types.ObjectId[] | undefined;
  hearings?: Types.ObjectId[] | undefined;
  status: CaseStatusEnum;
  createdAt?: Date;
  updatedAt?: Date;
}

interface CaseMongoDocument extends ICaseModel, Document {}

const CaseSchema = new Schema<CaseMongoDocument>(
  {
    client: { type: Types.ObjectId, ref: 'Users', index: true, required: true },
    lawyers: [{ type: Types.ObjectId, ref: 'Users', index: true, required: true }],
    processNumber: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    court: { type: String, required: true },
    courtDivision: { type: String, required: true },
    documents: [{ type: Types.ObjectId, ref: 'CaseDocuments', index: true }],
    hearings: [{ type: Types.ObjectId, ref: 'Hearings', index: true }],
    status: {
      type: String,
      enum: ['aberto', 'em_andamento', 'esperando_documentos', 'encerrado'],
      required: true,
    },
  },
  { timestamps: true }
);

export const CaseModel = model<CaseMongoDocument>('Cases', CaseSchema);
