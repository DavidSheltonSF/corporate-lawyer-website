import { CaseService } from './CaseService';
import { CaseStatusEnum } from '../types/CaseStatusEnum';
import { createMockCaseRepository } from '../tests/mocks/repositories/createMockCaseRepository';

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
      status: CaseStatusEnum.em_andamento,
    };

    const createdCase = await caseService.create(newCase);
    console.log(createdCase);

    expect(caseRepository.create).toHaveBeenLastCalledWith(newCase);
  });
});
