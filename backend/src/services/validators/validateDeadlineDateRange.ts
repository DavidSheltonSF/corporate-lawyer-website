import { InvalidDateRangeError } from '../../errors/domain/InvalidDateRangeError';

export function validateDeadlineDateRange(startDate: Date, dueDate: Date) {
  if (startDate > dueDate) {
    throw new InvalidDateRangeError(
      `Invalid date range (${startDate} - ${dueDate})The start date should not be greater than the due date`
    );
  }
}
