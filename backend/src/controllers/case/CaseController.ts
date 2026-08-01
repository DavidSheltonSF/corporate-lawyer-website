import { ICaseService } from '../../services/case/ICaseService';
import { ICaseController } from './ICaseController';
import { HttpResponseFactory } from '../../factories/HttpResponse/HttpResponseFactory';
import { HttpRequest } from '../types/HttpRequest';
import { MissingAuthenticatedUserError } from '../../errors/presentation/MissingAuthenticatedUserError';
import { NotFoundError } from '../../errors/presentation/NotFoundError';
import { BadRequestError } from '../../errors/presentation/BadRequestError';
import { checkMissingFields } from '../../utils/checkMissingFields';
import { IFileService } from '../../services/files/IFileService';
import { requireBody } from '../helpers/requireBody';
import { getPagination } from '../helpers/getPagination';

export class CaseController implements ICaseController {
  constructor(
    private caseService: ICaseService,
    private fileService: IFileService
  ) {}

  create = async (httpRequest: HttpRequest) => {
    const body = requireBody(httpRequest);

    checkMissingFields(body, [
      'title',
      'processNumber',
      'court',
      'courtDivision',
      'status',
      'client',
      'lawyers',
    ]);

    const response = await this.caseService.create(body);

    return HttpResponseFactory.makeCreated(response);
  };

  updateById = async (httpRequest: HttpRequest) => {
    const { id } = httpRequest.params;
    if (!id) {
      throw new BadRequestError('Missing case id');
    }

    const body = requireBody(httpRequest);

    if (Object.keys(body).length === 0) {
      throw new BadRequestError('Request body must have at least one field to update');
    }

    const updatedCase = await this.caseService.updateById(id, body);
    if (!updatedCase) {
      throw new NotFoundError(`Case with id '${id} not found`);
    }

    return HttpResponseFactory.makeOk(updatedCase);
  };

  findById = async (httpRequest: HttpRequest) => {
    const { id } = httpRequest.params;
    if (!id) {
      throw new BadRequestError('Missing id param');
    }

    const { populate } = httpRequest.query;
    const populateCase = populate === 'true';

    const foundCase = await this.caseService.findById(id, populateCase);
    if (!foundCase) {
      throw new NotFoundError(`Case with id '${id} not found`);
    }

    return HttpResponseFactory.makeOk(foundCase);
  };

  findMyCases = async (httpRequest: HttpRequest) => {
    const id = httpRequest.user?.id;

    const { status, query } = httpRequest.query;

    const { limit, page } = getPagination(httpRequest.query);

    if (!id) {
      throw new BadRequestError('Missing id param');
    }

    const casesPaginated = await this.caseService.findAll({
      query: query ? String(query) : undefined,
      status: status ? String(status) : undefined,
      limit,
      page,
      clientId: id,
    });

    const pagination = {
      ...casesPaginated,
      page,
      limit,
    };

    return HttpResponseFactory.makeOk(pagination);
  };

  findAll = async (httpRequest: HttpRequest) => {
    const { status, query, clientId } = httpRequest.query;
    const { limit, page } = getPagination(httpRequest.query);

    const casesPaginated = await this.caseService.findAll({
      query: query ? String(query) : undefined,
      status: status ? String(status) : undefined,
      limit,
      page,
      clientId,
    });

    const pagination = {
      ...casesPaginated,
      page,
      limit,
    };

    return HttpResponseFactory.makeOk(pagination);
  };

  getMyStats = async (httpRequest: HttpRequest) => {
    const authUser = httpRequest.user;
    if (!authUser) {
      throw new MissingAuthenticatedUserError();
    }

    const caseStats = await this.caseService.getStatsByClientId(authUser.id);

    return HttpResponseFactory.makeOk(caseStats);
  };

  getStats = async (httpRequest: HttpRequest) => {
    const caseStats = await this.caseService.getStats();
    return HttpResponseFactory.makeOk(caseStats);
  };

  uploadMyFile = async (httpRequest: HttpRequest) => {
    const authUser = httpRequest.user;
    const caseId = httpRequest.params.id;

    if (!authUser) {
      throw new MissingAuthenticatedUserError();
    }
    if (!caseId) {
      throw new BadRequestError('Missing case id');
    }

    const file = httpRequest.file;

    if (!file) {
      throw new BadRequestError('Missing file');
    }

    const response = await this.fileService.create(authUser.id, caseId, file);

    return HttpResponseFactory.makeOk(response);
  };

  findFilesByCaseId = async (httpRequest: HttpRequest) => {
    const caseId = httpRequest.params.id;
    if (!caseId) {
      throw new BadRequestError('Missing case id');
    }

    const { limit, page } = getPagination(httpRequest.query);

    const foundCaseFiles = await this.fileService.findByOwnerId(String(caseId), {
      limit: Number(limit),
      page: Number(page),
    });

    if (!foundCaseFiles) {
      throw new NotFoundError(`Case with id '${caseId} not found`);
    }

    return HttpResponseFactory.makeOk(foundCaseFiles);
  };

  deleteById = async (httpRequest: HttpRequest) => {
    const { id } = httpRequest.params;
    if (!id) {
      throw new BadRequestError('Missing case id');
    }

    await this.fileService.deleteByOwnerId(id);

    const deleted = await this.caseService.deleteById(id);
    if (!deleted) {
      throw new NotFoundError(`Case with id '${id} not found`);
    }

    return HttpResponseFactory.makeNoContent();
  };
}
