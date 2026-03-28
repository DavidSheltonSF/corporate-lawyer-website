import { IUserService } from '../../services/user/IUserService';
import { IUserController } from './IUserController';
import { HttpResponseFactory } from '../../factories/HttpResponse/HttpResponseFactory';
import { HttpRequest } from '../types/HttpRequest';
import { DomainError } from '../../errors/domain/DomainError';
import { UserNotFoundError } from '../../errors/application/UserNotFoundError';
import { UserRole } from '../../types/UserRole';

export class UserController implements IUserController {
  constructor(private userService: IUserService) {}

  createClient = async (httpRequest: HttpRequest) => {
    try {
      const body = httpRequest.body;
      if (!body) {
        return HttpResponseFactory.makeBadRequest<null>({ message: 'Missing request body' });
      }

      const { firstName, lastName, email, cpf, password, role } = body;

      const data = await this.userService.createClient({
        firstName,
        lastName,
        email,
        cpf,
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

  findClientById = async (httpRequest: HttpRequest) => {
    try {
      const { id } = httpRequest.params;
      const { include } = httpRequest.query;

      if (!id) {
        return HttpResponseFactory.makeBadRequest<null>({ message: 'Missing id param' });
      }

      const foundUser = await this.userService.findById(id, {
        cases: include === 'cases',
      });

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

  updateById = async (httpRequest: HttpRequest) => {
    try {
      const { id } = httpRequest.params;
      const authUser = httpRequest.user;
      const body = httpRequest.body;

      if (!authUser) {
        return HttpResponseFactory.makeBadRequest<null>({
          message: 'Missing authenticated user',
        });
      }

      if (!id) {
        return HttpResponseFactory.makeBadRequest<null>({ message: 'Missing user id' });
      }

      if (!body) {
        return HttpResponseFactory.makeBadRequest<null>({ message: 'Missing request body' });
      }

      const authUserData = await this.userService.findById(authUser.id);

      if (authUserData.role !== UserRole.lawyer) {
        return HttpResponseFactory.makeForbidden<null>({
          message: `Could not execute operation. User with id '${authUserData.id} is not a lawyer'`,
        });
      }

      const result = await this.userService.updateById(id, body);

      return HttpResponseFactory.makeOk({ data: result });
    } catch (error: any) {
      if (error instanceof UserNotFoundError) {
        return HttpResponseFactory.makeNotFound<null>({ message: error.message });
      }

      if (error instanceof DomainError) {
        return HttpResponseFactory.makeUnprocessableEntity<null>({ message: error.message });
      }

      return HttpResponseFactory.makeServerError<null>({ message: error.message });
    }
  };

  deleteById = async (httpRequest: HttpRequest) => {
    try {
      const { id } = httpRequest.params;
      const authUser = httpRequest.user;

      if (!authUser) {
        return HttpResponseFactory.makeBadRequest<null>({
          message: 'Missing authenticated user',
        });
      }

      if (!id) {
        return HttpResponseFactory.makeBadRequest<null>({ message: 'Missing user id' });
      }

      const authUserData = await this.userService.findById(authUser.id);

      if (authUserData.role !== UserRole.lawyer) {
        return HttpResponseFactory.makeForbidden<null>({
          message: `Could not execute operation. User with id '${authUserData.id} is not a lawyer'`,
        });
      }

      const result = await this.userService.deleteById(id);

      return HttpResponseFactory.makeOk({ data: result });
    } catch (error: any) {
      if (error instanceof UserNotFoundError) {
        return HttpResponseFactory.makeNotFound<null>({ message: error.message });
      }

      return HttpResponseFactory.makeServerError<null>({ message: error.message });
    }
  };
}
