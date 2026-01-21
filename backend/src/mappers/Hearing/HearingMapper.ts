import { HearingDTO } from '../../dtos/hearing/HearingDTO';
import { WithId } from '../../types/WithId';
import { HearingPersistence } from './HearingPersistence';

export class HearingMapper {
  static persistenceToPresentation<T extends HearingPersistence>(hearing: T): WithId<HearingDTO> {
    return {
      id: hearing._id.toString(),
      date: hearing.date.toISOString(),
      description: hearing.description,
      location: hearing.location,
    };
  }
}
