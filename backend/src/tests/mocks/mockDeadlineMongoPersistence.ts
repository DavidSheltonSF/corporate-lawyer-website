import { WithMongoId } from '../../database/mongoDB/types/WithMongoId';
import { IDeadlineModel } from '../../models/DeadlineModel';
import { DeadlineType } from '../../types/DeadLineType';
import { DeadlinePriority } from '../../types/DeadLinePriority';
import { mockMongoId } from '../helpers/mockMongoId';
import casual from 'casual';

export function mockDeadlineMongoPersistence(): WithMongoId<IDeadlineModel> {
  return {
    _id: mockMongoId(),
    caseId: mockMongoId(),
    lawyerId: mockMongoId(),
    type: casual.random_element(Object.keys(DeadlineType)),
    intimationDate: new Date('2025-05-01'),
    days: casual.integer(0, 10),
    startDate: new Date('2025-05-05'),
    dueDate: new Date('2025-05-08'),
    priority: casual.random_element(Object.keys(DeadlinePriority)),
  };
}
