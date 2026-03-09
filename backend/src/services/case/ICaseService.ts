import { CaseCardDTO } from '../../dtos/case/CaseCardDTO';
import { CaseFileDTO } from '../../dtos/caseFile/CaseFileDTO';
import { CreateCaseFileDTO } from '../../dtos/caseFile/CreateCaseFileDTO';
import { CaseResponseDTO } from '../../dtos/user/CaseResponseDTO';
import { CreateCaseDTO } from '../../dtos/user/CreateCaseDTO';
import { CaseQuery } from '../../types/CaseQuery';
import { CaseStats } from '../../types/CaseStats';
import { Pagination } from '../../types/Pagination';
import { WithId } from '../../types/WithId';

export interface ICaseService {
  create(data: CreateCaseDTO): Promise<WithId<CaseResponseDTO>>;
  findCases(queryParams: CaseQuery): Promise<Pagination<WithId<CaseCardDTO>>>;
  findById(id: string, populateFields?: string[]): Promise<CaseCardDTO | null>;
  getStats(client?: string): Promise<CaseStats | null>;
  addFile(id: string, file: CreateCaseFileDTO): Promise<WithId<CaseCardDTO> | null>;
  findFilesByCaseId(id: string): Promise<WithId<CaseFileDTO>[] | null>;
}
