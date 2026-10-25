import { CreateCaseDTO } from './CreateCaseDTO.js';

export type UpdateCaseDTO = Omit<CreateCaseDTO, 'client' | 'lawyer'>;
