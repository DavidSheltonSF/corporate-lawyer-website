import { Types } from 'mongoose';
import { CaseStatusEnum } from './CaseStatusEnum';
import { Case } from './Case';

export type CaseResponse = Omit<Case, 'hearings' | 'documents' | 'createdAt' | 'updatedAt'>

