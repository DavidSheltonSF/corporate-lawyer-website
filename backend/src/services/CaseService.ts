import { CaseCardDTO } from '../dtos/case/CaseCardDTO';
import { CaseResponseDTO } from '../dtos/user/CaseResponseDTO';
import { CreateCaseDTO } from '../dtos/user/CreateCaseDTO';
import { NotFoundError } from '../errors/NotFoundError';
import { CaseRepository } from '../repositories/CaseRepository';
import { CasePopulateOptions } from '../types/CasePopulateOptions';
import { CaseQuery } from '../types/CaseQuery';
import { CaseStats } from '../types/CaseStats';
import { WithId } from '../types/WithId';
import { ICaseService } from './ICaseService';

export class CaseService implements ICaseService {
  constructor(private caseRepository: CaseRepository) {}
  async create(data: CreateCaseDTO): Promise<WithId<CaseResponseDTO>> {
    try {
      const newCase = await this.caseRepository.create(data);

      const client = newCase.client.toString();
      const lawyers = newCase.lawyers.map((lawyer) => lawyer.toString());

      let documents;
      let hearings;

      if (data.documents) {
        documents = data.documents.map((document) => document.toString());
      }

      if (data.hearings) {
        hearings = data.hearings.map((hearing) => hearing.toString());
      }

      return {
        id: newCase.id,
        client,
        lawyers,
        documents,
        hearings,
        processNumber: newCase.processNumber,
        title: newCase.title,
        description: newCase.description,
        court: newCase.court,
        courtDivision: newCase.courtDivision,
        status: newCase.status,
        createdAt: newCase.createdAt,
        updatedAt: newCase.updatedAt,
      };
    } catch (error: any) {
      if (error.code === 11000) {
        throw Error(`A case with processNumber ${data.processNumber} already exists`);
      }
      throw error;
    }
  }

  async findAll(
    queryParams: CaseQuery = {},
    populateFields?: string[]
  ): Promise<{
    cases: CaseResponseDTO[];
    total: number;
    totalPages: number;
  }> {
    const casesPage = await this.caseRepository.findAll(queryParams, populateFields);
    const { totalItems, totalPages } = casesPage.meta;

    return {
      cases: casesPage.data,
      total: totalItems,
      totalPages,
    };
  }

  async findCaseCards(
    queryParams: CaseQuery = {},
    casePopulateOptions: CasePopulateOptions = {}
  ): Promise<{
    cases: CaseCardDTO[];
    total: number;
    totalPages: number;
  }> {
    const casesPage = await this.caseRepository.findCaseCards(queryParams, casePopulateOptions);
    const { totalItems, totalPages } = casesPage.meta;

    return {
      cases: casesPage.data,
      total: totalItems,
      totalPages,
    };
  }

  async findById(id: string, populateFields?: string[]): Promise<CaseResponseDTO | null> {
    try {
      const cas = await this.caseRepository.findById(id);

      if (!cas) {
        throw new NotFoundError('Case not found');
      }

      return cas;
    } catch (error) {
      throw error;
    }
  }

  async getStats(client?: string): Promise<CaseStats | null> {
    return this.caseRepository.getStats(client);
  }
}
