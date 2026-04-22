import { WithId } from '../types/WithId';
import { DeadlineDTO } from '../dtos/deadLine/DeadlineDTO';
import { UpdateDeadlineDTO } from '../dtos/deadLine/UpdateDeadlineDTO';

export interface DeadlineRepository {
  create(data: DeadlineDTO): Promise<WithId<DeadlineDTO>>;
  findAll(): Promise<WithId<DeadlineDTO>[]>;
  findById(id: string): Promise<WithId<DeadlineDTO> | null>;
  findByCaseId(id: string): Promise<WithId<DeadlineDTO>[]>;
  deleteById(id: string): Promise<WithId<DeadlineDTO> | null>;
  updateById(id: string, data: Partial<UpdateDeadlineDTO>): Promise<WithId<DeadlineDTO> | null>;
  existsById(id: string): Promise<boolean>;
}
