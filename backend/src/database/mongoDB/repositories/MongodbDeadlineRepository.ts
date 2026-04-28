import { DeadlineRepository } from '../../../repositories/DeadlineRepository';
import { WithId } from '../../../types/WithId';
import { DeadlineModel } from '../../../models/DeadlineModel';
import { DeadlineMapper } from '../../../mappers/Deadline/DeadlineMapper';
import { UpdateDeadlineDTO } from '../../../dtos/deadLine/UpdateDeadlineDTO';
import { DeadlineDTO } from '../../../dtos/deadLine/DeadlineDTO';
import { CreateDeadlineDTO } from '../../../dtos/deadLine/CreateDeadlineDTO';

export class MongodbDeadlineRepository implements DeadlineRepository {
  async create(
    data: CreateDeadlineDTO,
    startDate: Date,
    dueDate: Date
  ): Promise<WithId<DeadlineDTO>> {
    const deadline = await DeadlineModel.create({
      ...data,
      startDate,
      dueDate,
    });
    return DeadlineMapper.persistenceToPresentation(deadline);
  }

  async findAll(): Promise<WithId<DeadlineDTO>[]> {
    const deadlines = await DeadlineModel.find({});
    return deadlines.map(DeadlineMapper.persistenceToPresentation);
  }

  async findById(id: string): Promise<WithId<DeadlineDTO> | null> {
    const deadline = await DeadlineModel.findById(id);

    if (!deadline) {
      return null;
    }
    return DeadlineMapper.persistenceToPresentation(deadline);
  }

  async findByCaseId(id: string): Promise<WithId<DeadlineDTO>[]> {
    const deadlines = await DeadlineModel.find({ caseId: id });
    return deadlines.map(DeadlineMapper.persistenceToPresentation);
  }

  async deleteById(id: string): Promise<WithId<DeadlineDTO> | null> {
    const result = await DeadlineModel.findOneAndDelete({ _id: id });
    if (!result) return null;
    return DeadlineMapper.persistenceToPresentation(result);
  }

  async updateById(id: string, data: UpdateDeadlineDTO): Promise<WithId<DeadlineDTO> | null> {
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
