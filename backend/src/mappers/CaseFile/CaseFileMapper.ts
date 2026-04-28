import { CaseFileDTO } from '../../dtos/caseFile/CaseFileDTO';
import { WithId } from '../../types/WithId';

export class CaseFileMapper {
  static persistenceToPresentation(caseFile: any): WithId<CaseFileDTO> {
    const uploadedBy = {
      id: caseFile.uploadedBy._id.toString(),
      firstName: caseFile.uploadedBy.firstName,
      lastName: caseFile.uploadedBy.lastName,
    };

    return {
      id: caseFile._id.toString(),
      name: caseFile.name,
      size: caseFile.size,
      mimeType: caseFile.mimeType,
      url: caseFile.url,
      uploadedBy: uploadedBy,
      uploadedAt: caseFile.uploadedAt.toISOString(),
    };
  }
}
