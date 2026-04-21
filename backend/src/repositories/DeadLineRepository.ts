import { WithId } from '../types/WithId';
import { DeadlineDTO } from '../dtos/deadLine/DeadlineDTO';
import { Deadline } from '../entities/Deadline';
import { UpdateDeadlineDTO } from '../dtos/deadLine/UpdateDeadlineDTO';

export interface DeadLineRepository {
  create(data: Deadline): Promise<WithId<Deadline>>;
  findAll(): Promise<WithId<Deadline>[]>;
  findById(id: string): Promise<WithId<Deadline> | null>;
  findByCaseId(id: string): Promise<WithId<DeadlineDTO>[]>;
  deleteById(id: string): Promise<WithId<DeadlineDTO> | null>;
  updateById(id: string, data: Partial<UpdateDeadlineDTO>): Promise<WithId<DeadlineDTO> | null>;
  existsById(id: string): Promise<boolean>;
}
