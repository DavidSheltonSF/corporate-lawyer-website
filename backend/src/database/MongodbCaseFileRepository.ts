import { CaseFileDTO } from '../dtos/caseFile/CaseFileDTO';
import { CaseFile } from '../entities/CaseFile';
import { CaseFileMapper } from '../mappers/CaseFile/CaseFileMapper';
import { CaseFileModel } from '../models/CaseFileModel';
import { CaseFileRepository } from '../repositories/CaseFileRepository';
import { WithId } from '../types/WithId';

export class MongodbCaseFileRepository implements CaseFileRepository {
  async findByCaseId(id: string): Promise<WithId<CaseFileDTO>[]> {
    const files = await CaseFileModel.find({ case: id })
      .populate('uploadedBy', 'firstName lastName')
      .lean();

    return files.map(CaseFileMapper.persistenceToPresentation);
  }

  async create(data: CaseFile): Promise<WithId<CaseFileDTO>> {
    const file = await CaseFileModel.create(data);
    return CaseFileMapper.persistenceToPresentation(file);
  }
}
