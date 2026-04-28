import { DeadlineDTO } from '../../../dtos/deadLine/DeadlineDTO';
import { validateDate } from '../validateDate';
import { validateDeadlinePriority } from './validateDeadlinePriority';
import { validateDeadlineType } from './validateDeadlineType';

export function validateDeadline(data: DeadlineDTO) {
  const { type, priority, intimationDate } = data;
  validateDeadlineType(type);
  validateDeadlinePriority(priority);
  validateDate(intimationDate);
}
