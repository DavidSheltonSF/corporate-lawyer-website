import { CaseLocationDTO } from '../case/CaseLocationDTO.js';
import { DeadlineDTO } from './DeadlineDTO.js';

export type DeadlineResponseDTO = DeadlineDTO & {
  status: string;
  remainingDays: number;
  caseLocation: CaseLocationDTO;
};
