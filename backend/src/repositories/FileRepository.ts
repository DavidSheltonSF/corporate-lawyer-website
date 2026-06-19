import { CreateFileDTO } from '../dtos/caseFile/CreateFileDTO';
import { FileDTO } from '../dtos/caseFile/FileDTO';
import { DeleteManyResult } from '../types/DeleteManyResult';
import { Page } from '../types/Page';
import { PageParams } from '../types/PageParams';
import { WithId } from '../types/WithId';

export interface FileRepository {
  create: (data: CreateFileDTO) => Promise<WithId<FileDTO>>;
  findAllByOwnerId: (id: string) => Promise<WithId<FileDTO>[]>;
  findById: (id: string) => Promise<WithId<FileDTO>>;
  findByOwnerId: (id: string, pageParams: PageParams) => Promise<Page<WithId<FileDTO>>>;
  rename: (id: string, name: string) => Promise<WithId<FileDTO> | null>;
  deleteById: (id: string) => Promise<WithId<FileDTO> | null>;
  deleteByOwnerId: (ownerId: string) => Promise<DeleteManyResult>;
}
