import { DeadlineRepository } from '../../../repositories/DeadlineRepository';
import { WithId } from '../../../types/WithId';
import { DeadlineModel } from '../../../models/DeadlineModel';
import { DeadlineDTO } from '../../../dtos/deadLine/DeadlineDTO';
import { DeadlineMapper } from '../../../mappers/Deadline/DeadlineMapper';
import { UpdateDeadlineDTO } from '../../../dtos/deadLine/UpdateDeadlineDTO';
import { DeadlineResponseDTO } from '../../../dtos/deadLine/DeadlineResponseDTO';

export class MongodbDeadlineRepository implements DeadlineRepository {
  async create(
    data: DeadlineDTO,
    startDate: Date,
    dueDate: Date
  ): Promise<WithId<DeadlineResponseDTO>> {
    const deadline = await DeadlineModel.create({
      ...data,
      startDate,
      dueDate,
    });
    return DeadlineMapper.persistenceToPresentation(deadline);
  }

  async findAll(): Promise<WithId<DeadlineResponseDTO>[]> {
    const deadlines = await DeadlineModel.find({});
    return deadlines.map(DeadlineMapper.persistenceToPresentation);
  }

  async findById(id: string): Promise<WithId<DeadlineResponseDTO> | null> {
    const deadline = await DeadlineModel.findById(id);

    if (!deadline) {
      return null;
    }
    return DeadlineMapper.persistenceToPresentation(deadline);
  }

  async findByCaseId(id: string): Promise<WithId<DeadlineResponseDTO>[]> {
    const deadlines = await DeadlineModel.find({ caseId: id });
    return deadlines.map(DeadlineMapper.persistenceToPresentation);
  }

  async deleteById(id: string): Promise<WithId<DeadlineResponseDTO> | null> {
    const result = await DeadlineModel.findOneAndDelete({ _id: id });
    if (!result) return null;
    return DeadlineMapper.persistenceToPresentation(result);
  }

  async updateById(
    id: string,
    data: UpdateDeadlineDTO
  ): Promise<WithId<DeadlineResponseDTO> | null> {
    const updatedData = {
      startDate: data.dateRange?.startDate,
      dueDate: data.dateRange?.dueDate,
      ...data,
    };

    const result = await DeadlineModel.findOneAndUpdate({ _id: id }, updatedData, {
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
