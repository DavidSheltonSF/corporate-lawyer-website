import { CreateCaseDTO } from '../../dtos/case/CreateCaseDTO.js';
import { CaseQuery } from '../../types/CaseQuery.js';
import { CasesStats } from '../../types/CasesStats.js';
import { Page } from '../../types/Page.js';
import { WithId } from '../../types/WithId.js';
import { CaseDTO } from '../../dtos/case/CaseDTO.js';

export interface ICaseService {
  create(data: CreateCaseDTO): Promise<WithId<CaseDTO>>;
  updateById(id: string, data: CreateCaseDTO): Promise<WithId<CaseDTO> | null>;
  findAll(queryParams?: CaseQuery): Promise<Page<WithId<CaseDTO>>>;
  findById(id: string, populate?: boolean): Promise<WithId<CaseDTO> | null>;
  getStatsByClientId(clientId: string): Promise<CasesStats>;
  getStats(): Promise<CasesStats>;
  deleteById(id: string): Promise<WithId<CaseDTO> | null>;
}
