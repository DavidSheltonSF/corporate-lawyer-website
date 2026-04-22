import { DeadlineRepository } from '../../../repositories/DeadlineRepository';
import { WithId } from '../../../types/WithId';
import { DeadlineModel } from '../../../models/DeadlineModel';
import { DeadlineDTO } from '../../../dtos/deadLine/DeadlineDTO';
import { DeadlineMapper } from '../../../mappers/Deadline/DeadlineMapper';
import { UpdateDeadlineDTO } from '../../../dtos/deadLine/UpdateDeadlineDTO';

export class MongodbDeadlineRepository implements DeadlineRepository {
  async create(data: DeadlineDTO): Promise<WithId<DeadlineDTO>> {
    const deadline = await DeadlineModel.create(data);
    return DeadlineMapper.persistenceToPresentation(deadline);
  }

  async findAll(): Promise<WithId<DeadlineDTO>[]> {
    const deadlines = await DeadlineModel.find({}).lean();
    return deadlines.map(DeadlineMapper.persistenceToPresentation);
  }

  async findById(id: string): Promise<WithId<DeadlineDTO> | null> {
    const deadline = await DeadlineModel.findById(id).lean();

    if (!deadline) {
      return null;
    }
    return DeadlineMapper.persistenceToPresentation(deadline);
  }

  async findByCaseId(id: string): Promise<WithId<DeadlineDTO>[]> {
    const deadlines = await DeadlineModel.find({ caseId: id }).lean();
    return deadlines.map(DeadlineMapper.persistenceToPresentation);
  }

  async deleteById(id: string): Promise<WithId<DeadlineDTO> | null> {
    const result = await DeadlineModel.findOneAndDelete({ _id: id });
    if (!result) return null;
    return DeadlineMapper.persistenceToPresentation(result);
  }

  async updateById(
    id: string,
    data: Partial<UpdateDeadlineDTO>
  ): Promise<WithId<DeadlineDTO> | null> {
    const result = await DeadlineModel.findOneAndUpdate({ _id: id }, data, {
      returnDocument: 'after',
    });
    if (!result) return null;
    return DeadlineMapper.persistenceToPresentation(result);
  }

  async existsById(id: string): Promise<boolean> {
    const result = await DeadlineModel.findById(id);
    return result !== null;
  }
}
