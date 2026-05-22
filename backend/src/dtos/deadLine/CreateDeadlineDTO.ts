import { CaseLocationDTO } from '../case/CaseLocationDTO';

export interface CreateDeadlineDTO {
  caseId: string;
  lawyerId: string;
  type: string;
  intimationDate: string;
  days: number;
  countingType: string;
  priority: string;
  caseLocation: CaseLocationDTO;
}
