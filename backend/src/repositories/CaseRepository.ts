import { CreateCaseDTO } from '../dtos/user/CreateCaseDTO';
import { Case } from '../entities/Case';
import { CaseQuery } from '../types/CaseQuery';
import { CaseStats } from '../types/CaseStats';
import { WithId } from '../types/WithId';

export interface CaseRepository {
  findAll(queryParams: CaseQuery, populateFields?: string[]): Promise<WithId<Case>[]>;
  findById(id: string): Promise<WithId<Case> | null>;
  create(user: CreateCaseDTO): Promise<WithId<Case>>;
  getStats(client?: string): Promise<CaseStats | null>;
}
