import { UpdateDeadlineDTO } from '../../../dtos/deadLine/UpdateDeadlineDTO';
import { validateDate } from '../validateDate';
import { validateDeadlineDateRange } from '../validateDeadlineDateRange';
import { validateDeadlinePriority } from './validateDeadlinePriority';
import { validateDeadlineStatus } from './validateDeadlineStatus';
import { validateDeadlineType } from './validateDeadlineType';

export function validateDeadlinePartial(data: UpdateDeadlineDTO) {
  const { type, priority, status, dateRange } = data;

  if (status) {
    validateDeadlineStatus(status);
  }

  if (type) {
    validateDeadlineType(type);
  }

  if (priority) {
    validateDeadlinePriority(priority);
  }

  if (dateRange) {
    const { startDate, dueDate } = dateRange;
    validateDate(startDate);
    validateDate(dueDate);

    const parsedStartDate = new Date(startDate);
    const parsedDueDate = new Date(dueDate);
    validateDeadlineDateRange(parsedStartDate, parsedDueDate);
  }
}
