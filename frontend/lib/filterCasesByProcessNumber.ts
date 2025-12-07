import { CaseProps } from '@/frontend/types/CaseProps';
import { WithId } from '@/frontend/types/WithId';
import { normalizeString } from './normalizeString';

export function filterCasesByProcessNumber(
  cases: WithId<CaseProps>[],
  processNumber: string
): WithId<CaseProps>[] {
  const data = cases.filter((cas) => {
    if (normalizeString(cas.processNumber).startsWith(normalizeString(processNumber))) {
      return cas;
    }
  });

  return data;
}
