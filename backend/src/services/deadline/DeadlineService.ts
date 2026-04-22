import { DeadlineDTO } from '../../dtos/deadLine/DeadlineDTO';
import { UpdateDeadlineDTO } from '../../dtos/deadLine/UpdateDeadlineDTO';
import { CaseRepository } from '../../repositories/CaseRepository';
import { DeadlineRepository } from '../../repositories/DeadlineRepository';
import { WithId } from '../../types/WithId';
import { getDeadlineStatus } from '../helpers/getDeadlineStatus';
import { validateDeadline } from '../validators/deadlines/validateDeadline';
import { IDeadlineService } from './IDeadlineService';

export class DeadlineService implements Partial<IDeadlineService> {
  constructor(
    private readonly deadlineRepository: DeadlineRepository,
    private readonly caseRepository: CaseRepository
  ) {}

  async create(data: DeadlineDTO): Promise<WithId<DeadlineDTO>> {
    validateDeadline(data);
    const status = getDeadlineStatus(data);
    return await this.deadlineRepository.create({ ...data, status });
  }

  async findAll(): Promise<WithId<DeadlineDTO>[]> {
    return await this.deadlineRepository.findAll();
  }

  async findById(id: string): Promise<WithId<DeadlineDTO> | null> {
    return await this.deadlineRepository.findById(id);
  }

  async findByCaseId(id: string): Promise<WithId<DeadlineDTO>[] | null> {
    const caseExists = await this.caseRepository.exists(id);
    if (!caseExists) return null;

    return await this.deadlineRepository.findByCaseId(id);
  }

  async updateById(
    id: string,
    data: Partial<UpdateDeadlineDTO>
  ): Promise<WithId<DeadlineDTO> | null> {
    return await this.deadlineRepository.updateById(id, data);
  }

  async deleteById(id: string): Promise<WithId<DeadlineDTO> | null> {
    return await this.deadlineRepository.deleteById(id);
  }
}
