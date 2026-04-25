export interface DeadlineDTO {
  caseId: string;
  lawyerId: string;
  type: string;
  startDate: string;
  dueDate: string;
  status?: string;
  priority: string;
}
