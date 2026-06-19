import { FileRepository } from '../../repositories/FileRepository';
import { WithId } from '../../types/WithId';
import { IFileService } from './IFileService';
import { CreateFileDTO } from '../../dtos/caseFile/CreateFileDTO';
import { FileDTO } from '../../dtos/caseFile/FileDTO';
import { validateFile } from '../validators/files/validateFile';
import { Page } from '../../types/Page';
import { PageParams } from '../../types/PageParams';

export class FileService implements IFileService {
  constructor(private fileRepository: FileRepository) {}
  async create(data: CreateFileDTO, buffer: Buffer): Promise<WithId<FileDTO>> {
    await validateFile(data, buffer);
    return await this.fileRepository.create(data);
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
    return await this.fileRepository.deleteById(fileId);
  }
}
