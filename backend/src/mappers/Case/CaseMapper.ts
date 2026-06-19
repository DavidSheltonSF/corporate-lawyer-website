import { CaseDTO } from '../../dtos/case/CaseDTO';
import { CasePopulatedResponseDTO } from '../../dtos/case/CasePopulatedResponseDTO';
import { Case } from '../../entities/Case';
import { WithId } from '../../types/WithId';
import { FileMapper } from '../CaseFile/FileMapper';
import { HearingMapper } from '../Hearing/HearingMapper';
import { toUserIdentity } from '../toUserIdentity';

export class CaseMapper {
  static persistenceToPopulatedPresentation(cas: any): WithId<CasePopulatedResponseDTO> {
    const { title, processNumber, court, courtDivision, status, description, location } = cas;
    const client = toUserIdentity(cas.client);
    const lawyers = cas.lawyers.map(toUserIdentity);
    const files = cas.files.map(FileMapper.persistenceToPresentation);
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
      location,
      createdAt: cas.createdAt.toISOString(),
      updatedAt: cas.updatedAt.toISOString(),
    };
  }

  static persistenceToPresentation(cas: any): WithId<CaseDTO> {
    const { title, processNumber, court, courtDivision, status, description, location } = cas;

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
      location,
    };
  }
}
