import { CaseDTO } from '../../dtos/case/CaseDTO';
import { WithId } from '../../types/WithId';
import { toUserIdentity } from '../toUserIdentity';

export class CaseMapper {
  static persistenceToPopulatedPresentation(cas: any): WithId<CaseDTO> {
    const { title, processNumber, court, courtDivision, status, description, location } = cas;
    const client = toUserIdentity(cas.client);
    const lawyers = cas.lawyers.map(toUserIdentity);

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
      location,
      createdAt: cas.createdAt.toISOString(),
      updatedAt: cas.updatedAt.toISOString(),
      populated: true,
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
      location,
    };
  }
}
