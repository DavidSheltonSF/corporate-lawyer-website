import { CaseCardDTO } from '../../dtos/case/CaseCardDTO';
import { CaseFileDTO } from '../../dtos/caseFile/CaseFileDTO';
import { CreateCaseFileDTO } from '../../dtos/caseFile/CreateCaseFileDTO';
import { CaseResponseDTO } from '../../dtos/user/CaseResponseDTO';
import { CreateCaseDTO } from '../../dtos/user/CreateCaseDTO';
import { CaseQuery } from '../../types/CaseQuery';
import { CaseStats } from '../../types/CaseStats';
import { Page } from '../../types/Page';
import { WithId } from '../../types/WithId';

export interface ICaseService {
  create(data: CreateCaseDTO): Promise<WithId<CaseResponseDTO>>;
  findCases(queryParams: CaseQuery): Promise<Page<WithId<CaseCardDTO>>>;
  findById(id: string): Promise<WithId<CaseCardDTO>>;
  getStats(client?: string): Promise<CaseStats | null>;
  addFile(id: string, file: CreateCaseFileDTO): Promise<void>;
  findFilesByCaseId(id: string): Promise<WithId<CaseFileDTO>[]>;
}
