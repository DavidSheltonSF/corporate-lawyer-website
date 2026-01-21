import { CaseCardDTO } from '../dtos/case/CaseCardDTO';
import { Case } from '../entities/Case';
import { WithId } from '../types/WithId';
import { CaseCardPersistence } from './Case/CasePersistence';
import { CaseCardPersistencePopulated } from './Case/CasePersistencePopulated';
import { CaseFileMapper } from './CaseFile/CaseFileMapper';
import { HearingMapper } from './Hearing/HearingMapper';
import { toUserIdentity } from './toUserIdentity';

export class CaseMapper {
  static persistenceToPopulatedPresentation(caseCard: unknown): WithId<CaseCardDTO> {
    const caseCardPersistence = caseCard as CaseCardPersistencePopulated;
    const client = toUserIdentity(caseCardPersistence.client);
    const lawyers = caseCardPersistence.lawyers.map(toUserIdentity);
    const documents = caseCardPersistence.documents.map(CaseFileMapper.persistenceToPresentation);
    const hearings = caseCardPersistence.hearings.map(HearingMapper.persistenceToPresentation);

    return {
      id: caseCardPersistence._id.toString(),
      title: caseCardPersistence.title,
      processNumber: caseCardPersistence.processNumber,
      court: caseCardPersistence.court,
      courtDivision: caseCardPersistence.courtDivision,
      status: caseCardPersistence.status,
      description: caseCardPersistence.description,
      client,
      lawyers,
      documents,
      hearings,
      createdAt: caseCardPersistence.createdAt.toISOString(),
      updatedAt: caseCardPersistence.updatedAt.toISOString(),
    };
  }

  static persistenceToDomain(cas: unknown): WithId<Case> {
    const casePersistence = cas as CaseCardPersistence;

    const lawyers = casePersistence.lawyers.map((lawyer) => lawyer.toString());
    const documents = casePersistence.documents.map((document) => document.toString());
    const hearings = casePersistence.hearings.map((hearing) => hearing.toString());

    return {
      id: casePersistence._id.toString(),
      title: casePersistence.title,
      processNumber: casePersistence.processNumber,
      court: casePersistence.court,
      courtDivision: casePersistence.courtDivision,
      status: casePersistence.status,
      description: casePersistence.description,
      client: casePersistence.client.toString(),
      lawyers,
      documents,
      hearings,
      createdAt: casePersistence.createdAt,
      updatedAt: casePersistence.updatedAt,
    };
  }
}
