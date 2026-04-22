import { DeadLineRepository } from '../../../repositories/DeadLineRepository';
import { WithId } from '../../../types/WithId';
import { DeadlineModel } from '../../../models/DeadlineModel';
import { Deadline } from '../../../entities/Deadline';
import { DeadlineDTO } from '../../../dtos/deadLine/DeadlineDTO';
import { DeadlineMapper } from '../../../mappers/Deadline/DeadlineMapper';
import { UpdateDeadlineDTO } from '../../../dtos/deadLine/UpdateDeadlineDTO';

export class MongodbDeadlineRepository implements DeadLineRepository {
  async create(data: DeadlineDTO): Promise<WithId<DeadlineDTO>> {
    const deadline = await DeadlineModel.create(data);
    return DeadlineMapper.persistenceToPresentation(deadline);
  }

  async findAll(): Promise<WithId<Deadline>[]> {
    const deadlines = await DeadlineModel.find({}).lean();
    return deadlines.map(DeadlineMapper.persistenceToDomain);
  }

  async findById(id: string): Promise<WithId<Deadline> | null> {
    const deadline = await DeadlineModel.findById(id).lean();

    if (!deadline) {
      return null;
    }
    return DeadlineMapper.persistenceToDomain(deadline);
  }

  async findByCaseId(id: string): Promise<WithId<Deadline>[]> {
    const deadlines = await DeadlineModel.find({ caseId: id }).lean();
    return deadlines.map(DeadlineMapper.persistenceToDomain);
  }

  async deleteById(id: string): Promise<WithId<Deadline> | null> {
    const result = await DeadlineModel.findOneAndDelete({ _id: id });
    if (!result) return null;
    return DeadlineMapper.persistenceToDomain(result);
  }

  async updateById(id: string, data: Partial<UpdateDeadlineDTO>): Promise<WithId<Deadline> | null> {
    const result = await DeadlineModel.findOneAndUpdate({ _id: id }, data, {
      returnDocument: 'after',
    });
    if (!result) return null;
    return DeadlineMapper.persistenceToDomain(result);
  }

  async existsById(id: string): Promise<boolean> {
    const result = await DeadlineModel.findById(id);
    return result !== null;
  }
}
