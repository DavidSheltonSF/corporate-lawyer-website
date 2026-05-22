import { WithId } from '../types/WithId';
import { UpdateDeadlineDTO } from '../dtos/deadLine/UpdateDeadlineDTO';
import { DeadlineDTO } from '../dtos/deadLine/DeadlineDTO';
import { CreateDeadlineDTO } from '../dtos/deadLine/CreateDeadlineDTO';

export interface DeadlineRepository {
  create(data: CreateDeadlineDTO, startDate: string, dueDate: string): Promise<WithId<DeadlineDTO>>;
  findAll(): Promise<WithId<DeadlineDTO>[]>;
  findById(id: string): Promise<WithId<DeadlineDTO> | null>;
  findByCaseId(id: string): Promise<WithId<DeadlineDTO>[]>;
  deleteById(id: string): Promise<WithId<DeadlineDTO> | null>;
  updateById(id: string, data: UpdateDeadlineDTO): Promise<WithId<DeadlineDTO> | null>;
  existsById(id: string): Promise<boolean>;
}
