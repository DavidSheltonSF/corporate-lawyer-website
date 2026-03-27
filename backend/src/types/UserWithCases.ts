import { WithId } from './WithId';
import { Case } from '../entities/Case';
import { User } from '../entities/User';

export type UserWithCases = User & { cases: WithId<Case>[] };
