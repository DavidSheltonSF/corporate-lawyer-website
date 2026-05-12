import { WithId } from '../../types/WithId';
import { CaseDTO } from '../case/CaseDTO';
import { UserDTO } from './UserDTO';

export type UserWithCasesDTO = UserDTO & {
  cases: WithId<CaseDTO>[];
};
