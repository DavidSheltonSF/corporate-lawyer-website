import { CaseFileDTO } from '../../dtos/caseFile/CaseFileDTO';
import { CreateCaseFileDTO } from '../../dtos/caseFile/CreateCaseFileDTO';
import { CaseFileRepository } from '../../repositories/CaseFileRepository';
import { CaseRepository } from '../../repositories/CaseRepository';
import { UserRepository } from '../../repositories/UserRepository';
import { WithId } from '../../types/WithId';
import { ICaseFileService } from './ICaseFileService';

export class CaseFileService implements ICaseFileService {
  constructor(
    private caseFileRepository: CaseFileRepository,
    private userRepository: UserRepository,
    private caseRepository: CaseRepository
  ) {}

  async findByCaseId(id: string): Promise<WithId<CaseFileDTO>[]> {
    return await this.caseFileRepository.findByCaseId(id);
  }

  async create(data: CreateCaseFileDTO): Promise<WithId<CaseFileDTO>> {
    const userExists = this.userRepository.exists(data.uploadedBy);
    if (!userExists) {
      throw Error('User not found');
    }

    const caseExists = this.caseRepository.exists(data.case);
    if (!caseExists) {
      throw Error('Case not found');
    }

    return await this.caseFileRepository.create(data);
  }
}
