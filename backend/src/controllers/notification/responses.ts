import { NotificationDTO } from '../../dtos/notification/NotificationDTO';
import { WithId } from '../../types/WithId';
import { HttpResponse } from '../types/HttpResponse';

export type FindByIdResponse = HttpResponse<WithId<NotificationDTO> | null>;
export type FindUserByIdResponse = HttpResponse<WithId<NotificationDTO>[] | null>;
