import { CaseRepository } from '../../../repositories/CaseRepository';
import { WithId } from '../../../types/WithId';
import { CaseModel } from '../../../models/CaseModel';
import { CreateCaseDTO } from '../../../dtos/case/CreateCaseDTO';
import { Types } from 'mongoose';
import { CasesStats } from '../../../types/CasesStats';
import { CasesStatus } from '../../../types/CasesStatus';
import { CaseQuery } from '../../../types/CaseQuery';
import { Page } from '../../../types/Page';
import { CaseMapper } from '../../../mappers/Case/CaseMapper';
import { UpdateCaseDTO } from '../../../dtos/case/UpdateCaseDTO';
import { CaseDTO } from '../../../dtos/case/CaseDTO';

export class MongodbCaseRepository implements CaseRepository {
  async create(data: CreateCaseDTO): Promise<WithId<CaseDTO>> {
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
      location: data.location,
    });

    return CaseMapper.persistenceToPresentation(cas);
  }

  async updateById(id: string, data: UpdateCaseDTO): Promise<WithId<CaseDTO> | null> {
    const cas = await CaseModel.findByIdAndUpdate(id, data, { returnDocument: 'after' });
    if (!cas) return null;
    return CaseMapper.persistenceToPresentation(cas);
  }
  async findAll(queryParams: CaseQuery = {}): Promise<Page<WithId<CaseDTO>>> {
    const { query, status, limit = 10, page = 1, clientId } = queryParams;

    const regex = new RegExp(query || '', 'i');

    const filter: Record<string, any> = {
      $or: [{ title: regex }, { description: regex }, { processNumber: regex }],
    };

    if (clientId) {
      filter.client = clientId;
    }

    const casesQuery = CaseModel.find(filter);
    const casesTotalQuery = CaseModel.countDocuments(filter);

    if (status) {
      casesQuery.find({ status });
      casesTotalQuery.countDocuments({ status });
    }

    const casesPageQuery = casesQuery
      .populate({
        path: 'client',
        select: 'firstName lastName',
      })
      .populate({
        path: 'lawyers',
        select: 'firstName lastName',
      })
      .limit(limit)
      .skip((page - 1) * limit)
      .lean();

    const [cases, totalItems] = await Promise.all([casesPageQuery, casesTotalQuery]);
    const mappedCases = cases.map(CaseMapper.persistenceToPopulatedPresentation);

    const totalPages = Math.ceil(totalItems / Number(limit));
    return {
      items: mappedCases,
      meta: {
        totalItems,
        totalPages,
        currentPage: page,
        nextPage: page < totalPages ? page + 1 : null,
      },
    };
  }

  async findById(id: string): Promise<WithId<CaseDTO> | null> {
    const query = CaseModel.findById(id);

    const foundCase = await query.lean();

    if (!foundCase) {
      return null;
    }
    return CaseMapper.persistenceToPresentation(foundCase);
  }

  async findPopulatedById(id: string): Promise<WithId<CaseDTO> | null> {
    const query = CaseModel.findById(id);

    query.populate({
      path: 'files.uploadedBy',
      select: 'firstName lastName',
    });

    query.populate({
      path: 'client',
      select: 'firstName lastName',
    });

    query.populate({
      path: 'lawyers',
      select: 'firstName lastName',
    });

    const foundCase = await query.lean();

    if (!foundCase) {
      return null;
    }
    return CaseMapper.persistenceToPopulatedPresentation(foundCase);
  }

  async getStatsByClientId(clientId: string): Promise<CasesStats> {
    const open = await CaseModel.countDocuments({
      client: clientId,
      status: CasesStatus.open,
    });
    const closed = await CaseModel.countDocuments({
      client: clientId,
      status: CasesStatus.closed,
    });

    return {
      open,
      closed,
    };
  }

  async getStats(): Promise<CasesStats> {
    const open = await CaseModel.countDocuments({
      status: CasesStatus.open,
    });
    const closed = await CaseModel.countDocuments({
      status: CasesStatus.closed,
    });

    return {
      open,
      closed,
    };
  }
  async deleteById(id: string): Promise<WithId<CaseDTO> | null> {
    const deletedCase = await CaseModel.findByIdAndDelete(id);
    return CaseMapper.persistenceToPresentation(deletedCase);
  }

  async deleteByUserId(id: string): Promise<{
    acknowledged: boolean;
    deletedCount: number;
  }> {
    return await CaseModel.deleteMany({ client: id });
  }

  async existsById(id: string): Promise<boolean> {
    const result = await CaseModel.findById(id);
    return result !== null;
  }
}
