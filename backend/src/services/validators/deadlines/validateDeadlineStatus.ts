import { InvalidDeadlineStatusError } from '../../../errors/domain/InvalidDeadlineStatusError';
import { DeadlineStatus } from '../../../types/DeadLineStatus';

export function validateDeadlineStatus(status: string) {
  const validStatuses = Object.values(DeadlineStatus) as string[];
  if (!validStatuses.includes(status)) {
    throw new InvalidDeadlineStatusError(status);
  }
}
