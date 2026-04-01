import { CaseCardDTO } from '../../dtos/case/CaseCardDTO';
import { CaseFileDTO } from '../../dtos/caseFile/CaseFileDTO';
import { CaseResponseDTO } from '../../dtos/case/CaseResponseDTO';
import { CasesStats } from '../../types/CasesStats';
import { Page } from '../../types/Page';
import { WithId } from '../../types/WithId';
import { HttpResponse } from '../types/HttpResponse';

export type FindByClientResponse = HttpResponse<Page<WithId<CaseCardDTO>> | null>;
export type FindByIdResponse = HttpResponse<WithId<CaseCardDTO> | null>;
export type CreateResponse = HttpResponse<WithId<CaseResponseDTO> | null>;
export type UpdateResponse = HttpResponse<WithId<CaseResponseDTO> | null>;
export type GetMyStatsResponse = HttpResponse<CasesStats | null>;
export type AddFileResponse = HttpResponse<void | null>;
export type FindFilesByCaseId = HttpResponse<WithId<CaseFileDTO>[] | null>;
