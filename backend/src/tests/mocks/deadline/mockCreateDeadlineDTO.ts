import { CreateDeadlineDTO } from '../../../dtos/deadLine/CreateDeadlineDTO';
import { DeadlinePriority } from '../../../types/DeadLinePriority';
import { DeadlineType } from '../../../types/DeadLineType';

export function mockCreateDeadlineDTO(): CreateDeadlineDTO {
  return {
    caseId: 'fafdfgdgagagadga',
    lawyerId: 'fsojnfosngishgomgg56',
    type: DeadlineType.CONTESTACAO,
    intimationDate: '2026-02-25',
    days: 5,
    priority: DeadlinePriority.ALTA,
  };
}
