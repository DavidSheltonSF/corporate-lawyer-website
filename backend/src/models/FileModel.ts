import { Document, model, Schema, Types } from 'mongoose';

export interface IFileModel {
  ownerId: string;
  name: string;
  url: string;
  downloadUrl: string;
  publicId: string;
  size: number;
  mimeType: string;
  uploadedBy: Types.ObjectId;
  uploadedAt: Date;
}

interface FileMongoDocument extends IFileModel, Document {}

export const FileSchema = new Schema<FileMongoDocument>({
  ownerId: { type: String, required: true },
  name: { type: String, required: true },
  url: { type: String, required: true },
  downloadUrl: { type: String, required: true },
  publicId: { type: String, required: true },
  size: { type: Number, required: true },
  mimeType: { type: String, required: true },
  uploadedBy: { type: Types.ObjectId, required: true, ref: 'Users' },
  uploadedAt: { type: Date, default: Date.now },
});

export const FileModel = model<FileMongoDocument>('Files', FileSchema);
