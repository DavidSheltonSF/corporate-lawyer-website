import { CaseCardDTO } from '../../dtos/case/CaseCardDTO';
import { CreateCaseFileDTO } from '../../dtos/caseFile/CreateCaseFileDTO';
import { CaseResponseDTO } from '../../dtos/user/CaseResponseDTO';
import { CreateCaseDTO } from '../../dtos/user/CreateCaseDTO';
import { CaseQuery } from '../../types/CaseQuery';
import { CaseStats } from '../../types/CaseStats';
import { WithId } from '../../types/WithId';

export interface ICaseService {
  create(data: CreateCaseDTO): Promise<WithId<CaseResponseDTO>>;
  findCases(queryParams: CaseQuery): Promise<{
    cases: CaseCardDTO[];
    total: number;
    totalPages: number;
  }>;
  findById(id: string, populateFields?: string[]): Promise<CaseCardDTO | null>;
  getStats(client?: string): Promise<CaseStats | null>;
  addFile(id: string, file: CreateCaseFileDTO): Promise<WithId<CaseCardDTO> | null>;
}
