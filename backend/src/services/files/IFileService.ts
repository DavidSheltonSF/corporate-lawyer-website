import { CreateFileDTO } from '../../dtos/caseFile/CreateFileDTO';
import { FileDTO } from '../../dtos/caseFile/FileDTO';
import { Page } from '../../types/Page';
import { PageParams } from '../../types/PageParams';
import { WithId } from '../../types/WithId';

export interface IFileService {
  create(data: CreateFileDTO, buffer: Buffer): Promise<WithId<FileDTO>>;
  findById(fileId: string): Promise<WithId<FileDTO>>;
  findByOwnerId(ownerId: string, pageParams: PageParams): Promise<Page<WithId<FileDTO>>>;
  rename(fileId: string, name: string): Promise<WithId<FileDTO> | null>;
  deleteById(id: string): Promise<WithId<FileDTO> | null>;
}
