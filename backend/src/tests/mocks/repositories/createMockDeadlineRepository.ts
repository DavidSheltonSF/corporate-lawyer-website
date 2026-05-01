import { DeadlineRepository } from '../../../repositories/DeadlineRepository';
import { DeadlineMocker } from '../entities/DeadlineMocker';

export const createMockDeadlineRepository = (): DeadlineRepository => {
  return {
    create: jest.fn().mockResolvedValue(DeadlineMocker.mockCreateDeadlineDTO()),
    findById: jest.fn().mockResolvedValue(DeadlineMocker.mockDeadlineDTOWithId()),
    findByCaseId: jest
      .fn()
      .mockResolvedValue([
        DeadlineMocker.mockDeadlineDTOWithId(),
        DeadlineMocker.mockDeadlineDTOWithId(),
      ]),
    findAll: jest
      .fn()
      .mockResolvedValue([
        DeadlineMocker.mockDeadlineDTOWithId(),
        DeadlineMocker.mockDeadlineDTOWithId(),
      ]),
    deleteById: jest.fn().mockResolvedValue(DeadlineMocker.mockDeadlineDTOWithId()),
    updateById: jest.fn().mockResolvedValue(DeadlineMocker.mockDeadlineDTOWithId()),
    existsById: jest.fn().mockResolvedValue(true),
  };
};

DeadlineMocker;
