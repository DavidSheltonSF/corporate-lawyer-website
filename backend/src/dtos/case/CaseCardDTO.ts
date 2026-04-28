import { UserName } from '../../types/UserName';
import { WithId } from '../../types/WithId';
import { CaseFileDTO } from '../caseFile/CaseFileDTO';
import { HearingDTO } from '../hearing/HearingDTO';
import { CaseLocationDTO } from './CaseLocationDTO';

export interface CaseCardDTO {
  client: WithId<UserName>;
  lawyers: WithId<UserName>[];
  processNumber: string;
  title: string;
  description: string;
  court: string; //tribunal
  courtDivision: string; //vara
  files: WithId<CaseFileDTO>[];
  hearings: WithId<HearingDTO>[];
  status: string;
  location: CaseLocationDTO;
  createdAt: string;
  updatedAt: string;
}
