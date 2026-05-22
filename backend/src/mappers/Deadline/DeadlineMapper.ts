import { WithMongoId } from '../../database/mongoDB/types/WithMongoId';
import { DeadlineDTO } from '../../dtos/deadLine/DeadlineDTO';
import { WithId } from '../../types/WithId';

export class DeadlineMapper {
  static persistenceToPresentation(data: WithMongoId<any>): WithId<DeadlineDTO> {
    const { _id, caseId, lawyerId, intimationDate, startDate, dueDate } = data;
    return {
      id: _id.toString(),
      caseId: caseId.toString(),
      lawyerId: lawyerId.toString(),
      intimationDate: intimationDate.toISOString(),
      startDate: startDate.toISOString(),
      dueDate: dueDate.toISOString(),
      ...data,
    };
  }
}
