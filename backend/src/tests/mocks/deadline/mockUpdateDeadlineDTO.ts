import { UpdateDeadlineDTO } from '../../../dtos/deadLine/UpdateDeadlineDTO';
import { DeadlinePriority } from '../../../types/DeadLinePriority';
import { DeadlineType } from '../../../types/DeadLineType';

export function mockUpateDeadlineDTO(): UpdateDeadlineDTO {
  return {
    type: DeadlineType.CONTESTACAO,
    intimationDate: '2026-02-25',
    days: 5,
    priority: DeadlinePriority.ALTA,
  };
}
