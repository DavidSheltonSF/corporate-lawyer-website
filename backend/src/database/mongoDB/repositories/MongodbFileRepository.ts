import { CreateFileDTO } from '../../../dtos/caseFile/CreateFileDTO';
import { FileDTO } from '../../../dtos/caseFile/FileDTO';
import { FileMapper } from '../../../mappers/CaseFile/FileMapper';
import { FileModel } from '../../../models/FileModel';
import { FileRepository } from '../../../repositories/FileRepository';
import { Page } from '../../../types/Page';
import { PageParams } from '../../../types/PageParams';
import { WithId } from '../../../types/WithId';

export class MongodbFileRepository implements FileRepository {
  async create(data: CreateFileDTO): Promise<WithId<FileDTO>> {
    const file = await FileModel.create(data);
    return FileMapper.persistenceToPresentation(file);
  }

  async findByOwnerId(ownerId: string, pageParams: PageParams): Promise<Page<WithId<FileDTO>>> {
    const { limit = 1, page = 1 } = pageParams;
    const filesQuery = FileModel.find({ ownerId })
      .sort({ uploadedAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit)
      .lean();

    const totalItemsQuery = FileModel.countDocuments({ ownerId });

    const [files, totalItems] = await Promise.all([filesQuery, totalItemsQuery]);

    const totalPages = Math.ceil(totalItems / limit);

    return {
      items: files.map(FileMapper.persistenceToPresentation),
      meta: {
        currentPage: page,
        totalItems,
        totalPages,
        nextPage: page < totalPages ? page + 1 : null,
      },
    };
  }

  async rename(fileId: string, name: string): Promise<WithId<FileDTO> | null> {
    const file = await FileModel.findByIdAndUpdate(fileId, { name }, { returnDocument: 'after' });
    if (!file) {
      return null;
    }
    return FileMapper.persistenceToPresentation(file);
  }

  async deleteById(fileId: string): Promise<WithId<FileDTO> | null> {
    const file = await FileModel.findByIdAndDelete(fileId);
    if (!file) {
      return null;
    }
    return FileMapper.persistenceToPresentation(file);
  }
}
