import { FileDTO } from '../../dtos/caseFile/FileDTO';
import { WithId } from '../../types/WithId';
import { HttpResponse } from '../types/HttpResponse';

export type FindByIdResponse = HttpResponse<WithId<FileDTO> | null>;
export type RenameResponse = HttpResponse<WithId<FileDTO> | null>;
export type DeleteByIdResponse = HttpResponse<void>;