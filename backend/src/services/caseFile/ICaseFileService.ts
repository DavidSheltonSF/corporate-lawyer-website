import { CaseFileDTO } from '../../dtos/caseFile/CaseFileDTO';
import { CreateCaseFileDTO } from '../../dtos/caseFile/CreateCaseFileDTO';
import { WithId } from '../../types/WithId';

export interface ICaseFileService {
  findByCaseId(id: string): Promise<WithId<CaseFileDTO>[]>;
  create(data: CreateCaseFileDTO): Promise<WithId<CaseFileDTO>>;
}
