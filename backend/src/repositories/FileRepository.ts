import { CreateFileDTO } from '../dtos/caseFile/CreateFileDTO.js';
import { FileDTO } from '../dtos/caseFile/FileDTO.js';
import { DeleteManyResult } from '../types/DeleteManyResult.js';
import { Page } from '../types/Page.js';
import { PageParams } from '../types/PageParams.js';
import { WithId } from '../types/WithId.js';

export interface FileRepository {
  create: (data: CreateFileDTO) => Promise<WithId<FileDTO>>;
  findAllByOwnerId: (id: string) => Promise<WithId<FileDTO>[]>;
  findById: (id: string) => Promise<WithId<FileDTO> | null>;
  findByOwnerId: (id: string, pageParams: PageParams) => Promise<Page<WithId<FileDTO>>>;
  rename: (id: string, name: string) => Promise<boolean>;
  deleteById: (id: string) => Promise<WithId<FileDTO> | null>;
  deleteByOwnerId: (ownerId: string) => Promise<DeleteManyResult>;
}
