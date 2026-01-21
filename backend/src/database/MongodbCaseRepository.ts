import { CaseRepository } from '../repositories/CaseRepository';
import { WithId } from '../types/WithId';
import { CaseModel } from '../models/CaseModel';
import { CreateCaseDTO } from '../dtos/user/CreateCaseDTO';
import { Types } from 'mongoose';
import { CaseStats } from '../types/CaseStats';
import { CaseStatusEnum } from '../types/CaseStatusEnum';
import { CaseQuery } from '../types/CaseQuery';
import { Case } from '../entities/Case';
import { Page } from '../types/Page';
import { CasePopulateOptions } from '../types/CasePopulateOptions';
import { CaseCardDTO } from '../dtos/case/CaseCardDTO';
import { CaseMapper } from '../mappers/CaseMapper';

export class MongodbCaseRepository implements CaseRepository {
  async findCaseCards(
    queryParams: CaseQuery = {},
    casePopulateFields: CasePopulateOptions = {}
  ): Promise<Page<WithId<CaseCardDTO>>> {
    const { query, status, limit = 10, page = 1 } = queryParams;

    const regex = new RegExp(query || '', 'i');

    const filter = { $or: [{ title: regex }, { description: regex }, { processNumber: regex }] };

    const casesQuery = CaseModel.find(filter);
    const casesTotalQuery = CaseModel.countDocuments(filter);

    if (status) {
      casesQuery.find({ status });
      casesTotalQuery.countDocuments({ status });
    }

    const { client, lawyers, documents, hearings } = casePopulateFields;

    if (client) {
      casesQuery.populate({
        path: 'client',
        select: 'firstName lastName',
      });
    }

    if (lawyers) {
      casesQuery.populate({
        path: 'lawyers',
        select: 'firstName lastName',
      });
    }

    if (documents) {
      casesQuery.populate({
        path: 'documents',
        select: 'name url uploadedAt',
      });
    }

    if (hearings) {
      casesQuery.populate({
        path: 'hearings',
        select: 'date location description',
      });
    }

    const casesPageQuery = casesQuery
      .limit(limit)
      .skip((page - 1) * limit)
      .lean();

    const [cases, totalItems] = await Promise.all([casesPageQuery, casesTotalQuery]);

    const mappedCases = cases.map(CaseMapper.persistenceToPopulatedPresentation);

    return {
      data: mappedCases,
      meta: {
        totalItems,
        totalPages: Math.ceil(totalItems / Number(limit)),
        currentPage: page,
      },
    };
  }

  async findById(id: string): Promise<WithId<Case> | null> {
    const cas = await CaseModel.findById(id).lean();

    if (!cas) {
      return null;
    }
    return CaseMapper.persistenceToDomain(cas);
  }

  async create(data: CreateCaseDTO): Promise<WithId<Case>> {
    const client = new Types.ObjectId(data.client);
    const lawyers = data.lawyers.map((lawyer) => new Types.ObjectId(lawyer));

    const cas = await CaseModel.create({
      client,
      lawyers,
      processNumber: data.processNumber,
      title: data.title,
      description: data.description,
      court: data.court,
      courtDivision: data.courtDivision,
      status: data.status,
    });

    return CaseMapper.persistenceToDomain(cas);
  }

  async getStats(client?: string): Promise<CaseStats | null> {
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

  async exists(id: string): Promise<boolean> {
    const result = await CaseModel.findById(id);
    console.log(result)
    return result !== null;
  }
}
