import { CaseStatusEnum } from '../../types/CaseStatusEnum';
import { CaseFilePersistence } from '../CaseFile/CaseFilePersistence';
import { HearingPersistence } from '../Hearing/HearingPersistence';
import { UserIdentityPersistence } from '../User/UserIdentityPersistence';

export type CaseCardPersistencePopulated = {
  _id: { toString(): string };
  title: string;
  processNumber: string;
  court: string;
  courtDivision: string;
  status: CaseStatusEnum;
  description: string;
  client: UserIdentityPersistence;
  lawyers: UserIdentityPersistence[];
  files: CaseFilePersistence[];
  hearings: HearingPersistence[];
  createdAt: Date;
  updatedAt: Date;
};
