import { WithMongoId } from '../../database/mongoDB/types/WithMongoId';
import { DeadlineDTO } from '../../dtos/deadLine/DeadlineDTO';
import { Deadline } from '../../entities/Deadline';
import { WithId } from '../../types/WithId';

export class DeadlineMapper {
  static persistenceToDomain(data: WithMongoId<any>): WithId<Deadline> {
    const { _id, caseId, clientId, priority, type, status, startDate, dueDate } = data;
    return {
      id: _id.toString(),
      caseId,
      clientId,
      startDate,
      dueDate,
      type,
      status,
      priority,
    };
  }

  static persistenceToPresentation(data: WithMongoId<any>): WithId<DeadlineDTO> {
    const { _id, caseId, clientId, priority, type, status, startDate, dueDate } = data;
    return {
      id: _id.toString(),
      caseId: caseId.toString(),
      clientId: clientId.toString(),
      startDate: startDate.toString(),
      dueDate: dueDate.toString(),
      type,
      status,
      priority,
    };
  }
}
