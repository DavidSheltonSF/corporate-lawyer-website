import { CaseFileDTO } from '../../dtos/caseFile/CaseFileDTO';
import { WithId } from '../../types/WithId';
import { CaseFilePersistence } from './CaseFilePersistence';

export class CaseFileMapper {
  static persistenceToPresentation(caseFile: unknown): WithId<CaseFileDTO> {
    const caseFilePersistence = caseFile as CaseFilePersistence;
    const uploadedBy = {
      id: caseFilePersistence.uploadedBy._id.toString(),
      firstName: caseFilePersistence.uploadedBy.firstName,
      lastName: caseFilePersistence.uploadedBy.lastName,
    };

    return {
      id: caseFilePersistence._id.toString(),
      name: caseFilePersistence.name,
      url: caseFilePersistence.url,
      uploadedBy: uploadedBy,
      case: caseFilePersistence.case.toString(),
      createdAt: caseFilePersistence.createdAt.toISOString(),
    };
  }
}
