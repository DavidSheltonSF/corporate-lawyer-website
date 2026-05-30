import { CreateDeadlineDTO } from '../../../dtos/deadLine/CreateDeadlineDTO';
import { ValidationError } from '../../../errors/presentation/ValidationError';
import { validateDate } from '../validateDate';
import { validateDeadlinePriority } from './validateDeadlinePriority';
import { validateDeadlineType } from './validateDeadlineType';

export function validateDeadline(data: CreateDeadlineDTO) {
  const { type, priority, intimationDate } = data;

  const invalidFields: Record<string, string> = {};

  if (!validateDeadlineType(type)) {
    invalidFields.type = 'Invalid deadline type';
  }

  if (!validateDeadlinePriority(priority)) {
    invalidFields.priority = 'Invalid deadline priority';
  }

  if (!validateDate(intimationDate)) {
    invalidFields.intimationDate = 'Invalid date';
  }

  if (Object.keys(invalidFields).length > 0) {
    throw new ValidationError('Invalid deadline data', { fields: invalidFields });
  }
}
