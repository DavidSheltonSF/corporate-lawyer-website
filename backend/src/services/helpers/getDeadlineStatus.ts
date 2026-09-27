import { DeadlineStatus } from '../../types/DeadLineStatus.js';
import { normalizeDate } from '../../utils/normalizeDate.js';

export function getDeadlineStatus(startDate: string, dueDate: string): DeadlineStatus {
  const today = normalizeDate(new Date());
  if (today < new Date(startDate)) {
    return DeadlineStatus.PENDENTE;
  }

  if (today > new Date(dueDate)) {
    return DeadlineStatus.VENCIDO;
  }

  return DeadlineStatus.EM_ANDAMENTO;
}
