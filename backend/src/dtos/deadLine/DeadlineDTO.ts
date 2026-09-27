import { CaseLocationDTO } from '../case/CaseLocationDTO.js';

export interface DeadlineDTO {
  caseId: string;
  lawyerId: string;
  type: string;
  intimationDate: string;
  days: number;
  countingType: string;
  priority: string;
  startDate: string;
  dueDate: string;
  caseLocation: CaseLocationDTO;
}
