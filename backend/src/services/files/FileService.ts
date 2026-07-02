import { FileRepository } from '../../repositories/FileRepository';
import { WithId } from '../../types/WithId';
import { IFileService } from './IFileService';
import { FileDTO } from '../../dtos/caseFile/FileDTO';
import { validateFile } from '../validators/files/validateFile';
import { Page } from '../../types/Page';
import { PageParams } from '../../types/PageParams';
import { DeleteManyResult } from '../../types/DeleteManyResult';
import { UploadService } from '../uṕload/UploadService';
import { getFormatedFileName } from '../../utils/getFormatedFileName';

export class FileService implements IFileService {
  constructor(
    private fileRepository: FileRepository,
    private uploadService: UploadService
  ) {}
  async create(userId: string, ownerId: string, file: any): Promise<WithId<FileDTO>> {
    await validateFile(file);
    const uploadResult = await this.uploadService.upload(file.buffer);

    const fileName = getFormatedFileName(file.originalname);

    return await this.fileRepository.create({
      ownerId,
      name: fileName,
      url: uploadResult.url,
      downloadUrl: uploadResult.downloadUrl,
      publicId: uploadResult.publicId,
      size: file.size,
      mimeType: file.mimetype,
      uploadedBy: String(userId),
    });
  }

  async findById(fileId: string): Promise<WithId<FileDTO>> {
    return await this.fileRepository.findById(fileId);
  }

  async findAllByOwnerId(ownerId: string): Promise<WithId<FileDTO>[]> {
    return await this.fileRepository.findAllByOwnerId(ownerId);
  }

  async findByOwnerId(ownerId: string, pageParams: PageParams): Promise<Page<WithId<FileDTO>>> {
    return await this.fileRepository.findByOwnerId(ownerId, pageParams);
  }

  async rename(fileId: string, name: string): Promise<WithId<FileDTO> | null> {
    return await this.fileRepository.rename(fileId, name);
  }

  async deleteById(fileId: string): Promise<WithId<FileDTO> | null> {
    const file = await this.findById(fileId);
    if (!file) {
      return null;
    }
    await this.uploadService.delete(file.publicId);
    return await this.fileRepository.deleteById(fileId);
  }

  async deleteByOwnerId(ownerId: string): Promise<DeleteManyResult> {
    const files = await this.findAllByOwnerId(ownerId);
    const filesPublicIds = files.map((file) => file.publicId);

    const deleteUploadedResult = await this.uploadService.deleteMany(filesPublicIds);
    if (deleteUploadedResult.failedCount > 0) {
      console.log(
        `Warning: ${deleteUploadedResult.failedCount} files could not be deleted from the storage`
      );
    }

    return await this.fileRepository.deleteByOwnerId(ownerId);
  }
}
