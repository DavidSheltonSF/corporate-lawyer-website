import { CaseProps } from '@/types/CaseProps';
import { WithId } from '@/types/WIthId';

export function filterCasesByProcessNumber(
  cases: WithId<CaseProps>[],
  processNumber: string
): WithId<CaseProps>[] {
  const data = cases.filter((cas) => {
    let similar = true;
    for (let i = 0; i < processNumber.length; i++) {
      if (processNumber[i] !== cas.processNumber[i]) {
        similar = false;
      }
    }

    if (similar) {
      return cas;
    }
  });

  return data;
}
