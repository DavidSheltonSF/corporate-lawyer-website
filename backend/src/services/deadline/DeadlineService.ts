import { CreateDeadlineDTO } from '../../dtos/deadLine/CreateDeadlineDTO.js';
import { DeadlineDTO } from '../../dtos/deadLine/DeadlineDTO.js';
import { UpdateDeadlineDTO } from '../../dtos/deadLine/UpdateDeadlineDTO.js';
import { CaseNotFoundError } from '../../errors/domain/CaseNotFoundError.js';
import { CaseRepository } from '../../repositories/CaseRepository.js';
import { DeadlineRepository } from '../../repositories/DeadlineRepository.js';
import { DeadlineCountingType } from '../../types/DeadlineCountingType.js';
import { WithId } from '../../types/WithId.js';
import { toDateOnlyString } from '../../utils/toDateOnly.js';
import { DeadlineCalculator } from '../helpers/DeadlineCalculator.js';
import { getBrazilState } from '../helpers/getBrazilState.js';
import { getCity } from '../helpers/getCity.js';
import { getDeadlineCountingType } from '../helpers/getDeadlineCountingType.js';
import { HolidaysProvider } from '../HolidaysProvider.js';
import { validateDeadline } from '../validators/deadlines/validateDeadline.js';
import { validateDeadlinePartial } from '../validators/deadlines/validateDeadlinePartial.js';
import { IDeadlineService } from './IDeadlineService.js';

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
      caseLocation: { state: validState, city: validCity },
      countingType: validCountingType,
    });

    const { startDate, dueDate } = deadlineCalculator.getDeadlineDateRange(
      new Date(intimationDate),
      days
    );

    return await this.deadlineRepository.create(
      data,
      toDateOnlyString(startDate),
      toDateOnlyString(dueDate),
      {
        state: state,
        city: city,
      }
    );
  }

  async findAll(): Promise<WithId<DeadlineDTO>[]> {
    return await this.deadlineRepository.findAll();
  }

  async findById(id: string): Promise<WithId<DeadlineDTO & { remainingDays: number }> | null> {
    const deadline = await this.deadlineRepository.findById(id);
    if (!deadline) {
      return null;
    }

    const { caseLocation, dueDate } = deadline;
    const city = getCity(caseLocation.city);
    const state = getBrazilState(caseLocation.state);
    const countingType = getDeadlineCountingType(deadline.countingType);
    const deadlineCalculator = new DeadlineCalculator(this.holidaysProvider, {
      countingType,
      caseLocation: { city, state },
    });

    const remainingDays = deadlineCalculator.getRemainingDays(new Date(dueDate));

    return { ...deadline, remainingDays };
  }

  async findByCaseId(id: string): Promise<WithId<DeadlineDTO>[] | null> {
    const caseExists = await this.caseRepository.existsById(id);
    if (!caseExists) return null;

    const deadlineCalculator = new DeadlineCalculator(this.holidaysProvider);

    const deadlines = await this.deadlineRepository.findByCaseId(id);

    const mappedDeadlines = deadlines.map((deadline) => {
      const { caseLocation, dueDate } = deadline;
      const city = getCity(caseLocation.city);
      const state = getBrazilState(caseLocation.state);
      const countingType = getDeadlineCountingType(deadline.countingType);
      deadlineCalculator.config = {
        countingType: countingType,
        caseLocation: { city, state },
      };
      const remainingDays = deadlineCalculator.getRemainingDays(new Date(dueDate));
      return { ...deadline, remainingDays };
    });

    return mappedDeadlines;
  }

  async updateById(id: string, data: UpdateDeadlineDTO): Promise<WithId<DeadlineDTO> | null> {
    validateDeadlinePartial(data);
    return await this.deadlineRepository.updateById(id, data);
  }

  async deleteById(id: string): Promise<WithId<DeadlineDTO> | null> {
    return await this.deadlineRepository.deleteById(id);
  }
}
