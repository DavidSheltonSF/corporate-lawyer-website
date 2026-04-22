import { InvalidCaseStatusError } from '../../../errors/domain/InvalidCaseStatusError';
import { CasesStatus } from '../../../types/CasesStatus';

export function validateCaseStatus(status: string) {
  const validStatuses = Object.values(CasesStatus) as string[];
  if (!validStatuses.includes(status)) {
    throw new InvalidCaseStatusError(status);
  }
}
