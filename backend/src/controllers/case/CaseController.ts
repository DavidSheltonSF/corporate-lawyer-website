import { ICaseService } from '../../services/case/ICaseService';
import { IUserService } from '../../services/user/IUserService';
import { ICaseController } from './ICaseController';
import { HttpResponseFactory } from '../../factories/HttpResponse/HttpResponseFactory';
import { HttpRequest } from '../types/HttpRequest';
import { UserRole } from '../../types/UserRole';

export class CaseController implements ICaseController {
  constructor(private caseService: ICaseService, private userService: IUserService) {}

  findById = async (httpRequest: HttpRequest) => {
    try {
      const { id } = httpRequest.params;
      if (!id) {
        return HttpResponseFactory.makeBadRequest<null>({ message: 'Missing id param' });
      }

      const foundCase = await this.caseService.findById(id);

      return HttpResponseFactory.makeOk({ data: foundCase });
    } catch (error: any) {
      console.log(error);

      // Check if it is NotFound error
      if (error.statusCode === 404) {
        return HttpResponseFactory.makeNotFound<null>({ message: error.message });
      }

      return HttpResponseFactory.makeServerError<null>({ message: error.message });
    }
  };

  findMyCases = async (httpRequest: HttpRequest) => {
    const id = httpRequest.user?.id;

    const { status, query } = httpRequest.query;

    const page = httpRequest.query.page || 1;
    const limit = httpRequest.query.limit || 4;

    if (!id) {
      return HttpResponseFactory.makeBadRequest<null>({ message: 'Missing id param' });
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

    return HttpResponseFactory.makeOk({ data: pagination });
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
        return HttpResponseFactory.makeNotFound<null>({ message: 'Client not found' });
      }

      const caseStats = await this.caseService.getStatsByClientId(id);

      return HttpResponseFactory.makeOk({ data: caseStats });
    } catch (error: any) {
      console.log(error);
      return HttpResponseFactory.makeServerError<null>({ message: error.message });
    }
  };

  getStats = async (httpRequest: HttpRequest) => {
    try {
      const authUser = httpRequest.user;

      if (!authUser) {
        return HttpResponseFactory.makeBadRequest<null>({
          message: 'Missing authenticated user',
        });
      }

      console.log(authUser)

      // const authUserData = await this.userService.findById(authUser.id);

      // if (authUserData.role !== UserRole.lawyer) {
      //   return HttpResponseFactory.makeForbidden<null>({
      //     message: `Could not execute operation. User with id '${authUserData.id} is not a lawyer'`,
      //   });
      // }

      const caseStats = await this.caseService.getStats();

      return HttpResponseFactory.makeOk({ data: caseStats });
    } catch (error: any) {
      console.log(error);
      return HttpResponseFactory.makeServerError<null>({ message: error.message });
    }
  };

  uploadMyFile = async (httpRequest: HttpRequest) => {
    try {
      const userId = httpRequest.user?.id;
      const caseId = httpRequest.params.id;

      if (!userId) {
        return HttpResponseFactory.makeBadRequest<null>({ message: 'Missing userId' });
      }
      if (!caseId) {
        return HttpResponseFactory.makeBadRequest<null>({ message: 'Missing case' });
      }

      const file = httpRequest.file;

      if (!file) {
        return HttpResponseFactory.makeBadRequest<null>({ message: 'Missing file' });
      }

      const fixedName = Buffer.from(file.originalname, 'latin1').toString('utf8');

      const response = await this.caseService.addFile(caseId, {
        name: fixedName,
        url: 'www.fakeUrl/' + Number(new Date()).toString(),
        size: file.size,
        mimeType: file.mimetype,
        uploadedBy: String(userId),
      });

      return HttpResponseFactory.makeOk({ data: response });
    } catch (error: any) {
      console.log(error);
      return HttpResponseFactory.makeServerError<null>({ message: error });
    }
  };

  findFilesByCaseId = async (httpRequest: HttpRequest) => {
    try {
      const caseId = httpRequest.params.id;
      console.log(caseId);

      if (!caseId) {
        return HttpResponseFactory.makeBadRequest<null>({ message: 'Missing case id' });
      }

      const caseFiles = await this.caseService.findFilesByCaseId(String(caseId));

      if (!caseFiles) {
        return HttpResponseFactory.makeNotFound<null>({
          message: `Case with id ${caseId} was not found`,
        });
      }

      return HttpResponseFactory.makeOk({ data: caseFiles });
    } catch (error: any) {
      console.log(error);
      return HttpResponseFactory.makeServerError<null>({ message: error });
    }
  };
}
