import { NotificationDTO } from '../../dtos/notification/NotificationDTO';
import { WithId } from '../../types/WithId';
import { HttpResponse } from '../types/HttpResponse';

export type FindByIdResponse = HttpResponse<WithId<NotificationDTO> | null>;
export type FindMyResponse = HttpResponse<WithId<NotificationDTO>[] | null>;
export type MarkAsReadResponse = HttpResponse<WithId<NotificationDTO>[] | null>;

