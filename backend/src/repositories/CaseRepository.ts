import { CaseCardDTO } from '../dtos/case/CaseCardDTO';
import { CreateCaseDTO } from '../dtos/user/CreateCaseDTO';
import { Case } from '../entities/Case';
import { CasePopulateOptions } from '../types/CasePopulateOptions';
import { CaseQuery } from '../types/CaseQuery';
import { CaseStats } from '../types/CaseStats';
import { Page } from '../types/Page';
import { WithId } from '../types/WithId';

export interface CaseRepository {
  findAll(queryParams: CaseQuery, populateFields?: string[]): Promise<Page<WithId<Case>>>;
  findCaseCards(
    queryParams: CaseQuery,
    casePopulateOptions: CasePopulateOptions
  ): Promise<Page<WithId<CaseCardDTO>>>;
  findById(id: string): Promise<WithId<Case> | null>;
  create(user: CreateCaseDTO): Promise<WithId<Case>>;
  getStats(client?: string): Promise<CaseStats | null>;
}
