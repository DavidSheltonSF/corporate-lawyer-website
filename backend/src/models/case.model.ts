import { Schema, model, Document, Types } from 'mongoose';
import { Case } from '../types/Case';

interface ICase extends Case, Document {}

const CaseSchema = new Schema<ICase>(
  {
    clientId: { type: Types.ObjectId, ref: 'Users', index: true, required: true  },
    lawyerIds: { type: [Types.ObjectId], ref: 'Users', index: true, required: true },
    processNumber: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    tribunal: { type: String, required: true },
    vara: { type: String, required: true },
    documentIds: { type: [String], required: true },
    hearingIds: { type: [String], required: true },
    status: { type: String, enum: ['aberto', 'em_andamento', 'esperando_documentos', 'encerrado'] },
  },
  { timestamps: true }
);

export const CaseModel = model<ICase>('Cases', CaseSchema);
