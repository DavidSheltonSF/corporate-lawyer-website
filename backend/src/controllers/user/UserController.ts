import { IUserService } from '../../services/user/IUserService';
import { IUserController } from './IUserController';
import { HttpResponseFactory } from '../../factories/HttpResponse/HttpResponseFactory';
import { HttpRequest } from '../types/HttpRequest';
import { DomainError } from '../../errors/domain/DomainError';

export class UserController implements IUserController {
  constructor(private userService: IUserService) {}

  create = async (httpRequest: HttpRequest) => {
    try {
      const body = httpRequest.body;
      if (!body) {
        return HttpResponseFactory.makeBadRequest<null>({ message: 'Missing request body' });
      }

      const { firstName, lastName, email, cpf, password, role } = body;

      const data = await this.userService.create({
        firstName,
        lastName,
        email,
        cpf,
        password,
        role,
      });

      return HttpResponseFactory.makeCreated({ data });
    } catch (error: unknown) {
      console.log(error);

      if (error instanceof DomainError) {
        return HttpResponseFactory.makeUnprocessableEntity<null>({
          message: error.message,
        });
      }
      return HttpResponseFactory.makeServerError<null>({ message: 'Internal server error' });
    }
  };

  findAll = async (httpRequest: HttpRequest) => {
    const data = await this.userService.findAll();
    return HttpResponseFactory.makeOk({ data });
  };

  findClients = async (httpRequest: HttpRequest) => {
    const { query = '', limit = 4, page = 1 } = httpRequest.query;
    const data = await this.userService.findClients({ query, limit, page });
    return HttpResponseFactory.makeOk({ data });
  };

  findById = async (httpRequest: HttpRequest) => {
    try {
      const { id } = httpRequest.params;

      if (!id) {
        return HttpResponseFactory.makeBadRequest<null>({ message: 'Missing id param' });
      }

      const foundUser = await this.userService.findById(id);

      return HttpResponseFactory.makeOk({ data: foundUser });
    } catch (error: any) {
      console.log(error);

      // Check if it is NotFound error
      if (error.statusCode === 404) {
        return HttpResponseFactory.makeNotFound<null>({ message: error.message });
      }

      return HttpResponseFactory.makeServerError<null>({ message: error.message });
    }
  };
}
