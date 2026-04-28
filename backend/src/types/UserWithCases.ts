import { WithId } from './WithId';
import { User } from '../entities/User';
import { CaseResponseDTO } from '../dtos/case/CaseResponseDTO';

export type UserWithCases = User & { cases: WithId<CaseResponseDTO>[] };
