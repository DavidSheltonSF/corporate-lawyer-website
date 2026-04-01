import { CaseService } from './CaseService';
import { CasesStatus } from '../../types/CasesStatus';
import { createMockCaseRepository } from '../../tests/mocks/repositories/createMockCaseRepository';

describe('Test CaseService', () => {
  function makeSut() {
    const caseRepository = createMockCaseRepository();
    const caseService = new CaseService(caseRepository);

    return {
      caseService,
      caseRepository,
    };
  }

  test('should create a new case', async () => {
    const { caseService, caseRepository } = makeSut();

    const newCase = {
      client: 'xfafdsfafsfasfffff',
      lawyers: ['hhtshhhhhthtfsj'],
      processNumber: '261514514584615648',
      title: 'Process Title',
      court: 'STJ',
      courtDivision: 'Vara Cívil',
      description: 'Case description',
      status: CasesStatus.open,
    };

    const createdCase = await caseService.create(newCase);
    expect(caseRepository.create).toHaveBeenLastCalledWith(newCase);
  });

  test('should call caseRepository.updateById with the provided id and data', async () => {
    const { caseService, caseRepository } = makeSut();

    const caseId = 'fsdakfnitngnfaggfgg';
    const updateData = {
      processNumber: '261514514584615648',
      title: 'Process Title',
      court: 'STJ',
      courtDivision: 'Vara Cívil',
      description: 'Case description',
      status: CasesStatus.open,
    };

    await caseService.updateById(caseId, updateData);
    expect(caseRepository.updateById).toHaveBeenLastCalledWith(caseId, updateData);
  });

  test('should call caseRepository.findById with the provided id', async () => {
    const { caseService, caseRepository } = makeSut();

    const caseId = 'fakeid';

    await caseService.findById(caseId);
    expect(caseRepository.findById).toHaveBeenLastCalledWith(caseId);
  });

  test('should call caseRepository.getStatsByClientId with the provided id', async () => {
    const { caseService, caseRepository } = makeSut();

    const caseId = 'fakeid';

    await caseService.getStatsByClientId(caseId);
    expect(caseRepository.getStatsByClientId).toHaveBeenLastCalledWith(caseId);
  });

  test('should call caseRepository.findFilesByCaseId with the provided id', async () => {
    const { caseService, caseRepository } = makeSut();

    const caseId = 'fakeid';

    await caseService.findFilesByCaseId(caseId);
    expect(caseRepository.findFilesByCaseId).toHaveBeenLastCalledWith(caseId);
  });
});
