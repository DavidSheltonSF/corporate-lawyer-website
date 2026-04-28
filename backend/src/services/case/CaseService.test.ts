import { CaseService } from './CaseService';
import { CasesStatus } from '../../types/CasesStatus';
import { createMockCaseRepository } from '../../tests/mocks/repositories/createMockCaseRepository';
import { InvalidProcessNumberError } from '../../errors/domain/InvalidProcessNumberError';
import { InvalidCaseTitleError } from '../../errors/domain/InvalidCaseTitleError';
import { InvalidCaseStatusError } from '../../errors/domain/InvalidCaseStatusError';
import { BrazilState } from '../../types/BrazilState';
import { City } from '../../types/City';

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
      processNumber: '2158748-55.5558.5.87.8858',
      title: 'Ação de Usucapião Urbano',
      court: 'STJ',
      courtDivision: 'Vara Cívil',
      description: 'Case description',
      status: CasesStatus.open,
      location: {
        state: BrazilState.RIO_DE_JANEIRO,
        city: City.RIO_DE_JANEIRO,
      },
    };

    await caseService.create(newCase);
    expect(caseRepository.create).toHaveBeenLastCalledWith(newCase);
  });

  test('should throw InvalidProcessNumberError and not call CaseRepository.create if the process number provided is invalid', async () => {
    const { caseService, caseRepository } = makeSut();

    const newCase = {
      client: 'xfafdsfafsfasfffff',
      lawyers: ['hhtshhhhhthtfsj'],
      processNumber: '2158748',
      title: 'Ação de Usucapião Urbano',
      court: 'STJ',
      courtDivision: 'Vara Cívil',
      description: 'Case description',
      status: CasesStatus.open,
      location: {
        state: BrazilState.RIO_DE_JANEIRO,
        city: City.RIO_DE_JANEIRO,
      },
    };

    await expect(caseService.create(newCase)).rejects.toThrow(InvalidProcessNumberError);
    expect(caseRepository.create).toHaveBeenCalledTimes(0);
  });

  test('should throw InvalidCaseTitleError and not call CaseRepository.create if the case title provided is invalid', async () => {
    const { caseService, caseRepository } = makeSut();

    const newCase = {
      client: 'xfafdsfafsfasfffff',
      lawyers: ['hhtshhhhhthtfsj'],
      processNumber: '2158748-55.5558.5.87.8858',
      title: 'Ação d',
      court: 'STJ',
      courtDivision: 'Vara Cívil',
      description: 'Case description',
      status: CasesStatus.open,
      location: {
        state: BrazilState.RIO_DE_JANEIRO,
        city: City.RIO_DE_JANEIRO,
      },
    };
    await expect(caseService.create(newCase)).rejects.toThrow(InvalidCaseTitleError);
    expect(caseRepository.create).toHaveBeenCalledTimes(0);
  });

  test('should throw InvalidCaseStatusError and not call CaseRepository.create if the case status provided is invalid', async () => {
    const { caseService, caseRepository } = makeSut();

    const newCase = {
      client: 'xfafdsfafsfasfffff',
      lawyers: ['hhtshhhhhthtfsj'],
      processNumber: '2158748-55.5558.5.87.8858',
      title: 'Ação de Usucapião Urbano',
      court: 'STJ',
      courtDivision: 'Vara Cívil',
      description: 'Case description',
      status: 'banana',
      location: {
        state: BrazilState.RIO_DE_JANEIRO,
        city: City.RIO_DE_JANEIRO,
      },
    };

    await expect(caseService.create(newCase)).rejects.toThrow(InvalidCaseStatusError);
    expect(caseRepository.create).toHaveBeenCalledTimes(0);
  });

  test('should call caseRepository.updateById with the provided id and data', async () => {
    const { caseService, caseRepository } = makeSut();

    const caseId = 'fsdakfnitngnfaggfgg';
    const updateData = {
      processNumber: '2158748-55.5558.5.87.8858',
      title: 'Ação de Usucapião Urbano',
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

  test('should call caseRepository.deleteById with the provided id', async () => {
    const { caseService, caseRepository } = makeSut();

    const caseId = 'fakeid';

    await caseService.deleteById(caseId);
    expect(caseRepository.deleteById).toHaveBeenLastCalledWith(caseId);
  });
});
