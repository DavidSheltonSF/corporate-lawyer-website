import { UpdateDeadlineDTO } from '../../../dtos/deadLine/UpdateDeadlineDTO';
import { isValidDateString } from '../isValidDateString';
import { validateDeadlinePriority } from './validateDeadlinePriority';
import { validateDeadlineType } from './validateDeadlineType';

export function validateDeadlinePartial(data: UpdateDeadlineDTO) {
  const { type, priority, intimationDate } = data;

  if (type) {
    validateDeadlineType(type);
  }

  if (priority) {
    validateDeadlinePriority(priority);
  }

  if (intimationDate) {
    isValidDateString(intimationDate);
  }
}
