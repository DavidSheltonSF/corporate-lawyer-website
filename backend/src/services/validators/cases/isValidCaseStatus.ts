import { CasesStatus } from '../../../types/CasesStatus.js';

export function isValidCaseStatus(status: string): boolean {
  const validStatuses = Object.values(CasesStatus) as string[];
  return validStatuses.includes(status);
}
