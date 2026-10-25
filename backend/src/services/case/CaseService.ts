import { CreateCaseDTO } from '../../dtos/case/CreateCaseDTO.js';
import { CaseRepository } from '../../repositories/CaseRepository.js';
import { CaseQueryParams } from '../../types/CaseQueryParams.js';
import { CasesStats } from '../../types/CasesStats.js';
import { Page } from '../../types/Page.js';
import { WithId } from '../../types/WithId.js';
import { ICaseService } from './ICaseService.js';
import { UpdateCaseDTO } from '../../dtos/case/UpdateCaseDTO.js';
import { validateCase } from '../validators/cases/validateCase.js';
import { CaseDTO } from '../../dtos/case/CaseDTO.js';
import { CaseEvent } from '../../events/case/CaseEvents.js';
import { IEventBus } from '../../events/IEventBus.js';
import { validateCasePartial } from '../validators/cases/validateCasePartial.js';
import { DuplicatedCaseNumberError } from '../../errors/domain/DuplicatedCaseNumberError.js';

export class CaseService implements ICaseService {
  constructor(
    private caseRepository: CaseRepository,
    private eventBus: IEventBus
  ) {}
  async create(data: CreateCaseDTO): Promise<WithId<CaseDTO>> {
    validateCase(data);

    const exists = await this.caseRepository.existsByCaseNumber(data.caseNumber);
    if (exists) {
      throw new DuplicatedCaseNumberError(data.caseNumber);
    }

    const createdCase = await this.caseRepository.create(data);

    const { id, client, lawyer, title } = createdCase;
    this.eventBus.publish(CaseEvent.CASE_CREATED, {
      caseId: id,
      lawyerId: lawyer,
      clientId: client,
      caseTitle: title,
    });

    return createdCase;
  }

  async updateById(id: string, data: UpdateCaseDTO): Promise<WithId<CaseDTO> | null> {
    try {
      validateCasePartial(data);

      const { caseNumber } = data;
      const existingCase = await this.caseRepository.findById(id);

      if (!existingCase) {
        return null;
      }

      let caseNumberIsChanged = false;

      if (existingCase.caseNumber !== caseNumber) {
        caseNumberIsChanged = true;
      }

      if (caseNumberIsChanged && (await this.caseRepository.existsByCaseNumber(caseNumber))) {
        throw new DuplicatedCaseNumberError(caseNumber);
      }

      const updatedCase = (await this.caseRepository.updateById(id, data))!;

      const { client, title, lawyer } = updatedCase;
      this.eventBus.publish(CaseEvent.CASE_UPDATED, {
        caseId: updatedCase.id,
        lawyerId: lawyer,
        clientId: client,
        caseTitle: title,
      });

      return updatedCase;
    } catch (error: any) {
      if (error.code === 11000) {
        throw new DuplicatedCaseNumberError(error.keyValue);
      }
      throw error;
    }
  }

  async findAll(queryParams: CaseQueryParams): Promise<Page<WithId<CaseDTO>>> {
    const casesPage = await this.caseRepository.findAll(queryParams);
    return {
      items: casesPage.items,
      meta: casesPage.meta,
    };
  }

  async findById(id: string, populate?: boolean): Promise<WithId<CaseDTO> | null> {
    const findPromise = populate
      ? this.caseRepository.findPopulatedById(id)
      : this.caseRepository.findById(id);

    return await findPromise;
  }

  async getStatsByClientId(clientId: string): Promise<CasesStats> {
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

    const { lawyer, title, client } = deletedCase;

    this.eventBus.publish(CaseEvent.CASE_DELETED, {
      caseId: deletedCase.id,
      lawyerId: lawyer,
      clientId: client,
      caseTitle: title,
    });

    return deletedCase;
  }
}
