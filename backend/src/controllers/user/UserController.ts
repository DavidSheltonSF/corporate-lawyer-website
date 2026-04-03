import { IUserService } from '../../services/user/IUserService';
import { IUserController } from './IUserController';
import { HttpResponseFactory } from '../../factories/HttpResponse/HttpResponseFactory';
import { HttpRequest } from '../types/HttpRequest';
import { DomainError } from '../../errors/domain/DomainError';
import { UserNotFoundError } from '../../errors/application/UserNotFoundError';
import { UserRole } from '../../types/UserRole';
import { MissingAuthenticatedUserError } from '../../errors/presentation/MissingAuthenticatedUserError';

export class UserController implements IUserController {
  constructor(private userService: IUserService) {}

  createClient = async (httpRequest: HttpRequest) => {
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

      const body = httpRequest.body;
      if (!body) {
        return HttpResponseFactory.makeBadRequest('Missing request body');
      }

      const { firstName, lastName, email, cpf } = body;

      const data = await this.userService.createClient({
        firstName,
        lastName,
        email,
        cpf,
      });

      return HttpResponseFactory.makeCreated(data);
    } catch (error: unknown) {
      console.log(error);

      if (error instanceof DomainError) {
        return HttpResponseFactory.makeUnprocessableEntity(error.message);
      }
      return HttpResponseFactory.makeServerError('Internal server error');
    }
  };

  findAll = async (httpRequest: HttpRequest) => {
    const data = await this.userService.findAll();
    return HttpResponseFactory.makeOk(data);
  };

  findClients = async (httpRequest: HttpRequest) => {
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

    const { query = '', limit = 4, page = 1 } = httpRequest.query;
    const data = await this.userService.findClients({ query, limit, page });
    return HttpResponseFactory.makeOk(data);
  };

  findById = async (httpRequest: HttpRequest) => {
    try {
      const { id } = httpRequest.params;

      if (!id) {
        return HttpResponseFactory.makeBadRequest('Missing id param');
      }

      const foundUser = await this.userService.findById(id);

      return HttpResponseFactory.makeOk(foundUser);
    } catch (error: any) {
      console.log(error);

      // Check if it is NotFound error
      if (error.statusCode === 404) {
        return HttpResponseFactory.makeNotFound(error.message);
      }

      return HttpResponseFactory.makeServerError(error.message);
    }
  };

  findClientById = async (httpRequest: HttpRequest) => {
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

      const { id } = httpRequest.params;
      const { include } = httpRequest.query;

      if (!id) {
        return HttpResponseFactory.makeBadRequest('Missing id param');
      }

      const foundUser = await this.userService.findById(id, {
        cases: include === 'cases',
      });

      return HttpResponseFactory.makeOk(foundUser);
    } catch (error: any) {
      console.log(error);

      // Check if it is NotFound error
      if (error.statusCode === 404) {
        return HttpResponseFactory.makeNotFound(error.message);
      }

      return HttpResponseFactory.makeServerError(error.message);
    }
  };

  updateById = async (httpRequest: HttpRequest) => {
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

      const { id } = httpRequest.params;
      if (!id) {
        return HttpResponseFactory.makeBadRequest('Missing user id');
      }

      const body = httpRequest.body;
      if (!body) {
        return HttpResponseFactory.makeBadRequest('Missing request body');
      }

      const result = await this.userService.updateById(id, body);

      return HttpResponseFactory.makeOk(result);
    } catch (error: any) {
      if (error instanceof UserNotFoundError) {
        return HttpResponseFactory.makeNotFound(error.message);
      }

      if (error instanceof DomainError) {
        return HttpResponseFactory.makeUnprocessableEntity(error.message);
      }

      return HttpResponseFactory.makeServerError(error.message);
    }
  };

  deleteById = async (httpRequest: HttpRequest) => {
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

      const { id } = httpRequest.params;
      if (!id) {
        return HttpResponseFactory.makeBadRequest('Missing user id');
      }

      const result = await this.userService.deleteById(id);

      return HttpResponseFactory.makeOk(result);
    } catch (error: any) {
      if (error instanceof UserNotFoundError) {
        return HttpResponseFactory.makeNotFound(error.message);
      }

      return HttpResponseFactory.makeServerError(error.message);
    }
  };
}
