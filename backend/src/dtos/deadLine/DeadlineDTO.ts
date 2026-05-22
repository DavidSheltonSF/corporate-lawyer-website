import { CaseLocationDTO } from "../case/CaseLocationDTO";

export interface DeadlineDTO {
  caseId: string;
  lawyerId: string;
  type: string;
  intimationDate: string;
  days: number;
  countingType: string;
  priority: string;
  status: string;
  startDate: string;
  dueDate: string;
  caseLocation: CaseLocationDTO
}
