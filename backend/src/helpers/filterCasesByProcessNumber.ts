import { Case } from "../types/Case";
import { WithId } from "../types/WithId";
import { normalizeString } from "./normalizeString";

export function filterCasesByProcessNumber(
  cases: WithId<Case>[],
  processNumber: string
): WithId<Case>[] {
  const data = cases.filter((cas) => {
    if (normalizeString(cas.processNumber).startsWith(normalizeString(processNumber))) {
      return cas;
    }
  });

  return data;
}
