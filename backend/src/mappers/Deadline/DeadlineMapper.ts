import { WithMongoId } from '../../database/mongoDB/types/WithMongoId.js';
import { DeadlineDTO } from '../../dtos/deadLine/DeadlineDTO.js';
import { WithId } from '../../types/WithId.js';

export class DeadlineMapper {
  static persistenceToPresentation(data: WithMongoId<any>): WithId<DeadlineDTO> {
    const {
      _id,
      caseId,
      lawyerId,
      priority,
      type,
      intimationDate,
      days,
      countingType,
      startDate,
      dueDate,
      status,
      caseLocation,
    } = data;
    return {
      id: _id.toString(),
      caseId: caseId.toString(),
      lawyerId: lawyerId.toString(),
      intimationDate: intimationDate,
      days,
      countingType,
      startDate: startDate,
      dueDate: dueDate,
      type,
      priority,
      status,
      caseLocation,
    };
  }
}
