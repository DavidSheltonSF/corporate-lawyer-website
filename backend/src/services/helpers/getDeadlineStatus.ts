import { DeadlineDTO } from '../../dtos/deadLine/DeadlineDTO';
import { DeadlineStatus } from '../../types/DeadLineStatus';

export function getDeadlineStatus(data: DeadlineDTO): DeadlineStatus {
  const { status, startDate, dueDate } = data;
  const now = new Date();

  if (DeadlineStatus.CANCELADO === status || DeadlineStatus.CONCLUIDO === status) {
    return DeadlineStatus[status];
  }

  if (now < new Date(startDate)) {
    return DeadlineStatus.PENDENTE;
  }

  if (now > new Date(dueDate)) {
    return DeadlineStatus.VENCIDO;
  }

  return DeadlineStatus.EM_ANDAMENTO;
}
