import { CaseFileDTO } from '../../dtos/caseFile/CaseFileDTO';
import { WithId } from '../../types/WithId';
import { CaseFilePersistence } from './CaseFilePersistence';

export class CaseFileMapper {
  static persistenceToPresentation<T extends CaseFilePersistence>(
    caseFile: T
  ): WithId<CaseFileDTO> {
    const uploadedBy = {
      id: caseFile.uploadedBy._id.toString(),
      firstName: caseFile.uploadedBy.firstName,
      lastName: caseFile.uploadedBy.lastName,
    };

    return {
      id: caseFile._id.toString(),
      name: caseFile.name,
      url: caseFile.url,
      uploadedAt: caseFile.uploadedAt.toISOString(),
      uploadedBy: uploadedBy,
    };
  }
}
