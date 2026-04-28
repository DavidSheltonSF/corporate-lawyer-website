import { CreateDeadlineDTO } from '../../../dtos/deadLine/CreateDeadlineDTO';
import { validateDate } from '../validateDate';
import { validateDeadlinePriority } from './validateDeadlinePriority';
import { validateDeadlineType } from './validateDeadlineType';

export function validateDeadline(data: CreateDeadlineDTO) {
  const { type, priority, intimationDate } = data;
  validateDeadlineType(type);
  validateDeadlinePriority(priority);
  validateDate(intimationDate);
}
