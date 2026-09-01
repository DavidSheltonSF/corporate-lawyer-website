import { IDeadlineService } from '../../services/deadline/IDeadlineService';
import { IDeadlineController } from './IDeadlineController';
import { HttpResponseFactory } from '../../factories/HttpResponse/HttpResponseFactory';
import { HttpRequest } from '../types/HttpRequest';
import { NotFoundError } from '../../errors/presentation/NotFoundError';
import { BadRequestError } from '../../errors/presentation/BadRequestError';
import { requireBody } from '../helpers/requireBody';

export class DeadlineController implements IDeadlineController {
  constructor(private deadlineService: IDeadlineService) {}

  create = async (httpRequest: HttpRequest) => {
    const body = requireBody(httpRequest);

    const { caseId, lawyerId, type, priority, intimationDate, days, countingType } = body;

    const response = await this.deadlineService.create({
      caseId,
      lawyerId,
      type,
      priority,
      intimationDate,
      days,
      countingType,
    });

    return HttpResponseFactory.makeCreated(response);
  };

  findAll = async (httpRequest: HttpRequest) => {
    const data = await this.deadlineService.findAll();
    return HttpResponseFactory.makeOk(data);
  };

  findById = async (httpRequest: HttpRequest) => {
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
    const { id } = httpRequest.params;

    if (!id) {
      return HttpResponseFactory.makeBadRequest('Missing id param');
    }

    const caseDeadlines = await this.deadlineService.findByCaseId(id);
    if (caseDeadlines === null) {
      throw new NotFoundError(`Case with id '${id}' not found`);
    }

    return HttpResponseFactory.makeOk(caseDeadlines);
  };

  updateById = async (httpRequest: HttpRequest) => {
    const { id } = httpRequest.params;
    if (!id) {
      throw new BadRequestError('Missing deadline id');
    }

    const body = requireBody(httpRequest);

    const result = await this.deadlineService.updateById(id, body);

    if (!result) {
      throw new NotFoundError(`Deadline with id '${id}' not found`);
    }

    return HttpResponseFactory.makeOk(result);
  };

  deleteById = async (httpRequest: HttpRequest) => {
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
