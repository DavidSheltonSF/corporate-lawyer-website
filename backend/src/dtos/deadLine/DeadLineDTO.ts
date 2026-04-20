export interface DeadLineDTO {
  processId: string;
  clientId: string;
  type: string;
  startDate: Date;
  dueDate: Date;
  status: string;
  priority: string;
  alerts: number[];
}
