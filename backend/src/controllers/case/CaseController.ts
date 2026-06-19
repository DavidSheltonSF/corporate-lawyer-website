import { ICaseService } from '../../services/case/ICaseService';
import { IUserService } from '../../services/user/IUserService';
import { ICaseController } from './ICaseController';
import { HttpResponseFactory } from '../../factories/HttpResponse/HttpResponseFactory';
import { HttpRequest } from '../types/HttpRequest';
import { MissingAuthenticatedUserError } from '../../errors/presentation/MissingAuthenticatedUserError';
import { NotFoundError } from '../../errors/presentation/NotFoundError';
import { ForbiddenError } from '../../errors/presentation/ForbiddenError';
import { BadRequestError } from '../../errors/presentation/BadRequestError';
import { requireAutheticatedLawyer } from '../helpers/requireAutheticatedLawyer';
import { checkMissingFields } from '../../utils/checkMissingFields';
import { UploadService } from '../../services/uṕload/UploadService';
import { IFileService } from '../../services/files/IFileService';

export class CaseController implements ICaseController {
  constructor(
    private caseService: ICaseService,
    private fileService: IFileService,
    private userService: IUserService,
    private uploadService: UploadService
  ) {}

  create = async (httpRequest: HttpRequest) => {
    await requireAutheticatedLawyer(httpRequest, this.userService);

    const { body } = httpRequest;
    if (!body) {
      throw new BadRequestError('Missing request body');
    }

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
    await requireAutheticatedLawyer(httpRequest, this.userService);

    const { id } = httpRequest.params;
    if (!id) {
      throw new BadRequestError('Missing case id');
    }

    const { body } = httpRequest;
    if (!body) {
      return HttpResponseFactory.makeBadRequest('Missing request body');
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

    const page = httpRequest.query.page || 1;
    const limit = httpRequest.query.limit || 4;

    if (!id) {
      throw new BadRequestError('Missing id param');
    }

    const casesPaginated = await this.caseService.findAll({
      query: query ? String(query) : undefined,
      status: status ? String(status) : undefined,
      limit: limit ? Number(limit) : undefined,
      page: page ? Number(page) : undefined,
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
    await requireAutheticatedLawyer(httpRequest, this.userService);

    const { status, query, clientId } = httpRequest.query;
    const page = httpRequest.query.page || 1;
    const limit = httpRequest.query.limit || 4;

    const casesPaginated = await this.caseService.findAll({
      query: query ? String(query) : undefined,
      status: status ? String(status) : undefined,
      limit: limit ? Number(limit) : undefined,
      page: page ? Number(page) : undefined,
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

    const authUserData = await this.userService.findById(authUser.id);
    if (!authUserData) {
      throw new ForbiddenError(
        `Could not execute operation. User with id '${authUser.id}' was not found`
      );
    }

    const caseStats = await this.caseService.getStatsByClientId(authUserData.id);

    return HttpResponseFactory.makeOk(caseStats);
  };

  getStats = async (httpRequest: HttpRequest) => {
    await requireAutheticatedLawyer(httpRequest, this.userService);
    const caseStats = await this.caseService.getStats();
    return HttpResponseFactory.makeOk(caseStats);
  };

  uploadMyFile = async (httpRequest: HttpRequest) => {
    const userId = httpRequest.user?.id;
    const caseId = httpRequest.params.id;

    if (!userId) {
      throw new BadRequestError('Missing userId');
    }
    if (!caseId) {
      throw new BadRequestError('Missing case');
    }

    const file = httpRequest.file;

    const uploadResult = await this.uploadService.upload(file.buffer);

    if (!file) {
      throw new BadRequestError('Missing file');
    }

    const fixedName = Buffer.from(file.originalname, 'latin1').toString('utf8');

    const response = await this.fileService.create(
      {
        ownerId: caseId,
        name: fixedName,
        url: uploadResult.url,
        publicId: uploadResult.publicId,
        size: file.size,
        mimeType: file.mimetype,
        uploadedBy: String(userId),
      },
      file.buffer
    );

    return HttpResponseFactory.makeOk(response);
  };

  findFilesByCaseId = async (httpRequest: HttpRequest) => {
    const caseId = httpRequest.params.id;
    if (!caseId) {
      throw new BadRequestError('Missing case id');
    }

    const {limit = 1, page = 1} = httpRequest.query;

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
    await requireAutheticatedLawyer(httpRequest, this.userService);

    const { id } = httpRequest.params;
    if (!id) {
      throw new BadRequestError('Missing case id');
    }
    const deleted = await this.caseService.deleteById(id);
    if (!deleted) {
      throw new NotFoundError(`Case with id '${id} not found`);
    }

    return HttpResponseFactory.makeNoContent();
  };
}
