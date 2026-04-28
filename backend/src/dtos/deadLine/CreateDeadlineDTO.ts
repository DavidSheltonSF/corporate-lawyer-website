export interface CreateDeadlineDTO {
  caseId: string;
  lawyerId: string;
  type: string;
  intimationDate: string;
  days: number;
  priority: string;
}
