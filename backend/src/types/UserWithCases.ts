import { WithId } from './WithId';
import { User } from '../entities/User';
import { CaseDTO } from '../dtos/case/CaseDTO';

export type UserWithCases = User & { cases: WithId<CaseDTO>[] };
