import { CaseCardDTO } from '../../dtos/case/CaseCardDTO';
import { CaseFileDTO } from '../../dtos/caseFile/CaseFileDTO';
import { CreateCaseFileDTO } from '../../dtos/caseFile/CreateCaseFileDTO';
import { CaseResponseDTO } from '../../dtos/case/CaseResponseDTO';
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

export class CaseService implements ICaseService {
  constructor(private caseRepository: CaseRepository) {}
  async create(data: CreateCaseDTO): Promise<WithId<CaseResponseDTO>> {
    try {
      validateCase(data);
      return await this.caseRepository.create(data);
    } catch (error: any) {
      if (error.code === 11000) {
        console.log(error);
        throw new DuplicateUniqueFieldError(error.keyValue);
      }
      throw error;
    }
  }

  async updateById(id: string, data: UpdateCaseDTO): Promise<WithId<CaseResponseDTO> | null> {
    try {
      return await this.caseRepository.updateById(id, data);
    } catch (error: any) {
      if (error.code === 11000) {
        throw new DuplicateUniqueFieldError(error.keyValue);
      }
      throw error;
    }
  }

  async findAll(queryParams?: CaseQuery): Promise<Page<WithId<CaseCardDTO>>> {
    const casesPage = await this.caseRepository.findAll(queryParams);
    return {
      data: casesPage.data,
      meta: casesPage.meta,
    };
  }

  async findPopulatedByClientId(
    id: string,
    queryParams?: CaseQuery
  ): Promise<Page<WithId<CaseCardDTO>>> {
    return await this.caseRepository.findPopulatedByClientId(id, queryParams);
  }

  async findById(
    id: string,
    populate?: boolean
  ): Promise<WithId<CaseResponseDTO | CaseCardDTO> | null> {
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

  async addFile(caseId: string, file: CreateCaseFileDTO): Promise<void> {
    await this.caseRepository.addFile(caseId, {
      name: file.name,
      url: file.url,
      size: file.size,
      mimeType: file.mimeType,
      uploadedBy: file.uploadedBy,
    });
  }

  async findFilesByCaseId(id: string): Promise<WithId<CaseFileDTO>[] | null> {
    return await this.caseRepository.findFilesByCaseId(id);
  }

  async deleteById(id: string): Promise<boolean> {
    return await this.caseRepository.deleteById(id);
  }
}
