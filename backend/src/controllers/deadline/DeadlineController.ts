import { IDeadlineService } from '../../services/deadline/IDeadlineService';
import { IDeadlineController } from './IDeadlineController';
import { HttpResponseFactory } from '../../factories/HttpResponse/HttpResponseFactory';
import { HttpRequest } from '../types/HttpRequest';
import { NotFoundError } from '../../errors/presentation/NotFoundError';
import { IUserService } from '../../services/user/IUserService';
import { UserRole } from '../../types/UserRole';
import { ForbiddenError } from '../../errors/presentation/ForbiddenError';
import { BadRequestError } from '../../errors/presentation/BadRequestError';
import { getAuthenticatedUser } from '../helpers/getAuthenticatedUser';
import { requireAutheticatedLawyer } from '../helpers/requireAutheticatedLawyer';

export class DeadlineController implements Partial<IDeadlineController> {
  constructor(private deadlineService: IDeadlineService, private userService: IUserService) {}

  create = async (httpRequest: HttpRequest) => {
    await requireAutheticatedLawyer(httpRequest, this.userService);

    const body = httpRequest.body;
    if (!body) {
      throw new BadRequestError('Missing request body');
    }

    const { caseId, clientId, type, startDate, dueDate, status, priority } = body;

    const response = await this.deadlineService.create({
      caseId,
      clientId,
      type,
      startDate,
      dueDate,
      status,
      priority,
    });

    return HttpResponseFactory.makeCreated(response);
  };

  findAll = async (httpRequest: HttpRequest) => {
    await requireAutheticatedLawyer(httpRequest, this.userService);

    const data = await this.deadlineService.findAll();
    return HttpResponseFactory.makeOk(data);
  };

  findById = async (httpRequest: HttpRequest) => {
    await requireAutheticatedLawyer(httpRequest, this.userService);

    const { id } = httpRequest.params;

    if (!id) {
      return HttpResponseFactory.makeBadRequest('Missing id param');
    }

    const foundDeadline = await this.deadlineService.findById(id);

    if (!foundDeadline) {
      throw new NotFoundError(`Deadline with id '${id}' not found`);
    }

    return HttpResponseFactory.makeOk(foundDeadline);
  };

  findByCaseId = async (httpRequest: HttpRequest) => {
    await requireAutheticatedLawyer(httpRequest, this.userService);

    const { id } = httpRequest.params;

    if (!id) {
      return HttpResponseFactory.makeBadRequest('Missing id param');
    }

    const foundDeadline = await this.deadlineService.findById(id);

    return HttpResponseFactory.makeOk(foundDeadline);
  };

  updateById = async (httpRequest: HttpRequest) => {
    await requireAutheticatedLawyer(httpRequest, this.userService);

    const { id } = httpRequest.params;
    if (!id) {
      throw new BadRequestError('Missing deadline id');
    }

    const body = httpRequest.body;
    if (!body) {
      throw new BadRequestError('Missing request body');
    }

    const result = await this.deadlineService.updateById(id, body);

    if (!result) {
      throw new NotFoundError(`Deadline with id '${id}' not found`);
    }

    return HttpResponseFactory.makeOk(result);
  };

  deleteById = async (httpRequest: HttpRequest) => {
    await requireAutheticatedLawyer(httpRequest, this.userService);

    const { id } = httpRequest.params;
    if (!id) {
      throw new BadRequestError('Missing deadline id');
    }

    const result = await this.deadlineService.deleteById(id);

    if (!result) {
      throw new NotFoundError(`Deadline with id '${id}' not found`);
    }

    return HttpResponseFactory.makeOk(result);
  };
}
