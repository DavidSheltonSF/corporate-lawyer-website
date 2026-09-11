import { CaseDTO } from '../../dtos/case/CaseDTO';
import { FileDTO } from '../../dtos/caseFile/FileDTO';
import { CasesStats } from '../../types/CasesStats';
import { Page } from '../../types/Page';
import { WithId } from '../../types/WithId';
import { HttpResponse } from '../types/HttpResponse';

export type FindAllResponse = HttpResponse<Page<WithId<CaseDTO>> | null>;
export type FindByClientResponse = HttpResponse<Page<WithId<CaseDTO>> | null>;
export type FindByIdResponse = HttpResponse<WithId<CaseDTO | CaseDTO> | null>;
export type CreateResponse = HttpResponse<WithId<CaseDTO> | null>;
export type UpdateResponse = HttpResponse<WithId<CaseDTO> | null>;
export type GetMyStatsResponse = HttpResponse<CasesStats>;
export type AddFileResponse = HttpResponse<void | null>;
export type DeleteFileResponse = HttpResponse<void | null>;
export type FindFilesByCaseId = HttpResponse<WithId<FileDTO>[] | null>;
export type DeleteByIdResponse = HttpResponse<void>;
