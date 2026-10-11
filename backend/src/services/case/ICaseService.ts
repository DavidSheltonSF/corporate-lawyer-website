import { CreateCaseDTO } from '../../dtos/case/CreateCaseDTO.js';
import { CaseQueryParams } from '../../types/CaseQueryParams.js';
import { CasesStats } from '../../types/CasesStats.js';
import { Page } from '../../types/Page.js';
import { WithId } from '../../types/WithId.js';
import { CaseDTO } from '../../dtos/case/CaseDTO.js';
import { UpdateCaseDTO } from '../../dtos/case/UpdateCaseDTO.js';

export interface ICaseService {
  create(data: CreateCaseDTO): Promise<WithId<CaseDTO>>;
  updateById(id: string, data: UpdateCaseDTO): Promise<WithId<CaseDTO> | null>;
  findAll(queryParams: CaseQueryParams): Promise<Page<WithId<CaseDTO>>>;
  findById(id: string, populate?: boolean): Promise<WithId<CaseDTO> | null>;
  getStatsByClientId(clientId: string): Promise<CasesStats>;
  getStats(): Promise<CasesStats>;
  deleteById(id: string): Promise<WithId<CaseDTO> | null>;
}
