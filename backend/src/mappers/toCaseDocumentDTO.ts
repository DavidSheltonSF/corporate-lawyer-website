import { CaseDocumentDTO } from '../dtos/caseDocument/CaseDocumentDTO';
import { WithId } from '../types/WithId';

export function caseDocumentMongoDocToDTO(document: any): WithId<CaseDocumentDTO> {
  return {
    id: document._id.toString(),
    name: document.name,
    url: document.url,
    uploadedAt: document.uploadedAt.toISOString(),
  };
}
