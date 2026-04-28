import { HearingDTO } from '../../dtos/hearing/HearingDTO';
import { WithId } from '../../types/WithId';

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
