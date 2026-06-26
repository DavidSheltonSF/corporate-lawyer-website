import { IUserService } from '../../services/user/IUserService';
import { IUserController } from './IUserController';
import { HttpResponseFactory } from '../../factories/HttpResponse/HttpResponseFactory';
import { HttpRequest } from '../types/HttpRequest';
import { UserRole } from '../../types/UserRole';
import { MissingAuthenticatedUserError } from '../../errors/presentation/MissingAuthenticatedUserError';
import { NotFoundError } from '../../errors/presentation/NotFoundError';
import { ForbiddenError } from '../../errors/presentation/ForbiddenError';
import { BadRequestError } from '../../errors/presentation/BadRequestError';
import { checkMissingFields } from '../../utils/checkMissingFields';
import { requireLawyer } from '../helpers/requireLawyer';
import { requireBody } from '../helpers/requireBody';
import { getPagination } from '../helpers/getPagination';

export class UserController implements IUserController {
  constructor(private userService: IUserService) {}

  createClient = async (httpRequest: HttpRequest) => {
    await requireLawyer(httpRequest, this.userService);

    const body = requireBody(httpRequest);

    checkMissingFields(body, ['firstName', 'lastName', 'email', 'cpf']);

    const { firstName, lastName, email, phone, cpf } = body;

    const data = await this.userService.createClient({
      firstName,
      lastName,
      email,
      phone,
      cpf,
    });

    return HttpResponseFactory.makeCreated(data);
  };

  findAll = async (httpRequest: HttpRequest) => {
    const data = await this.userService.findAll();
    return HttpResponseFactory.makeOk(data);
  };

  findClients = async (httpRequest: HttpRequest) => {
    await requireLawyer(httpRequest, this.userService);

    const { query = '' } = httpRequest.query;
    const { limit, page } = getPagination(httpRequest.query);

    const data = await this.userService.findClients({
      query,
      limit,
      page,
    });
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

  updateById = async (httpRequest: HttpRequest) => {
    await requireLawyer(httpRequest, this.userService);

    const { id } = httpRequest.params;
    if (!id) {
      throw new BadRequestError('Missing user id');
    }

    const body = requireBody(httpRequest);

    const result = await this.userService.updateById(id, body);

    if (!result) {
      throw new NotFoundError(`User with id '${id}' not found`);
    }

    return HttpResponseFactory.makeOk(result);
  };

  deleteById = async (httpRequest: HttpRequest) => {
    await requireLawyer(httpRequest, this.userService);

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
