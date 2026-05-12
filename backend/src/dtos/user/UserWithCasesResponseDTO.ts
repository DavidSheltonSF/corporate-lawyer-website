import { WithId } from '../../types/WithId';
import { CaseDTO } from '../case/CaseDTO';
import { UserDTO } from './UserDTO';

export type UserWithCasesResponseDTO = Omit<UserDTO, 'password'> & {
  cases: WithId<CaseDTO>[];
};
