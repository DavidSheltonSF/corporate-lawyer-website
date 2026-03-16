import { CaseCardDTO } from '../dtos/case/CaseCardDTO';
import { CaseFileDTO } from '../dtos/caseFile/CaseFileDTO';
import { CreateCaseFileDTO } from '../dtos/caseFile/CreateCaseFileDTO';
import { CreateCaseDTO } from '../dtos/case/CreateCaseDTO';
import { Case } from '../entities/Case';
import { CaseQuery } from '../types/CaseQuery';
import { CasesStats } from '../types/CasesStats';
import { Page } from '../types/Page';
import { WithId } from '../types/WithId';

export interface CaseRepository {
  create(user: CreateCaseDTO): Promise<WithId<Case>>;
  addFile(caseId: string, file: CreateCaseFileDTO): Promise<void>;
  findCases(queryParams: CaseQuery): Promise<Page<WithId<CaseCardDTO>>>;
  findById(id: string): Promise<WithId<CaseCardDTO> | null>;
  getStatsByClientId(clientId: string): Promise<CasesStats | null>;
  getStats(): Promise<CasesStats>;
  findFilesByCaseId(caseId: string): Promise<WithId<CaseFileDTO>[]>;
  exists(id: string): Promise<boolean>;
  deleteByUserId(id: string): Promise<{
    acknowledged: boolean;
    deletedCount: number;
  }>;
}
