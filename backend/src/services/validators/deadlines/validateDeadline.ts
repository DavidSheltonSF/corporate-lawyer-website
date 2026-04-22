import { DeadlineDTO } from '../../../dtos/deadLine/DeadlineDTO';
import { validateDeadlinePriority } from './validateDeadlinePriority';
import { validateDeadlineStatus } from './validateDeadlineStatus';
import { validateDeadlineType } from './validateDeadlineType';

export function validateDeadline(data: DeadlineDTO) {
  const { type, priority, status } = data;

  if (status) {
    validateDeadlineStatus(status);
  }

  validateDeadlineType(type);
  validateDeadlinePriority(priority);
}
