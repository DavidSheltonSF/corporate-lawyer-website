import { CreateFileDTO } from '../../../dtos/caseFile/CreateFileDTO';
import { FileDTO } from '../../../dtos/caseFile/FileDTO';
import { WithId } from '../../../types/WithId';
import { GenericMocker } from '../fields/GenericMocker';

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
