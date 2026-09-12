import { FileDTO } from '../dtos/caseFile/FileDTO.js';
import { CreateFileDTO } from '../dtos/caseFile/CreateFileDTO.js';
import { CreateCaseDTO } from '../dtos/case/CreateCaseDTO.js';
import { CaseQuery } from '../types/CaseQuery.js';
import { CasesStats } from '../types/CasesStats.js';
import { Page } from '../types/Page.js';
import { WithId } from '../types/WithId.js';
import { UpdateCaseDTO } from '../dtos/case/UpdateCaseDTO.js';
import { CaseDTO } from '../dtos/case/CaseDTO.js';

export interface CaseRepository {
  create(user: CreateCaseDTO): Promise<WithId<CaseDTO>>;
  updateById(id: string, user: UpdateCaseDTO): Promise<WithId<CaseDTO> | null>;
  findAll(queryParams?: CaseQuery): Promise<Page<WithId<CaseDTO>>>;
  findById(id: string): Promise<WithId<CaseDTO> | null>;
  findPopulatedById(id: string): Promise<WithId<CaseDTO> | null>;
  getStatsByClientId(clientId: string): Promise<CasesStats>;
  getStats(): Promise<CasesStats>;
  existsById(id: string): Promise<boolean>;
  deleteById(id: string): Promise<WithId<CaseDTO> | null>;
  deleteByUserId(id: string): Promise<{
    acknowledged: boolean;
    deletedCount: number;
  }>;
}
