import { DeadlineRepository } from '../../../repositories/DeadlineRepository.js';
import { WithId } from '../../../types/WithId.js';
import { DeadlineModel } from '../../../models/DeadlineModel.js';
import { DeadlineMapper } from '../../../mappers/Deadline/DeadlineMapper.js';
import { UpdateDeadlineDTO } from '../../../dtos/deadLine/UpdateDeadlineDTO.js';
import { DeadlineDTO } from '../../../dtos/deadLine/DeadlineDTO.js';
import { CreateDeadlineDTO } from '../../../dtos/deadLine/CreateDeadlineDTO.js';
import { CaseLocationDTO } from '../../../dtos/case/CaseLocationDTO.js';

export class MongodbDeadlineRepository implements DeadlineRepository {
  async create(
    data: CreateDeadlineDTO,
    startDate: string,
    dueDate: string,
    caseLocation: CaseLocationDTO
  ): Promise<WithId<DeadlineDTO>> {
    const deadline = await DeadlineModel.create({
      ...data,
      startDate: startDate,
      dueDate: dueDate,
      caseLocation,
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
