import { NotificationDTO } from '../../dtos/notification/NotificationDTO.js';
import { WithId } from '../../types/WithId.js';
import { HttpResponse } from '../types/HttpResponse.js';

export type FindByIdResponse = HttpResponse<WithId<NotificationDTO> | null>;
export type FindMyResponse = HttpResponse<WithId<NotificationDTO>[] | null>;
export type MarkAsReadResponse = HttpResponse<WithId<NotificationDTO>[] | null>;

