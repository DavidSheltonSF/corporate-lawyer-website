import { CreateDeadlineDTO } from '../../../dtos/deadLine/CreateDeadlineDTO';
import { ValidationError } from '../../../errors/presentation/ValidationError';
import { isValidDateString } from '../isValidDateString';
import { validateDeadlinePriority } from './validateDeadlinePriority';
import { isValidDeadlineType } from './isValidDeadlineType';

export function validateDeadline(data: CreateDeadlineDTO) {
  const { type, priority, intimationDate } = data;

  const invalidFields: Record<string, string> = {};

  if (!isValidDeadlineType(type)) {
    invalidFields.type = 'Invalid deadline type';
  }

  if (!validateDeadlinePriority(priority)) {
    invalidFields.priority = 'Invalid deadline priority';
  }

  if (!isValidDateString(intimationDate)) {
    invalidFields.intimationDate = 'Invalid date';
  }

  if (Object.keys(invalidFields).length > 0) {
    throw new ValidationError('Invalid deadline data', { fields: invalidFields });
  }
}
