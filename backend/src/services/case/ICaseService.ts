import { CasePopulatedResponseDTO } from '../../dtos/case/CasePopulatedResponseDTO';
import { CreateCaseDTO } from '../../dtos/case/CreateCaseDTO';
import { CaseQuery } from '../../types/CaseQuery';
import { CasesStats } from '../../types/CasesStats';
import { Page } from '../../types/Page';
import { WithId } from '../../types/WithId';
import { CaseDTO } from '../../dtos/case/CaseDTO';

export interface ICaseService {
  create(data: CreateCaseDTO): Promise<WithId<CaseDTO>>;
  updateById(id: string, data: CreateCaseDTO): Promise<WithId<CaseDTO> | null>;
  findAll(queryParams?: CaseQuery): Promise<Page<WithId<CasePopulatedResponseDTO>>>;
  findById(
    id: string,
    populate?: boolean
  ): Promise<WithId<CaseDTO | CasePopulatedResponseDTO> | null>;
  getStatsByClientId(clientId: string): Promise<CasesStats | null>;
  getStats(): Promise<CasesStats | null>;
  deleteById(id: string): Promise<WithId<CaseDTO> | null>;
}
