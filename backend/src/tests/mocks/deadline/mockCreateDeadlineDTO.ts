import { Types } from 'mongoose';
import { CreateDeadlineDTO } from '../../../dtos/deadLine/CreateDeadlineDTO';
import { DeadlinePriority } from '../../../types/DeadLinePriority';
import { DeadlineType } from '../../../types/DeadLineType';

export function mockCreateDeadlineDTO(): CreateDeadlineDTO {
  return {
    caseId: Types.ObjectId.createFromTime(48585555).toString(),
    lawyerId: Types.ObjectId.createFromTime(4822525).toString(),
    type: DeadlineType.CONTESTACAO,
    intimationDate: new Date().toISOString(),
    days: 5,
    priority: DeadlinePriority.ALTA,
  };
}
