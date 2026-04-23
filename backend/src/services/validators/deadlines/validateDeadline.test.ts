import { Types } from 'mongoose';
import { InvalidDeadlineStatusError } from '../../../errors/domain/InvalidDeadlineStatusError';
import { DeadlineStatus } from '../../../types/DeadLineStatus';
import { validateDeadline } from './validateDeadline';
import { DeadlineType } from '../../../types/DeadLineType';
import { DeadlinePriority } from '../../../types/DeadLinePriority';
import { InvalidDeadlineTypeError } from '../../../errors/domain/InvalidDeadlineTypeError';
import { InvalidDeadlinePriorityError } from '../../../errors/domain/InvalidDeadlinePriorityError';
import { InvalidDateError } from '../../../errors/domain/InvalidDateError';
import { InvalidDateRangeError } from '../../../errors/domain/InvalidDateRangeError';

describe(`Testing ${validateDeadline.name}`, () => {
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
      caseId: Types.ObjectId.createFromTime(848484).toString(),
      clientId: Types.ObjectId.createFromTime(8484).toString(),
      type: DeadlineType.PAGAMENTO,
      startDate: '2050-02-15',
      dueDate: '2050-02-20',
      status: DeadlineStatus.EM_ANDAMENTO,
      priority: DeadlinePriority.ALTA,
    };

    const thrownError = getThrownError(() => validateDeadline(deadlineDTO));
    expect(thrownError).toBeNull();
  });

  test('should throw InvalidDeadlineTypeError if type provided is invalid', () => {
    const deadlineDTO = {
      caseId: Types.ObjectId.createFromTime(848484).toString(),
      clientId: Types.ObjectId.createFromTime(8484).toString(),
      type: 'banana',
      startDate: '2050-02-15',
      dueDate: '2050-02-20',
      status: DeadlineStatus.EM_ANDAMENTO,
      priority: DeadlinePriority.ALTA,
    };
    const thrownError = getThrownError(() => validateDeadline(deadlineDTO));
    expect(thrownError).toBeInstanceOf(InvalidDeadlineTypeError);
  });

  test('should throw InvalidDeadlineTypeError if type provided is invalid', () => {
    const deadlineDTO = {
      caseId: Types.ObjectId.createFromTime(848484).toString(),
      clientId: Types.ObjectId.createFromTime(8484).toString(),
      type: DeadlineType.AUDIENCIA,
      startDate: '2050-02-15',
      dueDate: '2050-02-20',
      status: 'banana',
      priority: DeadlinePriority.ALTA,
    };
    const thrownError = getThrownError(() => validateDeadline(deadlineDTO));
    expect(thrownError).toBeInstanceOf(InvalidDeadlineStatusError);
  });

  test('should throw InvalidDeadlinePriorityError if type provided is invalid', () => {
    const deadlineDTO = {
      caseId: Types.ObjectId.createFromTime(848484).toString(),
      clientId: Types.ObjectId.createFromTime(8484).toString(),
      type: DeadlineType.AUDIENCIA,
      startDate: '2050-02-15',
      dueDate: '2050-02-20',
      status: DeadlineStatus.EM_ANDAMENTO,
      priority: 'banana',
    };
    const thrownError = getThrownError(() => validateDeadline(deadlineDTO));
    expect(thrownError).toBeInstanceOf(InvalidDeadlinePriorityError);
  });

  test('should throw InvalidDateError if the start date or the due date provided is invalid', () => {
    const deadlineDTO = {
      caseId: Types.ObjectId.createFromTime(848484).toString(),
      clientId: Types.ObjectId.createFromTime(8484).toString(),
      type: DeadlineType.PAGAMENTO,
      startDate: '2050-02-55',
      dueDate: '2050-02-20',
      status: DeadlineStatus.EM_ANDAMENTO,
      priority: DeadlinePriority.ALTA,
    };

    const thrownError = getThrownError(() => validateDeadline(deadlineDTO));
    expect(thrownError).toBeInstanceOf(InvalidDateError);
  });

  test('should throw InvalidDateRangeError if the start date provided is greater thant the due date', () => {
    const deadlineDTO = {
      caseId: Types.ObjectId.createFromTime(848484).toString(),
      clientId: Types.ObjectId.createFromTime(8484).toString(),
      type: DeadlineType.PAGAMENTO,
      startDate: '2050-02-20',
      dueDate: '2050-02-15',
      status: DeadlineStatus.EM_ANDAMENTO,
      priority: DeadlinePriority.ALTA,
    };

    const thrownError = getThrownError(() => validateDeadline(deadlineDTO));
    expect(thrownError).toBeInstanceOf(InvalidDateRangeError);
  });
});
