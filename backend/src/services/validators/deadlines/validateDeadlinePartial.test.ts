import { Types } from 'mongoose';
import { InvalidDeadlineStatusError } from '../../../errors/domain/InvalidDeadlineStatusError';
import { DeadlineStatus } from '../../../types/DeadLineStatus';
import { validateDeadlinePartial } from './validateDeadlinePartial';
import { DeadlineType } from '../../../types/DeadLineType';
import { DeadlinePriority } from '../../../types/DeadLinePriority';
import { InvalidDeadlineTypeError } from '../../../errors/domain/InvalidDeadlineTypeError';
import { InvalidDeadlinePriorityError } from '../../../errors/domain/InvalidDeadlinePriorityError';
import { InvalidDateError } from '../../../errors/domain/InvalidDateError';
import { InvalidDateRangeError } from '../../../errors/domain/InvalidDateRangeError';

describe(`Testing ${validateDeadlinePartial.name}`, () => {
  function getThrownError(callBack: Function) {
    try {
      callBack();
      return null;
    } catch (error) {
      return error;
    }
  }

  test('should not throw error if all deadline fields are  valid', () => {
    const deadlineDTO = {
      type: DeadlineType.PAGAMENTO,
      dateRange: {
        startDate: '2050-02-15',
        dueDate: '2050-02-20',
      },
      status: DeadlineStatus.EM_ANDAMENTO,
      priority: DeadlinePriority.ALTA,
    };

    const thrownError = getThrownError(() => validateDeadlinePartial(deadlineDTO));
    expect(thrownError).toBeNull();
  });

  test('should throw InvalidDeadlineTypeError if type provided is invalid', () => {
    const deadlineDTO = {
      type: 'banana',
      startDate: '2050-02-15',
    };
    const thrownError = getThrownError(() => validateDeadlinePartial(deadlineDTO));
    expect(thrownError).toBeInstanceOf(InvalidDeadlineTypeError);
  });

  test('should throw InvalidDeadlineTypeError if type provided is invalid', () => {
    const deadlineDTO = {
      type: DeadlineType.AUDIENCIA,
      dateRange: {
        startDate: '2050-02-15',
        dueDate: '2050-02-20',
      },
      status: 'banana',
      priority: DeadlinePriority.ALTA,
    };
    const thrownError = getThrownError(() => validateDeadlinePartial(deadlineDTO));
    expect(thrownError).toBeInstanceOf(InvalidDeadlineStatusError);
  });

  test('should throw InvalidDeadlinePriorityError if type provided is invalid', () => {
    const deadlineDTO = {
      type: DeadlineType.AUDIENCIA,
      dateRange: {
        startDate: '2050-02-15',
        dueDate: '2050-02-20',
      },
      status: DeadlineStatus.EM_ANDAMENTO,
      priority: 'banana',
    };
    const thrownError = getThrownError(() => validateDeadlinePartial(deadlineDTO));
    expect(thrownError).toBeInstanceOf(InvalidDeadlinePriorityError);
  });

  test('should throw InvalidDateError if the start date or the due date provided is invalid', () => {
    const deadlineDTO = {
      type: DeadlineType.PAGAMENTO,
      dateRange: { startDate: '2050-02-55', dueDate: '2050-02-20' },
      status: DeadlineStatus.EM_ANDAMENTO,
      priority: DeadlinePriority.ALTA,
    };

    const thrownError = getThrownError(() => validateDeadlinePartial(deadlineDTO));
    expect(thrownError).toBeInstanceOf(InvalidDateError);
  });

  test('should throw InvalidDateRangeError if the start date provided is greater thant the due date', () => {
    const deadlineDTO = {
      type: DeadlineType.PAGAMENTO,
      dateRange: { startDate: '2050-02-20', dueDate: '2050-02-15' },
      status: DeadlineStatus.EM_ANDAMENTO,
      priority: DeadlinePriority.ALTA,
    };

    const thrownError = getThrownError(() => validateDeadlinePartial(deadlineDTO));
    expect(thrownError).toBeInstanceOf(InvalidDateRangeError);
  });
});
