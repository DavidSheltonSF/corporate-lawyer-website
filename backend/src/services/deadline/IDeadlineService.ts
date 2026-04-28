import { DeadlineDTO } from '../../dtos/deadLine/DeadlineDTO';
import { DeadlineResponseDTO } from '../../dtos/deadLine/DeadlineResponseDTO';
import { UpdateDeadlineDTO } from '../../dtos/deadLine/UpdateDeadlineDTO';
import { WithId } from '../../types/WithId';

export interface IDeadlineService {
  create(data: DeadlineDTO): Promise<WithId<DeadlineResponseDTO>>;
  findAll(): Promise<WithId<DeadlineDTO>[]>;
  findById(id: string): Promise<WithId<DeadlineResponseDTO> | null>;
  findByCaseId(id: string): Promise<WithId<DeadlineResponseDTO>[] | null>;
  updateById(id: string, data: UpdateDeadlineDTO): Promise<WithId<DeadlineResponseDTO> | null>;
  deleteById(id: string): Promise<WithId<DeadlineResponseDTO> | null>;
}
