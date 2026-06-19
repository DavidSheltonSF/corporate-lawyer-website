import { UserName } from '../../types/UserName';
import { WithId } from '../../types/WithId';
import { FileDTO } from '../caseFile/FileDTO';
import { HearingDTO } from '../hearing/HearingDTO';
import { CaseLocationDTO } from './CaseLocationDTO';

export interface CasePopulatedResponseDTO {
  client: WithId<UserName>;
  lawyers: WithId<UserName>[];
  processNumber: string;
  title: string;
  description: string;
  court: string; //tribunal
  courtDivision: string; //vara
  files: WithId<FileDTO>[];
  hearings: WithId<HearingDTO>[];
  status: string;
  location: CaseLocationDTO;
  createdAt: string;
  updatedAt: string;
}
