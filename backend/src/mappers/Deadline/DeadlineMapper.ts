import { WithMongoId } from '../../database/mongoDB/types/WithMongoId';
import { DeadlineDTO } from '../../dtos/deadLine/DeadlineDTO';
import { WithId } from '../../types/WithId';

export class DeadlineMapper {
  static persistenceToPresentation(data: WithMongoId<any>): WithId<DeadlineDTO> {
    const { _id, caseId, lawyerId, priority, type, startDate, dueDate } = data;
    return {
      id: _id.toString(),
      caseId: caseId.toString(),
      lawyerId: lawyerId.toString(),
      startDate: startDate.toString(),
      dueDate: dueDate.toString(),
      type,
      priority,
    };
  }
}
