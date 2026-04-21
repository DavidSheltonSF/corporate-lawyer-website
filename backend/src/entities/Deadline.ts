import { DeadlinePriority } from '../types/DeadLinePriority';
import { DeadlineStatus } from '../types/DeadLineStatus';
import { DeadlineType } from '../types/DeadLineType';

export interface Deadline {
  caseId: string;
  clientId: string;
  type: DeadlineType;
  startDate: Date;
  dueDate: Date;
  status: DeadlineStatus;
  priority: DeadlinePriority;
}
