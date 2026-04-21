import { DeadlinePriority } from '../types/DeadLinePriority';
import { DeadlineType } from '../types/DeadLineType';

export interface Deadline {
  processId: string;
  clientId: string;
  type: DeadlineType;
  startDate: Date;
  dueDate: Date;
  status: DeadlineStatus;
  priority: DeadlinePriority;
}
