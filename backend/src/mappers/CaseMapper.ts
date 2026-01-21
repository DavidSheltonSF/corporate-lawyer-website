import { CaseCardDTO } from '../dtos/case/CaseCardDTO';
import { WithId } from '../types/WithId';
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
}
