import { WithId } from '../../types/WithId';
import { CaseResponseDTO } from '../case/CaseResponseDTO';
import { UserResponseDTO } from './UserResponseDTO';

export type UserWithCasesResponseDTO = UserResponseDTO & {
  cases: WithId<CaseResponseDTO>[];
};
