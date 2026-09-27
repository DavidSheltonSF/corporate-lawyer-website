import { CreateDeadlineDTO } from '../../dtos/deadLine/CreateDeadlineDTO.js';
import { DeadlineDTO } from '../../dtos/deadLine/DeadlineDTO.js';
import { DeadlineResponseDTO } from '../../dtos/deadLine/DeadlineResponseDTO.js';
import { UpdateDeadlineDTO } from '../../dtos/deadLine/UpdateDeadlineDTO.js';
import { WithId } from '../../types/WithId.js';

export interface IDeadlineService {
  create(data: CreateDeadlineDTO): Promise<WithId<DeadlineDTO>>;
  findAll(): Promise<WithId<DeadlineResponseDTO>[]>;
  findById(id: string): Promise<WithId<DeadlineResponseDTO> | null>;
  findByCaseId(id: string): Promise<WithId<DeadlineResponseDTO>[] | null>;
  updateById(id: string, data: UpdateDeadlineDTO): Promise<WithId<DeadlineDTO> | null>;
  deleteById(id: string): Promise<WithId<DeadlineDTO> | null>;
}
