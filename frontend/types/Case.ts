import { BrazilState } from './BrazilState';
import { CaseFile } from './CaseFile';
import { CaseStatusEnum } from './CaseStatusEnum';
import { City } from './City';
import { HearingProps } from './HearingProps';
import { WithId } from './WithId';

export interface Case {
  clientId: string;
  lawyersIds: string[];
  processNumber: string;
  title: string;
  description?: string;
  court: string;
  courtDivision: string;
  files: WithId<CaseFile>[];
  hearings: HearingProps[];
  status: CaseStatusEnum;
  location: {
    state: BrazilState;
    city: City;
  };
  createdAt: Date;
  updatedAt: Date;
}
