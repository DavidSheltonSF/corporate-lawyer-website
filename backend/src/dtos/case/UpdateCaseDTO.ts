import { CreateCaseDTO } from './CreateCaseDTO.js';

export type UpdateCaseDTO = Partial<Omit<CreateCaseDTO, 'client' | 'lawyers'>>;
