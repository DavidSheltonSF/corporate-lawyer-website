import { CaseModel } from '../models/case.model';
import { Case } from '../types/Case';
import { CaseListResponse } from '../types/CaseListResponse';
import { CaseQuery } from '../types/CaseQuery';
import { CaseResponse } from '../types/CaseResponse';

export class CaseService {
  async create(data: Case): Promise<CaseResponse> {
    try {
      const createdCase = await CaseModel.create(data);

      return {
        id: createdCase._id.toString(),
        client: createdCase.client,
        lawyers: createdCase.lawyers,
        processNumber: createdCase.processNumber,
        title: createdCase.title,
        description: createdCase.description,
        court: createdCase.court,
        courtDivision: createdCase.courtDivision,
        status: createdCase.status,
        createdAt: createdCase.createdAt,
        updatedAt: createdCase.updatedAt,
      };
    } catch (error: any) {
      if (error.code === 11000) {
        throw Error(`A case with processNumber ${data.processNumber} already exists`);
      }
      throw error;
    }
  }

  async findAll(query: CaseQuery = {}): Promise<CaseListResponse> {
    const { title, processNumber, status, limit = 10, page = 1 } = query;

    const filter: any = {};
    if (title) filter.title = title;
    if (processNumber) filter.processNumber = processNumber;
    if (status) filter.status = status;

    const foundCases = await CaseModel.find(filter)
      .limit(limit)
      .skip((page - 1) * limit)
      .lean();

    const totalCases = await CaseModel.countDocuments(filter);

    const mappedCases = foundCases.map((cas) => {
      return {
        id: cas._id.toString(),
        client: cas.client,
        lawyers: cas.lawyers,
        title: cas.title,
        processNumber: cas.processNumber,
        court: cas.court,
        courtDivision: cas.courtDivision,
        description: cas.description,
        status: cas.status,
        createdAt: cas.createdAt,
        updatedAt: cas.updatedAt,
      };
    });

    return {
      cases: mappedCases,
      total: totalCases,
      totalPages: Math.ceil(totalCases / Number(limit)),
    };
  }

  async findById(id: string): Promise<CaseResponse | null> {
    try {
      const foundCase = await CaseModel.findById(id);

      if (!foundCase) {
        throw Error('Case not found');
      }

      return {
        id: foundCase._id.toString(),
        client: foundCase.client,
        lawyers: foundCase.lawyers,
        title: foundCase.title,
        processNumber: foundCase.processNumber,
        court: foundCase.court,
        courtDivision: foundCase.courtDivision,
        description: foundCase.description,
        status: foundCase.status,
        createdAt: foundCase.createdAt,
        updatedAt: foundCase.updatedAt,
      };
    } catch (error) {
      throw error;
    }
  }
}
