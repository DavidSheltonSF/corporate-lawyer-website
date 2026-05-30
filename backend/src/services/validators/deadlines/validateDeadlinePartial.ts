import { UpdateDeadlineDTO } from '../../../dtos/deadLine/UpdateDeadlineDTO';
import { isValidDateString } from '../isValidDateString';
import { validateDeadlinePriority } from './validateDeadlinePriority';
import { isValidDeadlineType } from './isValidDeadlineType';

export function validateDeadlinePartial(data: UpdateDeadlineDTO) {
  const { type, priority, intimationDate } = data;

  if (type) {
    isValidDeadlineType(type);
  }

  if (priority) {
    validateDeadlinePriority(priority);
  }

  if (intimationDate) {
    isValidDateString(intimationDate);
  }
}
