import { CreateDeadlineDTO } from '../../../dtos/deadLine/CreateDeadlineDTO';
import { ValidationError } from '../../../errors/presentation/ValidationError';
import { isValidDateString } from '../isValidDateString';
import { isValidDeadlineCountingType } from './isValidDeadlineCountingType';
import { isValidDeadlinePriority } from './isValidDeadlinePriority';
import { isValidDeadlineType } from './isValidDeadlineType';

export function validateDeadline(data: CreateDeadlineDTO) {
  const { type, priority, intimationDate, countingType, days } = data;

  const invalidFields: Partial<Record<keyof CreateDeadlineDTO, string>> = {};

  if (!isValidDeadlineType(type)) {
    invalidFields.type = 'Invalid deadline type';
  }

  if (!isValidDeadlineCountingType(countingType)) {
    invalidFields.countingType = 'Invalid deadline counting type';
  }

  if (!isValidDeadlinePriority(priority)) {
    invalidFields.priority = 'Invalid deadline priority';
  }

  if (!isValidDateString(intimationDate)) {
    invalidFields.intimationDate = 'Invalid date';
  }

  if (days <= 0) {
    invalidFields.days = 'Days should be greater than 0'
  }

  if (Object.keys(invalidFields).length > 0) {
    throw new ValidationError('Invalid deadline data', { fields: invalidFields });
  }
}
