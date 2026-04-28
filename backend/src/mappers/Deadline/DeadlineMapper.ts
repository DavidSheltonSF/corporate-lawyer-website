import { WithMongoId } from '../../database/mongoDB/types/WithMongoId';
import { DeadlineResponseDTO } from '../../dtos/deadLine/DeadlineResponseDTO';
import { WithId } from '../../types/WithId';

export class DeadlineMapper {
  static persistenceToPresentation(data: WithMongoId<any>): WithId<DeadlineResponseDTO> {
    const {
      _id,
      caseId,
      lawyerId,
      priority,
      type,
      intimationDate,
      days,
      startDate,
      dueDate,
      status,
    } = data;
    return {
      id: _id.toString(),
      caseId: caseId.toString(),
      lawyerId: lawyerId.toString(),
      intimationDate: intimationDate.toISOString(),
      days,
      startDate: startDate.toISOString(),
      dueDate: dueDate.toISOString(),
      type,
      priority,
      status,
    };
  }
}
