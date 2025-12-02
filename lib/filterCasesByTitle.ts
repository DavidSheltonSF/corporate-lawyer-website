import { CaseProps } from '@/types/CaseProps';
import { WithId } from '@/types/WIthId';

export function filterCasesByTitle(cases: WithId<CaseProps>[], title: string): WithId<CaseProps>[] {
  const data = cases.filter((cas) => {
    let similar = true;
    for (let i = 0; i < title.length; i++) {
      if (title.toLowerCase()[i] !== cas.title.toLowerCase()[i]) {
        similar = false;
      }
    }

    if (similar) {
      return cas;
    }
  });

  return data;
}
