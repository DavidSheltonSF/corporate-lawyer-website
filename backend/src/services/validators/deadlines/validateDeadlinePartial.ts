import { UpdateDeadlineDTO } from '../../../dtos/deadLine/UpdateDeadlineDTO.js';
import { ValidationError } from '../../../errors/presentation/ValidationError.js';
import { isValidDateString } from '../isValidDateString.js';
import { isValidDeadlineCountingType } from './isValidDeadlineCountingType.js';
import { isValidDeadlineDays } from './isValidDeadlineDays.js';
import { isValidDeadlinePriority } from './isValidDeadlinePriority.js';
import { isValidDeadlineType } from './isValidDeadlineType.js';

export function validateDeadlinePartial(data: UpdateDeadlineDTO) {
  const { days, type, priority, intimationDate, countingType } = data;

  const invalidFields: Partial<Record<keyof UpdateDeadlineDTO, string>> = {};

  if (days && !isValidDeadlineDays(days)) {
    invalidFields.days = 'The number of days most a be positive value';
  }

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
