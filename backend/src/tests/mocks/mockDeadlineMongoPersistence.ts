import { WithMongoId } from '../../database/mongoDB/types/WithMongoId';
import { IDeadlineModel } from '../../models/DeadlineModel';
import { DeadlineType } from '../../types/DeadLineType';
import { DeadlinePriority } from '../../types/DeadLinePriority';
import { Mocker } from '../helpers/Mocker';

export function mockDeadlineMongoPersistence(): WithMongoId<IDeadlineModel> {
  return {
    _id: Mocker.mockMongoId(),
    caseId: Mocker.mockMongoId(),
    lawyerId: Mocker.mockMongoId(),
    type: Mocker.mockEnum(DeadlineType),
    intimationDate: new Date('2025-05-01'),
    days: Mocker.mockInteger(1, 30),
    startDate: new Date('2025-05-05'),
    dueDate: new Date('2025-05-08'),
    priority: Mocker.mockEnum(DeadlinePriority),
  };
}
