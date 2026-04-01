import { CreateCaseDTO } from '../../dtos/case/CreateCaseDTO';
import { UpdateCaseDTO } from '../../dtos/case/UpdateCaseDTO';
import { CaseService } from '../../services/case/CaseService';
import { UserService } from '../../services/user/UserService';
import { createMockCaseRepository } from '../../tests/mocks/repositories/createMockCaseRepository';
import { createMockUserRepository } from '../../tests/mocks/repositories/createMockUserRepository';
import { CasesStatus } from '../../types/CasesStatus';
import { UserRole } from '../../types/UserRole';
import { HttpRequest } from '../types/HttpRequest';
import { HttpStatusCode } from '../types/HttpStatusCode';
import { CaseController } from './CaseController';

describe(`Test ${CaseController.name}`, () => {
  function makeSut() {
    const caseRepository = createMockCaseRepository();
    const userRepository = createMockUserRepository();
    const userService = new UserService(userRepository, caseRepository);
    const caseService = new CaseService(caseRepository);
    const caseController = new CaseController(caseService, userService);

    return {
      caseRepository,
      userRepository,
      caseService,
      caseController,
    };
  }

  test('should call CaseRepository.create and return 201', async () => {
    const { caseController, caseRepository, userRepository } = makeSut();

    const newCase: CreateCaseDTO = {
      title: 'Case Title',
      client: 'fakeid',
      court: 'fakecourt',
      courtDivision: 'fakecourtdivision',
      description: 'description bla bla',
      lawyers: ['fakeidiii'],
      processNumber: '21454651554',
      status: CasesStatus.open,
    };

    const httpRequest = {
      user: { id: 'dskfsadf', email: 'user@email.com' },
      body: newCase,
    };
    userRepository.findById = jest.fn().mockResolvedValue({
      _id: 'dfsdfsa',
      firstName: 'José',
      lastName: 'Almeida',
      email: 'jo@email.com',
      cpf: '15588787855',
      password: 'jose123',
      role: UserRole.lawyer,
    });
    const response = await caseController.create(httpRequest);
    console.log(response);

    expect(caseRepository.create).toHaveBeenCalledWith(newCase);
    expect(response.status).toBe(HttpStatusCode.created);
  });

  test('should call CaseRepository.updateById and return 200', async () => {
    const { caseController, caseRepository, userRepository } = makeSut();

    const updatedData: UpdateCaseDTO = {
      title: 'Case Title',
      court: 'fakecourt',
    };

    const httpRequest = {
      user: { id: 'dskfsadf', email: 'user@email.com' },
      params: { id: 'fdsfafdfaffa' },
      body: updatedData,
    };
    userRepository.findById = jest.fn().mockResolvedValue({
      _id: 'dfsdfsa',
      firstName: 'José',
      lastName: 'Almeida',
      email: 'jo@email.com',
      cpf: '15588787855',
      password: 'jose123',
      role: UserRole.lawyer,
    });
    const response = await caseController.updateById(httpRequest);

    expect(caseRepository.updateById).toHaveBeenCalledWith(httpRequest.params.id, httpRequest.body);
    expect(response.status).toBe(HttpStatusCode.ok);
  });

  test('should call caseRepository.findById with the provided id and return OK (200)', async () => {
    const { caseController, caseRepository } = makeSut();

    const httpRequest = {
      params: {
        id: 'fakeId',
      },
    };

    const response = await caseController.findById(httpRequest);

    expect(caseRepository.findById).toHaveBeenCalledWith(httpRequest.params.id);
    expect(response.status).toBe(HttpStatusCode.ok);
  });

  test('should call caseRepository.findCases with provided data and return OK (200)', async () => {
    const { caseController, caseRepository } = makeSut();

    const status = 'open';
    const limit = 4;
    const page = 1;
    const query = 'Query string,';

    const httpRequest: HttpRequest = {
      user: {
        id: 'fakeId',
        email: 'user@email.com',
      },

      query: {
        status,
        query,
        page,
        limit,
      },
    };

    const response = await caseController.findMyCases(httpRequest);

    expect(caseRepository.findCases).toHaveBeenCalledWith({
      client: httpRequest.user?.id,
      status,
      limit,
      page,
      query,
    });
    expect(response.status).toBe(HttpStatusCode.ok);
  });

  test('should call caseRepository.getStatsByClientId with provided data and return OK (200) ', async () => {
    const { caseController, caseRepository } = makeSut();

    const httpRequest: HttpRequest = {
      user: {
        id: 'fakeId',
        email: 'user@email.com',
      },
    };

    const response = await caseController.getMyStats(httpRequest);

    expect(caseRepository.getStatsByClientId).toHaveBeenCalledWith(httpRequest.user?.id);
    expect(response.status).toBe(HttpStatusCode.ok);
  });

  test('should call caseRepository.addFile with provided data and return OK (200) ', async () => {
    const { caseController, caseRepository } = makeSut();

    const file = {
      originalname: 'Document x',
      size: 200,
      mimeType: 'pdf',
    };

    const httpRequest: HttpRequest = {
      user: {
        id: 'fakeId',
        email: 'user@email.com',
      },

      params: {
        id: 'fakeCaseId',
      },

      file,
    };

    const response = await caseController.uploadMyFile(httpRequest);

    expect(caseRepository.addFile).toHaveBeenCalled();
    expect(response?.status).toBe(HttpStatusCode.ok);
  });

  test('should call caseRepository.findById with provided id and return OK (200) ', async () => {
    const { caseController, caseRepository } = makeSut();
    const httpRequest: HttpRequest = {
      params: {
        id: 'fakeCaseId',
      },
    };

    const response = await caseController.findFilesByCaseId(httpRequest);

    expect(caseRepository.findFilesByCaseId).toHaveBeenCalledWith(httpRequest.params?.id);
    expect(response.status).toBe(HttpStatusCode.ok);
  });
});
