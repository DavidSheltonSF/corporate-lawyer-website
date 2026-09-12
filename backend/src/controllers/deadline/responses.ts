import { CaseDTO } from '../../dtos/case/CaseDTO.js';
import { DeadlineDTO } from '../../dtos/deadLine/DeadlineDTO.js';
import { WithId } from '../../types/WithId.js';
import { HttpResponse } from '../types/HttpResponse.js';

export type CreateResponse = HttpResponse<WithId<DeadlineDTO> | null>;
export type FindAllResponse = HttpResponse<WithId<DeadlineDTO>[]>;
export type FindByIdResponse = HttpResponse<WithId<DeadlineDTO> | null>;
export type FindByCaseIdResponse = HttpResponse<
  (WithId<DeadlineDTO> & { cases: CaseDTO[] }) | null
>;
export type UpdateByIdResponse = HttpResponse<WithId<DeadlineDTO> | null>;
export type DeleteByIdResponse = HttpResponse<WithId<DeadlineDTO> | null>;
