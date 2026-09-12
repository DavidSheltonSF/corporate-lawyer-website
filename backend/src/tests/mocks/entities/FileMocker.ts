import { CreateFileDTO } from '../../../dtos/caseFile/CreateFileDTO.js';
import { FileDTO } from '../../../dtos/caseFile/FileDTO.js';
import { WithId } from '../../../types/WithId.js';
import { GenericMocker } from '../fields/GenericMocker.js';

export class FileMocker {
  static mockFileDTO(): CreateFileDTO {
    return {
      name: 'file-name',
      downloadUrl: 'testurl',
      ownerId: GenericMocker.mockMongoId().toString(),
      publicId: 'fake-upload-id',
      size: 1000,
      mimeType: 'application/json',
      url: 'fakeurl',
      uploadedBy: GenericMocker.mockMongoId().toString(),
    };
  }

  static mockFileDTOWithId(): WithId<FileDTO> {
    return {
      ...FileMocker.mockFileDTO(),
      id: GenericMocker.mockMongoId().toString(),
      uploadedBy: {
        id: GenericMocker.mockMongoId().toString(),
        firstName: 'FirstName',
        lastName: 'LastName',
      },
      uploadedAt: new Date().toString(),
    };
  }
}
