import { HearingDTO } from '../../dtos/hearing/HearingDTO.js';
import { WithId } from '../../types/WithId.js';

export class HearingMapper {
  static persistenceToPresentation(hearing: any): WithId<HearingDTO> {
    return {
      id: hearing._id.toString(),
      date: hearing.date.toISOString(),
      description: hearing.description,
      location: hearing.location,
    };
  }
}
