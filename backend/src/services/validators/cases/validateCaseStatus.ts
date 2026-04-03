import { InvalidCaseStatusError } from '../../../errors/domain/InvalidCaseStatusError';
import { CasesStatus } from '../../../types/CasesStatus';

export function validateCaseStatus(status: string) {
  const validStatus = Object.values(CasesStatus) as string[];
  if (!validStatus.includes(status)) {
    throw new InvalidCaseStatusError(status);
  }
}
