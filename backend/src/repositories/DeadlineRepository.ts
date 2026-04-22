import { WithId } from '../types/WithId';
import { DeadlineDTO } from '../dtos/deadLine/DeadlineDTO';
import { UpdateDeadlineDTO } from '../dtos/deadLine/UpdateDeadlineDTO';
import { Deadline } from '../entities/Deadline';

export interface DeadlineRepository {
  create(data: DeadlineDTO): Promise<WithId<DeadlineDTO>>;
  findAll(): Promise<WithId<Deadline>[]>;
  findById(id: string): Promise<WithId<Deadline> | null>;
  findByCaseId(id: string): Promise<WithId<Deadline>[]>;
  deleteById(id: string): Promise<WithId<Deadline> | null>;
  updateById(id: string, data: Partial<UpdateDeadlineDTO>): Promise<WithId<Deadline> | null>;
  existsById(id: string): Promise<boolean>;
}
