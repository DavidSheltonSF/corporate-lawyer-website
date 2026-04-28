import { CreateCaseDTO } from '../../dtos/case/CreateCaseDTO';
import { UpdateCaseDTO } from '../../dtos/case/UpdateCaseDTO';
import { CaseService } from '../../services/case/CaseService';
import { UserService } from '../../services/user/UserService';
import { createMockCaseRepository } from '../../tests/mocks/repositories/createMockCaseRepository';
import { createMockUserRepository } from '../../tests/mocks/repositories/createMockUserRepository';
import { BrazilianState } from '../../types/BrazilianState';
import { CasesStatus } from '../../types/CasesStatus';
import { City } from '../../types/City';
import { UserRole } from '../../types/UserRole';
import { HttpRequest } from '../types/HttpRequest';
import { HttpStatusCode } from '../types/HttpStatusCode';
import { CaseController } from './CaseController';

describe(`Test ${CaseController.name}`, () => {
  function makeSut() {
    const caseRepository = createMockCaseRepository();
    const userRepository = createMockUserRepository();
    userRepository.findById = jest.fn().mockResolvedValue({
      id: 'fakeid',
      firstName: 'José',
      lastName: 'Almeida',
      email: 'jo@email.com',
      cpf: '15588787855',
      password: 'jose123',
      role: UserRole.lawyer,
    });

    const userService = new UserService(userRepository, caseRepository);
    const caseService = new CaseService(caseRepository);

    const caseController = new CaseController(caseService, userService);

    const httpRequest: HttpRequest = {
      params: {
        id: 'fakeId',
      },
      query: {},
      body: {},
      headers: {},
      user: {
        id: 'fakeid',
        email: 'fake@email.com',
      },
    };

    return {
      caseRepository,
      userRepository,
      caseService,
      caseController,
      httpRequest,
    };
  }

  test('should call CaseRepository.create and return 201', async () => {
    const { caseController, caseRepository, httpRequest } = makeSut();

    const newCase: CreateCaseDTO = {
      title: 'Ação de Usucapião Urbano',
      client: 'fakeid',
      court: 'fakecourt',
      courtDivision: 'fakecourtdivision',
      description: 'description bla bla',
      lawyers: ['fakeidiii'],
      processNumber: '8585874-77.5855.8.11.1258', // NNNNNNN-DD.AAAA.J.TR.OOOO
      status: CasesStatus.open,
      location: {
        state: BrazilianState.RIO_DE_JANEIRO,
        city: City.RIO_DE_JANEIRO,
      },
    };

    httpRequest.body = newCase;

    const response = await caseController.create(httpRequest);
    expect(caseRepository.create).toHaveBeenCalledWith(newCase);
    expect(response.status).toBe(HttpStatusCode.created);
  });

  test('should call CaseRepository.updateById and return 200', async () => {
    const { caseController, caseRepository, httpRequest } = makeSut();

    const updatedData: UpdateCaseDTO = {
      title: 'Pedido de penção para menores',
      court: 'fakecourt',
    };

    httpRequest.body = updatedData;
    httpRequest.params = { id: 'fdsfafdfaffa' };

    const response = await caseController.updateById(httpRequest);

    expect(caseRepository.updateById).toHaveBeenCalledWith(httpRequest.params.id, httpRequest.body);
    expect(response.status).toBe(HttpStatusCode.ok);
  });

  test('should call caseRepository.findById with the provided id and return OK (200)', async () => {
    const { caseController, caseRepository, httpRequest } = makeSut();

    const response = await caseController.findById(httpRequest);

    expect(caseRepository.findById).toHaveBeenCalledWith(httpRequest.params.id);
    expect(response.status).toBe(HttpStatusCode.ok);
  });

  test('should call caseRepository.findPopulatedById with the provided id and return OK (200)', async () => {
    const { caseController, caseRepository, httpRequest } = makeSut();

    httpRequest.query.populate = 'true';

    const response = await caseController.findById(httpRequest);

    expect(caseRepository.findPopulatedById).toHaveBeenCalledWith(httpRequest.params.id);
    expect(response.status).toBe(HttpStatusCode.ok);
  });

  test('should call caseRepository.findCases with provided data and return OK (200)', async () => {
    const { caseController, caseRepository, httpRequest } = makeSut();

    const status = 'open';
    const limit = 4;
    const page = 1;
    const query = 'Query string,';

    httpRequest.query = {
      status,
      query,
      page,
      limit,
    };

    const response = await caseController.findMyCases(httpRequest);

    expect(caseRepository.findPopulatedByClientId).toHaveBeenCalledWith(httpRequest.user?.id, {
      status,
      limit,
      page,
      query,
    });
    expect(response.status).toBe(HttpStatusCode.ok);
  });

  test('should call caseRepository.getStatsByClientId with provided data and return OK (200) ', async () => {
    const { caseController, caseRepository, httpRequest, userRepository } = makeSut();

    const response = await caseController.getMyStats(httpRequest);
    console.log(response);

    expect(caseRepository.getStatsByClientId).toHaveBeenCalledWith(httpRequest.user?.id);
    expect(response.status).toBe(HttpStatusCode.ok);
  });

  test('should call caseRepository.addFile with provided data and return OK (200) ', async () => {
    const { caseController, caseRepository, httpRequest } = makeSut();

    const file = {
      originalname: 'Document x',
      size: 200,
      mimeType: 'pdf',
    };

    httpRequest.file = file;

    const response = await caseController.uploadMyFile(httpRequest);

    expect(caseRepository.addFile).toHaveBeenCalled();
    expect(response?.status).toBe(HttpStatusCode.ok);
  });

  test('should call caseRepository.findById with provided id and return OK (200) ', async () => {
    const { caseController, caseRepository, httpRequest } = makeSut();

    const response = await caseController.findFilesByCaseId(httpRequest);

    expect(caseRepository.findFilesByCaseId).toHaveBeenCalledWith(httpRequest.params?.id);
    expect(response.status).toBe(HttpStatusCode.ok);
  });

  test('should call caseRepository.deleteById with provided id and return OK (200) ', async () => {
    const { caseController, caseRepository, httpRequest } = makeSut();

    const response = await caseController.findFilesByCaseId(httpRequest);

    expect(caseRepository.findFilesByCaseId).toHaveBeenCalledWith(httpRequest.params?.id);
    expect(response.status).toBe(HttpStatusCode.ok);
  });
});
