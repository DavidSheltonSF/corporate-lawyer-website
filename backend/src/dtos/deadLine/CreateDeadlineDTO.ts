export interface CreateDeadlineDTO {
  caseId: string;
  lawyerId: string;
  type: string;
  intimationDate: string;
  days: number;
  countingType: string;
  priority: string;
}
