import { CaseRepository } from '../repositories/CaseRepository';
import { WithId } from '../types/WithId';
import { CaseModel } from '../models/case.model';
import { CreateCaseDTO } from '../dtos/user/CreateCaseDTO';
import { Types } from 'mongoose';
import { CaseStats } from '../types/CaseStats';
import { CaseStatusEnum } from '../types/CaseStatusEnum';
import { CaseQuery } from '../types/CaseQuery';
import { Case } from '../entities/Case';
import { caseDocumentToDomain } from '../mappers/caseDocumentToDomain';
import { Page } from '../types/Page';
import { CasePopulateOptions } from '../types/CasePopulateOptions';
import { CaseCardDTO } from '../dtos/case/CaseCardDTO';
import { toCaseDocumentDTO } from '../mappers/toCaseCardDTO';

export class MongodbCaseRepository implements CaseRepository {
  async findAll(
    queryParams: CaseQuery = {},
    populateFields?: string[]
  ): Promise<Page<WithId<Case>>> {
    const { query, status, limit = 10, page = 1 } = queryParams;

    const regex = new RegExp(query || '', 'i');

    const filter = { $or: [{ title: regex }, { description: regex }, { processNUmber: regex }] };

    const casesQuery = CaseModel.find(filter);
    const casesTotalQuery = CaseModel.countDocuments(filter);

    if (status) {
      casesQuery.find({ status });
      casesTotalQuery.countDocuments({ status });
    }

    if (populateFields) {
      casesQuery.populate(populateFields.join(' '), 'firstName lastName');
    }

    const casesPageQuery = casesQuery
      .limit(limit)
      .skip((page - 1) * limit)
      .lean();

    const [cases, totalItems] = await Promise.all([casesPageQuery, casesTotalQuery]);

    const mappedCases = cases.map((cas) => {
      return caseDocumentToDomain(cas);
    });

    return {
      data: mappedCases,
      meta: {
        totalItems,
        totalPages: Math.ceil(totalItems / Number(limit)),
        currentPage: page,
      },
    };
  }

  async findCaseCards(
    queryParams: CaseQuery = {},
    casePopulateFields: CasePopulateOptions = {}
  ): Promise<Page<WithId<CaseCardDTO>>> {
    const { query, status, limit = 10, page = 1 } = queryParams;

    const regex = new RegExp(query || '', 'i');

    const filter = { $or: [{ title: regex }, { description: regex }, { processNUmber: regex }] };

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

    const mappedCases = cases.map(toCaseDocumentDTO);

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
    return caseDocumentToDomain(cas);
  }

  async create(data: CreateCaseDTO): Promise<WithId<Case>> {
    const client = new Types.ObjectId(data.client);
    const lawyers = data.lawyers.map((lawyer) => new Types.ObjectId(lawyer));

    let documents;
    let hearings;

    if (data.documents) {
      documents = data.documents.map((document) => new Types.ObjectId(document));
    }

    if (data.hearings) {
      hearings = data.hearings.map((hearing) => new Types.ObjectId(hearing));
    }

    const cas = await CaseModel.create({
      client,
      lawyers,
      processNumber: data.processNumber,
      title: data.title,
      description: data.description,
      court: data.court,
      courtDivision: data.courtDivision,
      documents,
      hearings,
      status: data.status,
    });

    return caseDocumentToDomain(cas);
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
}
