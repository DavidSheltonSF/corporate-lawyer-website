import { DeadlineDTO } from './DeadlineDTO.js';

export type DeadlineResponseDTO = DeadlineDTO & { status: string; remainingDays: number };
