import { NotFoundError } from '../errors/NotFoundError';
import { CaseModel } from '../infra/mongodb/models/case.model';
import { Case } from '../types/Case';
import { CaseListResponse } from '../types/CaseListResponse';
import { CaseQuery } from '../types/CaseQuery';
import { CaseResponse } from '../types/CaseResponse';
import { CaseStatusEnum } from '../types/CaseStatusEnum';

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

  async findAll(queryParams: CaseQuery = {}, populateFields?: string[]): Promise<CaseListResponse> {
    const { query, status, limit = 10, page = 1 } = queryParams;
    const regex = new RegExp(query || '', 'i');

    const filter = {
      $or: [{ title: regex }, { description: regex }, { processNumber: regex }],
    };
    const queryFiltered = CaseModel.find(filter)
      .limit(limit)
      .skip((page - 1) * limit)
      .lean();

    if (status) {
      queryFiltered.find({ status });
    }

    if (populateFields && populateFields.length > 0 && populateFields.join(' ').trim()) {
      queryFiltered.populate(populateFields.join(' '), 'firstName lastName');
    }

    const foundCases = await queryFiltered;

    const totalCases = foundCases.length;

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

  async findById(id: string, populateFields?: string[]): Promise<CaseResponse | null> {
    try {
      const query = CaseModel.findById(id);

      if (populateFields && populateFields.length > 0 && populateFields.join(' ').trim()) {
        query.populate(populateFields.join(' '), 'firstName lastName');
      }

      const foundCase = await query;

      if (!foundCase) {
        throw new NotFoundError('Case not found');
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

  async getStats(client?: string): Promise<{ inProgress: number; closed: number } | null> {
    const baseFilter = client ? { client } : {};

    const inProgress = await CaseModel.countDocuments({
      ...baseFilter,
      status: CaseStatusEnum.em_andamento,
    });
    const closed = await CaseModel.countDocuments({
      ...baseFilter,
      status: CaseStatusEnum.encerrado,
    });

    return {
      inProgress,
      closed,
    };
  }
}
