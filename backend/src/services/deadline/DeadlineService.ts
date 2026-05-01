import { CreateDeadlineDTO } from '../../dtos/deadLine/CreateDeadlineDTO';
import { DeadlineDTO } from '../../dtos/deadLine/DeadlineDTO';
import { UpdateDeadlineDTO } from '../../dtos/deadLine/UpdateDeadlineDTO';
import { CaseNotFoundError } from '../../errors/domain/CaseNotFoundError';
import { DomainError } from '../../errors/domain/DomainError';
import { CaseRepository } from '../../repositories/CaseRepository';
import { DeadlineRepository } from '../../repositories/DeadlineRepository';
import { BrazilState } from '../../types/BrazilState';
import { WithId } from '../../types/WithId';
import { DeadlineCalculator } from '../helpers/DeadlineCalculator';
import { getBrazilState } from '../helpers/getBrazilState';
import { getCity } from '../helpers/getCity';
import { getDeadlineCountingType } from '../helpers/getDeadlineCountingType';
import { HolidaysProvider } from '../HolidaysProvider';
import { validateDeadline } from '../validators/deadlines/validateDeadline';
import { validateDeadlinePartial } from '../validators/deadlines/validateDeadlinePartial';
import { IDeadlineService } from './IDeadlineService';

export class DeadlineService implements Partial<IDeadlineService> {
  constructor(
    private readonly deadlineRepository: DeadlineRepository,
    private readonly caseRepository: CaseRepository,
    private readonly holidaysProvider: HolidaysProvider
  ) {}

  async create(data: CreateDeadlineDTO): Promise<WithId<DeadlineDTO>> {
    validateDeadline(data);

    const { caseId, intimationDate, days, countingType } = data;

    const deadlineCase = await this.caseRepository.findById(caseId);
    if (!deadlineCase) {
      throw new CaseNotFoundError(caseId);
    }

    const { state, city } = deadlineCase.location;

    const validState = getBrazilState(state);
    const validCity = getCity(city);
    const validCountingType = getDeadlineCountingType(countingType);

    const deadlineCalculator = new DeadlineCalculator(this.holidaysProvider, {
      state: validState,
      city: validCity,
      countingType: validCountingType,
    });

    const { startDate, dueDate } = deadlineCalculator.getDeadlineDateRange(
      new Date(intimationDate),
      days
    );

    return await this.deadlineRepository.create(data, startDate, dueDate);
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

  async updateById(id: string, data: UpdateDeadlineDTO): Promise<WithId<DeadlineDTO> | null> {
    validateDeadlinePartial(data);
    return await this.deadlineRepository.updateById(id, data);
  }

  async deleteById(id: string): Promise<WithId<DeadlineDTO> | null> {
    return await this.deadlineRepository.deleteById(id);
  }
}
