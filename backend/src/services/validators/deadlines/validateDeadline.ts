import { DeadlineDTO } from '../../../dtos/deadLine/DeadlineDTO';
import { validateDate } from '../validateDate';
import { validateDeadlineDateRange } from '../validateDeadlineDateRange';
import { validateDeadlinePriority } from './validateDeadlinePriority';
import { validateDeadlineStatus } from './validateDeadlineStatus';
import { validateDeadlineType } from './validateDeadlineType';

export function validateDeadline(data: DeadlineDTO) {
  const { type, priority, status, startDate, dueDate } = data;

  if (status) {
    validateDeadlineStatus(status);
  }

  validateDeadlineType(type);
  validateDeadlinePriority(priority);
  validateDate(startDate);
  validateDate(dueDate);

  const parsedStartDate = new Date(startDate);
  const parsedDueDate = new Date(dueDate);

  validateDeadlineDateRange(parsedStartDate, parsedDueDate);
}
