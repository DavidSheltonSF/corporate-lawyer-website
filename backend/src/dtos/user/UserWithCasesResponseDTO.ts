import { WithId } from '../../types/WithId';
import { CaseDTO } from '../case/CaseDTO';
import { UserResponseDTO } from './UserResponseDTO';

export type UserWithCasesResponseDTO = UserResponseDTO & {
  cases: WithId<CaseDTO>[];
};
