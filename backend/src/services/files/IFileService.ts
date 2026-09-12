import { FileDTO } from '../../dtos/caseFile/FileDTO.js';
import { DeleteManyResult } from '../../types/DeleteManyResult.js';
import { Page } from '../../types/Page.js';
import { PageParams } from '../../types/PageParams.js';
import { WithId } from '../../types/WithId.js';

export interface IFileService {
  create(userId: string, ownerId: string, file: any): Promise<WithId<FileDTO>>;
  findAllByOwnerId(ownerId: string): Promise<WithId<FileDTO>[]>;
  findById(fileId: string): Promise<WithId<FileDTO> | null>;
  findByOwnerId(ownerId: string, pageParams: PageParams): Promise<Page<WithId<FileDTO>>>;
  rename(fileId: string, name: string): Promise<boolean>;
  deleteById(id: string): Promise<WithId<FileDTO> | null>;
  deleteByOwnerId: (ownerId: string) => Promise<DeleteManyResult>;
}
