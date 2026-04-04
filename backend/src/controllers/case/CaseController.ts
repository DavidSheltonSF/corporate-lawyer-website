import { ICaseService } from '../../services/case/ICaseService';
import { IUserService } from '../../services/user/IUserService';
import { ICaseController } from './ICaseController';
import { HttpResponseFactory } from '../../factories/HttpResponse/HttpResponseFactory';
import { HttpRequest } from '../types/HttpRequest';
import { UserRole } from '../../types/UserRole';
import { getMissingFields } from '../../helpers/getMissingFields';
import { MissingAuthenticatedUserError } from '../../errors/presentation/MissingAuthenticatedUserError';
import { DomainError } from '../../errors/domain/DomainError';

export class CaseController implements ICaseController {
  constructor(private caseService: ICaseService, private userService: IUserService) {}

  create = async (httpRequest: HttpRequest) => {
    try {
      const { body } = httpRequest;
      if (!body) {
        return HttpResponseFactory.makeBadRequest('Missing request body');
      }

      const authUser = httpRequest.user;
      if (!authUser) {
        throw new MissingAuthenticatedUserError();
      }

      const authUserData = await this.userService.findById(authUser.id);
      if (authUserData.role !== UserRole.lawyer) {
        return HttpResponseFactory.makeForbidden(
          `Could not execute operation. User with id '${authUserData.id} is not a lawyer'`
        );
      }

      const missingFields = getMissingFields(body, [
        'title',
        'processNumber',
        'court',
        'courtDivision',
        'status',
        'client',
        'lawyers',
      ]);

      if (missingFields.length > 0) {
        return HttpResponseFactory.makeBadRequest(
          `Missing required fields: ${missingFields.toString()}`
        );
      }

      const response = await this.caseService.create(body);

      return HttpResponseFactory.makeCreated(response);
    } catch (error: any) {
      console.log(error);

      if (error instanceof DomainError) {
        return HttpResponseFactory.makeUnprocessableEntity(error.message);
      }

      // Check if it is NotFound error
      if (error.statusCode === 404) {
        return HttpResponseFactory.makeNotFound(error.message);
      }

      return HttpResponseFactory.makeServerError(error.message);
    }
  };

  updateById = async (httpRequest: HttpRequest) => {
    try {
      const { id } = httpRequest.params;
      if (!id) {
        return HttpResponseFactory.makeBadRequest('Missing case id');
      }

      const { body } = httpRequest;
      if (!body) {
        return HttpResponseFactory.makeBadRequest('Missing request body');
      }

      const authUser = httpRequest.user;
      if (!authUser) {
        throw new MissingAuthenticatedUserError();
      }

      const authUserData = await this.userService.findById(authUser.id);
      if (authUserData.role !== UserRole.lawyer) {
        return HttpResponseFactory.makeForbidden(
          `Could not execute operation. User with id '${authUserData.id} is not a lawyer'`
        );
      }

      const response = await this.caseService.updateById(id, body);

      return HttpResponseFactory.makeOk(response);
    } catch (error: any) {
      console.log(error);

      // Check if it is NotFound error
      if (error.statusCode === 404) {
        return HttpResponseFactory.makeNotFound(error.message);
      }

      return HttpResponseFactory.makeServerError(error.message);
    }
  };

  findById = async (httpRequest: HttpRequest) => {
    try {
      const { id } = httpRequest.params;
      if (!id) {
        return HttpResponseFactory.makeBadRequest('Missing id param');
      }

      const foundCase = await this.caseService.findById(id);

      return HttpResponseFactory.makeOk(foundCase);
    } catch (error: any) {
      console.log(error);

      // Check if it is NotFound error
      if (error.statusCode === 404) {
        return HttpResponseFactory.makeNotFound(error.message);
      }

      return HttpResponseFactory.makeServerError(error.message);
    }
  };

