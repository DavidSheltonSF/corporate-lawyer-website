import { describe, expect, it } from 'vitest';
import { CaseService } from './CaseService';
import { createMockCaseRepository } from '../../tests/mocks/repositories/createMockCaseRepository';
import { CaseMocker } from '../../tests/mocks/entities/CaseMoker';
import { createMockEventBus } from '../../tests/mocks/repositories/createMockEventBus';
import { ValidationError } from '../../errors/presentation/ValidationError';
import { UpdateCaseDTO } from '../../dtos/case/UpdateCaseDTO';
import { CaseFieldsMocker } from '../../tests/mocks/fields/CaseFieldsMocker';
import { createMockPage } from '../../tests/mocks/createMockPage';
import { PageParams } from '../../types/PageParams';

describe(`Test ${CaseService.name}`, () => {
  function makeSut() {
    const caseRepository = createMockCaseRepository();
    const eventBus = createMockEventBus();
    const caseService = new CaseService(caseRepository, eventBus);
    const fakeId = 'fakeId';

    return {
      caseRepository,
      caseService,
      fakeId,
    };
  }

  describe('create', () => {
    it('should create a new case', async () => {
      const { caseRepository, caseService } = makeSut();
      const caseData = CaseMocker.mockCreateCaseDTO();

      const expectedCase = CaseMocker.mockCaseDTOWithId();
      caseRepository.create.mockResolvedValue(expectedCase);

      const createdCase = await caseService.create(caseData);

      expect(createdCase).toMatchObject(expectedCase);
      expect(caseRepository.create).toHaveBeenCalledWith(caseData);
    });

    it('should throw ValidationError if any provided field is invalid', async () => {
      const { caseRepository, caseService } = makeSut();
      const caseData = CaseMocker.mockCreateCaseDTO();
      caseData.processNumber = 'invalid process number';

      await expect(caseService.create(caseData)).rejects.toThrow(ValidationError);
      expect(caseRepository.create).not.toHaveBeenCalled();
    });
  });

  describe('updateById', () => {
    it('should update a case', async () => {
      const { caseRepository, caseService, fakeId } = makeSut();

      const updateData: UpdateCaseDTO = {
        title: CaseFieldsMocker.mockCaseTitle(),
      };

      const expectedCase = CaseMocker.mockCaseDTOWithId();
      caseRepository.updateById.mockResolvedValue(expectedCase);

      const updatedCase = await caseService.updateById(fakeId, updateData);

      expect(updatedCase).toMatchObject(expectedCase);
      expect(caseRepository.updateById).toHaveBeenCalledWith(fakeId, updateData);
    });

    it('should throw ValidationError if any field is invalid', async () => {
      const { caseRepository, caseService, fakeId } = makeSut();

      const updateData: UpdateCaseDTO = {
        title: '#81',
      };

      await expect(caseService.updateById(fakeId, updateData)).rejects.toThrow(ValidationError);
      expect(caseRepository.updateById).not.toHaveBeenCalled();
    });

    it('should return null the case is not found', async () => {
      const { caseRepository, caseService, fakeId } = makeSut();

      const updateData: UpdateCaseDTO = {
        title: 'Ação de Testes Com Título Válido',
      };

      caseRepository.findById.mockResolvedValue(null);

      const updatedCase = await caseService.updateById(fakeId, updateData);

      expect(updatedCase).toBeNull();
      expect(caseRepository.updateById).toHaveBeenCalledWith(fakeId, updateData);
    });
  });

  describe('findAll', () => {
    it('should find all cases with the provided page params', async () => {
      const { caseRepository, caseService } = makeSut();

      const limit = 4;
      const page = 1;

      const mockPage = createMockPage([], { limit, page });
      caseRepository.findAll.mockResolvedValue(mockPage);

      const pageParams: PageParams = {
        limit,
        page,
      };
      const cases = await caseService.findAll(pageParams);

      expect(cases).toMatchObject(mockPage);
      expect(caseRepository.findAll).toHaveBeenCalledWith(pageParams);
    });
  });

  describe('findById', () => {
    it('should find a cases by id', async () => {
      const { caseRepository, caseService, fakeId } = makeSut();

      const expectedCase = CaseMocker.mockCaseDTOWithId();
      caseRepository.findById.mockResolvedValue(expectedCase);

      const cas = await caseService.findById(fakeId);

      expect(cas).toMatchObject(expectedCase);
      expect(caseRepository.findById).toHaveBeenCalledWith(fakeId);
    });

    it('should find a populated case by id', async () => {
      const { caseRepository, caseService, fakeId } = makeSut();

      const expectedCase = CaseMocker.mockCaseDTOWithId();
      caseRepository.findPopulatedById.mockResolvedValue(expectedCase);

      const cas = await caseService.findById(fakeId, true);

      console.log(cas);

      expect(cas).toMatchObject(expectedCase);
      expect(caseRepository.findPopulatedById).toHaveBeenCalledWith(fakeId);
    });

    it('should return null if case is not found', async () => {
      const { caseRepository, caseService, fakeId } = makeSut();

      caseRepository.findById.mockResolvedValue(null);

      const cas = await caseService.findById(fakeId);

      expect(cas).toBeNull();
      expect(caseRepository.findById).toHaveBeenCalledWith(fakeId);
    });
  });

  describe('getStatsByClientId', () => {
    it('should return the case statistics by client id', async () => {
      const { caseRepository, caseService, fakeId } = makeSut();

      const expectedStats = { closed: 0, open: 0 };

      caseRepository.getStatsByClientId.mockResolvedValue(expectedStats);

      const stats = await caseService.getStatsByClientId(fakeId);

      expect(stats).toMatchObject(expectedStats);
      expect(caseRepository.getStatsByClientId).toHaveBeenCalledWith(fakeId);
    });
  });

  describe('getStats', () => {
    it('should return the global case statistics', async () => {
      const { caseRepository, caseService, fakeId } = makeSut();

      const expectedStats = { closed: 0, open: 0 };

      caseRepository.getStats.mockResolvedValue(expectedStats);

      const stats = await caseService.getStats();

      expect(stats).toMatchObject(expectedStats);
      expect(caseRepository.getStats).toHaveBeenCalled();
    });
  });

  describe('deleteById', () => {
    it('should delete a case by id', async () => {
      const { caseRepository, caseService, fakeId } = makeSut();

      const expectedCase = CaseMocker.mockCaseDTOWithId();

      caseRepository.deleteById.mockResolvedValue(expectedCase);

      const deletedCase = await caseService.deleteById(fakeId);

      expect(deletedCase).toMatchObject(expectedCase);
      expect(caseRepository.deleteById).toHaveBeenCalledWith(fakeId);
    });

    it('should return null if case is not found', async () => {
      const { caseRepository, caseService, fakeId } = makeSut();

      caseRepository.deleteById.mockResolvedValue(null);

      const deletedCase = await caseService.deleteById(fakeId);

      expect(deletedCase).toBeNull();
      expect(caseRepository.deleteById).toHaveBeenCalledWith(fakeId);
    });
  });
});
