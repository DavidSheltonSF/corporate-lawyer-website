export interface UpdateDeadlineDTO {
  type?: string;
  dateRange?: { startDate: string; dueDate: string };
  status?: string;
  priority?: string;
}
