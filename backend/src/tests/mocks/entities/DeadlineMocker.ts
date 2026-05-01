import { WithMongoId } from '../../../database/mongoDB/types/WithMongoId';
import { CreateDeadlineDTO } from '../../../dtos/deadLine/CreateDeadlineDTO';
import { DeadlineDTO } from '../../../dtos/deadLine/DeadlineDTO';
import { UpdateDeadlineDTO } from '../../../dtos/deadLine/UpdateDeadlineDTO';
import { IDeadlineModel } from '../../../models/DeadlineModel';
import { DeadlineCountingType } from '../../../types/DeadlineCountingType';
import { DeadlinePriority } from '../../../types/DeadLinePriority';
import { DeadlineStatus } from '../../../types/DeadLineStatus';
import { DeadlineType } from '../../../types/DeadLineType';
import { WithId } from '../../../types/WithId';
import { GenericMocker } from '../fields/GenericMocker';

export class DeadlineMocker {
  static mockCreateDeadlineDTO(): CreateDeadlineDTO {
    return {
      caseId: GenericMocker.mockMongoId().toString(),
      lawyerId: GenericMocker.mockMongoId().toString(),
      type: GenericMocker.mockEnum(DeadlineType),
      intimationDate: new Date('2025-05-01').toISOString(),
      days: GenericMocker.mockInteger(1, 30),
      countingType: GenericMocker.mockEnum(DeadlineCountingType),
      priority: GenericMocker.mockEnum(DeadlinePriority),
    };
  }

  static mockUpateDeadlineDTO(): UpdateDeadlineDTO {
    return {
      type: DeadlineType.CONTESTACAO,
      intimationDate: new Date().toISOString(),
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
      intimationDate: new Date('2025-05-01').toISOString(),
      days: GenericMocker.mockInteger(1, 30),
      countingType: GenericMocker.mockEnum(DeadlineCountingType),
      startDate: new Date('2025-05-05').toISOString(),
      dueDate: new Date('2025-05-08').toISOString(),
      priority: GenericMocker.mockEnum(DeadlinePriority),
      status: GenericMocker.mockEnum(DeadlineStatus),
    };
  }

  static mockDeadlineDTOWithId(): WithId<DeadlineDTO> {
    return {
      id: GenericMocker.mockMongoId().toString(),
      caseId: GenericMocker.mockMongoId().toString(),
      lawyerId: GenericMocker.mockMongoId().toString(),
      type: GenericMocker.mockEnum(DeadlineType),
      intimationDate: new Date('2025-05-01').toISOString(),
      days: GenericMocker.mockInteger(1, 30),
      countingType: GenericMocker.mockEnum(DeadlineCountingType),
      startDate: new Date('2025-05-05').toISOString(),
      dueDate: new Date('2025-05-08').toISOString(),
      priority: GenericMocker.mockEnum(DeadlinePriority),
      status: GenericMocker.mockEnum(DeadlineStatus),
    };
  }

  static mockDeadlineMongoPersistence(): WithMongoId<IDeadlineModel> {
    return {
      _id: GenericMocker.mockMongoId(),
      caseId: GenericMocker.mockMongoId(),
      lawyerId: GenericMocker.mockMongoId(),
      type: GenericMocker.mockEnum(DeadlineType),
      intimationDate: new Date('2025-05-01'),
      days: GenericMocker.mockInteger(1, 30),
      countingType: GenericMocker.mockEnum(DeadlineCountingType),
      startDate: new Date('2025-05-05'),
      dueDate: new Date('2025-05-08'),
      priority: GenericMocker.mockEnum(DeadlinePriority),
    };
  }
}
