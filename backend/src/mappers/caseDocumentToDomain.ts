import { Case } from '../entities/Case';
import { CaseMongoDoc } from '../models/case.model';
import { WithId } from '../types/WithId';

export function caseDocumentToDomain(cas: CaseMongoDoc): WithId<Case> {
  const client = cas.client.toString();
  const lawyers = cas.lawyers.map((lawyer) => lawyer.toString());
  let documents;
  let hearings;

  if (cas.documents) {
    documents = cas.documents.map((document) => document.toString());
  }

  if (cas.hearings) {
    hearings = cas.hearings.map((hearing) => hearing.toString());
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
    createdAt: cas.createdAt,
    updatedAt: cas.updatedAt,
  };
}
