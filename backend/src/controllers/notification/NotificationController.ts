import { INotificationService } from '../../services/notification/INotificationService';
import { INotificationsController } from './INotificationController';
import { HttpResponseFactory } from '../../factories/HttpResponse/HttpResponseFactory';
import { HttpRequest } from '../types/HttpRequest';
import { NotFoundError } from '../../errors/presentation/NotFoundError';
import { BadRequestError } from '../../errors/presentation/BadRequestError';

export class NotificationController implements INotificationsController {
  constructor(private notificationService: INotificationService) {}

  findById = async (httpRequest: HttpRequest) => {
    const { id } = httpRequest.params;
    if (!id) {
      throw new BadRequestError('Missing id param');
    }
    const foundUser = await this.notificationService.findById(id);
    if (!foundUser) {
      throw new NotFoundError(`Notification with id '${id}' not found`);
    }
    return HttpResponseFactory.makeOk(foundUser);
  };

  findUserById = async (httpRequest: HttpRequest) => {
    const { id } = httpRequest.params;
    if (!id) {
      throw new BadRequestError('Missing id param');
    }
    const notifications = await this.notificationService.findByUserId(id);
    return HttpResponseFactory.makeOk(notifications);
  };
}
