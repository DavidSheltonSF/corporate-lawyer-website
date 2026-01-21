import { CaseFileDTO } from '../../dtos/caseFile/CaseFileDTO';
import { CreateCaseFileDTO } from '../../dtos/caseFile/CreateCaseFileDTO';
import { CaseFileRepository } from '../../repositories/CaseFileRepository';
import { WithId } from '../../types/WithId';
import { ICaseFileService } from './ICaseFileService';

export class CaseFileService implements ICaseFileService {
  constructor(private caseFileRepository: CaseFileRepository) {}

  async findByCaseId(id: string): Promise<WithId<CaseFileDTO>[]> {
    return await this.caseFileRepository.findByCaseId(id);
  }

  async create(data: CreateCaseFileDTO): Promise<WithId<CaseFileDTO>> {
    return await this.caseFileRepository.create(data);
  }
}
