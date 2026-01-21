import { Document, model, Schema, Types } from 'mongoose';

export interface ICaseFileModel {
  name: string;
  url: string;
  uploadedBy: Types.ObjectId;
  case: Types.ObjectId;
}

interface CaseFileMongoDocument extends ICaseFileModel, Document {}

const CaseFileSchema = new Schema<CaseFileMongoDocument>({
  name: { type: String, required: true },
  url: { type: String, required: true, unique: true },
  uploadedBy: { type: Types.ObjectId, required: true, ref: 'Users' },
  case: { type: Types.ObjectId, required: true, ref: 'Cases' },
}, {timestamps: true});

export const CaseFileModel = model<CaseFileMongoDocument>('CaseFiles', CaseFileSchema);
