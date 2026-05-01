import { WithMongoId } from '../../database/mongoDB/types/WithMongoId';
import { CreateDeadlineDTO } from '../../dtos/deadLine/CreateDeadlineDTO';
import { DeadlineDTO } from '../../dtos/deadLine/DeadlineDTO';
import { UpdateDeadlineDTO } from '../../dtos/deadLine/UpdateDeadlineDTO';
import { IDeadlineModel } from '../../models/DeadlineModel';
import { DeadlinePriority } from '../../types/DeadLinePriority';
import { DeadlineStatus } from '../../types/DeadLineStatus';
import { DeadlineType } from '../../types/DeadLineType';
import { WithId } from '../../types/WithId';
import { Mocker } from './fields/Mocker';

export class DeadlineMocker {
  static mockCreateDeadlineDTO(): CreateDeadlineDTO {
    return {
      caseId: Mocker.mockMongoId().toString(),
      lawyerId: Mocker.mockMongoId().toString(),
      type: Mocker.mockEnum(DeadlineType),
      intimationDate: new Date('2025-05-01').toISOString(),
      days: Mocker.mockInteger(1, 30),
      priority: Mocker.mockEnum(DeadlinePriority),
    };
  }

  static mockUpateDeadlineDTO(): UpdateDeadlineDTO {
    return {
      type: DeadlineType.CONTESTACAO,
      intimationDate: new Date().toISOString(),
      days: 5,
      priority: DeadlinePriority.ALTA,
    };
  }

  static mockDeadlineDTO(): DeadlineDTO {
    return {
      caseId: Mocker.mockMongoId().toString(),
      lawyerId: Mocker.mockMongoId().toString(),
      type: Mocker.mockEnum(DeadlineType),
      intimationDate: new Date('2025-05-01').toISOString(),
      days: Mocker.mockInteger(1, 30),
      startDate: new Date('2025-05-05').toISOString(),
      dueDate: new Date('2025-05-08').toISOString(),
      priority: Mocker.mockEnum(DeadlinePriority),
      status: Mocker.mockEnum(DeadlineStatus),
    };
  }

  static mockDeadlineDTOWithId(): WithId<DeadlineDTO> {
    return {
      id: Mocker.mockMongoId().toString(),
      caseId: Mocker.mockMongoId().toString(),
      lawyerId: Mocker.mockMongoId().toString(),
      type: Mocker.mockEnum(DeadlineType),
      intimationDate: new Date('2025-05-01').toISOString(),
      days: Mocker.mockInteger(1, 30),
      startDate: new Date('2025-05-05').toISOString(),
      dueDate: new Date('2025-05-08').toISOString(),
      priority: Mocker.mockEnum(DeadlinePriority),
      status: Mocker.mockEnum(DeadlineStatus),
    };
  }

  static mockDeadlineMongoPersistence(): WithMongoId<IDeadlineModel> {
    return {
      _id: Mocker.mockMongoId(),
      caseId: Mocker.mockMongoId(),
      lawyerId: Mocker.mockMongoId(),
      type: Mocker.mockEnum(DeadlineType),
      intimationDate: new Date('2025-05-01'),
      days: Mocker.mockInteger(1, 30),
      startDate: new Date('2025-05-05'),
      dueDate: new Date('2025-05-08'),
      priority: Mocker.mockEnum(DeadlinePriority),
    };
  }
}
