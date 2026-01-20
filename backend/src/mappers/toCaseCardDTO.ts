import { CaseCardDTO } from '../dtos/case/CaseCardDTO';
import { WithId } from '../types/WithId';
import { caseDocumentMongoDocToDTO } from './toCaseDocumentDTO';
import { toHearingDTO } from './toHearingDTO';
import { toUserName } from './toUserName';

export function toCaseCardDTO(cas: any): WithId<CaseCardDTO> {
  const client = toUserName(cas.client);
  const lawyers = cas.lawyers.map(toUserName);

  let documents;
  let hearings;

  if (cas.documents) {
    documents = cas.documents.map(caseDocumentMongoDocToDTO);
  }

  if (cas.hearings) {
    hearings = cas.hearings.map(toHearingDTO);
  }

  return {
    id: cas._id.toString(),
    title: cas.title,
    processNumber: cas.processNumber,
    court: cas.court,
    courtDivision: cas.courtDivision,
    status: cas.status,
    description: cas.description,
    client,
    lawyers,
    documents,
    hearings,
    createdAt: cas.createdAt.toISOString(),
    updatedAt: cas.updatedAt.toISOString(),
  };
}
