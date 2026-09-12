import { WithMongoId } from '../../../database/mongoDB/types/WithMongoId.js';
import { CreateDeadlineDTO } from '../../../dtos/deadLine/CreateDeadlineDTO.js';
import { DeadlineDTO } from '../../../dtos/deadLine/DeadlineDTO.js';
import { UpdateDeadlineDTO } from '../../../dtos/deadLine/UpdateDeadlineDTO.js';
import { IDeadlineModel } from '../../../models/DeadlineModel.js';
import { BrazilState } from '../../../types/BrazilState.js';
import { City } from '../../../types/City.js';
import { DeadlineCountingType } from '../../../types/DeadlineCountingType.js';
import { DeadlinePriority } from '../../../types/DeadLinePriority.js';
import { DeadlineStatus } from '../../../types/DeadLineStatus.js';
import { DeadlineType } from '../../../types/DeadLineType.js';
import { WithId } from '../../../types/WithId.js';
import { toDateOnlyString } from '../../../utils/toDateOnly.js';
import { GenericMocker } from '../fields/GenericMocker.js';

export class DeadlineMocker {
  static mockCreateDeadlineDTO(): CreateDeadlineDTO {
    return {
      caseId: GenericMocker.mockMongoId().toString(),
      lawyerId: GenericMocker.mockMongoId().toString(),
      type: GenericMocker.mockEnum(DeadlineType),
      intimationDate: '2025-05-01',
      days: GenericMocker.mockInteger(1, 30),
      countingType: GenericMocker.mockEnum(DeadlineCountingType),
      priority: GenericMocker.mockEnum(DeadlinePriority),
    };
  }

  static mockUpateDeadlineDTO(): UpdateDeadlineDTO {
    return {
      type: DeadlineType.CONTESTACAO,
      intimationDate: toDateOnlyString(new Date()),
      days: 5,
      countingType: GenericMocker.mockEnum(DeadlineCountingType),
      priority: DeadlinePriority.ALTA,
    };
  }

  static mockDeadlineDTO(): DeadlineDTO {
    return {
      caseId: GenericMocker.mockMongoId().toString(),
      lawyerId: GenericMocker.mockMongoId().toString(),
      type: GenericMocker.mockEnum(DeadlineType),
      intimationDate: '2025-05-01',
      days: GenericMocker.mockInteger(1, 30),
      countingType: GenericMocker.mockEnum(DeadlineCountingType),
      startDate: '2025-05-05',
      dueDate: '2025-05-08',
      priority: GenericMocker.mockEnum(DeadlinePriority),
      status: GenericMocker.mockEnum(DeadlineStatus),
      caseLocation: {
        city: GenericMocker.mockEnum(City),
        state: GenericMocker.mockEnum(BrazilState),
      },
    };
  }

  static mockDeadlineDTOWithId(): WithId<DeadlineDTO> {
    return {
      id: GenericMocker.mockMongoId().toString(),
      caseId: GenericMocker.mockMongoId().toString(),
      lawyerId: GenericMocker.mockMongoId().toString(),
      type: GenericMocker.mockEnum(DeadlineType),
      intimationDate: '2025-05-01',
      days: GenericMocker.mockInteger(1, 30),
      countingType: GenericMocker.mockEnum(DeadlineCountingType),
      startDate: '2025-05-05',
      dueDate: '2025-05-08',
      priority: GenericMocker.mockEnum(DeadlinePriority),
      status: GenericMocker.mockEnum(DeadlineStatus),
      caseLocation: {
        city: GenericMocker.mockEnum(City),
        state: GenericMocker.mockEnum(BrazilState),
      },
    };
  }

  static mockDeadlineMongoPersistence(): WithMongoId<IDeadlineModel> {
    return {
      _id: GenericMocker.mockMongoId(),
      caseId: GenericMocker.mockMongoId(),
      lawyerId: GenericMocker.mockMongoId(),
      type: GenericMocker.mockEnum(DeadlineType),
      intimationDate: '2025-05-01',
      days: GenericMocker.mockInteger(1, 30),
      countingType: GenericMocker.mockEnum(DeadlineCountingType),
      startDate: '2025-05-05',
      dueDate: '2025-05-08',
      priority: GenericMocker.mockEnum(DeadlinePriority),
      caseLocation: {
        city: GenericMocker.mockEnum(City),
        state: GenericMocker.mockEnum(BrazilState),
      },
    };
  }
}
