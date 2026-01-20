import { CaseCardDTO } from '../dtos/case/CaseCardDTO';
import { WithId } from '../types/WithId';
import { CaseCardPersistence } from './Case/CasePersistence';
import { CaseFileMapper } from './CaseFile/CaseFileMapper';
import { HearingMapper } from './Hearing/HearingMapper';
import { toUserName } from './toUserName';

export class CaseMapper {
  static toCardPresentation<T extends CaseCardPersistence>(cas: T): WithId<CaseCardDTO> {
    const client = toUserName(cas.client);
    const lawyers = cas.lawyers.map(toUserName);
    const documents = cas.documents.map(CaseFileMapper.persistenceToPresentation);
    const hearings = cas.hearings.map(HearingMapper.persistenceToPresentation);

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
}
