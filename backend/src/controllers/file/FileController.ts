import { BadRequestError } from '../../errors/presentation/BadRequestError';
import { NotFoundError } from '../../errors/presentation/NotFoundError';
import { HttpResponseFactory } from '../../factories/HttpResponse/HttpResponseFactory';
import { IFileService } from '../../services/files/IFileService';
import { requireBody } from '../helpers/requireBody';
import { HttpRequest } from '../types/HttpRequest';
import { IFileController } from './IFileController';

export class FileController implements IFileController {
  constructor(private readonly fileService: IFileService) {}

  findById = async (httpRequest: HttpRequest) => {
    const fileId = httpRequest.params.id;
    if (!fileId) {
      throw new BadRequestError('Missing file id');
    }

    const file = await this.fileService.findById(fileId);
    if (!file) {
      throw new NotFoundError(`File with id '${fileId}' was not found`);
    }

    return HttpResponseFactory.makeOk(file);
  };

  rename = async (httpRequest: HttpRequest) => {
    const fileId = httpRequest.params.id;
    if (!fileId) {
      throw new BadRequestError('Missing file id');
    }

    const body = requireBody(httpRequest);

    const name = body.name;
    if (!name) {
      throw new BadRequestError('Missing new file name');
    }

    const file = await this.fileService.rename(fileId, name);
    if (!file) {
      throw new NotFoundError(`File with id '${fileId}' was not found`);
    }
    return HttpResponseFactory.makeNoContent();
  };

  deleteById = async (httpRequest: HttpRequest) => {
    const fileId = httpRequest.params.id;
    if (!fileId) {
      throw new BadRequestError('Missing file id');
    }

    const deletedFile = await this.fileService.deleteById(fileId);
    if (!deletedFile) {
      throw new NotFoundError(`File with id '${fileId}' was not found`);
    }

    return HttpResponseFactory.makeNoContent();
  };
}
