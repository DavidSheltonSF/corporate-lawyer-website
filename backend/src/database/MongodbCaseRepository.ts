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

export class MongodbCaseRepository implements CaseRepository {
  async findAll(queryParams: CaseQuery = {}, populateFields?: string[]): Promise<WithId<Case>[]> {
    const { query, status, limit = 10, page = 1 } = queryParams;

    const regex = new RegExp(query || '', 'i');

    const filter = { $or: [{ title: regex }, { description: regex }, { processNUmber: regex }] };

    const casesQuery = CaseModel.find(filter);

    if (status) {
      casesQuery.find({ status });
    }

    if (populateFields) {
      casesQuery.populate(populateFields.join(' '), 'firstName lastName');
    }

    const cases = await casesQuery
      .limit(limit)
      .skip((page - 1) * limit)
      .lean();

    return cases.map((cas) => {
      return caseDocumentToDomain(cas);
    });
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
