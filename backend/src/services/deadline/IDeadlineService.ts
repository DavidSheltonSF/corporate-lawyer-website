import { CreateDeadlineDTO } from '../../dtos/deadLine/CreateDeadlineDTO';
import { DeadlineDTO } from '../../dtos/deadLine/DeadlineDTO';
import { UpdateDeadlineDTO } from '../../dtos/deadLine/UpdateDeadlineDTO';
import { WithId } from '../../types/WithId';

export interface IDeadlineService {
  create(data: CreateDeadlineDTO): Promise<WithId<DeadlineDTO>>;
  findAll(): Promise<WithId<DeadlineDTO>[]>;
  findById(id: string): Promise<WithId<DeadlineDTO> | null>;
  findByCaseId(id: string): Promise<WithId<DeadlineDTO>[] | null>;
  updateById(id: string, data: UpdateDeadlineDTO): Promise<WithId<DeadlineDTO> | null>;
  deleteById(id: string): Promise<WithId<DeadlineDTO> | null>;
}
