import { CaseStatusEnum } from '../../types/CaseStatusEnum';

export type CaseCardPersistence = {
  _id: { toString(): string };
  title: string;
  processNumber: string;
  court: string;
  courtDivision: string;
  status: CaseStatusEnum;
  description: string;
  client: { toString(): string };
  lawyers: { toString(): string }[];
  files: { toString(): string }[];
  hearings: { toString(): string }[];
  createdAt: Date;
  updatedAt: Date;
};
