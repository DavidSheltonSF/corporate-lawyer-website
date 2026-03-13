import { CaseRepository } from '../../../repositories/CaseRepository';
import { WithId } from '../../../types/WithId';
import { CaseModel } from '../../../models/CaseModel';
import { CreateCaseDTO } from '../../../dtos/case/CreateCaseDTO';
import { Types } from 'mongoose';
import { CasesStats } from '../../../types/CasesStats';
import { CasesStatus } from '../../../types/CasesStatus';
import { CaseQuery } from '../../../types/CaseQuery';
import { Case } from '../../../entities/Case';
import { Page } from '../../../types/Page';
import { CaseCardDTO } from '../../../dtos/case/CaseCardDTO';
import { CaseMapper } from '../../../mappers/CaseMapper';
import { CaseNotFoundError } from '../../../errors/application/CaseNotFoundError';
import { CreateCaseFileDTO } from '../../../dtos/caseFile/CreateCaseFileDTO';
import { CaseFileDTO } from '../../../dtos/caseFile/CaseFileDTO';
import { CaseFileMapper } from '../../../mappers/CaseFile/CaseFileMapper';

export class MongodbCaseRepository implements CaseRepository {
  async findCases(queryParams: CaseQuery = {}): Promise<Page<WithId<CaseCardDTO>>> {
    const { query, status, limit = 10, page = 1 } = queryParams;

    const regex = new RegExp(query || '', 'i');

    const filter = { $or: [{ title: regex }, { description: regex }, { processNumber: regex }] };

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

    return {
      data: mappedCases,
      meta: {
        totalItems,
        totalPages: Math.ceil(totalItems / Number(limit)),
        currentPage: page,
      },
    };
  }

  async findById(id: string): Promise<WithId<CaseCardDTO> | null> {
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

  async getStatsByClientId(clientId: string): Promise<CasesStats | null> {
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

  async addFile(caseId: string, file: CreateCaseFileDTO): Promise<void> {
    const updated = await CaseModel.findByIdAndUpdate(
      {
        _id: caseId,
      },
      {
        $push: {
          files: file,
        },
      },
      {
        returnDocument: 'after',
        runValidators: true,
      }
    ).lean();

    if (updated === null) {
      throw new CaseNotFoundError(caseId);
    }
  }

  async findFilesByCaseId(caseId: string): Promise<WithId<CaseFileDTO>[]> {
    const foundCase = await CaseModel.findById(caseId)
      .select('files')
      .populate('files.uploadedBy')
      .lean();
    if (!foundCase) throw new CaseNotFoundError(caseId);

    const caseFiles = foundCase.files;
    return caseFiles.map(CaseFileMapper.persistenceToPresentation);
  }

  async exists(id: string): Promise<boolean> {
    const result = await CaseModel.findById(id);
    return result !== null;
  }
}
