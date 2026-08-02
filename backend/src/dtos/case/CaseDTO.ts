import { UserName } from '../../types/UserName';
import { WithId } from '../../types/WithId';
import { CaseLocationDTO } from './CaseLocationDTO';

export type CaseDTOPopulated = {
  populated: true;
  client: WithId<UserName>;
  lawyers: WithId<UserName>[];
};

export type CaseDTONonPopulated = { populated: false; client: string; lawyers: string[] };

export type CaseDTO = {
  processNumber: string;
  title: string;
  description: string;
  court: string; //tribunal
  courtDivision: string; //vara
  status: string;
  location: CaseLocationDTO;
  createdAt?: string;
  updatedAt?: string;
} & (CaseDTONonPopulated | CaseDTOPopulated);
