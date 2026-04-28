import { CasePopulatedResponseDTO } from '../dtos/case/CasePopulatedResponseDTO';
import { CaseFileDTO } from '../dtos/caseFile/CaseFileDTO';
import { CreateCaseFileDTO } from '../dtos/caseFile/CreateCaseFileDTO';
import { CreateCaseDTO } from '../dtos/case/CreateCaseDTO';
import { CaseQuery } from '../types/CaseQuery';
import { CasesStats } from '../types/CasesStats';
import { Page } from '../types/Page';
import { WithId } from '../types/WithId';
import { UpdateCaseDTO } from '../dtos/case/UpdateCaseDTO';
import { CaseResponseDTO } from '../dtos/case/CaseResponseDTO';

export interface CaseRepository {
  create(user: CreateCaseDTO): Promise<WithId<CaseResponseDTO>>;
  updateById(id: string, user: UpdateCaseDTO): Promise<WithId<CaseResponseDTO> | null>;
  addFile(caseId: string, file: CreateCaseFileDTO): Promise<boolean>;
  findAll(queryParams?: CaseQuery): Promise<Page<WithId<CasePopulatedResponseDTO>>>;
  findById(id: string): Promise<WithId<CaseResponseDTO> | null>;
  findPopulatedByClientId(id: string, queryParams?: CaseQuery): Promise<Page<WithId<CasePopulatedResponseDTO>>>;
  findPopulatedById(id: string): Promise<WithId<CasePopulatedResponseDTO> | null>;
  getStatsByClientId(clientId: string): Promise<CasesStats | null>;
  getStats(): Promise<CasesStats>;
  findFilesByCaseId(caseId: string): Promise<WithId<CaseFileDTO>[] | null>;
  exists(id: string): Promise<boolean>;
  deleteById(id: string): Promise<boolean>;
  deleteByUserId(id: string): Promise<{
    acknowledged: boolean;
    deletedCount: number;
  }>;
}
