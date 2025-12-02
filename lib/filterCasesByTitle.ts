import { CaseProps } from '@/types/CaseProps';
import { WithId } from '@/types/WIthId';

export function filterCasesByTitle(cases: WithId<CaseProps>[], title: string): WithId<CaseProps>[] {
  const data = cases.filter((cas) => {
    let similar = true;
    for (let i = 0; i < title.length; i++) {
      if (title[i] !== cas.title[i]) {
        similar = false;
      }
    }

    if (similar) {
      return cas;
    }
  });

  return data;
}
