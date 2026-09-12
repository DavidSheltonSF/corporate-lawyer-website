import { UserSlice } from '../../types/UserSlice.js';
import { WithId } from '../../types/WithId.js';
import { CaseLocationDTO } from './CaseLocationDTO.js';

export type CaseDTOPopulated = {
  populated: true;
  client: WithId<UserSlice>;
  lawyers: WithId<UserSlice>[];
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
