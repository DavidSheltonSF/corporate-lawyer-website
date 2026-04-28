import { CaseResponseDTO } from '../../dtos/case/CaseResponseDTO';
import { DeadlineResponseDTO } from '../../dtos/deadLine/DeadlineResponseDTO';
import { WithId } from '../../types/WithId';
import { HttpResponse } from '../types/HttpResponse';

export type CreateResponse = HttpResponse<WithId<DeadlineResponseDTO> | null>;
export type FindAllResponse = HttpResponse<WithId<DeadlineResponseDTO>[]>;
export type FindByIdResponse = HttpResponse<WithId<DeadlineResponseDTO> | null>;
export type FindByCaseIdResponse = HttpResponse<
  (WithId<DeadlineResponseDTO> & { cases: CaseResponseDTO[] }) | null
>;
export type UpdateByIdResponse = HttpResponse<WithId<DeadlineResponseDTO> | null>;
export type DeleteByIdResponse = HttpResponse<WithId<DeadlineResponseDTO> | null>;
