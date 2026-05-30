import { UpdateDeadlineDTO } from '../../../dtos/deadLine/UpdateDeadlineDTO';
import { ValidationError } from '../../../errors/presentation/ValidationError';
import { isValidDateString } from '../isValidDateString';
import { isValidDeadlineCountingType } from './isValidDeadlineCountingType';
import { isValidDeadlinePriority } from './isValidDeadlinePriority';
import { isValidDeadlineType } from './isValidDeadlineType';

export function validateDeadlinePartial(data: UpdateDeadlineDTO) {
  const { type, priority, intimationDate, countingType } = data;

  const invalidFields: Record<string, string> = {};

  if (type && !isValidDeadlineType(type)) {
    invalidFields.type = 'Invalid deadline type';
  }

  if (countingType && !isValidDeadlineCountingType(countingType)) {
    invalidFields.countingType = 'Invalid deadline counting type';
  }

  if (priority && !isValidDeadlinePriority(priority)) {
    invalidFields.priority = 'Invalid deadline priority';
  }

  if (intimationDate && !isValidDateString(intimationDate)) {
    invalidFields.intimationDate = 'Invalid date';
  }

  if (Object.keys(invalidFields).length > 0) {
    throw new ValidationError('Invalid deadline data', { fields: invalidFields });
  }
}
