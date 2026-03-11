import { CaseCardDTO } from '../../dtos/case/CaseCardDTO';
import { CaseFileDTO } from '../../dtos/caseFile/CaseFileDTO';
import { CreateCaseFileDTO } from '../../dtos/caseFile/CreateCaseFileDTO';
import { CaseResponseDTO } from '../../dtos/user/CaseResponseDTO';
import { CreateCaseDTO } from '../../dtos/user/CreateCaseDTO';
import { CaseQuery } from '../../types/CaseQuery';
import { CasesStats } from '../../types/CasesStats';
import { Page } from '../../types/Page';
import { WithId } from '../../types/WithId';

export interface ICaseService {
  create(data: CreateCaseDTO): Promise<WithId<CaseResponseDTO>>;
  findCases(queryParams: CaseQuery): Promise<Page<WithId<CaseCardDTO>>>;
  findById(id: string): Promise<WithId<CaseCardDTO>>;
  getStatsByClientId(clientId: string): Promise<CasesStats | null>;
  addFile(caseId: string, file: CreateCaseFileDTO): Promise<void>;
  findFilesByCaseId(id: string): Promise<WithId<CaseFileDTO>[]>;
}
