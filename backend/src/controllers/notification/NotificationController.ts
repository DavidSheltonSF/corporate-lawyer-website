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

  findMy = async (httpRequest: HttpRequest) => {
    const authUser = httpRequest.user;
    if (!authUser) {
      throw Error('User credentials were not provided, use the requireAuth middleware');
    }

    const { page = 1, limit = 5 } = httpRequest.query;
    const notifications = await this.notificationService.findByUserId(authUser.id, {
      page: Number(page),
      limit: Number(limit),
    });
    return HttpResponseFactory.makeOk(notifications);
  };

  markAsRead = async (httpRequest: HttpRequest) => {
    const { id } = httpRequest.params;
    if (!id) {
      throw new BadRequestError('Missing id param');
    }
    const notification = await this.notificationService.markAsRead(id);

    if (!notification) {
      throw new NotFoundError(`Notification with id '${id}' was not found`);
    }

    return HttpResponseFactory.makeOk(notification);
  };
}
