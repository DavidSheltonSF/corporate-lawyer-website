import { CreateCaseDTO } from './CreateCaseDTO';

export type UpdateCaseDTO = Partial<Omit<CreateCaseDTO, 'client' | 'lawyers'>>;
