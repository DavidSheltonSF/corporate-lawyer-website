import { CreateCaseDTO } from '../../dtos/case/CreateCaseDTO';
import { CaseRepository } from '../../repositories/CaseRepository';
import { CaseQuery } from '../../types/CaseQuery';
import { CasesStats } from '../../types/CasesStats';
import { Page } from '../../types/Page';
import { WithId } from '../../types/WithId';
import { ICaseService } from './ICaseService';
import { UpdateCaseDTO } from '../../dtos/case/UpdateCaseDTO';
import { validateCase } from '../validators/cases/validateCase';
import { DuplicateUniqueFieldError } from '../../errors/domain/DuplicateUniqueFieldError';
import { CaseDTO } from '../../dtos/case/CaseDTO';
import { CaseEvent } from '../../events/case/CaseEvents';
import { IEventBus } from '../../events/IEventBus';
import { validateCasePartial } from '../validators/cases/validateCasePartial';

export class CaseService implements ICaseService {
  constructor(
    private caseRepository: CaseRepository,
    private eventBus: IEventBus
  ) {}
  async create(data: CreateCaseDTO): Promise<WithId<CaseDTO>> {
    try {
      validateCase(data);
      const createdCase = await this.caseRepository.create(data);

      const { id, client, lawyers, title } = createdCase;
      this.eventBus.publish(CaseEvent.CASE_CREATED, {
        caseId: id,
        lawyerId: lawyers[0] || '',
        clientId: client,
        caseTitle: title,
      });

      return createdCase;
    } catch (error: any) {
      if (error.code === 11000) {
        console.log(error);
        throw new DuplicateUniqueFieldError(error.keyValue);
      }
      throw error;
    }
  }

  async updateById(id: string, data: UpdateCaseDTO): Promise<WithId<CaseDTO> | null> {
    try {
      validateCasePartial(data);
      const updatedCase = await this.caseRepository.updateById(id, data);
      if (!updatedCase) {
        return null;
      }

      const { client, title, lawyers } = updatedCase;
      this.eventBus.publish(CaseEvent.CASE_UPDATED, {
        caseId: updatedCase.id,
        lawyerId: lawyers[0] || '',
        clientId: client,
        caseTitle: title,
      });

      return updatedCase;
    } catch (error: any) {
      if (error.code === 11000) {
        throw new DuplicateUniqueFieldError(error.keyValue);
      }
      throw error;
    }
  }

  async findAll(queryParams?: CaseQuery): Promise<Page<WithId<CaseDTO>>> {
    const casesPage = await this.caseRepository.findAll(queryParams);
    return {
      items: casesPage.items,
      meta: casesPage.meta,
    };
  }

  async findById(
    id: string,
    populate?: boolean
  ): Promise<WithId<CaseDTO> | null> {
    try {
      const findPromise = populate
        ? this.caseRepository.findPopulatedById(id)
        : this.caseRepository.findById(id);

      return await findPromise;
    } catch (error) {
      throw error;
    }
  }

  async getStatsByClientId(clientId: string): Promise<CasesStats | null> {
    return this.caseRepository.getStatsByClientId(clientId);
  }

  getStats(): Promise<CasesStats> {
    return this.caseRepository.getStats();
  }

  async deleteById(id: string): Promise<WithId<CaseDTO> | null> {
    const deletedCase = await this.caseRepository.deleteById(id);
    if (!deletedCase) {
      return null;
    }

    const { lawyers, title, client } = deletedCase;

    this.eventBus.publish(CaseEvent.CASE_DELETED, {
      caseId: deletedCase.id,
      lawyerId: lawyers[0] || '',
      clientId: client,
      caseTitle: title,
    });

    return deletedCase;
  }
}
