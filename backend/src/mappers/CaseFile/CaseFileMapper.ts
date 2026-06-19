import { FileDTO } from '../../dtos/caseFile/FileDTO';
import { WithId } from '../../types/WithId';

export class CaseFileMapper {
  static persistenceToPresentation(caseFile: any): WithId<FileDTO> {
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
      publicId: caseFile.publicId,
      uploadedBy: uploadedBy,
      uploadedAt: caseFile.uploadedAt.toISOString(),
    };
  }
}
