import { DeadlineUrgency } from '@/types/DeadlineUrgency';

export function getDeadlineUrgency(days: number): DeadlineUrgency {
  if (days < 0) return 'OVERDUE';
  if (days === 0) return 'DANGER';
  if (days <= 3) return 'WARNING';
  return 'SAFE';
}
