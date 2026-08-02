import { FileDTO } from '../dtos/caseFile/FileDTO';
import { CreateFileDTO } from '../dtos/caseFile/CreateFileDTO';
import { CreateCaseDTO } from '../dtos/case/CreateCaseDTO';
import { CaseQuery } from '../types/CaseQuery';
import { CasesStats } from '../types/CasesStats';
import { Page } from '../types/Page';
import { WithId } from '../types/WithId';
import { UpdateCaseDTO } from '../dtos/case/UpdateCaseDTO';
import { CaseDTO } from '../dtos/case/CaseDTO';

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
