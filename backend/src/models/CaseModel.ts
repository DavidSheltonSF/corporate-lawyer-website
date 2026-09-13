import { Schema, model, Document, Types } from 'mongoose';
import { FileSchema, IFileModel } from './FileModel.js';
import { WithMongoId } from '../database/mongoDB/types/WithMongoId.js';
import { CaseLocationDTO } from '../dtos/case/CaseLocationDTO.js';

export interface ICaseModel {
  client: Types.ObjectId;
  lawyers: Types.ObjectId[];
  processNumber: string;
  title: string;
  description: string;
  court: string; //tribunal
  courtDivision: string; //vara
  files: WithMongoId<IFileModel>[];
  hearings: Types.ObjectId[];
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
    processNumber: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    court: { type: String, required: true },
    courtDivision: { type: String, required: true },
    files: { type: [FileSchema], default: [] },
    hearings: [{ type: Types.ObjectId, ref: 'Hearings', index: true }],
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
