import { CaseCardDTO } from '../dtos/case/CaseCardDTO';
import { CaseFileDTO } from '../dtos/caseFile/CaseFileDTO';
import { CreateCaseFileDTO } from '../dtos/caseFile/CreateCaseFileDTO';
import { CreateCaseDTO } from '../dtos/user/CreateCaseDTO';
import { Case } from '../entities/Case';
import { CaseFile } from '../entities/CaseFile';
import { CaseQuery } from '../types/CaseQuery';
import { CaseStats } from '../types/CaseStats';
import { Page } from '../types/Page';
import { WithId } from '../types/WithId';

export interface CaseRepository {
  findCases(queryParams: CaseQuery): Promise<Page<WithId<CaseCardDTO>>>;
  findById(id: string): Promise<WithId<CaseCardDTO> | null>;
  create(user: CreateCaseDTO): Promise<WithId<Case>>;
  getStats(client?: string): Promise<CaseStats | null>;
  addFile(caseId: string, file: CreateCaseFileDTO): Promise<void>;
  findFilesByCaseId(caseId: string): Promise<WithId<CaseFileDTO>[]>
  exists(id: string): Promise<boolean>;
}
