import { CaseDTO } from '../../dtos/case/CaseDTO.js';
import { WithId } from '../../types/WithId.js';
import { toUserIdentity } from '../toUserIdentity.js';

export class CaseMapper {
  static persistenceToPresentation(cas: any, populated: boolean = false): WithId<CaseDTO> {
    const { title, processNumber, court, courtDivision, status, description, location } = cas;

    const client = populated ? toUserIdentity(cas.client) : cas.client.toString();
    const lawyers = populated
      ? cas.lawyers.map(toUserIdentity)
      : cas.lawyers.map((lawyer: any) => lawyer.toString());

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
      populated,
    };
  }
}