  findMyCases = async (httpRequest: HttpRequest) => {
    const id = httpRequest.user?.id;

    const { status, query } = httpRequest.query;

    const page = httpRequest.query.page || 1;
    const limit = httpRequest.query.limit || 4;

    if (!id) {
      return HttpResponseFactory.makeBadRequest('Missing id param');
    }

    const casesPaginated = await this.caseService.findCases({
      query: query ? String(query) : undefined,
      status: status ? String(status) : undefined,
      limit: limit ? Number(limit) : undefined,
      page: page ? Number(page) : undefined,
      client: id ? String(id) : undefined,
    });

    const pagination = {
      ...casesPaginated,
      page,
      limit,
    };

    return HttpResponseFactory.makeOk(pagination);
  };

  getMyStats = async (httpRequest: HttpRequest) => {
    try {
      const id = httpRequest.user?.id;

      if (!id) {
        throw Error(
          'User credentials were not found. The user id should be attached in request.user.id by a middleware'
        );
      }

      const clientExists = await this.userService.findById(id);

      if (!clientExists) {
        return HttpResponseFactory.makeNotFound('Client not found');
      }

      const caseStats = await this.caseService.getStatsByClientId(id);

      return HttpResponseFactory.makeOk(caseStats);
    } catch (error: any) {
      console.log(error);
      return HttpResponseFactory.makeServerError(error.message);
    }
  };

  getStats = async (httpRequest: HttpRequest) => {
    try {
      const authUser = httpRequest.user;

      if (!authUser) {
        throw new MissingAuthenticatedUserError();
      }

      const authUserData = await this.userService.findById(authUser.id);
      if (authUserData.role !== UserRole.lawyer) {
        return HttpResponseFactory.makeForbidden(
          `Could not execute operation. User with id '${authUserData.id} is not a lawyer'`
        );
      }

      const caseStats = await this.caseService.getStats();

      return HttpResponseFactory.makeOk(caseStats);
    } catch (error: any) {
      console.log(error);
      return HttpResponseFactory.makeServerError(error.message);
    }
  };

  uploadMyFile = async (httpRequest: HttpRequest) => {
    try {
      const userId = httpRequest.user?.id;
      const caseId = httpRequest.params.id;

      if (!userId) {
        return HttpResponseFactory.makeBadRequest('Missing userId');
      }
      if (!caseId) {
        return HttpResponseFactory.makeBadRequest('Missing case');
      }

      const file = httpRequest.file;

      if (!file) {
        return HttpResponseFactory.makeBadRequest('Missing file');
      }

      const fixedName = Buffer.from(file.originalname, 'latin1').toString('utf8');

      const response = await this.caseService.addFile(caseId, {
        name: fixedName,
        url: 'www.fakeUrl/' + Number(new Date()).toString(),
        size: file.size,
        mimeType: file.mimetype,
        uploadedBy: String(userId),
      });

      return HttpResponseFactory.makeOk(response);
    } catch (error: any) {
      console.log(error);
      return HttpResponseFactory.makeServerError(error.message);
    }
  };

  findFilesByCaseId = async (httpRequest: HttpRequest) => {
    try {
      const caseId = httpRequest.params.id;
      if (!caseId) {
        return HttpResponseFactory.makeBadRequest('Missing case id');
      }

      const caseFiles = await this.caseService.findFilesByCaseId(String(caseId));

      if (!caseFiles) {
        return HttpResponseFactory.makeNotFound(`Case with id ${caseId} was not found`);
      }

      return HttpResponseFactory.makeOk(caseFiles);
    } catch (error: any) {
      console.log(error);
      return HttpResponseFactory.makeServerError(error.message);
    }
  };

  deleteById = async (httpRequest: HttpRequest) => {
    try {
      const { id } = httpRequest.params;
      if (!id) {
        return HttpResponseFactory.makeBadRequest('Missing case id');
      }

      const authUser = httpRequest.user;
      if (!authUser) {
        throw new MissingAuthenticatedUserError();
      }

      const authUserData = await this.userService.findById(authUser.id);
      if (authUserData.role !== UserRole.lawyer) {
        return HttpResponseFactory.makeForbidden(
          `Could not execute operation. User with id '${authUserData.id} is not a lawyer'`
        );
      }

      await this.caseService.deleteById(id);

      return HttpResponseFactory.makeNoContent();
    } catch (error: any) {
      console.log(error);

      return HttpResponseFactory.makeServerError(error.message);
    }
  };
}
