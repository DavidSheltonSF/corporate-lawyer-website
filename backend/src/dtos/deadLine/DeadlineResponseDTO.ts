import { DeadlineDTO } from './DeadlineDTO';

export type DeadlineResponseDTO = DeadlineDTO & { status: string, startDate: string, dueDate: string };
