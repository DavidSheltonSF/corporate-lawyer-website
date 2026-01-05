import { CaseResponseDTO } from '../dtos/user/CaseResponseDTO';
import { CreateCaseDTO } from '../dtos/user/CreateCaseDTO';
import { CaseQuery } from '../types/CaseQuery';
import { CaseStats } from '../types/CaseStats';
import { WithId } from '../types/WithId';

export interface ICaseService {
  create(data: CreateCaseDTO): Promise<WithId<CaseResponseDTO>>;
  findAll(
    queryParams: CaseQuery,
    populateFields?: string[]
  ): Promise<{
    cases: CaseResponseDTO[];
    total: number;
    totalPages: number;
  }>;

  findById(id: string, populateFields?: string[]): Promise<CaseResponseDTO | null>;
  getStats(client?: string): Promise<CaseStats | null>;
}
