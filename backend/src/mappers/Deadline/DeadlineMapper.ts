import { WithMongoId } from '../../database/mongoDB/types/WithMongoId';
import { DeadlineDTO } from '../../dtos/deadLine/DeadlineDTO';
import { WithId } from '../../types/WithId';

export class DeadlineMapper {
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
