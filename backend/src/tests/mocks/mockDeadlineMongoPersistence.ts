import { WithMongoId } from '../../database/mongoDB/types/WithMongoId';
import { IDeadlineModel } from '../../models/DeadlineModel';
import { DeadlineType } from '../../types/DeadLineType';
import { DeadlinePriority } from '../../types/DeadLinePriority';
import { simpleFaker } from '@faker-js/faker';
import { mockMongoId } from '../helpers/mockMongoId';

export const mockDeadlineMongoPersistence: WithMongoId<IDeadlineModel> = {
  _id: mockMongoId(),
  caseId: mockMongoId(),
  lawyerId: mockMongoId(),
  type: simpleFaker.helpers.enumValue(DeadlineType),
  intimationDate: new Date('2025-05-01'),
  days: simpleFaker.number.int({ min: 1, max: 30 }),
  startDate: new Date('2025-05-05'),
  dueDate: new Date('2025-05-08'),
  priority: DeadlinePriority.ALTA,
};
