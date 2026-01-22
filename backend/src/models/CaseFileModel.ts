import { Document, model, Schema, Types } from 'mongoose';

export interface ICaseFileModel {
  name: string;
  url: string;
  size: number;
  mimeType: string;
  uploadedBy: Types.ObjectId;
  uploadedAt: Date;
}

interface CaseFileMongoDocument extends ICaseFileModel, Document {}

export const CaseFileSchema = new Schema<CaseFileMongoDocument>(
  {
    _id: { type: Schema.Types.ObjectId, default: () => new Types.ObjectId() },
    name: { type: String, required: true },
    url: { type: String, required: true, unique: true },
    size: { type: Number, required: true },
    mimeType: { type: String, required: true },
    uploadedBy: { type: Types.ObjectId, required: true, ref: 'Users' },
    uploadedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

export const CaseFileModel = model<CaseFileMongoDocument>('CaseFiles', CaseFileSchema);
