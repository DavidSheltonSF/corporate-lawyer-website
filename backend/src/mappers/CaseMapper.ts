import { CaseCardDTO } from '../dtos/case/CaseCardDTO';
import { CaseResponseDTO } from '../dtos/case/CaseResponseDTO';
import { Case } from '../entities/Case';
import { WithId } from '../types/WithId';
import { CaseCardPersistence } from './Case/CasePersistence';
import { CaseCardPersistencePopulated } from './Case/CasePersistencePopulated';
import { CaseFileMapper } from './CaseFile/CaseFileMapper';
import { HearingMapper } from './Hearing/HearingMapper';
import { toUserIdentity } from './toUserIdentity';

export class CaseMapper {
  static persistenceToPopulatedPresentation(cas: any): WithId<CaseCardDTO> {
    const { title, processNumber, court, courtDivision, status, description, localization } = cas;
    const client = toUserIdentity(cas.client);
    const lawyers = cas.lawyers.map(toUserIdentity);
    const files = cas.files.map(CaseFileMapper.persistenceToPresentation);
    const hearings = cas.hearings.map(HearingMapper.persistenceToPresentation);

    return {
      id: cas._id.toString(),
      title,
      processNumber,
      court,
      courtDivision,
      status,
      description,
      client,
      lawyers,
      files,
      hearings,
      localization,
      createdAt: cas.createdAt.toISOString(),
      updatedAt: cas.updatedAt.toISOString(),
    };
  }

  static persistenceToPresentation(cas: any): WithId<CaseResponseDTO> {
    const { title, processNumber, court, courtDivision, status, description, localization } = cas;

    const lawyers = cas.lawyers.map((lawyer: any) => lawyer.toString());
    const files = cas.files.map((document: any) => document.toString());
    const hearings = cas.hearings.map((hearing: any) => hearing.toString());

    return {
      id: cas._id.toString(),
      title,
      processNumber,
      court,
      courtDivision,
      status,
      description,
      client: cas.client.toString(),
      lawyers,
      files,
      hearings,
      localization,
    };
  }

  static persistenceToDomain(cas: unknown): WithId<Case> {
    const casePersistence = cas as CaseCardPersistence;

    const lawyers = casePersistence.lawyers.map((lawyer) => lawyer.toString());
    const files = casePersistence.files.map((document) => document.toString());
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
      files,
      hearings,
      createdAt: casePersistence.createdAt,
      updatedAt: casePersistence.updatedAt,
    };
  }
}
