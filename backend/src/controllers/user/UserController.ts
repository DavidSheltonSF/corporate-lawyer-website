import { IUserService } from '../../services/user/IUserService';
import { IUserController } from './IUserController';
import { HttpResponseFactory } from '../../factories/HttpResponse/HttpResponseFactory';
import { HttpRequest } from '../types/HttpRequest';
import { UserRole } from '../../types/UserRole';
import { MissingAuthenticatedUserError } from '../../errors/presentation/MissingAuthenticatedUserError';
import { NotFoundError } from '../../errors/presentation/NotFoundError';
import { ForbiddenError } from '../../errors/presentation/ForbiddenError';
import { BadRequestError } from '../../errors/presentation/BadRequestError';
import { checkMissingFields } from '../../helpers/checkMissingFields';

export class UserController implements IUserController {
  constructor(private userService: IUserService) {}

  createClient = async (httpRequest: HttpRequest) => {
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
    if (authUserData.role !== UserRole.lawyer) {
      throw new ForbiddenError(
        `Could not execute operation. User with id '${authUserData.id}' is not a lawyer`
      );
    }

    const body = httpRequest.body;
    if (!body) {
      throw new BadRequestError('Missing request body');
    }

    checkMissingFields(body, ['firstName', 'lastName', 'email', 'cpf']);

    const { firstName, lastName, email, cpf } = body;

    const data = await this.userService.createClient({
      firstName,
      lastName,
      email,
      cpf,
    });

    return HttpResponseFactory.makeCreated(data);
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
    if (!authUserData) {
      throw new ForbiddenError(
        `Could not execute operation. User with id ${authUser.id} was not found`
      );
    }

    if (authUserData.role !== UserRole.lawyer) {
      throw new ForbiddenError(
        `Could not execute operation. User with id ${authUser.id} is not a lawyer`
      );
    }

    const { query = '', limit = 4, page = 1 } = httpRequest.query;
    const data = await this.userService.findClients({ query, limit, page });
    return HttpResponseFactory.makeOk(data);
  };

  findById = async (httpRequest: HttpRequest) => {
    const { id } = httpRequest.params;

    if (!id) {
      throw new BadRequestError('Missing id param');
    }

    const foundUser = await this.userService.findById(id);

    if (!foundUser) {
      throw new NotFoundError(`User with id '${id}' not found`);
    }

    return HttpResponseFactory.makeOk(foundUser);
  };

  findClientById = async (httpRequest: HttpRequest) => {
    const authUser = httpRequest.user;
    if (!authUser) {
      throw new MissingAuthenticatedUserError();
    }

    const authUserData = await this.userService.findById(authUser.id);
    if (!authUserData) {
      throw new ForbiddenError(
        `Could not execute operation. User with id ${authUser.id} was not found`
      );
    }

    if (authUserData.role !== UserRole.lawyer) {
      throw new ForbiddenError(
        `Could not execute operation. User with id ${authUser.id} is not a lawyer`
      );
    }

    const { id } = httpRequest.params;
    const { include } = httpRequest.query;

    if (!id) {
      throw new BadRequestError('Missing id param');
    }

    const foundUser = await this.userService.findById(id, {
      cases: include === 'cases',
    });

    return HttpResponseFactory.makeOk(foundUser);
  };

  updateById = async (httpRequest: HttpRequest) => {
    const authUser = httpRequest.user;
    if (!authUser) {
      throw new MissingAuthenticatedUserError();
    }

    const authUserData = await this.userService.findById(authUser.id);
    if (!authUserData) {
      throw new ForbiddenError(
        `Could not execute operation. User with id ${authUser.id} was not found`
      );
    }

    if (authUserData.role !== UserRole.lawyer) {
      throw new ForbiddenError(
        `Could not execute operation. User with id ${authUser.id} is not a lawyer`
      );
    }

    const { id } = httpRequest.params;
    if (!id) {
      throw new BadRequestError('Missing user id');
    }

    const body = httpRequest.body;
    if (!body) {
      throw new BadRequestError('Missing request body');
    }

    const result = await this.userService.updateById(id, body);

    if (!result) {
      throw new NotFoundError(`User with id '${id}' not found`);
    }

    return HttpResponseFactory.makeOk(result);
  };

  deleteById = async (httpRequest: HttpRequest) => {
    const authUser = httpRequest.user;
    if (!authUser) {
      throw new MissingAuthenticatedUserError();
    }

    const authUserData = await this.userService.findById(authUser.id);
    if (!authUserData) {
      throw new ForbiddenError(
        `Could not execute operation. User with id ${authUser.id} was not found`
      );
    }

    if (authUserData.role !== UserRole.lawyer) {
      throw new ForbiddenError(
        `Could not execute operation. User with id ${authUser.id} is not a lawyer`
      );
    }

    const { id } = httpRequest.params;
    if (!id) {
      throw new BadRequestError('Missing user id');
    }

    const result = await this.userService.deleteById(id);
    if (!result) {
      throw new NotFoundError(`User with id '${id}' not found`);
    }

    return HttpResponseFactory.makeOk(result);
  };
}
