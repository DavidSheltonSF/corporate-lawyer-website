import { CaseCardDTO } from '../../dtos/case/CaseCardDTO';
import { CaseFileDTO } from '../../dtos/caseFile/CaseFileDTO';
import { CreateCaseFileDTO } from '../../dtos/caseFile/CreateCaseFileDTO';
import { CaseResponseDTO } from '../../dtos/user/CaseResponseDTO';
import { CreateCaseDTO } from '../../dtos/user/CreateCaseDTO';
import { CaseNotFoundError } from '../../errors/application/CaseNotFoundError';
import { CaseRepository } from '../../repositories/CaseRepository';
import { CaseQuery } from '../../types/CaseQuery';
import { CaseStats } from '../../types/CaseStats';
import { Pagination } from '../../types/Pagination';
import { WithId } from '../../types/WithId';
import { ICaseService } from './ICaseService';

export class CaseService implements ICaseService {
  constructor(private caseRepository: CaseRepository) {}
  async create(data: CreateCaseDTO): Promise<WithId<CaseResponseDTO>> {
    try {
      const newCase = await this.caseRepository.create(data);

      const client = newCase.client.toString();
      const lawyers = newCase.lawyers.map((lawyer) => lawyer.toString());

      return {
        id: newCase.id,
        client,
        lawyers,
        files: newCase.files,
        hearings: newCase.hearings,
        processNumber: newCase.processNumber,
        title: newCase.title,
        description: newCase.description,
        court: newCase.court,
        courtDivision: newCase.courtDivision,
        status: newCase.status,
      };
    } catch (error: any) {
      if (error.code === 11000) {
        throw Error(`A case with processNumber ${data.processNumber} already exists`);
      }
      throw error;
    }
  }

  async findCases(queryParams: CaseQuery = {}): Promise<Pagination<WithId<CaseCardDTO>>> {
    const casesPage = await this.caseRepository.findCases(queryParams);
    const { totalItems, totalPages } = casesPage.meta;

    return {
      items: casesPage.data,
      total: totalItems,
      totalPages,
    };
  }

  async findById(id: string): Promise<WithId<CaseCardDTO>> {
    try {
      const cas = await this.caseRepository.findById(id);

      if (!cas) {
        throw new CaseNotFoundError(id);
      }

      return cas;
    } catch (error) {
      throw error;
    }
  }

  async getStats(client?: string): Promise<CaseStats | null> {
    return this.caseRepository.getStats(client);
  }

  async addFile(id: string, file: CreateCaseFileDTO): Promise<void> {
    await this.caseRepository.addFile({
      caseId: id,
      name: file.name,
      url: file.url,
      size: file.size,
      mimeType: file.mimeType,
      uploadedBy: file.uploadedBy,
    });
  }

  async findFilesByCaseId(id: string): Promise<WithId<CaseFileDTO>[]> {
    const foundFile = await this.findById(id);
    const files = foundFile.files;
    return files;
  }
}
