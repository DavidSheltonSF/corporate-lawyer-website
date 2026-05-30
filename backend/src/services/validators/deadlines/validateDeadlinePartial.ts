import { UpdateDeadlineDTO } from '../../../dtos/deadLine/UpdateDeadlineDTO';
import { isValidDateString } from '../isValidDateString';
import { isValidDeadlinePriority } from './isValidDeadlinePriority';
import { isValidDeadlineType } from './isValidDeadlineType';

export function validateDeadlinePartial(data: UpdateDeadlineDTO) {
  const { type, priority, intimationDate } = data;

  if (type) {
    isValidDeadlineType(type);
  }

  if (priority) {
    isValidDeadlinePriority(priority);
  }

  if (intimationDate) {
    isValidDateString(intimationDate);
  }
}
