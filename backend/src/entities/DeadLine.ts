import { DeadlineType } from "../types/DeadLineType";

export interface DeadLine {
  processId: string;
  clientId: string;
  type: DeadlineType;
  startDate: Date;
  dueDate: Date;
  status: string;
  alerts: number[];
}
