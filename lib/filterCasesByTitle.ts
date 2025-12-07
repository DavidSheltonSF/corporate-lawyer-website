import { CaseProps } from '@/types/CaseProps';
import { WithId } from '@/types/WithId';
import { normalizeString } from './normalizeString';

export function filterCasesByTitle(cases: WithId<CaseProps>[], title: string): WithId<CaseProps>[] {
  const data = cases.filter((cas) => {
    // Check if the case's title starts with the title used to filter
    if (normalizeString(cas.title).startsWith(normalizeString(title))) {
      return cas;
    }
  });

  return data;
}
