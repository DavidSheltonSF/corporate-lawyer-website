import { CaseCardDTO } from '../dtos/case/CaseCardDTO';
import { CreateCaseDTO } from '../dtos/user/CreateCaseDTO';
import { Case } from '../entities/Case';
import { CaseFile } from '../entities/CaseFile';
import { CasePopulateOptions } from '../types/CasePopulateOptions';
import { CaseQuery } from '../types/CaseQuery';
import { CaseStats } from '../types/CaseStats';
import { Page } from '../types/Page';
import { WithId } from '../types/WithId';

export interface CaseRepository {
  findCaseCards(
    queryParams: CaseQuery,
    casePopulateOptions: CasePopulateOptions
  ): Promise<Page<WithId<CaseCardDTO>>>;
  findById(id: string): Promise<WithId<CaseCardDTO> | null>;
  create(user: CreateCaseDTO): Promise<WithId<Case>>;
  getStats(client?: string): Promise<CaseStats | null>;
  addFile(id: string, file: CaseFile): Promise<WithId<CaseCardDTO> | null>;
  exists(id: string): Promise<boolean>;
}
