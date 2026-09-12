import { FileDTO } from '../../dtos/caseFile/FileDTO.js';
import { WithId } from '../../types/WithId.js';
import { HttpResponse } from '../types/HttpResponse.js';

export type FindByIdResponse = HttpResponse<WithId<FileDTO> | null>;
export type RenameResponse = HttpResponse<void>;
export type DeleteByIdResponse = HttpResponse<void>;