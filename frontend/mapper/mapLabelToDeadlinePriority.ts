import { DeadlinePriority } from "@/types/DeadlinePriority";


export function mapLabelToDeadlinePriority(label: string): DeadlinePriority {
  switch (label.toLowerCase()) {
    case 'alta':
      return 'ALTA';
    case 'média':
      return 'MEDIA';
    case 'baixa':
      return 'BAIXA';

    default:
      throw Error(`Invalid deadline priority ${label}`);
  }
}
