export interface DeadlineDTO {
  processId: string;
  clientId: string;
  type: string;
  startDate: Date;
  dueDate: Date;
  status: string;
  priority: string;
}
