import { Types } from 'mongoose';
import { WithMongoId } from '../../database/mongoDB/types/WithMongoId';
import { IDeadlineModel } from '../../models/DeadlineModel';
import { DeadlineType } from '../../types/DeadLineType';
import { DeadlinePriority } from '../../types/DeadLinePriority';

export const mockDeadlineMongoDocs: WithMongoId<IDeadlineModel>[] = [
  {
    _id: Types.ObjectId.createFromTime(48585555),
    caseId: Types.ObjectId.createFromTime(485555),
    lawyerId: Types.ObjectId.createFromTime(47777555),
    type: DeadlineType.AUDIENCIA,
    intimationDate: new Date('2025-05-01'),
    days: 5,
    startDate: new Date('2025-05-05'),
    dueDate: new Date('2025-05-08'),
    priority: DeadlinePriority.ALTA,
  },
];
