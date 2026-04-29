import { CreateDeadlineDTO } from '../../../dtos/deadLine/CreateDeadlineDTO';
import { DeadlinePriority } from '../../../types/DeadLinePriority';
import { DeadlineType } from '../../../types/DeadLineType';
import { Mocker } from '../../helpers/Mocker';

export function mockCreateDeadlineDTO(): CreateDeadlineDTO {
  return {
    caseId: Mocker.mockMongoId().toString(),
    lawyerId: Mocker.mockMongoId().toString(),
    type: Mocker.mockEnum(DeadlineType),
    intimationDate: new Date().toISOString(),
    days: Mocker.mockInteger(1, 30),
    priority: Mocker.mockEnum(DeadlinePriority),
  };
}
