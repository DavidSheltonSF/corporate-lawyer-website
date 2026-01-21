import { CaseFileDTO } from '../dtos/caseFile/CaseFileDTO';
import { CaseFile } from '../entities/CaseFile';
import { WithId } from '../types/WithId';

export interface CaseFileRepository {
  findByCaseId(id: string): Promise<WithId<CaseFileDTO>[]>;
  create(data: CaseFile): Promise<WithId<CaseFileDTO>>;
}
