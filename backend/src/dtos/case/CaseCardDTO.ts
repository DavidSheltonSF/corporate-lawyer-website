import { UserName } from '../../types/UserName';
import { WithId } from '../../types/WithId';
import { HearingDTO } from '../hearing/HearingDTO';

export interface CaseCardDTO {
  client: WithId<UserName>;
  lawyers: WithId<UserName>[];
  processNumber: string;
  title: string;
  description: string;
  court: string; //tribunal
  courtDivision: string; //vara
  documents?: CaseCardDTO[] | undefined;
  hearings?: HearingDTO[] | undefined;
  status: string;
  createdAt: string;
  updatedAt: string;
}
