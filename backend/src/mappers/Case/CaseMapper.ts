import { CaseDTO } from '../../dtos/case/CaseDTO.js';
import { WithId } from '../../types/WithId.js';
import { toUserIdentity } from '../toUserIdentity.js';

export class CaseMapper {
  static persistenceToPresentation(cas: any, populated: boolean = false): WithId<CaseDTO> {
    const { title, caseNumber, court, courtDivision, status, description, location } = cas;

    const client = populated ? toUserIdentity(cas.client) : cas.client.toString();
    const lawyer = populated ? toUserIdentity(cas.lawyer) : cas.lawyer.toString();

    return {
      id: cas._id.toString(),
      title,
      caseNumber,
      court,
      courtDivision,
      status,
      description,
      client,
      lawyer,
      location,
      populated,
    };
  }
}
