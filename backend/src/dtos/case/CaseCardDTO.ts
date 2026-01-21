import { UserName } from '../../types/UserName';
import { WithId } from '../../types/WithId';
import { CaseFileDTO } from '../caseFile/CaseFileDTO';
import { HearingDTO } from '../hearing/HearingDTO';

export interface CaseCardDTO {
  client: WithId<UserName>;
  lawyers: WithId<UserName>[];
  processNumber: string;
  title: string;
  description: string;
  court: string; //tribunal
  courtDivision: string; //vara
  documents: CaseFileDTO[];
  hearings: HearingDTO[];
  status: string;
  createdAt: string;
  updatedAt: string;
}
