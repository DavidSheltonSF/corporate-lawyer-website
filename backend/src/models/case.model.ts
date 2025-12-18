import { Schema, model, Document, Types } from 'mongoose';
import { Case } from '../types/Case';

interface ICase extends Case, Document {}

const CaseSchema = new Schema<ICase>(
  {
    client: { type: Types.ObjectId, ref: 'Users', index: true, required: true },
    lawyers: [{ type: Types.ObjectId, ref: 'Users', index: true, required: true }],
    processNumber: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    court: { type: String, required: true },
    courtDivision: { type: String, required: true },
    documents: [{ type: Types.ObjectId, ref: 'CaseDocuments', index: true}],
    hearings: [{ type: Types.ObjectId, ref: 'Hearings', index: true }],
    status: { type: String, enum: ['aberto', 'em_andamento', 'esperando_documentos', 'encerrado'], required: true},
  },
  { timestamps: true }
);

export const CaseModel = model<ICase>('Cases', CaseSchema);
