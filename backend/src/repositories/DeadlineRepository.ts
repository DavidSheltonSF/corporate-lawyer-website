import { WithId } from '../types/WithId';
import { DeadlineDTO } from '../dtos/deadLine/DeadlineDTO';
import { UpdateDeadlineDTO } from '../dtos/deadLine/UpdateDeadlineDTO';
import { DeadlineResponseDTO } from '../dtos/deadLine/DeadlineResponseDTO';

export interface DeadlineRepository {
  create(data: DeadlineDTO): Promise<WithId<DeadlineResponseDTO>>;
  findAll(): Promise<WithId<DeadlineResponseDTO>[]>;
  findById(id: string): Promise<WithId<DeadlineResponseDTO> | null>;
  findByCaseId(id: string): Promise<WithId<DeadlineResponseDTO>[]>;
  deleteById(id: string): Promise<WithId<DeadlineResponseDTO> | null>;
  updateById(id: string, data: UpdateDeadlineDTO): Promise<WithId<DeadlineResponseDTO> | null>;
  existsById(id: string): Promise<boolean>;
}
