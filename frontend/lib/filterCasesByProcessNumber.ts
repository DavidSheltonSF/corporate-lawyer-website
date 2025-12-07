import { CaseProps } from '@/types/CaseProps';
import { WithId } from '@/types/WithId';
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
